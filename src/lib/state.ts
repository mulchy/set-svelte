import { derived, writable, type Writable } from "svelte/store";
import type { CardType } from "./types";
import { allPossibleCombos, findSet, isSet, shuffle } from './set'
import { repeat } from "./utils";
import { get } from 'svelte/store'
type State = {
    deck: CardType[],
    visible: CardType[],
    count: number,
    start: Date,
}

export const state = writable<State>({
    deck: [],
    visible: [],
    count: 0,
    start: undefined
})

export const gameOver = derived(state, s => s.start && s.deck.length === 0 && !findSet(s.visible))

export async function newGame(state: Writable<State>) {
    reset(state);
    await repeat({ delay: 500, times: 12 }, () => deal(1, state));
}

function reset(state: Writable<State>) {
    state.update((s) => ({
        ...s,
        visible: [],
        count: 0,
        deck: shuffle(allPossibleCombos()),
        start: new Date(),
    }));
}

export function deal(n: number, state: Writable<State>) {
    state.update((s) => ({
        ...s,
        visible: s.visible.concat(s.deck.slice(0, n)),
        deck: s.deck.slice(n),
    }));
}

export function removeSelected(state: Writable<State>) {
    state.update((s) => ({
        ...s,
        visible: s.visible.filter((card) => !card.selected),
    }));
}

export function increaseScore(state: Writable<State>) {
    state.update(s => ({ ...s, count: s.count + 1 }))
}