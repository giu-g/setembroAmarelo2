document.addEventListener('DOMContentLoaded', () => {
    const images = ['img1', 'img2', 'img3', 'img4', 'img5', 'img6', 'img7', 'img8', 'img9'];
    const correctOrder = ['img1', 'img4', 'img7', 'img2', 'img5', 'img8', 'img3', 'img6', 'img9'];

    const imageRow = document.getElementById('image-row');
    const puzzleGrid = document.getElementById('puzzle-grid');
    const message = document.getElementById('message');
    const overlay = document.querySelector('.overlay');
    const helpBox = document.getElementById('help-box');
    const helpButton = document.getElementById('help-button');
    const resetButton = document.getElementById('reset-button');
    const indexButton = document.getElementById('index-button');
    const nextPuzzleButton = document.getElementById('next-puzzle-button');

    function createImageElement(src) {
        const img = document.createElement('img');
        img.src = `assets/puzzle2/${src}.png`;
        img.alt = src;
        img.style.width = '100px';
        img.style.height = '100px';
        img.setAttribute('draggable', 'true');
        img.dataset.name = src;
        img.addEventListener('dragstart', handleDragStart);
        return img;
    }

    function createGridCell() {
        const cell = document.createElement('div');
        cell.addEventListener('dragover', handleDragOver);
        cell.addEventListener('drop', handleDrop);
        return cell;
    }

    function handleDragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.dataset.name);
    }

    function handleDragOver(e) {
        e.preventDefault();
    }

    function handleDrop(e) {
        e.preventDefault();
        const name = e.dataTransfer.getData('text/plain');
        const cell = e.target;

        if (cell.dataset.name) {
            return;
        }

        cell.style.backgroundImage = `url(assets/puzzle2/${name}.png)`;
        cell.dataset.name = name;

        const img = document.querySelector(`.row img[data-name="${name}"]`);
        if (img) {
            img.remove();
        }

        checkCompletion();
    }

    function checkCompletion() {
        const cells = Array.from(puzzleGrid.children);
        const filledCells = cells.map(cell => cell.dataset.name);
        if (JSON.stringify(filledCells) === JSON.stringify(correctOrder)) {
            message.style.display = 'block';
            document.querySelector('.buttons').style.display = 'flex';
            overlay.style.display = 'block';
            overlay.style.opacity = '1';
        }
    }

    function initialize() {
        const shuffledImages = [...images].sort(() => 0.5 - Math.random());

        shuffledImages.forEach(img => {
            imageRow.appendChild(createImageElement(img));
        });

        for (let i = 0; i < 9; i++) {
            puzzleGrid.appendChild(createGridCell());
        }
    }

    initialize();

    helpButton.addEventListener('click', function () {
        helpBox.style.display = 'block';
        document.body.style.overflow = 'hidden'; 

        setTimeout(function () {
            helpBox.style.display = 'none';
            document.body.style.overflow = '';
        }, 7000);
    });

    resetButton.addEventListener('click', () => {
        window.location.reload();
    });

    indexButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
});
