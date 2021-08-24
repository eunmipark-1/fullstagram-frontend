import React, { useState } from 'react';
import AuthPresenter from './AuthPresenter';
import useInput from '../../Hooks/useInput';
import { useMutation } from 'react-apollo-hooks';
import { CREATE_ACCOUNT, LOG_IN } from './AuthQueries';
import { toast } from 'react-toastify';

export default () => {
	const [action, setAction] = useState('logIn');
	const username = useInput('');
	const firstName = useInput('');
	const lastName = useInput('');
	const email = useInput('mia@naver.com');
	const [requestSecret, { data, loading, error }] = useMutation(LOG_IN, {
		update: (_, { data }) => {
			const { requestSecret } = data;
			if (!requestSecret) {
				toast.error("You don't have an account yet, create one");
				setTimeout(() => setAction('signUp'), 3000);
			}
		},
		variables: { email: email.value },
	});

	const createAccount = useMutation(CREATE_ACCOUNT, {
		variables: {
			email: email.value,
			username: username.value,
			firstName: lastName.value,
			lastName: lastName.value,
		},
	});
	const onSubmit = (e) => {
		e.preventDefault();
		if (action === 'logIn') {
			if (email !== '') {
				requestSecret();
			} else {
				toast.error('Email is required');
			}
		} else if (action === 'signUp') {
			if (email.value !== '' && username.value !== '' && lastName.value !== '' && lastName.value !== '') {
				createAccount();
			} else {
				toast.error('All field are required');
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
		/>
	);
};
