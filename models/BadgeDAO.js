import pool from "@libs/db";

export class BadgeDAO {
    async getBadges() {
        const query = "SELECT * FROM badges";
        const [badges] = await pool.query(query);
        return badges;
    }
}
