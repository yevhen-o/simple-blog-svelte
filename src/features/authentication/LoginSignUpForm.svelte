<script lang="ts">
	import { z } from 'zod';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-zod';

	import Button from '@src/components/Button.svelte';
	import { authActions } from '@src/stores/authStore';
	import InputField from '@src/components/form/InputField.svelte';

	export let onAuthenticate: () => void;
	let isSubmitting = false;
	let isLogin = true;

	const authValidationSchema = z.object({
		email: z.string().email(),
		password: z.string().min(6).max(256)
	});
	type AuthInterface = z.infer<typeof authValidationSchema>;
	let touchedFields: Partial<Record<keyof AuthInterface, boolean>> = {};

	// Create form with real-time validation
	const { form, errors, data, setTouched, isValid, touched } = createForm({
		extend: validator({ schema: authValidationSchema }),
		validateSchema: authValidationSchema,
		onChange: true,
		onInput: true,
		onSubmit: async (values: AuthInterface) => {
			try {
				isSubmitting = true;
				if (isLogin) {
					await authActions.login(values.email, values.password);
				} else {
					await authActions.signUp(values.email, values.password);
				}
				onAuthenticate();
			} catch (error) {
				if (error instanceof Error) {
					alert(error.message);
				}
			} finally {
				isSubmitting = false;
			}
		}
	});

	const handleBlur = (e: FocusEvent) => {
		if (!(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) return;

		touchedFields = {
			...touchedFields,
			[e.target.name]:
				typeof touchedFields[e.target.name as keyof AuthInterface] === 'undefined' ? false : true
		};
	};
</script>

<div class="login-form__wrapper" style="min-width: 330px">
	<h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
	<form use:form>
		<div class="login-form__fields">
			<InputField
				name="email"
				label="Email"
				bind:value={$data.email}
				on:blur={handleBlur}
				isTouched={touchedFields.email}
				error={$errors?.email?.[0]}
			/>
			<InputField
				name="password"
				label="Password"
				type="password"
				bind:value={$data.password}
				on:blur={handleBlur}
				isTouched={touchedFields.password}
				error={$errors?.password?.[0]}
			/>

			<Button
				isPrimary
				type="submit"
				class="post-form__button"
				disabled={!$isValid || isSubmitting}
			>
				{isSubmitting ? 'Submitting' : isLogin ? 'Login' : 'Sign Up'}
			</Button>
		</div>
	</form>
	<center>
		<Button isFlat on:click={() => (isLogin = !isLogin)}>
			{isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
		</Button>
	</center>
</div>

<style lang="scss">
	.login-form {
		&__fields {
			display: flex;
			flex-direction: column;
			gap: var(--spacer-df);
		}
	}
</style>
