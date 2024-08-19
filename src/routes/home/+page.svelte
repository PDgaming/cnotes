<script lang="ts">
  import Sidebar from "../components/Sidebar.svelte";

  //   import { neon } from "@neondatabase/serverless";

  //   const PGUSER = "Notes_owner";
  //   const PGPASSWORD = "ciPWTfCz0G3w";
  //   const PGHOST = "ep-bold-sunset-a191jth3.ap-southeast-1.aws.neon.tech";
  //   const PGDATABASE = "Notes";

  //   const sql = neon(
  //     `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
  //   );
  //   async function main() {
  //     const result = await sql`SELECT * FROM notes`;
  //     console.log(result);
  //   }

  //   main();
  const userImage = "";
  const note = "note";
  const userName = "userName";
  const handleName = "handleName";
  const timeUploaded = "timeUploaded";
</script>

<svelte:head>
  <title>Home/X</title>
</svelte:head>

<div class=" bg-black text-white">
  <div class="flex md:container mx-auto">
    <Sidebar />
    <div class="second w-full border-[1px] border-x-gray-600 border-y-black">
      <div class="whatishapp flex gap-4 my-3">
        <div class="img m-2 w-16">
          <img src={userImage} alt="userImage" />
        </div>
        <div class="w-full">
          <input
            class="w-full h-7 my-2 text-xl bg-black outline-none text-white"
            type="text"
            placeholder="Upload a note..."
          />

          <div class="w-[90%] h-[0.2px] bg-gray-700 my-3"></div>
          <div class="flex justify-between">
            <div class="postbtn">
              <button
                class="bg-[#1d9bf0] px-6 mx-5 text-sm rounded-full py-2 text-white font-bold"
                >Post</button
              >
            </div>
          </div>
        </div>
      </div>

      <div class="posts">
        <div class="post border-[1px] border-y-gray-600 border-x-0">
          <div class="flex">
            <div class="image m-4">
              <img class="w-16" src={userImage} alt="userImage" />
            </div>
            <div class="content my-3">
              <span class="font-bold hover:underline cursor-pointer text-white"
                >{userName}</span
              >
              <span class="text-gray-500">@{handleName} · {timeUploaded} </span>
              <div class="postimg m-2 ml-0">
                {note}
              </div>
              <div
                class="icons flex justify-between mx-4 my-4 text-sm text-gray-600"
              >
                <div
                  class="icon flex items-center justify-center hover:text-blue-500 hover:bg-gray-900 hover:rounded-full p-1 hover:cursor-pointer"
                >
                  <span class="material-symbols-outlined"> chat_bubble </span>
                </div>
                <div
                  class="icon flex items-center justify-center hover:text-pink-500 hover:bg-gray-900 hover:rounded-full p-1 hover:cursor-pointer"
                >
                  <span class="material-symbols-outlined"> Favorite </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
