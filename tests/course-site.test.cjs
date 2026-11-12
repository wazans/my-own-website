'use strict';

// Run with node --test tests/course-site.test.cjs after installing Playwright and Chromium.
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const { test, before, after } = require('node:test');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
const origin = 'http://localhost';
const courses = [
  ['Playwright', 'playwright-reader.html'], ['Java', 'java-programming.html'],
  ['JavaScript', 'js-typescript.html'], ['AI', 'ai-models.html'],
  ['Selenium Basics', 'selenium.html'], ['TestNG', 'testng.html'],
  ['Jenkins', 'jenkins.html'], ['Hybrid Framework', 'hybrid.html'],
  ['REST Assured', 'rest.html'], ['Git & GitHub', 'git-github-essentials.html']
];
const widths = [320, 375, 390, 430, 768, 1024, 1280, 1440, 1920];
const mime = { '.css': 'text/css', '.js': 'application/javascript', '.html': 'text/html', '.xml': 'application/xml' };
let browser;

before(async () => {
  browser = await chromium.launch({ executablePath: process.env.TESTNOVA_CHROMIUM });
});
after(async () => { await browser?.close(); });

async function usePage(width, height, run) {
  const context = await browser.newContext({ viewport: { width, height }, colorScheme: 'dark' });
  const errors = [];
  const missing = [];
  try {
    await context.route('**/*', async (route) => {
      const url = new URL(route.request().url());
      if (url.origin !== origin) return route.fulfill({ status: 204 });
      if (url.pathname === '/api/student-config') return route.fulfill({ status: 503 });
      const pathname = decodeURIComponent(url.pathname);
      const file = path.resolve(root, '.' + (pathname.endsWith('/') ? pathname + 'index.html' : pathname));
      assert.ok(file.startsWith(root + path.sep));
      try {
        const body = await fs.readFile(file);
        await route.fulfill({ body, contentType: mime[path.extname(file)] || 'application/octet-stream' });
      } catch (error) {
        if (error.code !== 'ENOENT') throw error;
        missing.push(url.pathname);
        await route.fulfill({ status: 404 });
      }
    });
    const page = await context.newPage();
    page.setDefaultTimeout(8000);
    page.on('pageerror', (error) => errors.push(error.message));
    await run(page, context);
    assert.deepEqual(errors, [], 'Unhandled page errors');
    assert.deepEqual(missing, [], 'Missing local assets');
  } finally {
    await context.close();
  }
}

async function checkLayout(page, label) {
  assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).colorScheme), 'light', label);
  assert.equal(await page.locator('[data-theme-toggle], .tn-reader-toc, .gated-action, [data-access-url]').count(), 0, label);
  assert.equal(await page.getByText(/^(Learning Hub|Access Required|On this page)$/i).filter({ visible: true }).count(), 0, label);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  assert.ok(overflow <= 1, label + ' horizontal overflow of ' + overflow + 'px');
}

async function checkInternalLinks(page) {
  const urls = await page.locator('main a[href], .site-nav a[href], footer a[href]').evaluateAll((links) =>
    [...new Set(links.map((link) => new URL(link.href)).filter((url) => url.origin === location.origin).map((url) => url.pathname))]);
  await Promise.all(urls.map((url) => fs.access(path.resolve(root, '.' + decodeURIComponent(url.endsWith('/') ? url + 'index.html' : url)))));
}

