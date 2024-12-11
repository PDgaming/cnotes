<script lang="ts">
  import { onMount } from "svelte";
  import {
    toasts,
    ToastContainer as ToastContainerAny,
    FlatToast as FlatToastAny,
  } from "svelte-toasts"; //imports toasts, toastContainer and flatToast to show toasts
  import Editor from "@tinymce/tinymce-svelte";

  type DateFormat = "date" | "time" | "datetime";

  let conf = {
    height: 700,
    menubar: false,
    shortcuts: false,
    skin: "oxide-dark",
    content_css: "dark",
    plugins: [
      "advlist",
      "autolink",
      "lists",
      "link",
      "image",
      "charmap",
      "anchor",
      "searchreplace",
      "visualblocks",
      "code",
      "fullscreen",
      "insertdatetime",
      "media",
      "table",
      "preview",
      "help",
      "wordcount",
    ],
    editable_root: false,
  };
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
  async function getNoteFromDb(slug: string) {
    const response = await fetch("../../api/database/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "getNoteForViewingOnly",
        slug: slug,
      }),
    });
    const result = await response.json();
    if (result.status === 200) {
      console.log(result);
      if (result.message.length > 0) {
        data = result.message;
      } else {
        error = "Note not Found....";
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

    slug = window.location.href.split("/home/")[1].split("/sharing")[0];

    if (localNotes) {
      data = JSON.parse(localNotes);
    }
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
      <table>
        <tbody>
          <tr>
            <td>
              <b>Board: </b>
            </td>
            <td>
              <h3>{data[0].board}</h3>
            </td>
          </tr>
          <tr>
            <td>
              <b>Created Date:</b>
            </td>
            <td>
              <h3>{createdDate}</h3>
            </td>
          </tr>
          <tr>
            <td>
              <b>Grade:</b>
            </td>
            <td>
              <h3>{data[0].grade}</h3>
            </td>
          </tr>
          <tr>
            <td>
              <b>School:</b>
            </td>
            <td>
              <h3>{data[0].school}</h3>
            </td>
          </tr>
          <tr>
            <td>
              <b>Subject:</b>
            </td>
            <td>
              <h3>{data[0].subject}</h3>
            </td>
          </tr>
        </tbody>
      </table>
      <button
        class="btn btn-success"
        on:click={() => {
          my_modal_4.showModal();
        }}
        >Share
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
            d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
          />
        </svg>
      </button>
    </div>
    <br />
    <div class="note card-body" style="padding-top: 0px;">
      <Editor
        bind:value={data[0].note_content}
        apiKey="vy0yfom8b74patlx3pqq3fsgzs7yo91br84xiy2o6744slrf"
        channel="7"
        {conf}
      />
    </div>
  </div>
  <dialog id="my_modal_4" class="modal">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >✕</button
        >
      </form>
      <label>Link:</label>
      <a href="/home/{data[0].slug}/sharing" class="share-link"
        >https://cnotes.pages.dev/{data[0].slug}/sharing</a
      >
    </div>
  </dialog>
{:else}
  <div class="Loading"><h1>Loading Your Note...</h1></div>
{/if}

<style>
  .share-link {
    text-decoration: underline;
    color: #4a90e2;
  }
  .meta-data {
    display: flex;
    flex-direction: row;
    gap: 10px;
    flex-wrap: wrap;
  }
</style>
