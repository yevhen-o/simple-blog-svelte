import { writable, derived } from 'svelte/store';
import type { User, AuthError } from '@supabase/supabase-js';
import sb from '../services/supabase';
import { hasAuthorProfile } from '@src/services/httpClient';

interface LoadingState {
	isLoading: boolean;
}

interface AuthState {
	user: User | null;
	isAuthor: boolean | null;
	initState: LoadingState;
	loginState: LoadingState;
	signupState: LoadingState;
	logoutState: LoadingState;
}

const initialLoading = { isLoading: false };

// Create writable stores for each piece of state
const user = writable<User | null>(null);
const isAuthor = writable<boolean | null>(null);
const initState = writable<LoadingState>(initialLoading);
const loginState = writable<LoadingState>(initialLoading);
const signupState = writable<LoadingState>(initialLoading);
const logoutState = writable<LoadingState>(initialLoading);

// Create derived store for the combined auth state
export const authStore = derived<
	[
		typeof user,
		typeof isAuthor,
		typeof initState,
		typeof loginState,
		typeof signupState,
		typeof logoutState
	],
	AuthState
>(
	[user, isAuthor, initState, loginState, signupState, logoutState],
	([$user, $isAuthor, $initState, $loginState, $signupState, $logoutState]) => ({
		user: $user,
		isAuthor: $isAuthor,
		initState: $initState,
		loginState: $loginState,
		signupState: $signupState,
		logoutState: $logoutState
	})
);

// Helper functions to update the stores
const updateUser = (newUser: User | null) => user.set(newUser);
const updateIsAuthor = (newIsAuthor: boolean | null) => isAuthor.set(newIsAuthor);
const updateInitState = (newInitState: LoadingState) => initState.set(newInitState);
const updateLoginState = (newLoginState: LoadingState) => loginState.set(newLoginState);
const updateSignupState = (newSignupState: LoadingState) => signupState.set(newSignupState);
const updateLogoutState = (newLogoutState: LoadingState) => logoutState.set(newLogoutState);

// Actions
const checkIsAuthor = async (userId: string) => {
	updateInitState({ isLoading: true });
	const response = await hasAuthorProfile(userId);
	updateIsAuthor(response);
	updateInitState({ isLoading: false });
};

const login = async (
	email: string,
	password: string
): Promise<{ data: { user: User | null }; error: AuthError | null }> => {
	updateLoginState({ isLoading: true });
	const response = await sb.auth.signInWithPassword({
		email,
		password
	});
	updateLoginState({ isLoading: false });
	if (response.data.user) {
		updateUser(response.data.user);
		await checkIsAuthor(response.data.user.id);
	}
	return response;
};

const signUp = async (
	email: string,
	password: string
): Promise<{ data: { user: User | null }; error: AuthError | null }> => {
	updateSignupState({ isLoading: true });
	const response = await sb.auth.signUp({
		email,
		password
	});
	updateSignupState({ isLoading: false });
	if (response.data.user) {
		updateUser(response.data.user);
	}
	return response;
};

const logOut = async () => {
	updateLogoutState({ isLoading: true });
	await sb.auth.signOut();
	updateLogoutState({ isLoading: false });
	updateUser(null);
	updateIsAuthor(null);
};

const initAuth = () => {
	sb.auth.getSession().then((session) => {
		const currentUser = session.data.session?.user ?? null;
		updateUser(currentUser);
		if (currentUser) {
			checkIsAuthor(currentUser.id);
		}
	});

	const { data: authListener } = sb.auth.onAuthStateChange((_event, session) => {
		updateUser(session?.user ?? null);
	});
	return authListener.subscription.unsubscribe;
};

// Export the actions
export const authActions = {
	checkIsAuthor,
	login,
	signUp,
	logOut,
	initAuth
};

initAuth();