for (const width of widths) {
  test('catalog and all ten readers at ' + width + 'px', async () => {
    await usePage(width, 850, async (page) => {
      await page.goto(origin);
      await checkLayout(page, 'homepage');
      const cards = page.locator('.tutorial-card');
      assert.deepEqual(await cards.locator('h3').allTextContents(), courses.map(([title]) => title));
      assert.deepEqual(await cards.locator('a').evaluateAll((links) => links.map((link) => link.getAttribute('href'))), courses.map(([, url]) => '/' + url));
      if (width <= 980) await page.getByRole('button', { name: 'Toggle navigation' }).click();
      await page.locator('.course-menu > summary').click();
      assert.deepEqual(await page.locator('.course-menu-list a').allTextContents(), courses.map(([title]) => title));
      assert.equal(await page.locator('.course-menu-list a:visible').count(), 10);
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('.course-menu[open]').count(), 0);

      for (const [title, url] of courses) {
        await page.goto(origin + '/' + url);
        await page.locator('[data-topic-title]').waitFor();
        await checkLayout(page, title);
        await checkInternalLinks(page);
        const sidebar = page.locator('[data-ai-reader-sidebar]');
        const topics = sidebar.locator('[data-topic-link]');
        assert.equal(await sidebar.locator('details, [data-topic-link][hidden]').count(), 0, title);
        assert.ok(await sidebar.locator('.reader-course-module h2').count(), title);
        assert.equal(await page.locator('.course-menu-list a[aria-current="page"]').textContent(), title);
        if (width <= 980) {
          const toggle = page.getByRole('button', { name: 'Topics', exact: true });
          await toggle.click();
          await sidebar.getByRole('button', { name: 'Close topics' }).waitFor();
          assert.equal(await page.locator('body.reader-drawer-open').count(), 1);
          const last = topics.last();
          const lastTitle = await last.locator('strong').textContent();
          await last.click();
          assert.equal(await page.locator('[data-topic-title]').textContent(), lastTitle);
          assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
          assert.equal(await toggle.evaluate((element) => document.activeElement === element), true);
          await checkLayout(page, title + ' last topic');
        } else {
          assert.ok(await sidebar.evaluate((element) => element.clientHeight <= innerHeight - 48), title);
          if (title === 'REST Assured') assert.ok(await sidebar.evaluate((element) => element.scrollHeight > element.clientHeight));
        }
      }
    });
  });
}

test('subtopics, history, search, copy controls, and mobile dismissal in landscape', async () => {
  await usePage(780, 360, async (page) => {
    await page.goto(origin + '/playwright-reader.html');
    const toggle = page.getByRole('button', { name: 'Topics', exact: true });
    await toggle.click();
    const search = page.getByRole('searchbox', { name: 'Search topics' });
    await search.fill('topic that does not exist');
    assert.equal(await page.getByRole('status').filter({ hasText: 'No matching topics' }).isVisible(), true);
    await search.fill('Getting started');
    assert.equal(await page.locator('[data-topic-link]:visible').count(), 4);
    await search.fill('');
    assert.equal(await page.locator('[data-topic-link]:visible').count(), 30);
    assert.match(await page.locator('[data-topic-link]:visible').last().textContent(), /Run a Playwright Login in Jenkins/);
    const subtopic = page.locator('[data-subtopic]').last();
    const title = await subtopic.textContent();
    await subtopic.click();
    assert.equal(await page.locator('.reader-subtopic-title').last().textContent(), title);
    assert.match(page.url(), /section=\d+/);
    await page.reload();
    assert.equal(await page.locator('[data-subtopic][aria-current="location"]').textContent(), title);
    const previous = page.getByRole('button', { name: /Previous lesson/ });
    await previous.click();
    assert.doesNotMatch(page.url(), /section=/);
    await page.goBack();
    assert.match(page.url(), /section=\d+/);
    await toggle.click();
    await page.getByRole('button', { name: 'Close topics' }).click();
    assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
    await toggle.click();
    await page.keyboard.press('Escape');
    assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
    await toggle.click();
    await page.locator('[data-reader-sidebar-scrim]').click({ position: { x: 700, y: 150 } });
    assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
    await checkLayout(page, 'landscape');
  });
});

test('API bookmarks and REST Assured code work for public readers', async () => {
  await usePage(1440, 900, async (page, context) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write'], { origin });
    await page.goto(origin + '/api.html#definition');
    await page.getByRole('button', { name: 'Mark Complete' }).click();
    await page.waitForURL('**/dashboard/?next=*');
    await page.getByText(/Student accounts are currently unavailable/).waitFor();
    await page.goto(origin + '/rest.html');
    await page.getByRole('link', { name: 'Skip to REST Assured setup' }).click();
    await page.waitForURL('**/rest.html#setup');
    assert.match(await page.locator('[data-topic-title]').textContent(), /Maven and local API setup/);
    await page.goto(origin + '/rest.html#local-docs');
    assert.match(await page.locator('[data-topic-title]').textContent(), /Maven and local API setup/);
    await page.getByRole('button', { name: /Next lesson/ }).click();
    assert.equal(await page.locator('[data-topic-title]').textContent(), 'Automate your first API check');
    const copy = page.getByRole('button', { name: 'Copy Java code' });
    await copy.click();
    assert.match(await page.evaluate(() => navigator.clipboard.readText()), /class UsersContractCheck/);
    await checkLayout(page, 'API example with table and code');
  });
});

