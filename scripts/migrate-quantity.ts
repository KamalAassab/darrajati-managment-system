
import { neon } from '@neondatabase/serverless';
import fs from 'fs';
import path from 'path';

// Load .env.local manually
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf8');
    envConfig.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length > 0) {
            const value = valueParts.join('=').trim().replace(/^["']|["']$/g, '');
            process.env[key.trim()] = value;
        }
    });
}

const sql = neon(process.env.DATABASE_URL!);

async function migrate() {
    try {
        console.log('Starting migration: Add quantity to scooters table...');

        // Add quantity column if it doesn't exist, default to 1
        await sql`
            ALTER TABLE scooters 
            ADD COLUMN IF NOT EXISTS quantity INTEGER NOT NULL DEFAULT 1
        `;

        console.log('Migration successful: Added quantity column.');
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

migrate();
