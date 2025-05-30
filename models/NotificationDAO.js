import pool from "@libs/db";

export class NotificationDAO {
    async addNotification(notificationData) {
        const query =
            "INSERT INTO notifications (game_id, user_id, price) VALUES (?, ?, ?)";
        const values = [
            notificationData.game_id,
            notificationData.user_id,
            parseFloat(notificationData.price).toFixed(2),
        ];
        const wishlistItem = await pool.query(query, values);
        return wishlistItem;
    }

    async deleteNotification(gameID, userID) {
        const query =
            "DELETE FROM notifications WHERE game_id = ? AND user_id = ?";

        const values = [gameID, userID];
        const wishlistItem = await pool.query(query, values);
        return wishlistItem;
    }

    async checkNotification(gameID, userID) {
        const query =
            "SELECT * FROM notifications WHERE game_id = ? AND user_id = ?";
        const values = [gameID, userID];
        const [rows] = await pool.query(query, values);
        const isAlerted = rows.length > 0;
        return isAlerted;
    }
}
