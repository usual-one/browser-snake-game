export class Snake {

  maxX;

  maxY;

  x;

  y;

  parts;

  direction;

  growOnMove;

  constructor(maxX, maxY) {
    this.maxX = maxX;
    this.maxY = maxY;

    this.init();
    this.subscribeKeyPress();

  }

  subscribeKeyPress() {
    document.addEventListener('keydown', event => {
      if (event.key === 'ArrowRight') {
        this.direction = 'right';
      }
      if (event.key === 'ArrowLeft') {
        this.direction = 'left';
      }
      if (event.key === 'ArrowUp') {
        this.direction = 'up';
      }
      if (event.key === 'ArrowDown') {
        this.direction = 'down';
      }
    });
  }

  init() {
    const headX = Math.floor(this.maxX / 2);
    const headY = Math.floor(this.maxY / 2);
    this.parts = [
      new SnakePart(headX, headY - 1),
      new SnakePart(headX, headY),
    ];
    this.direction = 'down';
    this.growOnMove = false;
  }

  hasColision() {
    return !!this.parts.slice(0, this.parts.length - 1).find(
      part => part.x === this.getHead().x
        && part.y === this.getHead().y
    );
  }

  getHead() {
    return this.parts[this.parts.length - 1];
  }

  move() {
    const newPart = this.growOnMove
      ? new SnakePart(this.parts[0].x, this.parts[0].y)
      : undefined;

    for (const i in this.parts) {
      const index = Number.parseInt(i);
      if (index !== this.parts.length - 1) {
        this.parts[index].set(
          this.parts[index + 1].x, this.parts[index + 1].y
        );
      }
    }

    if (newPart) {
      this.parts = [ newPart, ...this.parts ];
    }
    this.growOnMove = false;

    const head = this.getHead();
    if (this.direction === 'down') {
      head.set(head.x, head.y + 1);
    }
    if (this.direction === 'up') {
      head.set(head.x, head.y - 1);
    }
    if (this.direction === 'right') {
      head.set(head.x + 1, head.y);
    }
    if (this.direction === 'left') {
      head.set(head.x - 1, head.y);
    }
    if (head.x < 0) {
      head.x = this.maxX;
    }
    if (head.y < 0) {
      head.y = this.maxY;
    }
    if (head.x > this.maxX) {
      head.x = 0;
    }
    if (head.y > this.maxY) {
      head.y = 0;
    }
  }

}

export class SnakePart {

  x;

  y;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  set(x, y) {
    this.x = x;
    this.y = y;
  }

}
