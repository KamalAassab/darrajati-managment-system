import postgres from 'postgres';

// Initialize the Postgres client
const sql = postgres(process.env.DATABASE_URL!);

/**
 * Execute a parameterized SQL query
 * 
 * @param text - SQL query string
 * @param params - Array of parameter values
 * @returns Object with rows array
 */
export async function query<T = Record<string, unknown>>(
    text: string,
    params?: any[]
): Promise<{ rows: T[] }> {
    try {
        // Use unsafe for raw query strings with parameters
        const rows = await sql.unsafe(text, params);
        return { rows: Array.from(rows) as unknown as T[] };
    } catch (error: any) {
        console.error('Database query error:', error);
        throw error;
    }
}

/**
 * Export the sql tagged template function
 */
export { sql };
