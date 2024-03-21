import { customAlphabet } from 'nanoid';

export function generateSlug(length = 8): string {
    
    return customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", length)()
}