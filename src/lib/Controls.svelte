<script lang="ts">
    import { findSet } from "./set";
    import { deal, state, newGame } from "./state";
</script>

<div class="sidebar">
    <div>
        <h1>Sets Found: {$state.count}</h1>
        <p>Cards remaining: {$state.deck.length}</p>
    </div>
    <div>
        <button
            on:click={() => deal(1, state)}
            disabled={$state.visible.length >= 20 ||
                findSet($state.visible) != null}>Deal Another Card</button
        >
    </div>
    <div>
        <button on:click={() => newGame(state)}>New Game</button>
    </div>
</div>

<style>
    .sidebar {
        position: fixed;
        top: 0;
        right: 0;
        width: 15vw;
        height: 100%;
        background-color: lavender;
        padding: 1em;
        box-sizing: border-box;
    }
</style>
