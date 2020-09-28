export function config() {
    return {
        border: 5 * 2, //2 * border from Border css,
        topScoreBoardHeight: 50
    };
}

export function charactersParams() {
    return {
        step: 50,
        size: 50 //character size 50x50 px
    };
}

export function selectRandomColor() {
    var colors = ['yellow', 'red', 'blue'];
    var index = Math.floor(Math.random() * colors.length);
    return colors[index];
}