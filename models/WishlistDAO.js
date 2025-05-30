import pool from "@libs/db";

export class WishlistDAO {
    async getWishlist(userID) {
        const query =
            "SELECT g.id, g.title, g.thumb, g.deal_id, g.sale_price, g.normal_price, g.savings, g.store_id, s.name, s.logo FROM wishlist w JOIN games g ON w.game_id = g.id JOIN stores s ON g.store_id = s.id WHERE w.user_id = ? ORDER BY g.title";
        const values = [userID];
        const [rows] = await pool.query(query, values);
        return rows;
    }

    async getWishlistNumberByUserId(userID) {
        const query = `SELECT COUNT(*) AS wishlist_number FROM wishlist WHERE user_id = ?`;
        const [wishlistNumber] = await pool.query(query, [userID]);
        return wishlistNumber;
    }

    async addToWishlist(gameID, userID) {
        const query = "INSERT INTO wishlist (game_id, user_id) VALUES (?, ?)";
        const values = [gameID, userID];
        const wishlistItem = await pool.query(query, values);
        return wishlistItem;
    }

    async removeFromWishlist(gameID, userID) {
        const query = "DELETE FROM wishlist WHERE game_id = ? AND user_id = ?";
        const values = [gameID, userID];
        const wishlistItem = await pool.query(query, values);
        return wishlistItem;
    }

    async checkWishlist(gameID, userID) {
        const query =
            "SELECT * FROM wishlist WHERE game_id = ? AND user_id = ?";
        const values = [gameID, userID];
        const [rows] = await pool.query(query, values);
        const isWishlisted = rows.length > 0;
        return isWishlisted;
    }
}
