<script lang="ts">
  import type { Color, Fill } from "../types";

  export let fill: Fill;
  export let color: Color;
</script>

<rect rx="30" height="48" width="98" y="1" x="1" stroke={color} {fill} />

