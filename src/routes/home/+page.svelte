<script lang="ts">
  import { onMount } from "svelte";

  let data: any[] = [];
  let selectedNote: any = null;
  let editedTitle: string = "";
  let editedContent: string = "";

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
    console.log(result);
    if (result.status == 200) {
      data = result.message;
    } else {
      console.log(result.message);
    }
  }
  function openModal(note: any) {
    selectedNote = note;
    editedTitle = note.title;
    editedContent = note.note_content;
    const modal = document.getElementById("note_modal") as HTMLDialogElement;
    modal.showModal();
  }
  function updateNote() {
    if (selectedNote) {
      selectedNote.title = editedTitle;
      selectedNote.note_content = editedContent;
      data = [...data]; // Trigger Svelte reactivity
    }
  }
  async function syncWithBackend() {
    if (selectedNote) {
      console.log("Hehe");
      try {
        const response = await fetch("/api/database", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "updateNote",
            id: selectedNote.note_id,
            title: selectedNote.title,
            content: selectedNote.note_content,
          }),
        });
        const result = await response.json();
        if (result.status !== 200) {
          console.error("Failed to update note:", result.message);
        } else {
          console.log(result);
        }
      } catch (error) {
        console.error("Error updating note:", error);
      }
    }
  }
  function closeModal() {
    const modal = document.getElementById("note_modal") as HTMLDialogElement;
    modal.close();
    syncWithBackend(); // Sync changes with backend when modal is closed
  }
  onMount(() => {
    const userEmail = sessionStorage.getItem("Email");

    //@ts-ignore
    getNotesFromDb(userEmail);
  });
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
  {#if data}
    {#each data as note}
      <div
        role="button"
        tabindex="0"
        class="card bg-base-200 w-96 shadow-xl note"
        on:click={() => openModal(note)}
        on:keydown={(e) => e.key === "Esc" && openModal(note)}
      >
        <div class="card-body">
          <h2 class="card-title note-title">{note.title}</h2>
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

<dialog id="note_modal" class="modal">
  <div class="modal-box">
    <form method="dialog">
      <button
        class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        on:click={closeModal}>✕</button
      >
    </form>
    {#if selectedNote}
      <textarea
        class="text-lg font-bold edit-title"
        bind:value={editedTitle}
        on:input={updateNote}
      ></textarea><br />
      <textarea
        class="edit-content"
        bind:value={editedContent}
        on:input={updateNote}
      ></textarea>
    {/if}
  </div>
</dialog>

<style>
  .edit-title {
    width: 100%;
  }
  .edit-content {
    width: 100%;
    height: 20em;
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
