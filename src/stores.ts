import { writable } from 'svelte/store';
export const authenticated = writable(null);
export const idToken = writable('');