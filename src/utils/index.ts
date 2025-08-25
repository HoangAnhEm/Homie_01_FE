export const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export function isValidVerifyChar(value: string) {
    return /^[0-9a-zA-Z]?$/.test(value);
}