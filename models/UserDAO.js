import pool from "@libs/db";

export class UserDAO {
    async findByUsername(username) {
        const [user] = await pool.query(
            "SELECT * FROM users WHERE username = ?",
            [username]
        );
        return user;
    }

    async findByEmail(email) {
        const [user] = await pool.query("SELECT * FROM users WHERE email = ?", [
            email,
        ]);
        return user;
    }

    async createUser({ username, email, password, role, picturePath }) {
        let query = "INSERT INTO users (username, email, password, role";
        let values = [username, email, password, role];

        if (picturePath) {
            query += ", picture) VALUES (?, ?, ?, ?, ?)";
            values.push(picturePath);
        } else {
            query += ") VALUES (?, ?, ?, ?)";
        }

        return await pool.query(query, values);
    }

    async updateUser(id, updateFields) {
        let query = "UPDATE users SET ";
        const values = [];

        if (updateFields.username) {
            query += "username = ?, ";
            values.push(updateFields.username);
        }

        if (updateFields.password) {
            query += "password = ?, ";
            values.push(updateFields.password);
        }

        if (updateFields.picturePath) {
            query += "picture = ?, ";
            values.push(updateFields.picturePath);
        }

        query = query.slice(0, -2);

        query += " WHERE ID = ?";
        values.push(id);

        return await pool.query(query, values);
    }
}
