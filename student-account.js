(function () {
  if (window.TestNovaStudent) return;

  const listeners = new Set();
  let session = null;
  let recovery = false;
  let google = false;
  let phone = false;

  const ready = (async () => {
    try {
      const response = await fetch('/api/student-config');
      if (!response.ok) return null;
      const config = await response.json();
      const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.80.0/+esm');
      const client = createClient(config.url, config.key, { auth: { flowType: 'pkce' } });
      google = config.google === true;
      phone = config.phone === true;
      client.auth.onAuthStateChange((event, value) => {
        session = value;
        if (event === 'PASSWORD_RECOVERY') recovery = true;
        if (event === 'SIGNED_OUT') recovery = false;
        for (const listener of listeners) queueMicrotask(() => listener());
      });
      const { data } = await client.auth.getSession();
      session = data.session;
      return client;
    } catch {
      return null;
    }
  })();

  async function progress(courses) {
    const client = await ready;
    const student = session?.user.id;
    if (!client || !student) return [];
    const records = [];
    for (let offset = 0; ; offset += 500) {
      let query = client.from('student_progress').select('*').eq('student_id', student)
        .order('course_id').order('lesson_id').order('section_id').range(offset, offset + 499);
      if (courses) query = query.in('course_id', courses);
      const { data, error } = await query;
      if (error) throw error;
      records.push(...data);
      if (data.length < 500) return records;
    }
  }

  async function save(record, completed, expectedStudent) {
    const client = await ready;
    const student = session?.user.id;
    if (!client || !student || student !== expectedStudent) throw new Error('Sign in to save progress.');
    const row = { ...record, student_id: student, last_visited_at: new Date().toISOString() };
    if (completed !== undefined) row.completed_at = completed ? row.last_visited_at : null;
    const { error } = await client.from('student_progress').upsert(row);
    if (error) throw error;
  }

  function mountAccountMenu() {
    const header = document.querySelector('.nav-container');
    if (!header) return;
    const menu = document.createElement('details');
    menu.className = 'student-account-menu';
    menu.innerHTML = '<summary>Signed in</summary><div class="student-account-panel">' +
      '<p data-student-identity></p><a href="/dashboard/">Dashboard</a>' +
      '<a data-student-resume href="/dashboard/">Continue learning</a>' +
      '<button type="button">Sign out</button><p role="status" data-student-menu-status></p></div>';
    const identity = menu.querySelector('[data-student-identity]');
    const resume = menu.querySelector('[data-student-resume]');
    const signOut = menu.querySelector('button');
    const status = menu.querySelector('[data-student-menu-status]');
    let shownStudent;
    let request = 0;

    function render() {
      const user = session?.user;
      if (!user) {
        request++;
        menu.remove();
        menu.open = false;
        shownStudent = undefined;
        identity.textContent = '';
        resume.href = '/dashboard/';
        status.textContent = '';
        return;
      }
      if (shownStudent !== user.id) {
        request++;
        resume.href = '/dashboard/';
        status.textContent = '';
        shownStudent = user.id;
      }
      identity.textContent = user.user_metadata?.display_name || user.email || user.phone || 'Signed in';
      resume.hidden = recovery;
      if (!menu.isConnected) header.insertBefore(menu, header.querySelector('.tn-nav-tools'));
    }

    menu.addEventListener('toggle', async () => {
      if (!menu.open || recovery) return;
      const student = session?.user.id;
      const version = ++request;
      const client = await ready;
      if (!client || !student || student !== session?.user.id) return;
      try {
        const { data, error } = await client.from('student_progress').select('lesson_url')
          .eq('student_id', student).order('last_visited_at', { ascending: false }).limit(1);
        const url = data?.[0]?.lesson_url;
        if (!error && version === request && student === session?.user.id &&
            /^\/[a-z0-9-]+\.html(?:[?#][^\s]*)?$/i.test(url || '')) resume.href = url;
      } catch {
        // Dashboard remains available if the latest lesson cannot be fetched.
      }
    });

    document.addEventListener('click', (event) => {
      if (menu.open && !menu.contains(event.target)) menu.open = false;
    });
    menu.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape' || !menu.open) return;
      menu.open = false;
      menu.querySelector('summary').focus();
    });

    signOut.addEventListener('click', async () => {
      signOut.disabled = true;
      status.textContent = '';
      try {
        const client = await ready;
        const { error } = await client.auth.signOut({ scope: 'local' });
        if (error) throw error;
      } catch { status.textContent = 'Could not sign out. Please try again.'; }
      finally { signOut.disabled = false; }
    });

    listeners.add(render);
    ready.then(render);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mountAccountMenu);
  else mountAccountMenu();

  window.TestNovaStudent = {
    ready, progress, save,
    get user() { return session?.user || null; },
    get recovery() { return recovery; },
    get google() { return google; },
    get phone() { return phone; },
    finishRecovery() { recovery = false; },
    subscribe(listener) { listeners.add(listener); }
  };
})();
