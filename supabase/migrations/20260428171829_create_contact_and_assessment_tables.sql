/*
  # Create contact and assessment tables

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `firma` (text, not null)
      - `rolle` (text)
      - `email` (text, not null)
      - `telefon` (text)
      - `nachricht` (text, not null)
      - `created_at` (timestamptz, default now())
    - `assessment_submissions`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `firma` (text, not null)
      - `email` (text, not null)
      - `mitarbeitende` (text)
      - `endpoints` (text)
      - `server` (text)
      - `cloud` (text)
      - `security_tools` (text[])
      - `need_24_7` (text)
      - `branche` (text)
      - `compliance` (text[])
      - `created_at` (timestamptz, default now())

  2. Security
    - Enable RLS on both tables
    - Add policies for service role to insert and read
    - No public access - all operations through edge functions with service role
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  firma text NOT NULL,
  rolle text DEFAULT '',
  email text NOT NULL,
  telefon text DEFAULT '',
  nachricht text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can insert contact submissions"
  ON contact_submissions FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can read contact submissions"
  ON contact_submissions FOR SELECT
  TO service_role
  USING (true);

CREATE TABLE IF NOT EXISTS assessment_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  firma text NOT NULL,
  email text NOT NULL,
  mitarbeitende text DEFAULT '',
  endpoints text DEFAULT '',
  server text DEFAULT '',
  cloud text DEFAULT '',
  security_tools text[] DEFAULT '{}',
  need_24_7 text DEFAULT '',
  branche text DEFAULT '',
  compliance text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE assessment_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can insert assessment submissions"
  ON assessment_submissions FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can read assessment submissions"
  ON assessment_submissions FOR SELECT
  TO service_role
  USING (true);
