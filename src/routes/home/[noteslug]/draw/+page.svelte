<script lang="ts">
  import type { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";
  import Excalidraw from "./Excalidraw.svelte";

  let excalidrawAPI: ExcalidrawImperativeAPI = $state()!;

  $effect(() => {
    // excalidrawAPI?.onChange(console.log);
  });
</script>

<Excalidraw theme="dark" excalidrawAPI={(api) => (excalidrawAPI = api)} />
