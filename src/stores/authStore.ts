import { writable } from 'svelte/store';
import type { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@src/services/firebase/firebaseConfig';

// Create a writable store to hold the user data
export const user = writable<User | null>(null);

// Listen for auth state changes
onAuthStateChanged(auth, (currentUser) => {
	user.set(currentUser);
});
