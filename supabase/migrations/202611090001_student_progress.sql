create table public.student_progress (
  student_id uuid not null references auth.users(id) on delete cascade,
  course_id text not null check (length(course_id) between 1 and 80),
  lesson_id text not null check (length(lesson_id) between 1 and 180),
  section_id text not null default '' check (length(section_id) <= 180),
  course_title text not null check (length(course_title) between 1 and 200),
  lesson_title text not null check (length(lesson_title) between 1 and 240),
  lesson_url text not null check (length(lesson_url) <= 400 and lesson_url ~ '^/[a-z0-9-]+\.html([?#][^[:space:]]*)?$'),
  lesson_count integer not null check (lesson_count between 1 and 10000),
  last_visited_at timestamptz not null default now(),
  completed_at timestamptz,
  primary key (student_id, course_id, lesson_id, section_id)
);

create index student_progress_recent
  on public.student_progress (student_id, last_visited_at desc);

alter table public.student_progress enable row level security;
revoke all on public.student_progress from anon, authenticated;
grant select, insert, update on public.student_progress to authenticated;

create policy "Students read their progress"
  on public.student_progress for select to authenticated
  using ((select auth.uid()) = student_id);

create policy "Students create their progress"
  on public.student_progress for insert to authenticated
  with check ((select auth.uid()) = student_id);

create policy "Students update their progress"
  on public.student_progress for update to authenticated
  using ((select auth.uid()) = student_id)
  with check ((select auth.uid()) = student_id);
