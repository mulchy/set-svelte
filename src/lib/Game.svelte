<script lang="ts">
    import { fly } from "svelte/transition";
    import Card from "./Card.svelte";
    import { isSet } from "./set";
    import { repeat } from "./utils";
    import { gameOver, state, removeSelected, increaseScore, deal} from "./state";

    function checkForSetAndRemove() {
        if (isSet($state.visible.filter((card) => card.selected))) {
            removeSelected(state);
            increaseScore(state)
        }

        if ($state.visible.length < 12) {
            repeat({ times: 12 - $state.visible.length, delay: 500 }, () =>
                deal(1, state)
            );
        }
    }
</script>

<div class="board">
    {#each $state.visible as card (card)}
        <div transition:fly|local={{ y: 100 }}>
            <Card
                {...card}
                on:click={() => {
                    card.selected = !card.selected;
                    checkForSetAndRemove();
                }}
            />
        </div>
    {/each}

    {#if $gameOver}
        <h1>
            You found them all in {(new Date().getTime() -
                $state.start.getTime()) /
                1000} seconds!
        </h1>
    {/if}
</div>

<style>
    .board {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        grid-template-rows: repeat(3, 1fr);
        grid-gap: 20px;
        height: 100vh;
        padding: 100px calc(100px + 15vw) 100px 100px;
        box-sizing: border-box;
    }

    /* .set {
      background-color: antiquewhite;
    } */
</style>
