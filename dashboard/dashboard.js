(function () {
  const account = window.TestNovaStudent;
  const get = (id) => document.getElementById('student-' + id);
  const form = get('form');
  const status = get('status');
  const formStatus = get('form-status');
  const labels = { signin: 'Sign in', signup: 'Create account', forgot: 'Send reset link', recovery: 'Set new password', phone: 'Send verification code', code: 'Verify code' };
  const requested = new URLSearchParams(location.search).get('next') || '';
  const next = /^\/[a-z0-9-]+\.html(?:[?#][^\s]*)?$/i.test(requested) ? requested : '';
  const returnUrl = new URL('/dashboard/', location.origin);
  if (next) returnUrl.searchParams.set('next', next);
  let mode = 'signin';
  let revision = 0;
  let displayedStudent;
  let pendingPhone;
  let busy = false;

  function choose(value) {
    mode = value;
    const fields = {
      'name': value === 'signup',
      'email': ['signin', 'signup', 'forgot'].includes(value),
      'password': ['signin', 'signup', 'recovery'].includes(value),
      'phone': value === 'phone',
      'code': value === 'code'
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
    get('identity').textContent = user.email || user.phone || '';
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
      case 'otp_expired': return 'That code is invalid or expired. Check the code or request a new one.';
      case 'over_sms_send_rate_limit': return 'Too many code requests. Wait before trying again.';
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
    if (value === 'phone' && !account.phone) {
      formStatus.textContent = 'Phone sign-in is unavailable until SMS delivery is configured.';
      return;
    }
    choose(value);
    formStatus.textContent = '';
    (value === 'phone' ? form.phone : form.email).focus();
  });
  form.addEventListener('invalid', (event) => {
    formStatus.textContent = event.target.validationMessage;
  }, true);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = form.email.value.trim();
    const password = form.password.value;
    const action = mode;
    const phone = form.phone.value.replace(/[ ()-]/g, '');
    const token = form.code.value.trim();
    if (action === 'phone' && !/^\+[1-9]\d{7,14}$/.test(phone)) {
      formStatus.textContent = 'Enter your mobile number with its country code, for example +91 98765 43210.';
      form.phone.focus();
      return;
    }
    if (action === 'code' && !/^\d{6}$/.test(token)) {
      formStatus.textContent = 'Enter the six-digit code from your SMS.';
      form.code.focus();
      return;
    }
    perform(get('submit'), async (auth) => {
      let result;
      if (action === 'phone') result = await auth.signInWithOtp({ phone });
      else if (action === 'code') result = await auth.verifyOtp({ phone: pendingPhone, token, type: 'sms' });
      else if (action === 'signup') result = await auth.signUp({ email, password, options: { emailRedirectTo: returnUrl.href, data: { display_name: form.displayName.value.trim() } } });
      else if (action === 'forgot') result = await auth.resetPasswordForEmail(email, { redirectTo: returnUrl.href });
      else if (action === 'recovery') result = await auth.updateUser({ password });
      else result = await auth.signInWithPassword({ email, password });
      if (result.error) throw result.error;
      form.password.value = '';
      if (action === 'phone') {
        pendingPhone = phone;
        form.code.value = '';
        choose('code');
        formStatus.textContent = 'Enter the verification code sent to your phone.';
        form.code.focus();
      } else if (action === 'forgot' || action === 'signup' && !result.data.session) {
        formStatus.textContent = 'Check your email for the next step.';
      } else {
        pendingPhone = undefined;
        form.code.value = '';
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
  choose('signin');
  account.subscribe(refresh);
  refresh();
})();
