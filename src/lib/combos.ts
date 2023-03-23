import type { CardType, Color, Fill, NumberType, Shape } from "./types"

const colors: Color[] = ['red', 'green', 'purple']
const shapes: Shape[] = ['squiggle', 'diamond', 'round']
const fills: Fill[] = ['empty', 'dashed', 'solid']
const numbers: NumberType[] = [1, 2, 3]

export function allPossibleCombos(): CardType[] {
    return colors.flatMap(color =>
        shapes.flatMap(shape =>
            fills.flatMap(fill =>
                numbers.map(number => {
                    return {
                        color,
                        shape,
                        fill,
                        number,
                        selected: false
                    }

                }))))
}

function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

export function shuffle<T>(array: T[]): T[] {
    for (let i = 0; i < array.length; i++) {
        const j = getRandomInt(i, array.length)

        const tmp = array[i]
        array[i] = array[j]
        array[j] = tmp
    }

    return array
}
