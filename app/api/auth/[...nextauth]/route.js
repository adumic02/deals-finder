import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { UserDAO } from '@models/UserDAO';

const userDAO = new UserDAO();

export const authOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			async authorize(credentials) {
				const { username, password } = credentials;

				const users = await userDAO.findByUsername(username);

				if (!users || users.length === 0) {
					return null;
				}

				const user = users[0];
				const isValidPassword = await bcrypt.compare(password, user.password);

				if (!isValidPassword) {
					return null;
				}

				return {
					id: user.ID,
					name: user.username,
					email: user.email,
					role: user.role,
					picture: user.picture,
				};
			},
		}),
	],
	pages: {
		signIn: '/auth/login',
	},
	session: {
		jwt: true,
	},
	callbacks: {
		async session({ session, token }) {
			session.user.id = token.id;
			session.user.role = token.role;
			session.user.picture = token.picture;
			return session;
		},
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.role = user.role;
				token.picture = user.picture;
			}
			return token;
		},
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
