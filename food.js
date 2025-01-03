import { generateRandomInteger } from "./utils.js";

export class Food {

  maxX;

  maxY;

  x;

  y;

  constructor(maxX, maxY) {
    this.maxX = maxX;
    this.maxY = maxY;

    this.generate([]);
  }

  generate(forbiddenPoints) {
    do {
      this.x = generateRandomInteger(0, this.maxX);
      this.y = generateRandomInteger(0, this.maxY);
    } while (forbiddenPoints.find(
      point => point.x === this.x && point.y === this.y
    ));
  }

}
