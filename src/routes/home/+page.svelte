<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import {
    toasts,
    ToastContainer as ToastContainerAny,
    FlatToast as FlatToastAny,
  } from "svelte-toasts"; //imports toasts, toastContainer and flatToast to show toasts
  import "./index.css";

  type searchResult = {
    title: string;
    slug: string;
  };

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
  let error: string = "";
  const ToastContainer = ToastContainerAny as any;
  const FlatToast = FlatToastAny as any;
  let searchResults: searchResult;
  let shouldShowSearchResults: boolean = false;
  let searchQuery: string = "";

  const showToast = (
    title: string,
    body: string,
    duration: number,
    type: string
  ) => {
    const toast = toasts.add({
      title: title,
      description: body,
      duration: duration,
      placement: "bottom-right",
      //@ts-ignore
      type: "info",
      theme: "dark",
      //@ts-ignore
      placement: "bottom-right",
      showProgress: true,
      //@ts-ignore
      type: type,
      //@ts-ignore
      theme: "dark",
      onClick: () => {},
      onRemove: () => {},
    });
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
      if (result.message.length > 0) {
        data = result.message;
        localStorage.setItem("notes", JSON.stringify(data));
      } else {
        error = "No notes found.";
      }
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
      showToast("Success", "Note added successfully", 2500, "success");
      window.location.reload();
    } else {
      showToast("Error", "Failed to add note", 2500, "error");
    }
  }
  async function deleteNote(selectedNote: any) {
    const response = await fetch("/api/database", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "deleteNote",
        id: selectedNote.note_id,
        UserEmail: sessionStorage.getItem("Email"),
      }),
    });
    const result = await response.json();
    if (result.status === 200) {
      showToast("Success", "Note deleted successfully", 2500, "success");
      data = data.filter((note) => note.slug !== selectedNote.slug);
    } else {
      showToast("Error", "Failed to delete note", 2500, "error");
    }
  }
  onMount(() => {
    const userEmail = sessionStorage.getItem("Email");
    const localNotes = localStorage.getItem("notes");
    if (localNotes) {
      // Showing local notes
      data = JSON.parse(localNotes);
    }

    //@ts-ignore
    getNotesFromDb(userEmail);
  });
  function search() {
    if (searchQuery.length > 0) {
      shouldShowSearchResults = true;
      for (let i = 0; i < data.length; i++) {
        if (data[i].title.toLowerCase().includes(searchQuery.toLowerCase())) {
          searchResults = { title: data[i].title, slug: data[i].slug };
        }
      }
    } else {
      shouldShowSearchResults = false;
    }
  }
  function handleKeyDown(event: any) {
    // function to handle key down
    if (event.key === "Enter" && !event.shiftKey) {
      // condition to check if key pressed is Enter
      event.preventDefault();
      search(); // if condition is true sendMessage function runs
    }
  }
</script>

<svelte:component this={ToastContainer} let:data>
  <svelte:component this={FlatToast} {data} />
</svelte:component>

<svelte:head>
  <title>Cnotes - Home</title>
</svelte:head>

