import axios from "axios";
import { parse } from "csv-parse/sync";
import pool from "../db/connect.js"; // ESM import

const DATA_URL =
  "https://www.stats.govt.nz/assets/Uploads/Food-price-index/Food-price-index-September-2023/Download-data/food-price-index-september-2023-index-numbers.csv";

async function fetchAndSaveFoodPrices() {
  try {
    const response = await axios.get(DATA_URL);
    const records = parse(response.data, {
      columns: true,
      skip_empty_lines: true,
    });

    console.log("✅ First 5 rows:", records.slice(0, 5));

    const conn = pool; // use the connection pool

    // Insert all rows
    for (const row of records) {
      await conn.query(
        `INSERT INTO food_prices 
          (series_reference, period, data_value, status, units, subject, group_name, series_title) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          row.Series_reference,
          row.Period,
          row.Data_value,
          row.STATUS,
          row.UNITS,
          row.Subject,
          row.Group,
          row.Series_title_1,
        ]
      );
    }

    console.log(`🎉 Inserted ${records.length} rows into food_prices table`);
    await pool.end(); // close connections

  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

fetchAndSaveFoodPrices();
