export function formatMAD(amount: number): string {
    const formatted = new Intl.NumberFormat('fr-MA', {
        style: 'currency',
        currency: 'MAD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);

    // Replace period with space for thousand separator
    return formatted.replace(/\./g, ' ');
}

export function formatDate(date: string): string {
    return new Date(date).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export function formatDateShort(date: string): string {
    return new Date(date).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
    });
}

export function calculateRentalPrice(dailyPrice: number, startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return Math.round(dailyPrice * days);
}

export function isOverdue(endDate: string): boolean {
    return new Date(endDate) < new Date() && new Date().toDateString() !== new Date(endDate).toDateString();
}
