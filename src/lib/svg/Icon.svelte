<script lang="ts">
    import PatternDef from "./PatternDef.svelte";
    import type { Color, Fill } from "../types";

    export let fill: Fill
    export let color: Color

    function translateFill(fill: Fill, color: Color) {
        if (fill === 'empty') {
            return 'none'
        }

        if (fill === 'dashed') {
            return `url(#dashed-${color})`
        }

        if (fill === 'solid') {
            return color
        }
    }

    $: svgFill = translateFill(fill, color)
</script>

<svg viewBox="0 0 100 50">
    <PatternDef />
    <slot {color} fill={svgFill}></slot>
</svg>

<style>
   svg {
    width: 80%;
    
   }
</style>