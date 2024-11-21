import * as cookie from "cookie";
import { v4 as uuidv4 } from "uuid";
import { json, type RequestHandler } from "@sveltejs/kit";
import { UsersDatabase } from "../../supabaseClient"; //imports UsersDatabase to access the userdatabase for email login
//@ts-ignore
import stringHash from "string-hash";

//@ts-ignore
export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json();
  const { data, error } = await UsersDatabase.from("Users")
    .select()
    .eq("Email", body.email);
  if (error) {
    return json({
      status: 500,
      message: "There was an error",
    });
  }
  if (data) {
    const cookieID = uuidv4();
    await UsersDatabase.from("Users")
      .update({
        session_id: cookieID,
      })
      .eq("Email", body.email);
    const headers = {
      "Set-Cookie": cookie.serialize("Session_id", cookieID, {
        httpOnly: false,
        maxAge: 60 * 60 * 24 * 7,
        secure: true,
        sameSite: "lax",
        path: "/",
      }),
    };
    return json(
      {
        status: 200,
        message: "User already exists.",
      },
      { headers }
    );
  }
  if (!data) {
    await UsersDatabase.from("users").insert({
      Name: body.name,
      Email: body.email,
      Password: stringHash(body.password),
      memeber: "free",
    });
    return json({
      status: 200,
      message: "User created.",
    });
  }
};
