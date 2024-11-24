<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  let data: any[] = [];
  let newNote = {
    title: "",
    note_content: "",
    date_created: "",
    board: "",
    grade: "",
    school: "",
    subject: "",
    slug: "",
  };
  async function getNotesFromDb(userEmail: string) {
    const response = await fetch("/api/database", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "getNotes",
        UserEmail: userEmail,
      }),
    });
    const result = await response.json();
    if (result.status == 200) {
      data = result.message;
    } else {
      console.log(result.message);
    }
  }
  async function addNewNote() {
    newNote.slug = newNote.title.toLowerCase().replace(/\s+/g, "-"); // Generate a slug for the new note
    const response = await fetch("/api/database", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "addNote",
        note: newNote, // Spread the newNote object to include all properties
        UserEmail: sessionStorage.getItem("Email"), // Assuming you want to associate the note with a user
      }),
    });
    const result = await response.json();
    if (result.status === 200) {
      console.log("Note added successfully:", result.message);
      data.push(result.data); // Add the new note to the existing notes
      newNote = {
        title: "",
        note_content: "",
        date_created: "",
        board: "",
        grade: "",
        school: "",
        subject: "",
        slug: "",
      }; // Reset form
    } else {
      console.error("Failed to add note:", result.message);
    }
  }
  onMount(() => {
    const userEmail = sessionStorage.getItem("Email");

    //@ts-ignore
    getNotesFromDb(userEmail);
  });
</script>

<svelte:head>
  <title>Cnotes - Home</title>
</svelte:head>

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
<div class="add-note">
  <button class="btn" onclick="my_modal_3.showModal()">New Note</button>
  <dialog id="my_modal_3" class="modal">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >✕</button
        >
      </form>
      <h2 class="text-3xl mb-2">Add New Note</h2>
      <div class="new-note-data">
        <label>
          Title:<br />
          <input
            type="text"
            placeholder="Title"
            class="text-lg font-bold edit-title"
            bind:value={newNote.title}
          />
        </label><br />
        <label>
          Board:<br />
          <input type="text" placeholder="Board" bind:value={newNote.board} />
        </label><br />
        <label>
          Date Created:<br />
          <input type="date" bind:value={newNote.date_created} />
        </label><br />
        <label>
          Grade:<br />
          <input type="text" placeholder="Grade" bind:value={newNote.grade} />
        </label><br />
        <label>
          School:<br />
          <input type="text" placeholder="School" bind:value={newNote.school} />
        </label><br />
        <label>
          Subject:<br />
          <input
            type="text"
            placeholder="Subject"
            bind:value={newNote.subject}
          />
        </label><br />
        <label>
          Content:<br />
          <textarea placeholder="Content" bind:value={newNote.note_content}
          ></textarea>
        </label><br />
      </div>
      <button class="btn btn-primary btn-outline" on:click={addNewNote}
        >Add Note</button
      >
    </div>
  </dialog>
</div>
<div class="notes">
  {#if data.length > 0}
    {#each data as note}
      <div
        role="button"
        tabindex="0"
        class="card bg-base-200 w-96 shadow-xl note"
      >
        <div class="card-body">
          <a class="card-title note-title" href="/home/{note.slug}"
            >{note.title}</a
          >
          <div class="card-actions justify-end">
            <div class="badge badge-outline">{note.grade}th Grade</div>
            <div class="badge badge-outline">{note.subject}</div>
          </div>
          <p class="note-content">{note.note_content}</p>
        </div>
      </div>
    {/each}
  {:else}
    <div class="Loading"><h1>Loading Your Notes...</h1></div>
  {/if}
</div>

<style>
  .new-note-data {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .add-note {
    margin-left: 10px;
  }
  .note-title {
    font-size: 1.5em;
    text-decoration: underline;
  }
  .note-content {
    font-size: 1.2em;
  }
  .notes {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 60px 5px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 10px;
  }
  .note {
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-radius: 10px;
    border: 1px solid #ccc;
    width: 20em;
    height: 15em;
    overflow-y: hidden;
    cursor: pointer;
  }
  .note:focus {
    outline: 2px solid #4a90e2; /* Add a visible focus indicator */
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
