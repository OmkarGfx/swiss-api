create table birth_charts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users,
  birth_date date,
  birth_time time,
  lat double precision,
  lon double precision,
  tzid text,
  chart jsonb,
  created_at timestamp default now()
);
