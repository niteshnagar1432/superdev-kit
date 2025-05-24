enum TruncateMode {
    WORDS = 'words',
    LETTERS = 'letters',
}

// Truncate by words or letters
function truncateText(
    text: string,
    limit: number,
    mode: TruncateMode = TruncateMode.WORDS,
    suffix: string = '...'
): string {
    if (!text) return '';

    switch (mode) {
        case TruncateMode.LETTERS:
            return text.length <= limit ? text : text.slice(0, limit) + suffix;

        case TruncateMode.WORDS:
            const words = text.trim().split(/\s+/);
            return words.length <= limit
                ? text
                : words.slice(0, limit).join(' ') + suffix;

        default:
            return text;
    }
}

// Capitalize first letter
function capitalizeFirst(text: string): string {
    if (!text) return '';
    return text[0].toUpperCase() + text.slice(1);
}

// Convert to title case
function toTitleCase(text: string): string {
    return text
        .toLowerCase()
        .split(' ')
        .map(word => capitalizeFirst(word))
        .join(' ');
}

// Remove extra spaces
function removeExtraSpaces(text: string): string {
    return text.trim().replace(/\s+/g, ' ');
}

// Reverse a string
function reverseString(text: string): string {
    return text.split('').reverse().join('');
}

// Count words
function countWords(text: string): number {
    return text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
}

// Count letters (excluding spaces)
function countLetters(text: string): number {
    return text.replace(/\s/g, '').length;
}

export {
    truncateText,
    TruncateMode,
    capitalizeFirst,
    toTitleCase,
    removeExtraSpaces,
    reverseString,
    countWords,
    countLetters,
};