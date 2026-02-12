-- Drop maintenance_count column from scooters table
ALTER TABLE scooters DROP COLUMN IF EXISTS maintenance_count;
