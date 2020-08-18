# easy-sprite

## Install


```console
npm install --save easy-sprite.js
```

or

```console
yarn add easy-sprite.js
```

**如何使用**

```js
import {Stage, Rect, Ellipse} from 'easy-sprite.js';

const canvas = document.getElementById('canvas');
  class MyGame extends Stage {

  }

  const stage = new MyGame(canvas, {
    width: 1000,
    height: 600,
  });

  stage.showFPS = true;

  // 添加一个矩形
  const rect = new Rect(100, 100, 100, 100);
  rect.fillStyle = 'green';
  stage.addChild(rect);
  // 旋转 会影响children
  rect.rotation = 45 * Math.PI * 2 / 360;

  // 矩形上面添加一个椭圆
  const ellipse = new Ellipse(50, 50, 50, 40);
  ellipse.fillStyle = 'red';
  rect.addChild(ellipse);

 // 事件侦听
  ellipse.addEventListener('click', (e) => {
    console.log(e)
  })

```

**关于动画的使用，自行选择喜欢的动画库即可，以下以 tween.js 为例**

```console
npm install --save  @tweenjs/tween.js@^18
```

or

```console
yarn add  @tweenjs/tween.js@^18
```

```js

 class MyGame extends Stage {
    onUpdated(time: number) {
      TWEEN.update(time);
    }
  }

  const stage = new MyGame(canvas, {
    width: 1000,
    height: 600,
  });

  stage.showFPS = true;

  // 添加一个矩形
  const rect = new Rect(100, 100, 100, 100);
  rect.fillStyle = 'green';
  stage.addChild(rect);
  // 旋转 会影响children
  rect.rotation = 45 * Math.PI * 2 / 360;

  // 矩形上面添加一个椭圆
  const ellipse = new Ellipse(50, 50, 50, 40);
  ellipse.fillStyle = 'red';
  ellipse.rotation = 45 * Math.PI * 2 / 360;
  rect.addChild(ellipse);



  // 补间动画
  new TWEEN.Tween(rect)
    .to({ x: rect.x + 500, y: rect.y, rotation: 360 * Math.PI * 2 / 360 }, 1000)
    .easing(TWEEN.Easing.Quadratic.Out)
    .repeat(Infinity)
    .yoyo(true)
    .start(0)

```


## Sprite 展示元素的基类

|方法名称     |                  说明    |          类型                          |
|:-----------|------------------------: | :-----------------------------------: |
|addChild    | 添加子节点                |    (sprite: Sprite): void             |
|removeChild | 移除子节点                |    (sprite: Sprite): void             |
|removeAll   | 移除所有子节点            |    (): void                           |
|contains    | 是否是包含的子节点         |   (sprite: Sprite) : boolean          |
|isHitPoint  | 碰撞检测                  |   (x: number, y: number): boolean     |
|addEventListener  | 添加事件侦听                  |   (type: EventType, handler: EventTypeHandler): void     |
|removeEventListener  | 移除事件侦听               |   (type: EventType, handler: EventTypeHandler): void     |
|stopPropagation  | 是否取消冒泡                   |   (): void     |
|isHitPoint  | 碰撞检测                  |   (x: number, y: number): boolean     |
|onBeforeUpdate  | 更新之前的回调,需要重写此方法                  |   (): void     |
|onUpdated  | 更新之后的回调,需要重写此方法                  |   (time:number): void     |


|属性名称     |                  说明    |          类型                          |
|:-----------|------------------------: | :-----------------------------------: |
|x           | x 坐标，默认0                   |    number                             |
|y           | y 坐标，默认0                   |    number                             |
|width       | 宽，默认0                       |   number                              |
|height      | 高，默认0                       |   number                              |
|rotation    | 旋转角度，默认0°          |   number                               |
|zIndex      | 层级，默认0                     |   number                               |
|transformOrigin|   旋转点，默认 ['center', 'center'] |   ['left'  'right'  'center'  'top'  'bottom'] |
|children   |子节点，默认[]                   |   Sprite[]                               |
|parent     |父节点，默认null                  | Sprite|null                          |
|touchEnabled|是否响应事件，默认true            | boolean                   |
|Graphics    |重写部分 canvas.context               |                    |

