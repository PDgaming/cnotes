import { json, type RequestHandler } from "@sveltejs/kit";
import { UsersDatabase } from "../../supabaseClient";

//@ts-ignore
export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json();
  const data = [
    {
      id: 1,
      title: "test",
      content: "some content 1",
      class: 1,
      subject: "english",
    },
    {
      id: 2,
      title: "test2",
      content: "some content 2",
      class: 2,
      subject: "english",
    },
    {
      id: 3,
      title: "test3",
      content: "some content 3",
      class: 3,
      subject: "english",
    },
    {
      id: 4,
      title: "test4",
      content: "some content 4",
      class: 4,
      subject: "english",
    },
    {
      id: 5,
      title: "test5",
      content:
        "some really content like i don't know how to insert this lorem text, i mean the auto generate thing is not coming up so i am just writing some random text, so that i can fill the card to see if my current setup will work properly. And no it will not, lol. I guess i gotta fix it huh.",
      class: 5,
      subject: "english",
    },
    {
      id: 6,
      title: "test6",
      content:
        "some really long content again, so yeah i changed a couple of things in the css, so just added a overflow-y of scrool and yeah that seems to do it, i mean scrollable might not be the best thing ever, and i will definetely change it later, but for now i guess this is fine.",
      class: 6,
      subject: "english",
    },
    {
      id: 7,
      title: "test7",
      content:
        "some really content again, and yeah i used different notes so that i can have more data for the test, so that it more like real life so yeah.",
    },
    {
      id: 8,
      title: "test8",
      content: "some content 8",
      class: 8,
      subject: "english",
    },
    {
      id: 9,
      title: "test9",
      content: "some content 9",
      class: 9,
      subject: "english",
    },
    {
      id: 10,
      title: "test10",
      content: "some content 10",
      class: 10,
      subject: "english",
    },
  ];

  if (data) {
    return json({
      status: 200,
      message: data,
    });
  }
};
