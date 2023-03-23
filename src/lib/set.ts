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

export function isSet(cards: CardType[]) {
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

    const correctColor =
        compared.color.size === 1 || compared.color.size === 3;
    const correctShape =
        compared.shape.size === 1 || compared.shape.size === 3;
    const correctFill =
        compared.fill.size === 1 || compared.fill.size === 3;
    const correctNumber =
        compared.number.size === 1 || compared.number.size === 3;

    return correctColor && correctFill && correctNumber && correctShape;
}


export function findSet(visible: CardType[]): CardType[] | null {
    for (let i = 0; i < visible.length; i++) {
        for (let j = i + 1; j < visible.length; j++) {
            for (let k = j + 1; k < visible.length; k++) {
                if (isSet([visible[i], visible[j], visible[k]])) {
                    return [visible[i], visible[j], visible[k]]
                }
            }
        }
    }

    return null;
}