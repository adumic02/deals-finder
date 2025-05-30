import pool from "@libs/db";

export class CommentDAO {
    async getComments(gameID) {
        const query = `SELECT c.id, c.text, c.rating, c.date, c.user_id, c.game_id, u.username, u.picture FROM comments c JOIN users u ON c.user_id = u.id WHERE c.game_id = ? ORDER BY c.date DESC`;
        const [comments] = await pool.query(query, [gameID]);
        return comments;
    }

    async getCommentsNumberByUserId(userID) {
        const query = `SELECT COUNT(*) AS comments_number FROM comments WHERE user_id = ?`;
        const [commentsNumber] = await pool.query(query, [userID]);
        return commentsNumber;
    }

    async addComment(commentData) {
        const query =
            "INSERT INTO comments (text, rating, date, game_id, user_id) VALUES (?, ?, ?, ?, ?)";
        const values = [
            commentData.text,
            commentData.rating,
            commentData.date,
            commentData.gameID,
            commentData.userID,
        ];
        const comment = await pool.query(query, values);
        return comment;
    }

    async removeComment(commentID, userID) {
        const query = "DELETE FROM comments WHERE id = ? AND user_id = ?";
        const comment = await pool.query(query, [commentID, userID]);
        return comment;
    }
}
