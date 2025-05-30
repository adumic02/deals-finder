import pool from "@libs/db";

export class StoreDAO {
    async getStores() {
        const query = "SELECT * FROM stores";
        const [stores] = await pool.query(query);
        return stores;
    }

    async addStore(storeID, storeData) {
        const query =
            "INSERT INTO stores (id, name, logo, banner, icon) VALUES (?, ?, ?, ?, ?)";
        const values = [
            storeID,
            storeData.name,
            storeData.logo,
            storeData.banner,
            storeData.icon,
        ];
        const store = await pool.query(query, values);
        return store;
    }
}
