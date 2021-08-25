import React, { useState } from 'react';
import AuthPresenter from './AuthPresenter';
import useInput from '../../Hooks/useInput';
import { useMutation } from 'react-apollo-hooks';
import { CONFIRM_SECRET, CREATE_ACCOUNT, LOCAL_LOG_IN, LOG_IN } from './AuthQueries';
import { toast, ToastContainer } from 'react-toastify';

export default () => {
	const [action, setAction] = useState('logIn');
	const username = useInput('');
	const firstName = useInput('');
	const lastName = useInput('');
	const email = useInput('');
	const secret = useInput('');
	const [requestSecretMutation] = useMutation(LOG_IN, {
		variables: { email: email.value },
	});

	const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
		variables: {
			email: email.value,
			username: username.value,
			firstName: firstName.value,
			lastName: lastName.value,
		},
	});

	const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
		variables: {
			email: email.value,
			secret: secret.value,
		},
	});

	const [localLogInMutation] = useMutation(LOCAL_LOG_IN);

	const onSubmit = async (e) => {
		e.preventDefault();
		if (action === 'logIn') {
			if (email.value !== '') {
				try {
					const {
						data: { requestSecret },
					} = await requestSecretMutation();
					if (!requestSecret) {
						toast.error("You don't have an account yet, create one");
						setTimeout(() => setAction('signUp'), 2000);
					} else {
						toast.success('Check your inbox for your login secret');
						setAction('confirm');
					}
				} catch {
					toast.error("Can't request secret, try again");
				}
			} else {
				toast.error('Email is required');
			}
		} else if (action === 'signUp') {
			if (!!email.value && !!username.value && !!firstName.value && !!lastName.value) {
				try {
					const {
						data: { createAccount },
					} = await createAccountMutation();
					if (!createAccount) {
						toast.error("Can't create account, try again");
					} else {
						toast.success('Account created! Log in now');
						setTimeout(() => setAction('logIn'), 3000);
					}
				} catch (e) {
					toast.error(e.message);
				}
			} else {
				toast.error('All values are required');
			}
		} else if (action === 'confirm') {
			if (secret.value !== '') {
				try {
					const {
						data: { confirmSecret: token },
					} = await confirmSecretMutation();
					console.log(token);
					if (!!token) {
						localLogInMutation({ variables: { token } });
					} else {
						throw Error('EmptyToken');
					}
				} catch {
					toast.error("Can't confirm secret");
				}
			}
		}
	};

	return (
		<AuthPresenter
			setAction={setAction}
			action={action}
			username={username}
			firstName={firstName}
			lastName={lastName}
			email={email}
			onSubmit={onSubmit}
			secret={secret}
		/>
	);
};
