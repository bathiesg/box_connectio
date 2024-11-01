const boxes = document.querySelectorAll('.box');
const canvas = document.getElementById('connectionCanvas');
const ctx = canvas.getContext('2d');
let selectedBoxes = [];

canvas.width = document.querySelector('.boxes').clientWidth;
canvas.height = document.querySelector('.boxes').clientHeight;

window.addEventListener('resize', () => {
  canvas.width = document.querySelector('.boxes').clientWidth;
  canvas.height = document.querySelector('.boxes').clientHeight;
  drawLines();
});

boxes.forEach((box) => {
  box.addEventListener('click', () => {
    if (box.classList.contains('selected')) {
      box.classList.remove('selected');
      selectedBoxes = selectedBoxes.filter((b) => b !== box);
    } else {
      box.classList.add('selected');
      selectedBoxes.push(box);
    }
  });
});

document.getElementById('connect').addEventListener('click', drawLines);
document.getElementById('reset').addEventListener('click', removeSelected);

function drawLines() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (selectedBoxes.length < 2) return;

  ctx.strokeStyle = '#777171';
  ctx.lineWidth = 2;

  for (let i = 0; i < selectedBoxes.length - 1; i++) {
    const boxA = selectedBoxes[i];
    const boxB = selectedBoxes[i + 1];

    const rectA = boxA.getBoundingClientRect();
    const rectB = boxB.getBoundingClientRect();

    const startX = rectA.left + rectA.width / 2 - canvas.getBoundingClientRect().left;
    const startY = rectA.top + rectA.height / 2 - canvas.getBoundingClientRect().top;
    const endX = rectB.left + rectB.width / 2 - canvas.getBoundingClientRect().left;
    const endY = rectB.top + rectB.height / 2 - canvas.getBoundingClientRect().top;

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  }
}

function removeSelected() {
  boxes.forEach((box) => {
    box.classList.remove('selected');
  });
  selectedBoxes = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
