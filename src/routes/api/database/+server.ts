import { json, type RequestHandler } from "@sveltejs/kit";
import { UsersDatabase } from "../../supabaseClient";
import {neon} from "@neondatabase/serverless"

const sql = neon("postgresql://Notes_owner:ciPWTfCz0G3w@ep-bold-sunset-a191jth3.ap-southeast-1.aws.neon.tech/Notes?sslmode=require");
// Modify the insertRow function to handle multiple rows
async function insertRows(
  tableName: string,
  columns: string[],
  rowsData: any[][]
) {
  try {
    const placeholders = rowsData
      .map(
        (_, rowIndex) =>
          `(${columns
            .map(
              (_, colIndex) => `$${rowIndex * columns.length + colIndex + 1}`
            )
            .join(", ")})`
      )
      .join(", ");

    const query = `
      INSERT INTO ${tableName} (${columns.join(", ")})
      VALUES ${placeholders}
      RETURNING *
    `;

    const flatValues = rowsData.flat();
    const result = await sql(query, flatValues);
    return result;
  } catch (error) {
    console.error("Error inserting rows:", error);
    return null;
  }
}
//@ts-ignore
export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json();
  // Check if the request is for inserting multiple rows
  if (
    body.action === "insertRows" &&
    body.tableName &&
    body.columns &&
    body.rowsData
  ) {
    const insertedRows = await insertRows(
      body.tableName,
      body.columns,
      body.rowsData
    );
    if (insertedRows) {
      return json({
        status: 200,
        message: `Rows inserted successfully into table ${body.tableName}`,
        data: insertedRows,
      });
    } else {
      return json({
        status: 500,
        message: "Failed to insert rows",
      });
    }
  }
};
//@ts-ignore
export const GET: RequestHandler = async ({ request }) => {
  const query = await sql`select * from notes`;
  if (query) {

    return json({ status: 200, message: query });
  } else {
    return json({status: 500, message: "Failed to fetch data"});
  }
};
