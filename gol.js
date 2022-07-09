"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const world = document.getElementById("world");
    const rows = Number.parseInt(world.getAttribute("data-rows"));
    const cols = Number.parseInt(world.getAttribute("data-cols"));

    const intervalControl = document.getElementById("interval");
    const startStopButton = document.getElementById("start-stop");
    const clearButton = document.getElementById("clear");

    drawEmptyWorld(world, rows, cols);
    let field = addFPentomino(addGlider(initField(rows, cols)));
    updateWorld(field);

    let interval = undefined;

    const animate = () => {
        field = computeNextGeneration(field);
        updateWorld(field);
    };

    const stopAnimation = () => {
        clearInterval(interval);
        interval = undefined;
    };

    startStopButton.addEventListener("click", () => {
        if (interval) {
            stopAnimation();
            startStopButton.textContent = "Start";
        } else {
            interval = setInterval(animate, intervalControl.value);
            startStopButton.textContent = "Stop";
        }
    });

    clearButton.addEventListener("click", () => {
        field = initField(rows, cols);
        console.log(field);
        updateWorld(field);
        stopAnimation();
    });

    world.childNodes.forEach(n => {
        n.addEventListener("click", (e) => {
            const cell = e.target;
            const alive = cell.classList.toggle("alive");
            const id = cell.getAttribute("id");
            const [row, col] = getRowColFromID(id);
            field[row][col] = alive;
        });
    });
});

function drawEmptyWorld(world, rows, cols) {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cell = document.createElement("div");
            cell.setAttribute("id", `cell-${r}-${c}`);
            if (c == 0) {
                cell.setAttribute("class", "cell break");
            } else {
                cell.setAttribute("class", "cell");
            }
            world.appendChild(cell);
        }
    }
}

function initField(rows, cols) {
    const field = [];
    for (let r = 0; r < rows; r++) {
        const newRow = [];
        for (let c = 0; c < cols; c++) {
            newRow.push(false);
        }
        field.push(newRow);
    }
    return field;
}

function addGlider(field) {
    const glider = [];
    for (let r = 0; r < field.length; r++) {
        const newRow = [];
        for (let c = 0; c < field[r].length; c++) {
            const alive =
                r == 1 && c == 2 ||
                r == 2 && c == 3 ||
                r == 3 && c == 3 ||
                r == 3 && c == 1 ||
                r == 3 && c == 2;
            newRow.push(alive);
        }
        glider.push(newRow);
    }
    return glider;
}

function addFPentomino(field) {
    const fPentomino = [
        [false, true, true],
        [true, true, false],
        [false, true, false],
    ];
    const nRows = field.length;
    const nCols = field[0].length;
    const rowOffset = nRows / 2;
    const colOffset = nCols / 2;
    for (let r = 0; r < fPentomino.length; r++) {
        for (let c = 0; c < fPentomino[r].length; c++) {
            field[rowOffset + r][colOffset + c] = fPentomino[r][c];
        }
    }
    return field;
}

function updateWorld(field) {
    for (let r = 0; r < field.length; r++) {
        for (let c = 0; c < field[r].length; c++) {
            const id = `cell-${r}-${c}`;
            const cell = document.getElementById(id);
            if (field[r][c]) {
                cell.classList.add("alive");
            } else {
                cell.classList.remove("alive");
            }
        }
    }
}

function countLivingNeighbours(field, row, col) {
    const nRows = field.length;
    const nCols = field[0].length;
    const neighbourShifts = [
        [-1, -1], // north-west
        [-1, 0], // north
        [-1, +1], // north-east
        [0, +1], // east
        [+1, +1], // south-east
        [+1, 0], // south
        [+1, -1], // south-west
        [0, -1] // west
    ];
    let livingNeighbours = 0;
    const shiftWithClipping = (current, shift, max) => {
        const next = (current + shift) % max;
        return next < 0 ? max + next : next;
    };
    neighbourShifts.forEach(([rowShift, colShift]) => {
        const r = shiftWithClipping(row, rowShift, nRows);
        const c = shiftWithClipping(col, colShift, nCols);
        if (field[r][c]) {
            livingNeighbours++;
        }
    });
    return livingNeighbours;
}

function computeNextGeneration(oldField) {
    const newField = [];
    for (let r = 0; r < oldField.length; r++) {
        const newRow = [];
        for (let c = 0; c < oldField[r].length; c++) {
            const cell = oldField[r][c];
            const neighboursAlive = countLivingNeighbours(oldField, r, c);
            let alive = cell;
            if (cell) {
                if (neighboursAlive >= 2 && neighboursAlive <= 3) {
                    alive = true;
                } else if (neighboursAlive < 2) {
                    alive = false;
                } else if (neighboursAlive > 3) {
                    alive = false;
                }
            } else {
                if (neighboursAlive == 3) {
                    alive = true;
                }
            }
            newRow.push(alive);
        }
        newField.push(newRow);
    }
    return newField;
}

function getRowColFromID(id) {
    const pattern = /^cell-(\d+)-(\d+)$/;
    const match = id.match(pattern);
    if (match) {
        return [Number.parseInt(match[1]), Number.parseInt(match[2])];
    } else {
        throw `malformed id "${id}"`
    }
}
