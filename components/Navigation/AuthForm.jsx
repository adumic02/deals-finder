'use client';

import Toast, { notifyError, notifySuccess } from '@components/Toast';
import { Card, CardBody, CardHeader, Input, Button, Image, Badge, Tooltip } from '@nextui-org/react';
import { EditIcon } from '@public/icons/EditIcon';
import React, { useEffect, useState, useRef } from 'react';

export default function AuthForm({
	formTitle,
	email,
	setEmail,
	isInvalidEmail,
	username,
	setUsername,
	password,
	setPassword,
	role,
	error,
	success,
	buttonText,
	currentPictureUrl,
	onPictureChange,
	onSubmit,
}) {
	const [fileName, setFileName] = useState('');
	const fileInputRef = useRef(null);

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setFileName(file.name);
			onPictureChange(e);
		}
	};

	useEffect(() => {
		if (error) notifyError(error);
		if (success) notifySuccess(success);
	}, [error, success]);

	const handleImageClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	return (
		<div className='flex justify-center py-28'>
			<Card className='w-full md:w-3/5 lg:w-2/5 xl:w-1/3 p-5'>
				<CardHeader className='flex-col font-medium text-2xl'>{formTitle}</CardHeader>
				<CardBody>
					{formTitle === 'Korisnički podaci' && (
						<div className='flex justify-center mb-4'>
							<Badge
								isOneChar
								content={<EditIcon className='text-black' />}
								color='primary'
								shape='circle'
								placement='bottom-right'
								size='lg'
							>
								<Tooltip
									color='primary'
									showArrow
									closeDelay={0}
									content='Promijeni profilnu sliku'
									className='font-medium text-black'
									placement='right'
								>
									<img
										src={currentPictureUrl}
										alt='Slika profila'
										className='w-24 h-24 rounded-full cursor-pointer'
										onClick={handleImageClick}
									/>
								</Tooltip>
							</Badge>
							<Input type='file' ref={fileInputRef} className='hidden' onChange={handleFileChange} />
						</div>
					)}

					<form className='w-full' onSubmit={onSubmit}>
						{(formTitle === 'Registracija' || formTitle === 'Korisnički podaci') && (
							<div>
								<Input
									isRequired
									type='email'
									label='Email'
									value={email}
									onValueChange={setEmail}
									isInvalid={isInvalidEmail}
									errorMessage={isInvalidEmail ? 'Unesite ispravnu email adresu!' : ''}
									className='py-2'
									{...(formTitle === 'Korisnički podaci' && {
										isDisabled: true,
										isRequired: false,
									})}
								/>
							</div>
						)}
						<div>
							<Input
								isRequired
								type='text'
								label='Korisničko ime'
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								className='py-2'
								{...(formTitle === 'Korisnički podaci' && {
									isRequired: false,
								})}
							/>
						</div>
						<div>
							<Input
								autoComplete='password'
								isRequired
								type='password'
								label='Lozinka'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className='py-2'
								{...(formTitle === 'Korisnički podaci' && {
									isRequired: false,
								})}
							/>
						</div>
						{formTitle === 'Registracija' && (
							<div className='flex flex-col py-2'>
								<div className='h-32 relative bg-content2 rounded-xl hover:bg-content3 flex items-center justify-center cursor-pointer'>
									<input
										type='file'
										onChange={handleFileChange}
										className='absolute w-full h-full opacity-0 cursor-pointer'
									/>
									{fileName ? (
										<span className='text-content5 text-center'>{fileName}</span>
									) : (
										<span className='text-content4 text-center'>
											Pritisni za upload profilne slike
											<br />
											SVG, PNG, JPG or GIF
										</span>
									)}
								</div>
							</div>
						)}
						{formTitle === 'Korisnički podaci' && (
							<div>
								<Input type='text' label='Uloga' value={role} isDisabled className='py-2' />
							</div>
						)}
						<div className='flex justify-end'>
							<Button type='submit' className='w-fit mt-4' color='primary' variant='flat'>
								{buttonText}
							</Button>
						</div>
					</form>
				</CardBody>
				<Toast />
			</Card>
		</div>
	);
}
