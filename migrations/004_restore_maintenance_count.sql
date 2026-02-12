-- Restore maintenance_count column to scooters table
ALTER TABLE scooters ADD COLUMN IF NOT EXISTS maintenance_count INTEGER DEFAULT 0;
