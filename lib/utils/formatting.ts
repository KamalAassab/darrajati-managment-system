import { Language } from "@/types"

/**
 * Formats the price per day unit based on language
 * @param language - The current language ('en' | 'fr' | 'ar')
 * @returns The formatted unit string
 */
export function formatPriceUnit(language: Language): string {
    if (language === 'ar') {
        return 'درهم/اليوم'
    }
    return 'DH/day'
}

/**
 * Formats the currency unit (DH) based on language
 * @param language - The current language ('en' | 'fr' | 'ar')
 * @returns The formatted currency string
 */
export function formatCurrency(language: Language): string {
    if (language === 'ar') {
        return 'درهم'
    }
    return 'DH'
}

/**
 * Formats the speed unit based on language
 * @param language - The current language ('en' | 'fr' | 'ar')
 * @returns The formatted unit string
 */
export function formatSpeedUnit(language: Language): string {
    if (language === 'ar') {
        return 'كم/س'
    }
    return 'KM/H'
}

/**
 * Formats a speed value by replacing the unit based on language
 * @param speedString - The speed string (e.g., "45 KM/H")
 * @param language - The current language ('en' | 'fr' | 'ar')
 * @returns The formatted speed string
 */
export function formatSpeed(speedString: string, language: Language): string {
    const unit = formatSpeedUnit(language)
    // Extract the number from the speed string
    const speedNumber = speedString.replace(/[^\d]/g, '')
    return `${speedNumber} ${unit}`
}
