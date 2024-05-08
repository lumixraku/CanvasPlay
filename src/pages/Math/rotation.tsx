import { FC, useEffect, useRef } from 'react';
import { DEG_TO_RAD, Graphics, Matrix, Application, autoDetectRenderer } from 'pixi.js';
// import { matrixMultiplyFlat , convertPixiMatrixTo4x4 } from '/Math/utils.js';
export const RotationWithMatrix: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const renderer = autoDetectRenderer({
      view: canvas, // 指定 Canvas 元素
      width: canvas.width, // 设置渲染器的宽度和 Canvas 元素宽度相同
      height: canvas.height // 设置渲染器的高度和 Canvas 元素高度相同
  });

    // 创建一个旋转矩阵
  }, []);
  return (
    <>
      <div>Matrix 表示旋转</div>
      <canvas ref={canvasRef} width={600} height={600} />;

    </>);

};