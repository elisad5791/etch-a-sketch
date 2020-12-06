let regime = 0;
let states = [];
const container = document.getElementById('container');
const clearBtn = document.getElementById('clear');
clearBtn.addEventListener('click', clearArea);
const newBtn = document.getElementById('new');
newBtn.addEventListener('click', newGrid);
const penBtn = document.getElementById('pen');
penBtn.addEventListener('click', pen);
const rainbowBtn = document.getElementById('rainbow');
rainbowBtn.addEventListener('click', rainbow);
const greyBtn = document.getElementById('grey'); 
greyBtn.addEventListener('click', grey);
createGrid(16);

function createGrid(cellCount) {
    let cellSize = 512 / cellCount + 'px';
    let cell;

    for (let i = 0; i < cellCount; i++) {
        for (let j = 0; j < cellCount; j++) {
            cell = document.createElement('div');
            cell.style.height = cellSize;
            cell.style.width = cellSize;
            cell.setAttribute('data-state', '100');
            cell.classList.add('cell');
            cell.addEventListener('mouseover', visit);
            container.append(cell);
        }
    }
}

function visit(e) {
    let lightness;
    if (regime === 1) {
        e.target.style.backgroundColor = '#000';  
    } else if (regime === 2) {
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);
        const str = "rgb(" + red + ", " + green + ", " + blue + ")";
        e.target.style.backgroundColor = str;
    } else if (regime === 3) {
        lightness = e.target.getAttribute('data-state');
        if (lightness > 0) lightness -= 10;
        e.target.setAttribute('data-state', lightness); 
        e.target.style.backgroundColor = 'hsl(0, 0%, ' + lightness + '%)';
    }
}

function clearArea() {
    const divs = document.querySelectorAll('.cell');
    divs.forEach(element => element.style.backgroundColor = "#fff");
}

function newGrid() {
    clearArea();
    container.innerHTML = '';
    let cellCount;
    do {
        cellCount = prompt('How many squares per side (16, 32, 64)?', '16');
    } while (!(cellCount == 16 || cellCount == 32 || cellCount == 64));
    createGrid(cellCount);
}

function pen() {
    regime = 1;
    clearArea();
}

function rainbow() {
    regime = 2;
    clearArea();
}

function grey() {
    regime = 3;
    clearArea();
}