import { Stage } from './Stage';
import { Event } from '../event/Event';
import { isSprite } from '../utils/isStage';
import { Graphics } from './Graphics';
import { GlobalState } from '../state/GlobalState';
type TransformOrigin = 'left' | 'right' | 'center' | 'top' | 'bottom';

export class Sprite extends Event {
  private _zIndex: number = 0;
  private _degree: number = 0;
  public parent: Sprite | null = null;
  public children: Sprite[] = [];
  public touchEnabled = true;
  public x: number = 0;
  public y: number = 0;
  public width: number = 0;
  public height: number = 0;
  public transformOrigin: [TransformOrigin, TransformOrigin] = [
    'center',
    'center',
  ];

  protected path = new Path2D();
  protected Graphics: Graphics = new Graphics(this);

  addChild(sprite: Sprite) {
    this.children.push(sprite);
    this.children = this.children.sort((a, b) => a.zIndex - b.zIndex);
    sprite.parent = this;
  }

  removeChild(sprite: Sprite) {
    sprite.parent = null;
    this.children = this.children.filter((child) => child === sprite);
  }

  removeAll() {
    this.children = [];
  }

  _update(time: number) {
    this.onBeforeUpdate();
    const ctx = GlobalState.ctx;

    // this
    this.path = new Path2D();
    this.path.rect(this._x, this._y, this.width, this.height);

    ctx.save();
    ctx.translate(this._translateX, this._translateY);
    ctx.rotate(this._rotation);
    ctx.translate(-this._translateX, -this._translateY);

    // Graphics
    this._draw();
    this.Graphics.print();
    ctx.restore();

    // children
    this.children.forEach((sprite) => {
      sprite._update(time);
    });

    this.onUpdated(time);
  }

  protected _draw() { }

  contains(child: Sprite | Stage | null): boolean {
    while (child) {
      if (child === this) {
        return true;
      }
      if (isSprite(child)) {
        child = child.parent;
      } else {
        child = null;
      }
    }
    return false;
  }

  isHitPoint(x: number, y: number): boolean {
    return (
      GlobalState.ctx.isPointInPath(this.path, x, y) ||
      this.Graphics.isHitPoint(x, y) ||
      this.children.some((child) => child.isHitPoint(x, y))
    );
  }

  get rotation() {
    return this._degree;
  }

  set rotation(degree: number) {
    if (!this.width || !this.height) {
      throw new Error('设置旋转之前必须有宽高');
    }
    this._degree = degree;
  }

  get _x(): number {
    return this.parent && this.parent._x ? this.parent._x + this.x : this.x;
  }

  get _y(): number {
    return this.parent && this.parent._y ? this.parent._y + this.y : this.y;
  }

  get _rotation(): number {
    return this.parent && this.parent._rotation
      ? this.parent._rotation + this.rotation
      : this.rotation;
  }

  get _translateX(): number {
    // 'left' | 'right' | 'center' | 'top' | 'bottom'
    let translateX = this._x + this.width / 2;
    if (this.transformOrigin.includes('left')) {
      translateX = this._x;
    } else if (this.transformOrigin.includes('right')) {
      translateX = this._x + this.width;
    }
    if (!this.parent) return translateX;
    return this.rotation ? translateX : this.parent._translateX;
  }

  get _translateY(): number {
    let translateY = this._y + this.height / 2;
    if (this.transformOrigin.includes('top')) {
      translateY = this._y;
    } else if (this.transformOrigin.includes('bottom')) {
      translateY = this._y + this.height;
    }
    if (!this.parent) return translateY;
    return this.rotation ? translateY : this.parent._translateY;
  }
  get zIndex() {
    return this._zIndex;
  }

  get root(): Sprite | null {
    return this.parent ? this.parent.root : this.parent;
  }

  set zIndex(zIndex: number) {
    this._zIndex = zIndex;
    if (this.parent) {
      this.parent.children = this.parent.children.sort(
        (a, b) => a.zIndex - b.zIndex
      );
    }
  }
}
