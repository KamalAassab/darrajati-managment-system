import { z } from 'zod';

export type ActionState<T = void> = {
    success: boolean;
    message?: string;
    data?: T;
    errors?: Record<string, string[]>;
    fieldErrors?: Record<string, string[]>;
};

export async function handleActionError(error: unknown): Promise<ActionState<any>> {
    console.error('Action Error:', error);

    if (error instanceof z.ZodError) {
        return {
            success: false,
            message: 'Validation failed',
            fieldErrors: error.flatten().fieldErrors as Record<string, string[]>,
        };
    }

    if (error instanceof Error) {
        return {
            success: false,
            message: error.message,
        };
    }

    return {
        success: false,
        message: 'An unexpected error occurred',
    };
}
