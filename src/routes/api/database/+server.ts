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
  if (body.action === "addNote") {
    if (body.note && body.UserEmail) {
      const { title, note_content, board, grade, school, subject, slug, date_created } = body.note;
      try {
        const query = await sql`
          INSERT INTO notes (title, note_content, board, grade, school, subject, slug, date_created,user_email)
          VALUES (${title}, ${note_content}, ${board}, ${grade}, ${school}, ${subject}, ${slug}, ${date_created}, ${body.UserEmail})
          RETURNING *`;
        if (query) {
          return json({ status: 200, message: "Note added successfully", data: query });
        }
      } catch (error) {
        console.error("Error adding note:", error);
        return json({ status: 500, message: "Failed to add note" });
      }
    } else {
      return json({ status: 400, message: "Invalid request" });
    }
  }
  if (body.action === "getNotes") {
    if (body.UserEmail) {
      try {

        const query = await sql`select * from notes where user_email = ${body.UserEmail}`;
        if (query) {
          return json({ status: 200, message: query });
        }
      } catch (error) {
        return json({ status: 500, message: "Failed to fetch data" });
      }
  } else {
    return json({status: 400, message: "Invalid request"});
  }
  }
  if (body.action === "getNote") {
    if (body.slug) {
      try {
        const query = await sql`select * from notes where slug = ${body.slug}`;
        if (query) {
          return json({ status: 200, message: query });
        }
      } catch (error) {
        return json({ status: 500, message: "Failed to fetch data" });
      }
    } else {
      return json({ status: 400, message: "Invalid request" });
    }
  }
  if (body.action === "updateNote"){
    const query = await sql`
    UPDATE notes 
    SET title = ${body.title}, 
        note_content = ${body.content}, 
        board = ${body.board}, 
        grade = ${body.grade}, 
        school = ${body.school}, 
        subject = ${body.subject} 
    WHERE note_id = ${body.id}`;
    if (query) {
      return json({ status: 200, message: "Note Updated Successfully" });
    } else {
      return json({ status: 500, message: "Failed to update note" });
    }
  }
};
