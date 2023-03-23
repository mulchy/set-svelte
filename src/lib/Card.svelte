<script lang="ts">
    import Diamond from "./svg/Diamond.svelte";
    import Icon from "./svg/Icon.svelte";
    import Round from "./svg/Round.svelte";
    import Squiggle from "./svg/Squiggle.svelte";
    import type { Color, Fill, NumberType, Shape } from "./types";
    import { createEventDispatcher } from "svelte";
    import { flip } from "svelte/animate";

    const dispatch = createEventDispatcher();

    export let number: NumberType;
    export let shape: Shape;
    export let fill: Fill;
    export let color: Color;
    export let selected = false;

    const getComponent = (shape) => {
        switch (shape) {
            case "diamond":
                return Diamond;
            case "round":
                return Round;
            case "squiggle":
                return Squiggle;
        }
    };

    const components = Array.from({ length: number }, () =>
        getComponent(shape)
    );
</script>

<div
    class="card"
    on:click
    on:keydown
    on:keypress
    on:keyup
    class:selected
>
    {#each components as component}
        <Icon let:color {color} let:fill {fill}>
            <svelte:component this={component} {color} {fill} />
        </Icon>
    {/each}
</div>

<style>
    .card {
        border: 2px solid black;
        box-shadow: 10px 10px 5px 1px grey;
        height: 200px;
        width: 180px;
        /* height: 100%;
        width: 100%; */
        padding: 2em;
        border-radius: 10px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
    }

    .card.selected {
        background-color: aliceblue;
    }
</style>
