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
</script>

<svelte:head>
  <title>Home/X</title>
</svelte:head>

<Sidebar />
