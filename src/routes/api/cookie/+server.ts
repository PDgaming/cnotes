import * as cookie from "cookie";
import { v4 as uuidv4 } from "uuid";
import { json, type RequestHandler } from "@sveltejs/kit";
import { UsersDatabase } from "../../supabaseClient"; //imports UsersDatabase to access the userdatabase for email login

//@ts-ignore
export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json();
  const cookieID = uuidv4();
  try {
    await UsersDatabase.from("Users")
      .update({
        session_id: cookieID,
      })
      .eq("Email", body.email);
    const headers = {
      "Set-Cookie": cookie.serialize("Session_id", cookieID, {
        httpOnly: false,
        maxAge: 60 * 60 * 24 * 30,
        secure: true,
        sameSite: "lax",
        path: "/",
      }),
    };
    return json(
      {
        status: 200,
        message: "Cookie Renewal Successful.",
      },
      { headers }
    );
  } catch (error) {
    return json({ status: 500, message: "There was an error" });
  }
};