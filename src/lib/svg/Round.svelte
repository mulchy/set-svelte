<script lang="ts">
  import type { Color, Fill } from "../types";

  export let fill: Fill;
  export let color: Color;
</script>

<rect rx="30" height="50" width="100" y="0" x="0" stroke={color} {fill} />

