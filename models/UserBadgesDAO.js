import pool from "@libs/db";

export class UserBadgesDAO {
    async getUserBadges(userID) {
        const query = "SELECT * FROM user_badges WHERE user_id = ?";
        const [badges] = await pool.query(query, [userID]);
        return badges;
    }

    async addUserBadge(userID, badgeID) {
        const query =
            "INSERT INTO user_badges (user_id, badge_id) VALUES (?, ?)";
        const values = [userID, badgeID];
        const badge = await pool.query(query, values);
        return badge;
    }
}
