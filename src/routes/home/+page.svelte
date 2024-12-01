<script lang="ts">
  import { onMount } from "svelte";
  import { toasts, ToastContainer, FlatToast } from "svelte-toasts";
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
  let error: string = "";

  const showToast = (title: string, body: string, duration: number, type: string) => {
    toasts.add({
      title,
      description: body,
      duration,
      type,
      theme: "dark",
      showProgress: true,
    });
  };

  async function getNotesFromDb(userEmail: string) {
    const response = await fetch("/api/database", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "getNotes", UserEmail: userEmail }),
    });
    const result = await response.json();
    if (result.status === 200 && result.message.length > 0) {
      data = result.message;
      localStorage.setItem("notes", JSON.stringify(data));
    } else {
      error = "No notes found.";
    }
  }

  async function addNewNote() {
    newNote.slug = newNote.title.toLowerCase().replace(/\s+/g, "-");
    const response = await fetch("/api/database", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "addNote", note: newNote, UserEmail: sessionStorage.getItem("Email") }),
    });
    const result = await response.json();
    if (result.status === 200) {
      data.push(result.data);
      newNote = { title: "", note_content: "", date_created: "", board: "", grade: "", school: "", subject: "", slug: "" };
      showToast("Success", "Note added successfully", 2500, "success");
      window.location.reload();
    } else {
      showToast("Error", "Failed to add note", 2500, "error");
    }
  }

  async function deleteNote(selectedNote: any) {
    const response = await fetch("/api/database", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "deleteNote", id: selectedNote.note_id, UserEmail: sessionStorage.getItem("Email") }),
    });
    const result = await response.json();
    if (result.status === 200) {
      data.splice(data.indexOf(selectedNote), 1);
      showToast("Success", "Note deleted successfully", 2500, "success");
      window.location.reload();
    } else {
      showToast("Error", "Failed to delete note", 2500, "error");
    }
  }

  onMount(() => {
    const userEmail = sessionStorage.getItem("Email");
    const localNotes = localStorage.getItem("notes");
    if (localNotes) {
      data = JSON.parse(localNotes);
    }
    getNotesFromDb(userEmail!);
  });
</script>

<svelte:component this={ToastContainer} let:data>
  <svelte:component this={FlatToast} {data} />
</svelte:component>

<svelte:head>
  <title>Cnotes</title>
</svelte:head>

<div class="background-animation"></div>

<div class="container">
  <header class="header">
    <h1>Cnotes</h1>
    <button class="btn" onclick="my_modal_3.showModal()">New Note</button>
  </header>

  <div class="search-bar">
    <label class="search-input">
      <input type="text" placeholder="Search notes..." />
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="icon">
        <path d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" />
      </svg>
    </label>
  </div>

  <dialog id="my_modal_3" class="modal">
    <div class="modal-box">
      <form method="dialog">
        <button class="close-btn">✕</button>
      </form>
      <div class="header-box">
        <h2 class="text-3xl mb-2">Add New Note</h2>
      </div>
      <div class="form-group">
        <label>Title: <input type="text" bind:value={newNote.title} /></label>
        <label>Board: <input type="text" bind:value={newNote.board} /></label>
        <label>Date Created: <input type="date" bind:value={newNote.date_created} /></label>
        <label>Grade: <input type="text" bind:value={newNote.grade} /></label>
        <label>School: <input type="text" bind:value={newNote.school} /></label>
        <label>Subject: <input type="text" bind:value={newNote.subject} /></label>
        <label>Content: <textarea bind:value={newNote.note_content}></textarea></label>
      </div>
      <button class="btn" type="button" on:click={addNewNote}>Add Note</button>
    </div>
  </dialog>
  
  
  <div class="notes">
    {#if error}
      <p class="error">{error}</p>
    {:else if data.length > 0}
      <div class="notes-grid">
        {#each data as note}
          <div class="note-card">
            <h3>{note.title}</h3>
            <p>{note.note_content}</p>
            <div class="note-meta">
              <span>{note.grade}th Grade</span>
              <span>{note.subject}</span>
            </div>
            <button class="btn-danger" on:click={() => deleteNote(note)}>Delete</button>
          </div>
        {/each}
      </div>
    {:else}
      <p class="loading">Loading notes...</p>
    {/if}
  </div>
</div>

<style>
  /* General Styling */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: "Inter", sans-serif;
    color: #e0e0e0;
  }

  .background-animation {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(120deg, #000000, #1c1c1c, #2e2e2e);
    background-size: 300% 300%;
    animation: gradientAnimation 8s ease infinite;
    z-index: -1;
  }

  .header-box {
  background: linear-gradient(90deg, #6a11cb, #ff6f61);
  padding: 10px 20px;
  border-radius: 8px;
  margin-bottom: 15px;
  text-align: center;
}

.header-box h2 {
  color: #ffffff;
  font-weight: bold;
  margin: 0;
  font-size: 1.8rem;
}

  @keyframes gradientAnimation {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .container {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  h1 {
    font-size: 2.5rem;
  }

  .btn {
    background: linear-gradient(90deg, #6a11cb, #ff6f61);
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .btn:hover {
    transform: scale(1.05);
    background: linear-gradient(90deg, #ff6f61, #6a11cb);
  }

  .btn-danger {
    background: #ff4d4f;
  }

  .btn-danger:hover {
    background: #d63031;
  }

  .search-bar {
    margin-bottom: 20px;
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
</style>
