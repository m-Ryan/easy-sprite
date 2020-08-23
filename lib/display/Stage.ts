import { Sprite } from './Sprite';
import { EvenManager } from '../event/EvenManager';
import { GlobalState } from '../state/GlobalState';
import { getFPS } from '../utils/fps';

export class Stage extends Sprite {
  private _width: number = 0;
  private _height: number = 0;
  public offsetTop: number = 0;
  public offsetLeft: number = 0;
  public showFPS: boolean = false;

  constructor(
    canvas: HTMLCanvasElement,
    options: {
      width: number;
      height: number;
    }
  ) {
    super();
    GlobalState.setRoot(this);
    GlobalState.setCanvas(canvas);
    const { width, height } = options;
    this.width = width;
    this.height = height;
    const { top, left } = canvas.getBoundingClientRect();
    this.offsetTop = top;
    this.offsetLeft = left;

    // resize
    this.resize();

    // 事件监听
    this.initEventListener();

    // 绘图
    this.run();
  }

  _update(time: number) {
    GlobalState.ctx.clearRect(0, 0, 10000, 10000);
    super._update(time);
    this.children.forEach((sprite) => {
      sprite._update(time);
    });
  }

  private run() {
    requestAnimationFrame((time) => {
      this._update(time);
      this.run();
    });
  }

  public findTarget(stageX: number, stageY: number): Sprite | null {
    let target: Sprite | null = null;
    let current: any = this;
    while (current) {
      const children = current.children;
      current = null;
      for (let i = children.length - 1; i >= 0; i--) {
        const child = children[i];
        if (child.isHitPoint(stageX, stageY)) {
          target = child;
          current = child;
          break;
        }
      }
    }
    return target;
  }

  public initEventListener() {
    EvenManager.addEventListener(this);
  }

  public get width() {
    return this._width;
  }

  public set width(num: number) {
    this._width = num;
    this.resize();
  }

  public get height() {
    return this._height;
  }

  public set height(num: number) {
    this._height = num;
    this.resize();
  }

  public resize() {
    if (!GlobalState.canvas) return;

    //缩放保持清晰
    const dpi = window.devicePixelRatio;
    GlobalState.canvas.width = this.width * dpi;
    GlobalState.canvas.height = this.height * dpi;
    GlobalState.canvas.style.width = this.width + 'px';
    GlobalState.canvas.style.height = this.height + 'px';
    GlobalState.ctx.scale(dpi, dpi);

  }

}
