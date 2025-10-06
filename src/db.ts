import "dotenv/config";
import postgres from "postgres";

const { DATABASE_URL } = process.env as { DATABASE_URL: string };

// if (!DATABASE_URL) {
//   throw new Error("DATABASE_URL is not defined in environment variables.");
// }
const sql = postgres(DATABASE_URL, { ssl: "require" });

export default sql;
