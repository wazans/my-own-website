## Student accounts

1. Create a Supabase project and apply [the migration](migrations/202611090001_student_progress.sql) with the SQL editor or Supabase CLI. Use a separate development project for testing.
2. In Authentication, enable Email and email confirmation. Set the minimum password length to 8 or higher and configure SMTP for confirmation and recovery messages.
3. Set the Site URL to your TestNova origin. Allow `https://www.testnova.in/dashboard/**` and the equivalent URL for any explicitly trusted development origin. Keep the trailing slash. Open confirmation and recovery links in the browser where the request started because the client uses PKCE.
4. Set `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` in Vercel for the intended environment. The endpoint accepts only the project's HTTPS `*.supabase.co` URL and a publishable key. Keep secret and service-role keys out of the frontend.
5. For optional Google sign-in, enable Google in Supabase Auth, configure the Google OAuth client and register the callback URL shown by Supabase. Set `SUPABASE_GOOGLE_ENABLED=true` in Vercel.
6. Test a preview first. Create and confirm two accounts, sign in, mark a lesson and subtopic complete, then verify the same progress in another browser. Check that an authenticated request using student A's session cannot select, insert, or update student B's rows. Exercise email recovery and sign-out before promoting the preview.

Existing anonymous browser progress has no verified owner, so this rollout starts account progress separately. Dashboard counts use the published course curriculum; locally authored lessons are outside account progress. Interview practice and scoring follow in the next feature.

Supabase’s built-in mailer sends only to organization members. For public email signups and recovery, configure custom SMTP and test delivery before launch.

Run `node scripts/build-dashboard-index.cjs` after changing a published curriculum to refresh dashboard counts and lesson links.
