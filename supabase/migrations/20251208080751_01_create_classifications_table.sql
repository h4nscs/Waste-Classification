/*
  # Create Classifications Table

  1. New Tables
    - `classifications`
      - `id` (uuid, primary key)
      - `image_path` (text, path to image in storage)
      - `predicted_class` (text, one of: metal, glass, biological, paper, battery, trash, cardboard, shoes, clothes, plastic)
      - `confidence` (numeric, 0-100)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `classifications` table
    - Add public read policy to display classifications
    - Add policy for inserting new classifications
*/

CREATE TABLE IF NOT EXISTS classifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_path text NOT NULL,
  predicted_class text NOT NULL,
  confidence numeric NOT NULL CHECK (confidence >= 0 AND confidence <= 100),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE classifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view classifications"
  ON classifications
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert classifications"
  ON classifications
  FOR INSERT
  WITH CHECK (true);

CREATE INDEX idx_classifications_created_at ON classifications(created_at DESC);
CREATE INDEX idx_classifications_class ON classifications(predicted_class);