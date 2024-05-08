import { FC, useEffect, useRef } from 'react';



export const PointInPolygon: FC = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        // 获取 canvas 元素
        const canvas = canvasRef.current! as HTMLCanvasElement;
        const ctx = canvas.getContext('2d')!;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        // 绘制多边形
        function drawPolygon(points: number[][]) {
            ctx.beginPath();
            ctx.moveTo(points[0][0], points[0][1]);
            for (let i = 1; i < points.length; i++) {
                ctx.lineTo(points[i][0], points[i][1]);
            }
            ctx.closePath();
            ctx.stroke();
        }

        // 判断点是否在多边形内部
        function isPointInPolygon(point: number[], polygon: number[][]) {
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


                // 如果(x < ((xj - xi) * (y - yi) / (yj - yi) + xi)) 的结果为真，表示交点在射线的左侧，需要进行计数；如果结果为假，表示交点在射线的右侧，不进行计数。

                // 最终，通过统计射线与多边形边界的交点个数的奇偶性，可以确定点是否在多边形内部。


                // 注意左右的含义
                // 如果一个点位于射线的左侧，意味着从射线的起点出发，逆时针方向旋转到达该点。而位于射线的右侧则意味着从射线起点出发，顺时针方向旋转到达该点。

                if (((yi > y) !== (yj > y)) && (x < ((xj - xi) * (y - yi) / (yj - yi) + xi))) {
                    isInside = !isInside;
                }
            }

            return isInside;
        }

        // 绘制多边形
        const polygonPoints = [
        [[100, 100], [200, 50], [300, 100], [250, 200], [150, 200]],
        [[100, 100], [200, 130], [300, 100], [250, 200], [150, 200]],
        ];

        // 待判断的点
        const pointToCheck = [200, 150];
        for (let i = 0; i < polygonPoints.length; i++) {
            const poly = polygonPoints[i];
            ctx.translate(i * 100, i * 100);
            drawPolygon(poly);

            // 判断点是否在多边形内部
            const isInside = isPointInPolygon(pointToCheck, poly);

            ctx.beginPath();
            ctx.arc(pointToCheck[0], pointToCheck[1], 3, 0, 2 * Math.PI);
            ctx.fillStyle = isInside ? 'green' : 'red';
            ctx.fill();

        }

    }, []);

    return <>
        <h2>PointInPolygon</h2>
        <canvas ref={canvasRef} id="myCanvas" width="800" height="600"></canvas>
        参考
        <a href="https://www.bilibili.com/video/BV1ce4y1j7a6/?spm_id_from=333.337.search-card.all.click&vd_source=66ae80b89912671707a9b77834e03720" className="text-blue-600 hover:text-blue-800 visited:text-purple-600 underline hover:underline-offset-2 transition duration-150 ease-in-out">点是否在多边形内问题算法深度剖析</a>

        <p>
            其中提到了使用矢量的方法判断, 做叉积, 但是不推荐.
            一个是计算复杂(可能存在精度丢失), 另一个是并不能完全满足 (例如凹多边形)
        </p>

        <p>本方法对凹多边形多样适用</p>
    </>;
};