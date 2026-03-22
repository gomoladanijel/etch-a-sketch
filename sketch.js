const grid = document.querySelector(".grid");
const createGridBtn = document.querySelector(".create-grid-btn");
const resetBtn = document.querySelector(".reset-btn");

const DEFAULT_GRID_SIZE = 10;

function changeColor() {
    const RED = Math.floor(Math.random() * 255);
    const GREEN = Math.floor(Math.random() * 255);
    const BLUE = Math.floor(Math.random() * 255);

    return `rgb(${RED}, ${GREEN}, ${BLUE})`;
}

function createGrid(size) {
    let isMouseDown = false;
    window.onmousedown = () => (isMouseDown = true);
    window.onmouseup = () => (isMouseDown = false);

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const cell = document.createElement("div");
            cell.classList.add("grid-cell");

            cell.style.width = `${480 / size}px`;
            cell.style.height = `${480 / size}px`;

            grid.appendChild(cell);

            cell.addEventListener("mousedown", (e) => {
                e.preventDefault();
                cell.style.backgroundColor = changeColor();
            });

            cell.addEventListener("mouseenter", () => {
                if (isMouseDown) {
                    cell.style.backgroundColor = changeColor();
                }
            });
        }
    }
}

function resetGrid() {
    const cells = document.querySelectorAll(".grid-cell");

    cells.forEach(cell => cell.style.backgroundColor = "#fff");
}

createGrid(DEFAULT_GRID_SIZE);

createGridBtn.addEventListener("click", () => {
    let gridSize;

    do {
        gridSize = prompt("What number of squares per side do you want (max of 100)?");

        if (gridSize == null || gridSize === "") {
            break;
        }
    } while (!Number.isInteger(+gridSize) || +gridSize <= 0 || +gridSize > 100);

    grid.textContent = "";
    createGrid(+gridSize);
});

resetBtn.addEventListener("click", resetGrid);