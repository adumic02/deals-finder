import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { UserDAO } from '@models/UserDAO';
import { put } from '@vercel/blob';

export async function POST(req) {
	try {
		const formData = await req.formData();
		const username = formData.get('username');
		const password = formData.get('password');
		const email = formData.get('email');
		const role = formData.get('role');
		const picture = formData.get('picture');

		const missingField = !email
			? 'E-mail je obavezan!'
			: !username
			? 'Korisničko ime je obavezno!'
			: !password
			? 'Lozinka je obavezna!'
			: null;

		if (missingField) {
			return NextResponse.json({ error: missingField }, { status: 400 });
		}

		const userDAO = new UserDAO();
		const existingUser = await userDAO.findByUsername(username);
		const existingEmail = await userDAO.findByEmail(email);

		if (existingUser.length > 0 || existingEmail.length > 0) {
			return NextResponse.json(
				{ error: 'Korisnik pod navedenim korisničkim imenom ili e-mailom već postoji!' },
				{ status: 400 }
			);
		}

		// Default avatar URL
		let picturePath = 'https://deals-finder.vercel.app/images/profiles/default-avatar.png';

		if (picture !== null) {
			const buffer = Buffer.from(await picture.arrayBuffer());
			const pictureName = picture.name.replaceAll(' ', '_');
			const uniqueName = `${Date.now()}_${pictureName}`;

			const blob = await put(uniqueName, buffer, {
				access: 'public',
				token: process.env.BLOB_READ_WRITE_TOKEN,
			});

			picturePath = blob.url;
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		await userDAO.createUser({
			username,
			email,
			password: hashedPassword,
			role,
			picturePath,
		});

		return NextResponse.json({ message: 'Registracija uspješna!' }, { status: 201 });
	} catch (error) {
		console.error('Interna pogreška tijekom registracije: ', error);
		return NextResponse.json({ error: 'Interna pogreška tijekom registracije!', message: error }, { status: 500 });
	}
}
