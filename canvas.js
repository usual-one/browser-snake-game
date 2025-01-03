export class Canvas {

  element;

  context;

  constructor(element) {
    this.element = element;
    this.context = element.getContext('2d');
    this.clear();
  }

  clear() {
    this.context.fillStyle = '#FBDCE2';
    this.context.fillRect(0, 0, 300, 300);
  }

  renderFood(food) {
    this.context.fillStyle = '#0ACDFF';
    this.context.fillRect(food.x * 10, food.y * 10, 10, 10);
  }

  renderSnake(snake) {
    this.context.fillStyle = '#60AB9A';
    for (const part of snake.parts) {
      this.context.fillRect(part.x * 10, part.y * 10, 10, 10);
    }

    this.context.fillStyle = '#CC9F3E';
    this.context.fillRect(snake.getHead().x * 10, snake.getHead().y * 10, 10, 10);
  }

}
