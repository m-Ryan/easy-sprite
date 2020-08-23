import { Sprite } from "./Sprite";

export class Text extends Sprite {
  public fillStyle?: CanvasFillStrokeStyles['fillStyle'];
  public strokeStyle?: CanvasFillStrokeStyles['strokeStyle'];
  public text: string = '';
  public font: CanvasTextDrawingStyles['font'];
  public textAlign: CanvasTextDrawingStyles['textAlign'];
  public direction: CanvasTextDrawingStyles['direction'];
  public textBaseline: CanvasTextDrawingStyles['textBaseline'];

  _draw() {
    this.Graphics.clear();
    if (this.fillStyle) {
      this.Graphics.fillStyle = this.fillStyle;
    }

    if (this.strokeStyle) {
      this.Graphics.strokeStyle = this.strokeStyle;
    }

    if (this.textAlign) {
      this.Graphics.textAlign = this.textAlign;
    }

    if (this.textBaseline) {
      this.Graphics.textBaseline = this.textBaseline;
    }

    if (this.font) {
      this.Graphics.font = this.font;
    }

    if (this.fillStyle) {
      this.Graphics.fillText(this.text, this.x, this.y);
    }

    if (this.strokeStyle) {
      this.Graphics.strokeText(this.text, this.x, this.y);
    }
  }
}
