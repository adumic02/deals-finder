import pool from "@libs/db";

export class GameDAO {
    async getGames() {
        const query = "SELECT * FROM games";
        const [games] = await pool.query(query);
        return games;
    }

    async addGame(gameID, gameData) {
        const query =
            "INSERT INTO games (id, title, thumb, deal_id, sale_price, normal_price, savings, store_ID) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        const values = [
            gameID,
            gameData.info.title,
            gameData.info.thumb,
            gameData.deals[0].dealID,
            parseFloat(gameData.deals[0].price).toFixed(2),
            parseFloat(gameData.deals[0].retailPrice).toFixed(2),
            parseFloat(gameData.deals[0].savings).toFixed(2),
            gameData.deals[0].storeID,
        ];
        const game = await pool.query(query, values);
        return game;
    }

    async updateGame(gameID, gameData) {
        const query =
            "UPDATE games SET title = ?, thumb = ?, deal_id = ?, sale_price = ?, normal_price = ?, savings = ?, store_ID = ? WHERE id = ?";
        const values = [
            gameData.info.title,
            gameData.info.thumb,
            gameData.deals[0].dealID,
            parseFloat(gameData.deals[0].price).toFixed(2),
            parseFloat(gameData.deals[0].retailPrice).toFixed(2),
            parseFloat(gameData.deals[0].savings).toFixed(2),
            gameData.deals[0].storeID,
            gameID,
        ];
        const game = await pool.query(query, values);
        return game;
    }
}
