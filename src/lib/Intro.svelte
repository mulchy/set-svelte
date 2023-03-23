<script lang="ts">
    import Card from "./Card.svelte";
    import { newGame, state } from "./state";
</script>

<div class="container">
    <h1>How to play <a href="https://en.wikipedia.org/wiki/Set_(card_game)">set</a></h1>

    <p>Set is a matching card game. The goal is to identify a set as quickly as possible. Each card has 4 features: </p>
    <ul>
        <li>Color (red, green, purple)</li>
        <li>Shape (round, diamond, squiggle)</li>
        <li>Fill (empty, dashed, solid)</li>
        <li>Number (1,2,3)</li>
    </ul>
   

    <p>
        Three cards form a <em>set</em> if each attribute is either all the same
        or all different. For example the following three cards form a set since the colors are all different, the shapes are all the same, the fills are all different, and the numbers are the same.</p>
    <div class="cards">
        <Card color="red" shape="squiggle" fill="empty" number={1} />
        <Card color="green" shape="squiggle" fill="dashed" number={1} />
        <Card color="purple" shape="squiggle" fill="solid" number={1} />
    </div>

    <p>These three cards <em>do not</em> form a set since two of colors are green, but the third color is purple.</p>
    <div class="cards">
        <Card color="green" shape="squiggle" fill="empty" number={1} />
        <Card color="green" shape="squiggle" fill="dashed" number={1} />
        <Card color="purple" shape="squiggle" fill="solid" number={1} />
    </div>


    <button on:click={() => newGame(state)}>Start Game</button>
</div>

<style>
    .cards {
        width: 100%;
        display: flex;
        justify-content: space-around;
        margin: 2em 0;
    }

    .container {
        max-width: 50vw;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        place-items: center;
    }

    button {
        margin-top: 3em;
    }

    ul {
        margin: 0;
    }
</style>
