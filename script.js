import { Canvas } from './canvas.js';
import { Food } from './food.js';
import { Snake } from './snake.js';

const startButton = document.getElementById('start');
const overHint = document.getElementById('over');
overHint.style.display = 'none';

let interval;

const element = document.getElementById('canvas');
const canvas = new Canvas(element);

const food = new Food(29, 29);
const snake = new Snake(29, 29);

startButton.addEventListener('click', () => {
  interval = setInterval(tick, 80);
  startButton.style.display = 'none'
  overHint.style.display = 'none';
  snake.init();
  food.generate(snake.parts);
})

function tick() {
  snake.move();

  if (snake.hasColision()) {
    canvas.clear();
    clearInterval(interval);
    overHint.style.display = 'block';
    startButton.style.display = 'block';
    return;
  }

  if (snake.getHead().x === food.x
    && snake.getHead().y === food.y) {
    snake.growOnMove = true;
    food.generate(snake.parts);
  }

  canvas.clear();
  canvas.renderFood(food);
  canvas.renderSnake(snake);
}
