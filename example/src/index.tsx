
import { Stage, Rect, Sprite, Circle, Ellipse, Shape, GlobalState, getFPS } from 'easy-sprite.js';

class FPS extends Shape {
  x = 200;
  y = 400;
  _draw() {
    this.Graphics.clear();
    this.Graphics.font = '30px serif';
    this.Graphics.fillStyle = '#fff';
    this.Graphics.fillText(
      getFPS().toString(),
      0,
      0
    );
    super._draw();
  }
}

class CustomCircle extends Shape {
  private velocityX: number = 0;
  private velocityY: number = 0;
  private radius: number = 0;
  constructor(x: number, y: number, radius: number, velocityX: number, velocityY: number, color: string) {
    super();
    this.x = x;
    this.y = y;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.radius = radius;
    this.fillStyle = color;
  }

  onUpdated() {
    if (this.isInStage()) {
      this.x += this.velocityX;
      this.y += this.velocityY;
    } else {
      this.parent && this.parent.removeChild(this);
    }
  }

  isInStage() {
    if (this._x < 0) return false;
    if (this._x > GlobalState.root.width) return false;
    if (this._y < 0) return false;
    if (this._y > GlobalState.root.height) return false;
    return true;
  }

  _draw() {
    this.Graphics.clear();
    this.Graphics.arc(
      0,
      0,
      this.radius,
      0,
      2 * Math.PI,
    );
    super._draw();
  }
}

class Explosion extends Sprite {
  private radius: number
  constructor(id: number, x: number, y: number, radius: number, hue: number) {
    super();
    this.x = x;
    this.y = y;
    this.radius = radius;
    let particleAmount = 50;
    let particleSeparation = (Math.PI * 2) / particleAmount
    for (let i = 0; i < particleAmount; i++) {
      let color = 'hsl(' + hue + ', 100%, 50%)';
      const circle = new CustomCircle(0, 0, radius, Math.sin(particleSeparation), Math.cos(particleSeparation), color);
      this.addChild(circle);
      particleSeparation += particleSeparation;
    }
  }

  onBeforeUpdate() {
    if (!this.children.length) {
      this.parent && this.parent.removeChild(this);
    }
  }

}

class MyGame extends Stage {
  private hue: number = 214;
  private timer: number = 0;
  private isHueIncreasing: boolean = false;
  public mouseX: number = this.width / 2;
  public mouseY: number = this.height / 2;
  private index: number = 0;

  onUpdated() {
    this.timer += 1;

    if (this.timer % 12 === 0) {
      if (this.hue > 0 && this.isHueIncreasing === false) {
        this.hue -= 2;
      } else {
        this.hue += 2;
      }

      if (this.hue <= 0) {
        this.isHueIncreasing = true;
      } else if (this.hue >= 254) {
        this.isHueIncreasing = false;
      }
      const exp = new Explosion(this.index++, this.mouseX, this.mouseY, 4, this.hue);
      this.addChild(exp);
    }
  }
}

const canvas = document.getElementById('canvas') as HTMLCanvasElement;

const stage = new MyGame(canvas, {
  width: window.innerWidth,
  height: window.innerHeight,
});

// 背景
const bg = new Rect(0, 0, stage.width, stage.height);
bg.zIndex = -1;
bg.fillStyle = '#000';
stage.addChild(bg);

const fps = new FPS();
fps.zIndex = 999;
stage.addChild(fps);

// stage.addEventListener('mousemove', (e) => {
//   stage.mouseX = e.stageX;
//   stage.mouseY = e.stageY;
// })
