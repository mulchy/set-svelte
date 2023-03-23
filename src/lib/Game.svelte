<script lang="ts">
    import { fly } from "svelte/transition";
    import Card from "./Card.svelte";
    import { findSet, isSet } from "./set";
    import { repeat } from "./utils";
    import {
        gameOver,
        state,
        removeSelected,
        increaseScore,
        deal,
    } from "./state";
    import deckLogo from '../assets/deck.svg';

    function checkForSetAndRemove() {
        if (isSet($state.visible.filter((card) => card.selected))) {
            removeSelected(state);
            increaseScore(state);
        }

        if ($state.visible.length < 12) {
            repeat({ times: 12 - $state.visible.length, delay: 500 }, () =>
                deal(1, state)
            );
        }
    }
</script>

<header>
    <div>
        <h1>Sets Found: {$state.count}</h1>
    </div>

    <div>
        <h1>
            <img src={deckLogo} alt="Deck Logo" width="32px" height="32px" on:click={() => deal(1, state)}>{$state.deck.length}
        </h1>
    </div>
</header>

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
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(7, 180px);
        grid-gap: 10px;
        height: calc(100vh - 100px);
        /* padding: 100px calc(100px + 15vw) 100px 100px; */
        box-sizing: border-box;
    }

    /* .set {
      background-color: antiquewhite;
    } */

    header {
        min-height: 100px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    header h1 img {
        vertical-align: middle;
    }
</style>
