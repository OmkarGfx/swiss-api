-- Migration to create birth_charts table for caching astrology birth chart results

create table if not exists birth_charts (
  id bigint generated always as identity primary key,
  cache_key text unique not null,
  birth_datetime timestamptz not null,
  location text not null,
  positions jsonb not null,
  created_at timestamptz default now()
);
