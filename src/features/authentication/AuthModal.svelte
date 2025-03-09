<script lang="ts">
	import Modal from '@src/components/Modal.svelte';
	import LoginSignupForm from './LoginSignUpForm.svelte';
	export let onClose: () => void;
</script>

<Modal title={'Authentication'} {onClose}>
	<LoginSignupForm onAuthenticate={onClose} />
</Modal>
