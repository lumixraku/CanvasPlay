import { FC, useEffect, useRef } from 'react';
import { DEG_TO_RAD, Graphics, Matrix, autoDetectRenderer, Container, Ticker, Point, Renderer } from 'pixi.js';

// 判断点 P 是否在未旋转的矩形内的函数
function isPointInRectangle(point: Point, rectPoints: Point[]) {
  const [p1, p2, p3, p4] = rectPoints;

  const minX = Math.min(p1.x, p2.x, p3.x, p4.x);
  const maxX = Math.max(p1.x, p2.x, p3.x, p4.x);
  const minY = Math.min(p1.y, p2.y, p3.y, p4.y);
  const maxY = Math.max(p1.y, p2.y, p3.y, p4.y);

  return point.x >= minX && point.x <= maxX && point.y >= minY && point.y <= maxY;
}

export const DetectPointInRectByMatrix: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawARect = () => {
    const rectangle = new Graphics();

    // 定义矩形的四个顶点坐标（顺时针或逆时针方向）
    const w = 300;
    const h = 100;
    const P1 = new Point(100, 200);
    const P2 = new Point(P1.x + w, P1.y);
    const P3 = new Point(P1.x + w, P1.y + h);
    const P4 = new Point(P1.x, P1.y + h);
    const centerX = P1.x + w / 2;
    const centerY = P1.y + h / 2;
    const rectPoints = [P1, P2, P3, P4];
    // 绘制旋转后的矩形
    rectangle.beginFill(0x00FF00); // 使用绿色填充
    rectangle.moveTo(P1.x, P1.y);
    rectangle.lineTo(P2.x, P2.y);
    rectangle.lineTo(P3.x, P3.y);
    rectangle.lineTo(P4.x, P4.y);
    rectangle.lineTo(P1.x, P1.y);
    rectangle.endFill();

    // 创建矩阵并进行旋转
    const matrix = new Matrix();
    const angle = 15;
    const radians = angle * Math.PI / 180;

    // matrix.rotate(radians); // 将矩阵以左上角旋转45度（以弧度为单位）注意此刻旋转点是坐标原点 (0, 0)
    // 围绕矩形中心点旋转
    matrix.translate(-centerX, -centerY);
    matrix.rotate(radians);
    matrix.translate(centerX, centerY);

    // 应用矩阵变换
    rectangle.setFromMatrix(matrix);
    // rectangle.transform.setFromMatrix(matrix); // OLD API

    return { rectangle, matrix, rectPoints };

  };

  const onMouseMove = (event: MouseEvent, { renderer, mousePoint, matrix, rectPoints }: { renderer: Renderer, mousePoint: Graphics, matrix: Matrix, rectPoints: Point[]; }) => {
    // 获取鼠标在舞台上的坐标
    // const mousePosition = app.renderer.plugins.interaction.mouse.global;  // old
    const mousePosition = renderer.events.pointer.offset;

    // 清空图形对象
    mousePoint.clear();

    // 设置绘制属性
    const radius = 5; // 点的半径
    const color = 0x0000FF; // 点的颜色
    const inSideColor = 0xFF0000;

    // 判断点 P 的坐标
    const pointP = new Point(mousePosition.x, mousePosition.y);

    // 使用矩阵的 apply 方法将点 P 的坐标应用矩阵变换
    const transformedP = matrix.applyInverse(pointP);

    // 判断点 P 是否在未旋转的矩形内
    const isPointInside = isPointInRectangle(transformedP, rectPoints);

    // 输出判断结果
    console.log(isPointInside, mousePosition.x, mousePosition.y);

    // 绘制圆形的点
    mousePoint.beginFill(isPointInside ? inSideColor : color);
    mousePoint.drawCircle(pointP.x, pointP.y, radius);
    mousePoint.endFill();


  };
  useEffect(() => {
    const canvas = canvasRef.current!;
    const renderer = autoDetectRenderer({
      width: canvas.width,
      height: canvas.height,
      view: canvas, // 将已有的 canvas 元素作为渲染视图
      resolution: window.devicePixelRatio, // 可以根据设备像素比提高渲染质量
    });

    renderer.then((renderer) => {
      const stage = new Container();
      const { rectangle, matrix, rectPoints } = drawARect();


      const mousePoint = new Graphics();
      stage.addChild(rectangle, mousePoint);
      canvas.addEventListener('mousemove', (event: MouseEvent) => {
        onMouseMove(event, { renderer, mousePoint, matrix, rectPoints });
        renderer.render(stage);
      });
    });
  }, []);


  return (<>
    <canvas ref={canvasRef} id="myCanvas" width="600" height="600" style={{width: '600px', height: '600px'}}></canvas>
  </>);
};