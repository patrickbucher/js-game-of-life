"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const world = document.getElementById("world");
    const rows = Number.parseInt(world.getAttribute("data-rows"));
    const cols = Number.parseInt(world.getAttribute("data-cols"));

    const intervalControl = document.getElementById("interval");
    const startStopButton = document.getElementById("start-stop");
    const clearButton = document.getElementById("clear");

    drawEmptyWorld(world, rows, cols);
    let field = addGlider(initField(rows, cols));
    // TODO: add another object to the field (see below)
    updateWorld(field);

    let interval = undefined;

    const animate = () => {
        field = computeNextGeneration(field);
        updateWorld(field);
    };

    const stopAnimation = () => {
        clearInterval(interval);
        interval = undefined;
        startStopButton.textContent = "Start";
    };

    startStopButton.addEventListener("click", () => {
        if (interval) {
            stopAnimation();
        } else {
            interval = setInterval(animate, intervalControl.value);
            startStopButton.textContent = "Stop";
        }
    });

    clearButton.addEventListener("click", () => {
        field = initField(rows, cols);
        updateWorld(world, field);
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
            if (c > 0) {
                cell.setAttribute("class", "cell");
            } else {
                cell.setAttribute("class", "cell break");
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

// TODO: add another object at some other index for variety

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
    let livingNeighbours = 0;
    // TODO: compute livingNeighbours of cell at index (row,col)
    return livingNeighbours;
}

function computeNextGeneration(oldField) {
    const newField = [];
    for (let r = 0; r < oldField.length; r++) {
        const newRow = [];
        for (let c = 0; c < oldField[r].length; c++) {
            // TODO: use countLivingNeighbours to compute neighboursAlive
            const cell = oldField[r][c];
            const neighboursAlive = -1;

            // TODO: apply the rules to set nextStateAlive properly
            const nextStateAlive = false;
            newRow.push(nextStateAlive);
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
