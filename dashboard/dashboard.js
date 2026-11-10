(function () {
  const account = window.TestNovaStudent;
  const get = (id) => document.getElementById('student-' + id);
  const form = get('form');
  const status = get('status');
  const formStatus = get('form-status');
  const labels = { signin: 'Sign in', signup: 'Create account', forgot: 'Send reset link', recovery: 'Set new password' };
  const requested = new URLSearchParams(location.search).get('next') || '';
  const next = /^\/[a-z0-9-]+\.html(?:[?#][^\s]*)?$/i.test(requested) ? requested : '';
  const returnUrl = new URL('/dashboard/', location.origin);
  if (next) returnUrl.searchParams.set('next', next);
  let mode = 'signin';
  let revision = 0;
  let displayedStudent;
  let busy = false;

  function choose(value) {
    mode = value;
    const fields = {
      'name': value === 'signup',
      'email': ['signin', 'signup', 'forgot'].includes(value),
      'password': ['signin', 'signup', 'recovery'].includes(value)
    };
    for (const [id, visible] of Object.entries(fields)) {
      const row = get(id + '-row');
      const input = row.querySelector('input');
      row.hidden = !visible;
      input.disabled = !visible;
      input.required = visible && id !== 'name';
    }
    get('options').hidden = value === 'recovery';
    get('options').querySelectorAll('[data-mode]').forEach((button) => {
      button.hidden = button.dataset.mode === value;
    });
    form.password.minLength = ['signup', 'recovery'].includes(value) ? 8 : 1;
    form.password.autocomplete = ['signup', 'recovery'].includes(value) ? 'new-password' : 'current-password';
    get('form-title').textContent = labels[value];
    get('submit').textContent = labels[value];
  }

  function add(parent, tag, value) {
    const element = document.createElement(tag);
    element.textContent = value;
    parent.append(element);
    return element;
  }

  const catalog = window.TestNovaCourseIndex || [];
  const dateLabel = (timestamp) => timestamp ? new Date(timestamp).toLocaleDateString(undefined, { dateStyle: 'medium' }) : '';
  const dayKey = (timestamp) => timestamp?.slice(0, 10);
  let courseCards = [];

  function link(parent, title, url, className = '') {
    if (!/^\/[a-z0-9-]+\.html(?:[?#][^\s]*)?$/i.test(url)) return;
    const anchor = add(parent, 'a', title);
    anchor.href = url;
    anchor.className = className;
  }

  function progressBar(parent, completed, total) {
    const bar = add(parent, 'progress', '');
    bar.max = total;
    bar.value = completed;
    bar.setAttribute('aria-label', 'Lesson completion');
    add(parent, 'p', completed + ' / ' + total + ' lessons · ' + Math.round(completed / total * 100) + '%');
  }

  function courseData(course, records) {
    const rows = records.filter((row) => row.course_id === course.trackId ||
      course.trackId === 'rest' && row.course_id === 'api');
    const lessons = new Set(course.lessons.map(({ id }) => id));
    const published = rows.filter((row) => lessons.has(row.lesson_id));
    const completed = new Set(published.filter((row) => !row.section_id && row.completed_at).map((row) => row.lesson_id));
    const latest = published[0];
    const lastIndex = latest ? course.lessons.findIndex((lesson) => lesson.id === latest.lesson_id) : 0;
    const ordered = course.lessons.slice(lastIndex).concat(course.lessons.slice(0, lastIndex));
    const nextLesson = ordered.find((lesson) => !completed.has(lesson.id));
    return { ...course, completed, latest, nextLesson, state: !latest ? 'new' : nextLesson ? 'active' : 'complete' };
  }

  function showCourse(parent, course, featured = false) {
    const card = featured ? parent : add(parent, 'article', '');
    card.classList.add(featured ? 'student-feature-content' : 'student-card');
    add(card, 'span', course.icon).className = 'student-course-icon';
    add(card, 'p', course.category + ' · ' + ({new: 'Not started', active: 'In progress', complete: 'Completed'})[course.state]).className = 'student-kicker';
    add(card, featured ? 'h2' : 'h3', course.title);
    add(card, 'p', course.summary);
    progressBar(card, course.completed.size, course.lessons.length);
    if (course.latest) add(card, 'p', 'Last studied ' + course.latest.lesson_title + ' · ' + dateLabel(course.latest.last_visited_at));
    if (featured && course.nextLesson) add(card, 'p', 'Next lesson · ' + course.nextLesson.title);
    const destination = course.nextLesson?.id === course.latest?.lesson_id ? course.latest.lesson_url : course.nextLesson?.url;
    link(card, course.state === 'new' ? 'Start learning' : course.nextLesson ? 'Continue Learning' : 'Review course',
      destination || course.latest?.lesson_url || course.url, 'primary-btn');
  }

  function filterCourses() {
    const term = get('course-search').value.trim().toLowerCase();
    const filter = get('course-filter').value;
    const output = get('courses');
    output.replaceChildren();
    const matches = courseCards.filter((course) => {
      if (filter !== 'all' && course.state !== filter) return false;
      return [course.title, course.summary, course.category].some((value) => value.toLowerCase().includes(term)) ||
        course.lessons.some((lesson) => lesson.title.toLowerCase().includes(term) ||
          lesson.sections?.some((title) => title.toLowerCase().includes(term)));
    });
    matches.forEach((course) => showCourse(output, course));
    if (!matches.length) add(output, 'p', 'No courses match this filter.');
  }

  function renderAnalytics(records, started, completed, total) {
    const days = new Map();
    for (const row of records) {
      for (const timestamp of new Set([row.last_visited_at, row.completed_at].filter(Boolean).map(dayKey))) {
        days.set(timestamp, (days.get(timestamp) || 0) + 1);
      }
    }
    const today = new Date();
    const dateAt = (offset) => new Date(today.getTime() - offset * 86400000).toISOString().slice(0, 10);
    let offset = days.has(dateAt(0)) ? 0 : 1;
    let streak = 0;
    while (days.has(dateAt(offset))) { streak++; offset++; }
    const overall = total ? Math.round(completed / total * 100) : 0;
    const stats = get('summary');
    stats.replaceChildren();
    for (const [label, value] of [['Courses started', started.length], ['Lessons completed', completed], ['Overall progress', overall + '%'], ['Learning streak', streak + ' days'], ['Learning time', 'Not tracked']]) {
      const stat = add(stats, 'div', '');
      add(stat, 'strong', value);
      add(stat, 'span', label);
    }
    const analytics = get('analytics');
    analytics.replaceChildren();
    const progress = add(analytics, 'article', '');
    progress.className = 'student-card';
    add(progress, 'h3', 'Started courses');
    add(progress, 'p', completed + ' lessons complete · ' + Math.max(0, total - completed) + ' remaining');
    if (total) progressBar(progress, completed, total);
    for (const course of started) {
      add(progress, 'p', course.title);
      progressBar(progress, course.completed.size, course.lessons.length);
    }
    const weekly = add(analytics, 'article', '');
    weekly.className = 'student-card';
    add(weekly, 'h3', 'Weekly activity');
    add(weekly, 'p', 'Latest saved lesson visits and completions per day (UTC).');
    const chart = add(weekly, 'ul', '');
    chart.className = 'student-chart';
    const max = Math.max(1, ...Array.from({length: 7}, (_, i) => days.get(dateAt(i)) || 0));
    for (let i = 6; i >= 0; i--) {
      const day = dateAt(i);
      const count = days.get(day) || 0;
      const item = add(chart, 'li', '');
      const label = new Date(day + 'T12:00:00Z').toLocaleDateString(undefined, { weekday: 'short', timeZone: 'UTC' });
      add(item, 'span', String(count));
      const bar = add(item, 'meter', '');
      bar.max = max;
      bar.value = count;
      bar.setAttribute('aria-label', label + ' saved lessons');
      add(item, 'span', label);
    }
    const badges = get('achievements');
    badges.replaceChildren();
    for (const [name, unlocked] of [['First lesson completed', completed >= 1], ['Five lessons completed', completed >= 5], ['First course completed', started.some((course) => course.state === 'complete')], ['Seven-day learning streak', streak >= 7]]) {
      const badge = add(badges, 'li', '');
      add(badge, 'strong', name);
      add(badge, 'span', unlocked ? 'Unlocked' : 'Locked');
      badge.classList.toggle('is-unlocked', unlocked);
    }
  }

  function render(records) {
    records.sort((a, b) => b.last_visited_at.localeCompare(a.last_visited_at));
    courseCards = catalog.map((course) => courseData(course, records));
    const started = courseCards.filter((course) => course.latest)
      .sort((a, b) => b.latest.last_visited_at.localeCompare(a.latest.last_visited_at));
    const completed = started.reduce((sum, course) => sum + course.completed.size, 0);
    const total = started.reduce((sum, course) => sum + course.lessons.length, 0);
    const feature = get('continue');
    feature.replaceChildren();
    add(feature, 'p', 'CONTINUE WHERE YOU LEFT OFF').className = 'student-kicker';
    if (started.length) showCourse(feature, started.find((course) => course.nextLesson) || started[0], true);
    else {
      add(feature, 'h2', 'Choose your first course');
      add(feature, 'p', 'Once you open a lesson, your next step will appear here.');
      link(feature, 'Explore courses', '/index.html#tutorials', 'primary-btn');
    }
    filterCourses();
    renderAnalytics(records, started, completed, total);
    const history = get('recent');
    history.replaceChildren();
    if (!records.length) add(history, 'li', 'Your recently studied lessons will appear here.');
    for (const record of records.slice(0, 8)) {
      const row = add(history, 'li', '');
      add(row, 'strong', record.lesson_title);
      add(row, 'p', record.course_title + ' · ' + dateLabel(record.last_visited_at) + (record.completed_at ? ' · Completed' : ' · In progress'));
      link(row, record.completed_at ? 'Review lesson' : 'Resume lesson', record.lesson_url, 'secondary-btn');
    }
    const latestComplete = records.filter((row) => !row.section_id && row.completed_at)
      .sort((a, b) => b.completed_at.localeCompare(a.completed_at))[0];
    get('updates').textContent = latestComplete
      ? 'Most recent completion · ' + latestComplete.lesson_title + ' · ' + dateLabel(latestComplete.completed_at)
      : 'New lesson completions will appear here.';
  }

  function renderPractice() {
    for (const course of catalog) {
      const lesson = course.lessons.find((item) => item.review);
      if (!lesson) continue;
      const card = add(get('practice'), 'article', '');
      card.className = 'student-card';
      add(card, 'h3', course.title);
      add(card, 'p', lesson.title);
      const reviewUrl = new URL(lesson.url, location.origin);
      reviewUrl.searchParams.set('review', '1');
      link(card, 'Open lesson review', reviewUrl.pathname + reviewUrl.search + reviewUrl.hash, 'secondary-btn');
    }
  }

  async function refresh() {
    const version = ++revision;
    const client = await account.ready;
    if (version !== revision) return;
    const user = account.user;
    const signedIn = Boolean(user && !account.recovery);
    if (displayedStudent !== user?.id || !signedIn) {
      get('courses').replaceChildren();
      get('recent').replaceChildren();
      get('summary').textContent = '';
      get('continue').replaceChildren();
      get('analytics').replaceChildren();
      get('achievements').replaceChildren();
      get('updates').textContent = '';
      courseCards = [];
      get('course-search').value = '';
      get('course-filter').value = 'all';
      get('profile-form').displayName.value = '';
      get('profile-status').textContent = '';
      displayedStudent = signedIn ? user.id : undefined;
    }
    get('progress').hidden = !signedIn;
    document.body.classList.toggle('student-workspace-open', signedIn);
    get('auth').hidden = !client || signedIn;
    if (!client) {
      status.textContent = 'Student accounts are currently unavailable. You can still read every public tutorial.';
      return;
    }
    if (account.recovery) choose('recovery');
    else if (mode === 'recovery') choose('signin');
    if (!signedIn) {
      get('identity').textContent = '';
      get('greeting').textContent = '';
      status.textContent = next && !account.recovery ? 'Sign in to save your learning progress. Public tutorials are available to everyone.' : '';
      return;
    }
    if (next) { location.replace(next); return; }
    const name = user.user_metadata?.display_name || '';
    const welcomeName = name || user.user_metadata?.full_name || '';
    get('greeting').textContent = welcomeName ? 'Welcome back, ' + welcomeName + '!' : 'Welcome back!';
    get('avatar').textContent = (name || user.email || 'Student').trim().split(/\s+/).slice(0, 2).map((part) => part.charAt(0).toUpperCase()).join('');
    get('profile-form').displayName.value = name;
    get('identity').textContent = user.email || 'Student account';
    get('joined').textContent = user.created_at ? 'Joined ' + dateLabel(user.created_at) : '';
    status.textContent = 'Loading saved progress…';
    try {
      const records = await account.progress();
      if (version === revision) {
        render(records);
        status.textContent = '';
      }
    } catch {
      if (version === revision) status.textContent = 'Progress could not load. Refresh to try again.';
    }
  }

  function explainError(error) {
    switch (error?.code) {
      case 'email_address_not_authorized': return 'This preview can send email only to members of the TestNova Supabase organization. Use a team email address.';
      case 'over_email_send_rate_limit': return 'The preview email limit was reached. Wait before requesting another email.';
      case 'invalid_credentials': return 'The email or password is incorrect.';
      case 'email_not_confirmed': return 'Confirm your email before signing in. Check your inbox and spam folder.';
      case 'weak_password': return 'Choose a stronger password of at least 8 characters.';
      default: return 'The request could not be completed. Please try again.';
    }
  }

  async function perform(button, action, message = formStatus) {
    if (busy) return;
    busy = true;
    button.disabled = true;
    message.textContent = 'Working…';
    try {
      const client = await account.ready;
      if (!client) throw new Error('Auth unavailable');
      await action(client.auth);
    } catch (error) { message.textContent = explainError(error); }
    finally {
      busy = false;
      button.disabled = false;
    }
  }

  get('options').addEventListener('click', (event) => {
    const value = event.target.dataset.mode;
    if (!value || busy) return;
    choose(value);
    formStatus.textContent = '';
    form.email.focus();
  });
  form.addEventListener('invalid', (event) => {
    formStatus.textContent = event.target.validationMessage;
  }, true);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = form.email.value.trim();
    const password = form.password.value;
    const action = mode;
    perform(get('submit'), async (auth) => {
      let result;
      if (action === 'signup') result = await auth.signUp({ email, password, options: { emailRedirectTo: returnUrl.href, data: { display_name: form.displayName.value.trim() } } });
      else if (action === 'forgot') result = await auth.resetPasswordForEmail(email, { redirectTo: returnUrl.href });
      else if (action === 'recovery') result = await auth.updateUser({ password });
      else result = await auth.signInWithPassword({ email, password });
      if (result.error) throw result.error;
      form.password.value = '';
      if (action === 'forgot' || action === 'signup' && !result.data.session) {
        formStatus.textContent = 'Check your email for the next step.';
      } else {
        formStatus.textContent = '';
        if (action === 'recovery') account.finishRecovery();
        await refresh();
      }
    });
  });
  get('logout').addEventListener('click', () => perform(get('logout'), async (auth) => {
    const { error } = await auth.signOut({ scope: 'local' });
    if (error) throw error;
    await refresh();
  }, status));
  get('google').addEventListener('click', () => {
    if (busy) return;
    if (!account.google) {
      formStatus.textContent = 'Google sign-in is unavailable until the Google OAuth client is configured.';
      return;
    }
    perform(get('google'), async (auth) => {
      const { error } = await auth.signInWithOAuth({ provider: 'google', options: { redirectTo: returnUrl.href } });
      if (error) throw error;
    });
  });
  get('course-search').addEventListener('input', filterCourses);
  get('course-filter').addEventListener('change', filterCourses);
  const navigation = get('nav');
  const toggle = get('nav-toggle');
  const narrow = matchMedia('(max-width: 800px)');
  function setNavigation(open) {
    navigation.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
  }
  toggle.addEventListener('click', () => setNavigation(navigation.hidden));
  narrow.addEventListener('change', () => setNavigation(!narrow.matches));
  function syncNavigation() {
    const hash = location.hash || '#overview';
    navigation.querySelectorAll('a').forEach((anchor) => {
      if (anchor.getAttribute('href') === hash) anchor.setAttribute('aria-current', 'location');
      else anchor.removeAttribute('aria-current');
    });
  }
  navigation.addEventListener('click', (event) => {
    const target = event.target.closest('a[href^="#"]');
    if (!target) return;
    if (narrow.matches) setNavigation(false);
    document.querySelector(target.hash)?.focus({ preventScroll: true });
  });
  window.addEventListener('hashchange', syncNavigation);
  setNavigation(!narrow.matches);
  syncNavigation();

  get('profile-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const displayName = get('profile-form').displayName.value.trim();
    if (!displayName) { get('profile-status').textContent = 'Enter a display name.'; return; }
    perform(get('profile-save'), async (auth) => {
      const { error } = await auth.updateUser({ data: { display_name: displayName } });
      if (error) throw error;
      get('profile-status').textContent = 'Profile saved.';
      await refresh();
    }, get('profile-status'));
  });

  renderPractice();
  choose('signin');
  account.subscribe(refresh);
  refresh();
})();
