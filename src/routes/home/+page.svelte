<script lang="ts">
  import { onMount } from "svelte";

  let data: any[] = [];

  async function getNotesFromDb() {
    const response = await fetch("/api/database", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "produnyadehingia@gmail.com",
      }),
    });
    const result = await response.json();
    console.log(result);
    data = result.message;
  }
  onMount(getNotesFromDb);
</script>

<div class="search-bar mt-5 mb-10 pl-5 pr-5">
  <label class="input input-bordered flex items-center gap-2">
    <input type="text" class="grow" placeholder="Search for a note" />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      class="h-4 w-4 opacity-70"
    >
      <path
        fill-rule="evenodd"
        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
        clip-rule="evenodd"
      />
    </svg>
  </label>
</div>
<div class="notes">
  {#each data as note}
    <div class="card bg-base-200 w-96 shadow-xl note">
      <div class="card-body">
        <h2 class="card-title note-title">{note.title}</h2>
        <p class="note-content">{note.content}</p>
        <div class="card-actions justify-end">
          <div class="badge badge-outline">{note.class}th Grade</div>
          <div class="badge badge-outline">{note.subject}</div>
        </div>
      </div>
    </div>
  {/each}
</div>

<style>
  .note-title {
    font-size: 1.9em;
    text-decoration: underline;
  }
  .note-content {
    font-size: 1.2em;
  }
  .notes {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }
  .note {
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-radius: 10px;
    border: 1px solid #ccc;
    width: 20em;
    height: 15em;
    overflow-y: scroll;
  }

  @media (min-width: 768px) {
    .notes {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .notes {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>