<div class="background-animation"></div>
<div class="container">
  <div class="header">
    <div class="search-bar mt-5 mb-10 pl-5 pr-5">
      <label class="input input-bordered flex items-center gap-2">
        <input
          type="text"
          class="grow"
          placeholder="Search for a note"
          on:keydown={handleKeyDown}
          bind:value={searchQuery}
        />

        <button on:click={search} class="btn btn-circle btn-ghost">
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
        </button>
      </label>
      {#if shouldShowSearchResults}
        <div class="search-results">
          {#if searchResults}
            <a href={`#${searchResults.slug}`}>
              {searchResults.title}
            </a>
          {:else}
            No note with that title found.
          {/if}
        </div>
      {/if}
    </div>
    <div class="add-note">
      <button
        class="btn"
        on:click={() => {
          my_modal_3.showModal();
        }}>New Note</button
      >
      <dialog id="my_modal_3" class="modal">
        <div class="modal-box">
          <form method="dialog">
            <button
              class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >✕</button
            >
          </form>
          <div class="header-box">
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
                <input
                  type="text"
                  placeholder="Board"
                  bind:value={newNote.board}
                />
              </label><br />
              <label>
                Date Created:<br />
                <input type="date" bind:value={newNote.date_created} />
              </label><br />
              <label>
                Grade:<br />
                <input
                  type="text"
                  placeholder="Grade"
                  bind:value={newNote.grade}
                />
              </label><br />
              <label>
                School:<br />
                <input
                  type="text"
                  placeholder="School"
                  bind:value={newNote.school}
                />
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
                <textarea
                  placeholder="Content"
                  bind:value={newNote.note_content}
                ></textarea>
              </label>
            </div>
            <br /><br />
          </div>
          <button class="btn btn-primary btn-outline" on:click={addNewNote}
            >Add Note</button
          >
        </div>
      </dialog>
    </div>
  </div>
  <div class="notes">
    {#if error}
      <p class="error">{error}</p>
    {:else if data.length > 0}
      <div class="notes-grid">
        {#each data as note}
          <div
            role="button"
            tabindex="0"
            class="card bg-base-200 w-96 shadow-xl note"
            id={note.slug}
          >
            <div class="card-options">
              <details class="dropdown dropdown-end">
                <summary class="btn m-1 btn-ghost btn-circle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                    type="button"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                    />
                  </svg>
                </summary>
                <ul
                  class="menu dropdown-content bg-base-100 rounded-box z-[1] w-20 p-2 shadow options"
                >
                  <li>
                    <button
                      class="btn btn-error"
                      on:click={() => {
                        delete_modal.showModal();
                      }}
                      >Delete
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </li>
                </ul>
              </details>
              <dialog id="delete_modal" class="modal">
                <div class="modal-box">
                  <form method="dialog">
                    <button
                      class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                      >✕</button
                    >
                  </form>
                  <h1 class="text-2xl">Delete Note</h1>
                  <p class="py-4">Are you sure you want to delete this note?</p>
                  <div class="modal-action">
                    <button
                      class="btn btn-info"
                      on:click={() => {
                        delete_modal.close();
                      }}>Cancel</button
                    >
                    <button
                      class="btn btn-error"
                      on:click={() => {
                        deleteNote(note);
                      }}
                      on:click={() => {
                        delete_modal.close();
                      }}
                      >Delete
                    </button>
                  </div>
                </div>
              </dialog>
            </div>
            <div class="card-body" style="padding-top: 0px;">
              <a class="card-title note-title" href="/home/{note.slug}"
                >{note.title}</a
              >
              <div class="card-actions justify-end note-meta">
                <div class="badge badge-outline">{note.grade}th grade</div>
                <div class="badge badge-outline">{note.subject}</div>
              </div>
              <p class="note-content">
                {@html note.note_content}
              </p>
            </div>
          </div>
        {/each}
      </div>
    {:else}
      <p class="loading">Loading Your Notes...</p>
    {/if}
  </div>
</div>

<style>
  .share-link {
    text-decoration: underline;
    color: #4a90e2;
  }
  .background-animation {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(120deg, #000000, #1c1c1c, #2e2e2e);
    background-size: 300% 300%;
    animation: gradientAnimation 2s ease;
    z-index: -1;
  }
  .header-box {
    padding: 10px 20px;
    border-radius: 8px;
    margin-bottom: 15px;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  .header-box h2 {
    color: #ffffff;
    font-weight: bold;
    margin: 0;
    font-size: 1.8rem;
  }
  @keyframes gradientAnimation {
    0% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  h1 {
    font-size: 2.5rem;
  }
  .btn {
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .btn:hover {
    transform: scale(1.05);
  }
  .btn-danger {
    background: #ff4d4f;
  }
  .btn-danger:hover {
    background: #d63031;
  }
  .search-bar {
    margin-bottom: 20px;
    width: 100%;
  }
  .container {
    max-width: 1250px;
    margin: 0 auto;
    padding: 20px;
  }
  .search-input {
    display: flex;
    align-items: center;
    background: #2c2c2c;
    border-radius: 5px;
    padding: 10px;
  }
  .search-input input {
    border: none;
    background: none;
    color: #fff;
    flex-grow: 1;
    outline: none;
  }
  .icon {
    width: 20px;
    height: 20px;
  }
  .modal-box {
    background: #1e1e1e;
    border-radius: 10px;
    color: #fff;
    padding: 20px;
  }
  .options {
    position: absolute;
    top: 45px;
    left: -60px;
  }
  .new-note-btn {
    width: 900px;
  }
  .card-options {
    margin-left: auto;
  }
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
  textarea {
    width: 100%;
    height: 100%;
  }
  .form-group label {
    display: block;
    margin-bottom: 10px;
  }
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border: none;
    border-radius: 5px;
    background: #2c2c2c;
    color: #fff;
  }
  .notes {
    margin-top: 20px;
  }
  .notes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }
  .note:focus {
    outline: 2px solid #4a90e2; /* Add a visible focus indicator */
  }
  .note-card {
    background: #1e1e1e;
    padding: 20px;
    border-radius: 10px;
    position: relative;
  }
  .note-meta {
    margin-top: 10px;
    font-size: 0.9rem;
    color: #a0a0a0;
  }
  .loading,
  .error {
    text-align: center;
    margin-top: 20px;
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
