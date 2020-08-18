import { Shape } from '../display/Shape';

export class Line extends Shape {
  private stack: { x: number, y: number }[] = [];
  constructor(x: number, y: number) {
    super();
    this.x = x;
    this.y = y;
  }

  addLineTo(x: number, y: number) {
    this.stack.push({ x, y })
  }

  _draw() {
    this.Graphics.clear();
    this.Graphics.beginPath();
    this.Graphics.moveTo(
      0, 0
    );
    this.stack.forEach(item => {
      this.Graphics.lineTo(
        item.x - this.x, item.y - this.y
      );
    })

    super._draw();
  }

}
