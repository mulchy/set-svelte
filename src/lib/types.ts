export type Fill = 'empty' | 'dashed' | 'solid'
export type Color = 'red' | 'green' | 'purple';
export type Shape = "diamond" | "round" | "squiggle";
export type NumberType = 1 | 2 | 3

export type CardType = {
    color: Color,
    fill: Fill,
    shape: Shape,
    number: NumberType,
    selected: boolean,
}