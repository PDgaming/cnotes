<script lang="ts">
  import { onMount } from "svelte";
  import {
    toasts,
    ToastContainer as ToastContainerAny,
    FlatToast as FlatToastAny,
  } from "svelte-toasts"; //imports toasts, toastContainer and flatToast to show toasts

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
  const ToastContainer = ToastContainerAny as any;
  const FlatToast = FlatToastAny as any;

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
  async function getNoteFromDb(slug: string, email: string) {
    const response = await fetch("../../api/database/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "getNoteForViewingOnly",
        slug: slug,
        UserEmail: email,
      }),
    });
    const result = await response.json();
    if (result.status === 200) {
      if (result.message.length > 0) {
        data = result.message;
      } else {
        error = "You don't have permission to access this note.";
      }
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
    const userEmail = sessionStorage.getItem("Email");
    const localNotes = localStorage.getItem("notes");

    // slug = window.location.href.slice(27).replace("/sharing", ""); // Development server
    slug = window.location.href.slice(30).replace("/sharing", ""); // Production server

    if (userEmail) {
      if (localNotes) {
        data = JSON.parse(localNotes);
      }
      await getNoteFromDb(slug, userEmail);
      if (data && data[0] && data[0].date_created) {
        const result = formatDate(data[0].date_created);
        if (typeof result === "object") {
          createdDate = result.date;
          createdTime = result.inputTime;
          displayTime = result.displayTime;
        }
      }
    } else {
      error = "You must be logged in to view your notes";
    }
  });
</script>

<svelte:component this={ToastContainer} let:data>
  <svelte:component this={FlatToast} {data} />
</svelte:component>

{#if error}
  {error}
{:else if data.length > 0}
  <div class="note">
    <h1 class="text-3xl font-bold edit-title">{data[0].title}</h1>
    <br />
    <div class="meta-data">
      <b>Board: </b>
      <h3>{data[0].board}</h3>

      <b>Created Date:</b>
      <h3>{createdDate}</h3>

      <b>Grade:</b>
      <h3>{data[0].grade}</h3>

      <b>School:</b>
      <h3>{data[0].school}</h3>

      <b>Subject:</b>
      <h3>{data[0].subject}</h3>
    </div>
    <br />
    <p class="edit-content">{@html data[0].note_content}</p>
  </div>
{:else}
  <div class="Loading"><h1>Loading Your Note...</h1></div>
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
