export const addPluralEnding = (length: number) => (length > 1) && 's';

export const capitalize = (word: string) => word[0].toUpperCase() + word.slice(1);

export const offerRatingInPercentage = (rating: number) => String(Math.round(rating) / 5 * 100);
