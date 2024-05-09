import { FC, useEffect, useRef } from 'react';
import * as opentype from 'opentype.js';
import { Path } from '@konghayao/opentype.js';
// 官方 opentype 不支持 fromSVG, 虽然已经在 master 上, 但是 release 不支持
// 因此暂用第三方 opentype.js 代替
export const FontShapePathByOpentype: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {

    // 获取Canvas上下文
    const ctx = canvasRef.current!.getContext('2d')!;

    const drawFont = async () => {

      // 加载字体文件，这里假设你有一个字体文件的URL
      const buffer = fetch('/font/ZCOOLQingKeHuangYou-Regular.ttf').then(res => res.arrayBuffer());
      const font = opentype.parse(await buffer);
      const opentypePath = font.getPath('圣诞树Tree', 0, 0, 72);
      const pathStr = opentypePath.toPathData(1);
      const pathShadow = new Path2D(pathStr);
      // const path = new Path2D(pathStr);
      const path = new Path();
      path.fromSVG(pathStr); // 官方 master 中提供 flipY 参数



      ctx.beginPath();
      ctx.translate(150, 250);
      ctx.filter = 'blur(4px)';
      ctx.fill(pathShadow);
      ctx.filter = 'none';
      ctx.closePath();

      ctx.save();
      ctx.beginPath();
      // 使用opentype.js来处理字体，发现路径绘制时上下颠倒了，这是因为字体的坐标系统与Canvas的坐标系统不一致。
      // 在字体设计中，y坐标通常向上增长，而在Canvas API中，y坐标向下增长。
      ctx.scale(1, -1); // 在y轴方向翻转画布 
      path.draw(ctx);
      ctx.closePath();
      ctx.restore();
    };
    drawFont();
  }, []);
  return (<>
    <canvas ref={canvasRef} id="myCanvas" width="600" height="600" style={{ width: '600px', height: '600px' }}></canvas>
  </>);

};