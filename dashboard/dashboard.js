(function () {
  const account = window.TestNovaStudent;
  const get = (id) => document.getElementById('student-' + id);
  const form = get('form');
  const status = get('status');
  const labels = { signin: 'Sign in', signup: 'Create account', forgot: 'Send reset link', recovery: 'Set new password' };
  const requested = new URLSearchParams(location.search).get('next') || '';
  const next = /^\/[a-z0-9-]+\.html(?:[?#][^\s]*)?$/i.test(requested) ? requested : '';
  const returnUrl = new URL('/dashboard/', location.origin);
  if (next) returnUrl.searchParams.set('next', next);
  let mode = 'signin';
  let revision = 0;
  let displayedStudent;

  function choose(value) {
    mode = value;
    get('name-row').hidden = value !== 'signup';
    get('email-row').hidden = value === 'recovery';
    get('password-row').hidden = value === 'forgot';
    get('options').hidden = value === 'recovery';
    form.email.required = value !== 'recovery';
    form.password.required = value !== 'forgot';
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

  function link(parent, title, url) {
    if (/^\/[a-z0-9-]+\.html(?:[?#][^\s]*)?$/i.test(url)) add(parent, 'a', title).href = url;
  }

  function render(records) {
    records.sort((a, b) => b.last_visited_at.localeCompare(a.last_visited_at));
    const courses = new Map();
    for (const record of records) {
      if (!courses.has(record.course_id)) courses.set(record.course_id, { latest: record, lessons: 0, completed: 0 });
      const course = courses.get(record.course_id);
      if (!record.section_id) {
        course.lessons++;
        if (record.completed_at) course.completed++;
      }
    }
    const finished = [...courses.values()].reduce((sum, course) => sum + course.completed, 0);
    const started = [...courses.values()].reduce((sum, course) => sum + course.lessons, 0);
    get('summary').textContent = courses.size + ' courses started · ' + finished + ' lessons complete · ' + (started - finished) + ' in progress';
    get('courses').replaceChildren();
    get('recent').replaceChildren();
    if (!records.length) add(get('courses'), 'p', 'Open a lesson to start your learning history.');
    for (const { latest, completed } of courses.values()) {
      const card = add(get('courses'), 'article', '');
      add(card, 'h3', latest.course_title);
      add(card, 'p', completed + ' of ' + latest.lesson_count + ' lessons · ' + Math.min(100, Math.round(completed / latest.lesson_count * 100)) + '%');
      link(card, 'Continue learning: ' + latest.lesson_title, latest.lesson_url);
    }
    for (const record of records.slice(0, 8)) link(add(get('recent'), 'li', ''), record.lesson_title, record.lesson_url);
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
      displayedStudent = signedIn ? user.id : undefined;
    }
    get('progress').hidden = !signedIn;
    get('auth').hidden = !client || signedIn;
    if (!client) {
      status.textContent = 'Student accounts are currently unavailable. You can still read every public tutorial.';
      return;
    }
    get('google').hidden = !account.google;
    if (account.recovery) choose('recovery');
    else if (mode === 'recovery') choose('signin');
    if (!signedIn) {
      get('identity').textContent = '';
      get('greeting').textContent = '';
      status.textContent = next && !account.recovery ? 'Sign in to save your learning progress. Public tutorials are available to everyone.' : '';
      return;
    }
    if (next) { location.replace(next); return; }
    get('greeting').textContent = user.user_metadata?.display_name || 'Welcome back';
    get('identity').textContent = user.email || '';
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

  async function perform(button, action) {
    const client = await account.ready;
    if (!client) return;
    button.disabled = true;
    try { await action(client.auth); }
    catch { status.textContent = 'The request could not be completed. Try again or check your credentials.'; }
    finally { button.disabled = false; }
  }

  get('options').addEventListener('click', (event) => {
    if (event.target.dataset.mode) {
      choose(event.target.dataset.mode);
      status.textContent = '';
      form.email.focus();
    }
  });
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
        status.textContent = 'Check your email for the next step.';
      } else {
        if (action === 'recovery') account.finishRecovery();
        await refresh();
      }
    });
  });
  get('logout').addEventListener('click', () => perform(get('logout'), async (auth) => {
    const { error } = await auth.signOut({ scope: 'local' });
    if (error) throw error;
    await refresh();
  }));
  get('google').addEventListener('click', () => perform(get('google'), async (auth) => {
    const { error } = await auth.signInWithOAuth({ provider: 'google', options: { redirectTo: returnUrl.href } });
    if (error) throw error;
  }));
  choose('signin');
  account.subscribe(refresh);
  refresh();
})();
