import { Shape } from '../display/Shape';

export class Rect extends Shape {

  constructor(x: number, y: number, width: number, height: number,) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  _draw() {
    this.Graphics.clear();
    this.Graphics.rect(
      0,
      0,
      this.width,
      this.height,
    );
    super._draw();
  }
}
