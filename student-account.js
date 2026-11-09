(function () {
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
