<script lang="ts">
  import { Facebook, Twitter } from "svelte-share-buttons-component"
  export let url: string
  export let title: string
  export let description: string
</script>

{#if url}
  <div class="flex gap-2 pr-4 justify-end fixed bottom-4 right-0 center z-50">
    <Facebook class="h-10 w-10 rounded-full" {url} quote={description} />
    <Twitter class="h-10 w-10 rounded-full" text={title} {url} />
  </div>
{/if}
