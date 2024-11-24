<script lang="ts">
  import { onMount } from "svelte";

  type DateFormat = "date" | "time" | "datetime";

  let data: any[] = [];
  let slug: string = "";
  let error: string = "";
  let createdDate: string;
  let createdTime: string;
  let displayTime: string;
  let selectedNote: {
    note_id: string;
    title: string;
    note_content: string;
    board: string;
    grade: string;
    school: string;
    subject: string;
  } | null = null;

  function updateNote() {
    if (data.length > 0) {
      selectedNote = {
        note_id: data[0].note_id,
        title: data[0].title,
        note_content: data[0].note_content,
        board: data[0].board,
        grade: data[0].grade,
        school: data[0].school,
        subject: data[0].subject,
      };
      syncWithBackend(); // Call the sync function whenever the note is updated
    }
  }
  async function syncWithBackend() {
    if (selectedNote) {
      console.log("Syncing with backend...");
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
            board: selectedNote.board,
            grade: selectedNote.grade,
            school: selectedNote.school,
            subject: selectedNote.subject,
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
  async function getNoteFromDb(slug: string) {
    const response = await fetch("../../api/database/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "getNote",
        slug: slug,
      }),
    });
    const result = await response.json();
    if (result.status === 200) {
      data = result.message;
    } else {
      error = "Error getting note from datatbase";
    }
  }
  function formatDate(
    dateString: string,
    format: DateFormat = "datetime"
  ):
    | string
    | {
        date: string;
        time: string;
        displayTime: string; // For displaying 12-hour format
        inputTime: string; // For HTML time input (24-hour format)
      } {
    const date = new Date(dateString);

    const pad = (num: number): string => num.toString().padStart(2, "0");

    // Date components
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());

    // Time components
    const hours24 = date.getHours();
    const minutes = pad(date.getMinutes());

    // 12-hour format for display
    const hours12 = hours24 % 12 || 12;
    const ampm = hours24 >= 12 ? "PM" : "AM";
    const displayTime = `${pad(hours12)}:${minutes} ${ampm}`;

    // 24-hour format for input
    const inputTime = `${pad(hours24)}:${minutes}`;

    switch (format) {
      case "date":
        return `${year}-${month}-${day}`;
      case "time":
        return inputTime;
      case "datetime":
      default:
        return {
          date: `${year}-${month}-${day}`,
          time: displayTime,
          displayTime: displayTime, // 12-hour format (06:30 PM)
          inputTime: inputTime, // 24-hour format (18:30)
        };
    }
  }
  onMount(async () => {
    // slug = window.location.href.slice(27); // Development server
    slug = window.location.href.slice(37); // Production server

    await getNoteFromDb(slug);

    if (data && data[0] && data[0].date_created) {
      const result = formatDate(data[0].date_created);
      if (typeof result === "object") {
        createdDate = result.date;
        createdTime = result.inputTime;
        displayTime = result.displayTime;
      }
    }
  });
</script>

{#if data.length > 0}
  <div class="note">
    <input
      type="text"
      class="text-lg font-bold edit-title"
      bind:value={data[0].title}
      on:input={updateNote}
    /><br /><br />
    <div class="meta-data">
      <label>
        Board:
        <input
          type="text"
          bind:value={data[0].board}
          on:input={updateNote}
        /><br />
      </label>
      <label>
        Created Date:
        <input type="date" bind:value={createdDate} on:input={updateNote} />
      </label>
      <label>
        Grade:
        <input type="text" bind:value={data[0].grade} on:input={updateNote} />
      </label>
      <label>
        School:
        <input type="text" bind:value={data[0].school} on:input={updateNote} />
      </label>
      <label>
        Subject
        <input type="text" bind:value={data[0].subject} on:input={updateNote} />
      </label>
    </div>
    <br />
    <textarea
      class="edit-content"
      bind:value={data[0].note_content}
      on:input={updateNote}
    ></textarea>
  </div>
{/if}

<style>
  .meta-data {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
  .note {
    padding: 5px;
  }
  textarea {
    width: 100%;
    height: 100%;
  }
</style>