test('legacy Playwright bookmarks retain the original lessons', async () => {
  await usePage(390, 650, async (page) => {
    await page.goto(origin + '/playwright.html#js-hello');
    assert.match(await page.locator('#js-hello h2').textContent(), /Hello world$/);
    await page.getByRole('button', { name: 'Open topics' }).click();
    await page.locator('.legacy-topic-drawer .sidebar-link').last().click();
    assert.equal(await page.locator('.legacy-topic-drawer.is-open').count(), 0);
    await checkLayout(page, 'legacy Playwright');
    for (const name of ['qa-engineering.html', 'development-technologies.html']) {
      await page.goto(origin + '/' + name);
      assert.ok(await page.locator('.course-discovery-card').count(), name);
      await checkLayout(page, name);
      await checkInternalLinks(page);
    }
    await page.goto(origin + '/jenkins.html');
    assert.equal(await page.locator('[data-topic-title]').textContent(), 'Jenkins Installation on Windows 11');
    assert.equal(await page.getByRole('link', { name: 'Run a Playwright Login in Jenkins' }).getAttribute('href'), 'playwright-reader.html?topic=playwright-notes-30');
    await page.goto(origin + '/jenkins.html#build-process');
    assert.equal(await page.locator('[data-topic-title]').textContent(), 'Build process');
    await page.goto(origin + '/hybrid.html#step-29');
    assert.match(await page.locator('[data-topic-title]').textContent(), /Page Factory/i);
  });
});

