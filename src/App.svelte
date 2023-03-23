<script lang="ts">
  import Intro from "./lib/Intro.svelte";
  import Game from "./lib/Game.svelte";
  import Controls from "./lib/Controls.svelte";

  import { state } from "./lib/state";
</script>

<main>
  {#if !$state.start}
    <Intro />
  {:else}
    <Game />
    <!-- <Controls /> -->
  {/if}
</main>
