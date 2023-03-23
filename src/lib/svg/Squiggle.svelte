<script lang="ts">
  import type { Color, Fill } from "../types";

  export let fill: Fill;
  export let color: Color;
</script>

<path
  d="M3 23C13-4 34 4 55 11S107-2 97 26 66 46 45 39-8 52 3 23Z"
  stroke={color}
  {fill}
/>