test('students sign in, save progress, and see their own dashboard', async () => {
  await usePage(390, 800, async (page, context) => {
    const rows = new Map();
    await context.route('**/api/student-config', (route) => route.fulfill({
      json: { url: 'https://test.supabase.co', key: 'sb_publishable_test' }
    }));
    await context.route('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@*/+esm', (route) => route.fulfill({
      contentType: 'application/javascript',
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: `
        export function createClient() {
          let callback;
          const current = () => JSON.parse(sessionStorage.getItem('mock-student') || 'null');
          return {
            auth: {
              onAuthStateChange(fn) { callback = fn; },
              async getSession() { return { data: { session: current() } }; },
              async signUp({email}) {
                if (email === 'outside-team@example.test') return { error: { code: 'email_address_not_authorized' } };
                return { data: { session: null } };
              },
              async resetPasswordForEmail() { return {}; },
              async signInWithPassword({email}) {
                const session = { user: { id: email, email } };
                sessionStorage.setItem('mock-student', JSON.stringify(session));
                callback('SIGNED_IN', session);
                return { data: { session } };
              },
              async updateUser({data}) {
                const session = current();
                session.user.user_metadata = data;
                sessionStorage.setItem('mock-student', JSON.stringify(session));
                callback('USER_UPDATED', session);
                return {};
              },
              async signOut() {
                sessionStorage.removeItem('mock-student');
                callback('SIGNED_OUT', null);
                return {};
              }
            },
            from() {
              const query = {
                select() { return this; },
                eq(_, student) { this.student = student; return this; },
                order() { return this; },
                range() { return this; },
                limit() { return this; },
                in(_, courses) { this.courses = courses; return this; },
                then(resolve, reject) { return this.read().then(resolve, reject); },
                async read() {
                  const response = await fetch('/test-progress?student=' + encodeURIComponent(this.student));
                  const data = await response.json();
                  return { data: data.filter(row => !this.courses || this.courses.includes(row.course_id)) };
                },
                async upsert(row) {
                  const response = await fetch('/test-progress', { method: 'POST', body: JSON.stringify(row) });
                  return response.json();
                }
              };
              return query;
            }
          };
        }
      `
    }));
    await context.route('**/test-progress*', (route) => {
      if (route.request().method() === 'POST') {
        const row = route.request().postDataJSON();
        const id = [row.student_id, row.course_id, row.lesson_id, row.section_id].join('|');
        rows.set(id, { ...rows.get(id), ...row });
        return route.fulfill({ json: {} });
      }
      const student = new URL(route.request().url()).searchParams.get('student');
      return route.fulfill({ json: [...rows.values()].filter(row => row.student_id === student) });
    });
    const signIn = async (email) => {
      await page.getByLabel('Email').fill(email);
      await page.getByLabel('Password', { exact: true }).fill('sample-password');
      await page.locator('#student-submit').click();
    };
    await page.goto(origin + '/rest.html#definition');
    await page.getByRole('button', { name: 'Mark Complete' }).click();
    await page.waitForURL('**/dashboard/?next=*');
    await page.getByRole('button', { name: 'Create account' }).click();
    await page.locator('#student-submit').click();
    assert.ok(await page.locator('#student-form-status').textContent());
    await page.getByLabel('Email').fill('outside-team@example.test');
    await page.getByLabel('Password', { exact: true }).fill('sample-password');
    await page.locator('#student-submit').click();
    await page.getByText(/Use a team email address/).waitFor();
    await page.getByLabel('Email').fill('student-a@example.test');
    await page.locator('#student-submit').click();
    await page.getByText('Check your email for the next step.').waitFor();
    await page.getByRole('button', { name: 'Forgot password' }).click();
    await page.locator('#student-submit').click();
    await page.getByText('Check your email for the next step.').waitFor();
    await page.locator('[data-mode=signin]').click();
    await signIn('student-a@example.test');
    await page.waitForURL('**/rest.html#definition');
    await page.getByRole('button', { name: 'Mark Complete' }).click();
    await page.getByRole('button', { name: 'Completed', exact: true }).waitFor();
    await page.reload();
    await page.getByRole('button', { name: 'Completed', exact: true }).waitFor();
    await page.goto(origin + '/api.html#definition');
    await page.getByRole('button', { name: 'Completed', exact: true }).waitFor();
    await page.goto(origin + '/');
    await page.locator('.student-account-menu summary').click();
    await page.locator('.student-account-panel').getByText('student-a@example.test').waitFor();
    const resume = page.getByRole('link', { name: 'Continue learning' });
    await page.waitForFunction(() => document.querySelector('[data-student-resume]').hash === '#definition');
    await checkLayout(page, 'signed-in homepage');
    await resume.click();
    await page.getByRole('button', { name: 'Completed', exact: true }).waitFor();
    await page.goto(origin + '/dashboard/');
    await page.getByText(/1 lessons complete/).waitFor();
    assert.match(await page.locator('#student-continue a').getAttribute('href'), /rest\.html#api-vs-ui$/);
    await page.locator('#student-profile-form').getByLabel('Display name').fill('Learner A');
    await page.getByRole('button', { name: 'Save profile' }).click();
    await page.getByRole('heading', { name: 'Welcome back, Learner A!' }).waitFor();
    await page.goto(origin + '/about.html');
    await page.locator('.student-account-menu summary').click();
    await page.locator('.student-account-panel').getByRole('button', { name: 'Sign out' }).click();
    await page.locator('.student-account-menu').waitFor({ state: 'detached' });
    await page.goto(origin + '/dashboard/');
    await signIn('student-b@example.test');
    await page.getByText(/0 lessons complete/).waitFor();
    await page.locator('#student-course-filter').selectOption('active');
    await page.getByText('No courses match this filter.').waitFor();
    await page.locator('#student-course-filter').selectOption('new');
    await page.locator('#student-course-search').fill('REST Assured');
    assert.equal(await page.locator('#student-courses article').count(), 1);
    await page.getByRole('button', { name: 'Learning menu' }).click();
    await page.locator('#student-nav').getByRole('link', { name: /Help & Support/ }).click();
    assert.equal(await page.locator('#student-nav').isVisible(), false);
    assert.equal(await page.getByRole('link', { name: 'Contact support' }).getAttribute('href'), 'mailto:support@testnova.in');
    await page.getByRole('button', { name: 'Search TestNova' }).click();
    await page.locator('[data-tn-search-input]').fill('automate your first API check');
    await page.getByRole('link', { name: /automate your first API check/i }).waitFor();
    await page.keyboard.press('Escape');
    assert.equal(await page.getByText('student-a@example.test').count(), 0);
    await checkLayout(page, 'student dashboard');
    await page.getByRole('button', { name: 'Sign out' }).click();
    await page.getByRole('button', { name: 'Continue with Google' }).click();
    await page.getByText(/Google OAuth client is configured/).waitFor();
    assert.equal(await page.getByRole('button', { name: 'Continue with phone' }).count(), 0);
  });
});
