import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { UserDAO } from '@models/UserDAO';
import { getServerSession } from 'next-auth';
import { authOptions } from '@app/api/auth/[...nextauth]/route';
import { put } from '@vercel/blob';

export async function PUT(req) {
	const session = await getServerSession(authOptions);

	if (!session) {
		return NextResponse.json({ error: 'Pristup zabranjen!' }, { status: 401 });
	}

	try {
		const formData = await req.formData();
		const username = formData.get('username');
		const password = formData.get('password');
		const picture = formData.get('picture');

		const userDAO = new UserDAO();
		const existingUser = await userDAO.findByUsername(username);

		if (existingUser.length > 0 && existingUser[0].ID !== session.user.id) {
			return NextResponse.json(
				{
					error: 'Navedeno korisničko ime je zauzeto.',
				},
				{ status: 400 }
			);
		}

		let picturePath = null;
		if (picture !== null) {
			const buffer = Buffer.from(await picture.arrayBuffer());
			const pictureName = picture.name.replaceAll(' ', '_');
			const uniqueName = Date.now() + '_' + pictureName;

			const blob = await put(uniqueName, buffer, {
				access: 'public',
				token: process.env.BLOB_READ_WRITE_TOKEN,
			});

			picturePath = blob.url;
		}

		const updateFields = {};
		if (username) updateFields.username = username;
		if (password) updateFields.password = await bcrypt.hash(password, 10);
		if (picturePath) updateFields.picturePath = picturePath;

		if (Object.keys(updateFields).length > 0) {
			await userDAO.updateUser(session.user.id, updateFields);
		}

		return NextResponse.json(
			{
				message: 'Ažuriranje korisničkih podataka uspješno, potrebna ponovna prijava!',
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error('Interna pogreška tijekom ažuriranja korisničkih podataka: ');
		return NextResponse.json(
			{ error: 'Interna pogreška tijekom ažuriranja korisničkih podataka!', message: error },
			{ status: 500 }
		);
	}
}
