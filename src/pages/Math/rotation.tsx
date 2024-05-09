import { FC, useEffect, useRef } from 'react';
import { DEG_TO_RAD, Graphics, Matrix, autoDetectRenderer, Container, Ticker } from 'pixi.js';
// import { matrixMultiplyFlat , convertPixiMatrixTo4x4 } from '/Math/utils.js';

const rotateRectAtCenter: () => [Graphics, () => void] = () => {
  const shape = new Graphics();
  shape.rect(40, 40, 20, 20); // 绘制一个矩形
  shape.fill(0xFF0000);


  // 计算图形的中心点坐标
  let centerX = 50;
  let centerY = 50;
  // 定义旋转角度（以弧度为单位）
  let rotation = 0;
  const rotateFn = () => {
    // 每一帧旋转一度
    rotation += DEG_TO_RAD; // 将角度转换为弧度
    // 创建一个矩阵并应用旋转和平移变换
    const matrix = new Matrix();

    // https://www.bilibili.com/video/BV1X7411F744/?p=3&share_source=copy_web&vd_source=76c6f2759e5467105ef75ed3ec3b58ce&t=3240
    //  translate center to origin
    // matrix.translate(-centerX, -centerY); // 移动 rotate center 到 origin 位置
    // matrix.rotate(rotation);
    // matrix.translate(centerX, centerY); // 平移到旋转点
    // 上面语句可以简写为
    matrix.translate(-centerX, -centerY).rotate(rotation).translate(centerX, centerY);

    // 也可以使用下面的表达形式
    // 注意顺序! 实际上是最后一个 append 的矩阵变换最先执行
    // matrix
    //     .append(new PIXI.Matrix(1, 0, 0, 1, centerX, centerY))
    //     .append(new PIXI.Matrix().rotate(rotation))
    //     .append(new PIXI.Matrix(1, 0, 0, 1, -centerX, -centerY))

    // 将矩阵应用于图形的变换
    shape.setFromMatrix(matrix);

  };
  return [
    shape, rotateFn
  ];
};

const rotateAtCertainPoint: (pivot: [number, number]) => [Graphics, () => void] = (pivot) => {
  // 创建一个矩形
  let rect = new Graphics();
  rect.rect(100, 100, 100, 100);
  rect.fill(0xFFFF00);


  // 旋转中心
  let rotationCenterX = pivot[0];
  let rotationCenterY = pivot[1];
  let angle = 0;

  // 旋转动画
  const rotateFn = () => {
    angle += DEG_TO_RAD; // 将角度转换为弧度

    // 创建一个新的矩阵
    let matrix = new Matrix();

    // 平移到旋转中心
    matrix.translate(-rotationCenterX, -rotationCenterY);

    // 应用旋转
    matrix.rotate(angle);

    // 回到原来的位置
    matrix.translate(rotationCenterX, rotationCenterY);

    // 应用矩阵到矩形
    rect.setFromMatrix(matrix);
  };
  return [rect, rotateFn];
};
export const RotationWithMatrix: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);


  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const renderer = autoDetectRenderer({
      width: canvas.width,
      height: canvas.height,
      view: canvas, // 将已有的 canvas 元素作为渲染视图
      resolution: window.devicePixelRatio, // 可以根据设备像素比提高渲染质量
    });
    renderer.then((render) => {
      const stage = new Container();

      const [shape1, fn1] = rotateRectAtCenter();
      const [shape2, fn2] = rotateAtCertainPoint([250, 250]);
      stage.addChild(shape1);
      stage.addChild(shape2);

      // 创建一个动画循环
      const ticker = Ticker.system;
      ticker.add(() => {
        fn1();
        fn2();

        // 渲染舞台到 canvas
        render.render(stage);
      });
      ticker.start();
      // 渲染舞台到 canvas
      render.render(stage);

    });

    // 创建一个旋转矩阵
  }, []);
  return (
    <>
      <div>Matrix 表示旋转</div>
      <canvas ref={canvasRef} id="myCanvas" width="600" height="600" style={{width: '600px', height: '600px'}}></canvas>

    </>);

};