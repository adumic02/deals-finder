'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AuthForm from '@components/Navigation/AuthForm';
import { updateUser } from '@utils/fetchManager';

export default function Profile() {
	const { data: session } = useSession();
	const router = useRouter();

	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [role, setRole] = useState('');
	const [picture, setPicture] = useState(null);
	const [currentPictureUrl, setCurrentPictureUrl] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	useEffect(() => {
		if (session) {
			setUsername(session.user.name);
			setEmail(session.user.email);
			setRole(session.user.role);
			setCurrentPictureUrl(session.user.image);
		}
	}, [session]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		setSuccess('');

		const formData = new FormData();
		formData.append('username', username);
		formData.append('password', password);
		if (picture !== null) {
			formData.append('picture', picture);
		}

		try {
			const { res, data } = await updateUser(formData);

			if (!res.ok) {
				setError(data.error);
			} else {
				setSuccess(data.message);

				await signOut({ redirect: false });
				setTimeout(() => {
					router.push('/auth/login');
				}, 1000);
			}
		} catch (error) {
			console.error('Pogreška prilikom ažuriranja korisničkih podataka:', error);
		}
	};

	const handlePictureChange = (e) => {
		const file = e.target.files[0];

		if (file) {
			const reader = new FileReader();
			const image = new Image();

			reader.onload = (event) => {
				image.src = event.target.result;
				image.onload = () => {
					if (image.width > 500 || image.height > 500) {
						setError('Slika ne smije biti veća od 500x500px!');
					} else {
						setError('');
						setPicture(file);
						setCurrentPictureUrl(URL.createObjectURL(file));
					}
				};
			};

			reader.readAsDataURL(file);
		}
	};

	return (
		<AuthForm
			formTitle='Korisnički podaci'
			email={email}
			username={username}
			setUsername={setUsername}
			setPassword={setPassword}
			role={role}
			error={error}
			success={success}
			buttonText='Spremi promjene'
			currentPictureUrl={currentPictureUrl}
			onPictureChange={handlePictureChange}
			onSubmit={handleSubmit}
		/>
	);
}
