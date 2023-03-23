<script lang="ts">
  import Card from "./lib/Card.svelte";
  import { shuffle, allPossibleCombos } from "./lib/combos";
  import type { CardType, Color, Fill, NumberType, Shape } from "./lib/types";

  import { fly } from "svelte/transition";
  import { repeat } from "./lib/utils";

  let started = false;
  let deck = [];
  let visible = [];
  let count = 0;
  let gameStart = null
  $: setVisisble = setExists(visible)
  $: gameOver = started && deck.length === 0 && !setVisisble

  function checkForSetAndRemove() {
    if (isSet(visible.filter((card) => card.selected))) {
      removeSelected();
      count = count + 1;
    }

    if (visible.length < 12) {
      repeat({ times: 12 - visible.length, delay: 500 }, () => deal(1));
    }
  }

  function isSet(cards: CardType[]) {
    if (cards.length != 3) {
      return false;
    }

    const compared = cards.reduce(
      (acc, card) => {
        return {
          color: acc.color.add(card.color),
          shape: acc.shape.add(card.shape),
          number: acc.number.add(card.number),
          fill: acc.fill.add(card.fill),
        };
      },
      {
        number: new Set<NumberType>(),
        shape: new Set<Shape>(),
        color: new Set<Color>(),
        fill: new Set<Fill>(),
      }
    );

    const correctColor = compared.color.size === 1 || compared.color.size === 3;
    const correctShape = compared.shape.size === 1 || compared.shape.size === 3;
    const correctFill = compared.fill.size === 1 || compared.fill.size === 3;
    const correctNumber =
      compared.number.size === 1 || compared.number.size === 3;

    return correctColor && correctFill && correctNumber && correctShape;
  }

  function reset() {
    visible = [];
    count = 0;
    deck = shuffle(allPossibleCombos());
  }

  function deal(n: number) {
    visible = visible.concat(deck.splice(0, n));
    deck = deck
  }

  function removeSelected() {
    visible = visible.filter((card) => !card.selected);
  }

  function newGame() {
    reset();
    repeat({ delay: 500, times: 12 }, () => deal(1));
    started = true;
    gameStart = new Date()
  }

  function setExists(visible) {
    for(let i = 0; i < visible.length; i++) {
      for(let j = i + 1; j < visible.length; j++) {
        for (let k = j + 1; k < visible.length; k++) {
          if (isSet([visible[i], visible[j], visible[k]])) {
            return true
          }
        }
      }
    }
    return false
  }
</script>

<main>
  {#each visible as card (card)}
    <div transition:fly|local={{ y: 100 }} class:set={card.set}>
      <Card
        {...card}
        on:click={() => {
          card.selected = !card.selected;
          checkForSetAndRemove();
        }}
      />
    </div>
  {/each}

  {#if gameOver }
    <h1>You found them all in {(new Date().getTime() - gameStart.getTime()) / 1000} seconds!</h1>
  {/if}
  
</main>

<div class="sidebar">
  {#if !started}
    <div>
      <button
        on:click={() => {
          newGame();
        }}>New Game</button
      >
    </div>
  {:else}
    <div>
      <h1>Sets Found: {count}</h1>
      <p>Cards remaining: {deck.length}</p>
    </div>
    <div>
      <button on:click={() => deal(1)} disabled={visible.length >= 20 || setVisisble}
        >Deal Another Card</button
      >
    </div>
    <div>
      <button on:click={newGame}>New Game</button>
    </div>
  {/if}
</div>

<style>
  main {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-gap: 20px;
    height: 100vh;
    padding: 100px calc(100px + 15vw) 100px 100px;
    box-sizing: border-box;
  }

  .sidebar {
    position: fixed;
    top: 0;
    right: 0;
    width: 15vw;
    height: 100%;
    background-color: lavender;
    padding: 4em;
    box-sizing: border-box;
  }

  /* .set {
    background-color: antiquewhite;
  } */
</style>
