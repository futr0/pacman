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
    var index = returnRandomIndex(colors.length);
    return colors[index];
}

export function selectRandomPosition(positions) {
    var position = positions[returnRandomIndex(positions.length)];
    return {
        top: position.top,
        left: position.left
    };
}

export function returnTabName() {
    return 'Pacman - Simple React Game';
}

function returnRandomIndex(len) {
    var index = Math.floor(Math.random() * len);
    return index
}