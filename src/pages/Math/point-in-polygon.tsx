import { FC, useEffect, useRef } from 'react';
import { marked } from 'marked';
import { makePolygons, createPolygonPath, drawPolygon, addOffset } from "./utils.mjs";
import MarkdownContent from './point-in-polygon.md';
import pointInPolygonPic from '../../../public/img/point-in-polygon.jpg';

type Ploygon = { points: number[][], shape: Path2D };

export const PointInPolygon: FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // 判断点是否在多边形内部
    const isPointInPolygon = (point: [number, number], polygon: number[][]) => {
        const x = point[0], y = point[1];
        let isInside = false;

        for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
            const xi = polygon[i][0], yi = polygon[i][1];
            const xj = polygon[j][0], yj = polygon[j][1];

            // 检测点的位置是否在两个顶点的Y方向之间
            // (vc.y >= p.y && vn.y < p.y) || (vc.y < p.y && vn.y >= p.y)
            // 简化为 (yi > y) !== (yj > y)



            // 表达式(x < ((xj - xi) * (y - yi) / (yj - yi) + xi)) 是射线法中的一部分，用于判断射线与多边形边界的交点。

            // 具体来说，对于多边形的每条边，由两个顶点(xi, yi) 和(xj, yj) 组成。表达式中的(xj - xi) * (y - yi) / (yj - yi) 是根据当前边的斜率计算射线与该边的交点的 x 坐标。然后通过与射线发出点的 x 坐标 x 进行比较，判断交点是否在射线的左侧。
            // 或者也可以用相似三角形来看这个式子,  利用相似三角形求交点


            // 如果(x < ((xj - xi) * (y - yi) / (yj - yi) + xi)) 的结果为真，表示点在被检测边的左侧, 计数 + 1;

            // 如果结果为假，表示交点在被检测边的右侧，不进行计数。

            // 最终，通过统计射线与多边形边界的交点个数的奇偶性，可以确定点是否在多边形内部。


            if (((yi > y) !== (yj > y)) && (x < ((xj - xi) * (y - yi) / (yj - yi) + xi))) {
                isInside = !isInside;
            }
        }

        return isInside;
    };
    const bindEvent = (ctx: CanvasRenderingContext2D, polygons: Ploygon[]) => {
        const canvas = canvasRef.current! as HTMLCanvasElement;
        canvas.addEventListener('pointermove', e => {
            const rect = canvas.getBoundingClientRect(); // 获取元素的位置信息，包括相对于视口的位置
            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft; // 当前水平滚动位置
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop; // 当前垂直滚动位置

            const x = e.clientX - rect.left;// - scrollLeft; // 鼠标相对于元素左侧的水平位置，考虑滚动
            const y = e.clientY - rect.top;// - scrollTop; // 鼠标相对于元素顶部的垂直位置，考虑滚动
            for (const [i, poly] of polygons.entries()) {
                const isInside = isPointInPolygon([x, y], poly.points);
                if (isInside) {
                    ctx.strokeStyle = 'red';
                    ctx.stroke(poly.shape);
                } else {
                    ctx.strokeStyle = 'black';
                    ctx.stroke(poly.shape);
                }
            }
        });
    };
    useEffect(() => {
        // 获取 canvas 元素
        const canvas = canvasRef.current! as HTMLCanvasElement;
        const ctx = canvas.getContext('2d')!;
        const dpr = window.devicePixelRatio;
        canvas.style.width = canvas.width + 'px';
        canvas.style.height = canvas.height + 'px';
        canvas.width = canvas.width * dpr;
        canvas.height = canvas.height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const polygons = makePolygons() as unknown as Ploygon[];
        for (let i = 0; i < polygons.length; i++) {
            const points = polygons[i].points;
            const polyInPath2D = createPolygonPath(points);
            polygons[i].shape = polyInPath2D;
            drawPolygon(ctx, polyInPath2D);
        }
        bindEvent(ctx, polygons);
    }, []);

    return <>
        <h2>PointInPolygon</h2>
        <MarkdownContent/>
        <img src={pointInPolygonPic} alt="pointInPolygonPic" />
        <canvas ref={canvasRef} id="myCanvas" width="800" height="600"></canvas>
    </>;
};