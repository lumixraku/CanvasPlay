import { FC, useEffect, useRef } from 'react';
type Point = { x: number, y: number };
type Vector2D = [number, number];
function pointToLineDistance(p:Point, p1:Point, p2:Point) {
    // 计算直线向量 P1P2
    var vectorP1P2: [number, number] = [p2.x - p1.x, p2.y - p1.y];

    // 计算点 C 到直线上某一点的向量表示 P1C
    var vectorP1C: [number, number] = [p.x - p1.x, p.y - p1.y];

    // 计算直线向量 P1P2 的模的平方
    var dotP1P2 = dotProduct(vectorP1P2, vectorP1P2);

    // 计算投影长度 len
    var len = dotProduct(vectorP1C, vectorP1P2) / dotP1P2;

    // 计算最短距离的点的坐标
    var shortestPoint = {
        x: p1.x + len * (p2.x - p1.x),
        y: p1.y + len * (p2.y - p1.y)
    };

    // 计算最短距离
    var distance = Math.abs(len);

    return {
        distance: distance,
        shortestPoint: shortestPoint
    };
}

function dotProduct(vec1:Vector2D, vec2:Vector2D) {
    var dot = 0;
    for (var i = 0; i < vec1.length; i++) {
        dot += vec1[i] * vec2[i];
    }
    return dot;
}

// 示例点和直线
var pointC = { x: 2, y: 3 };
var pointP1 = { x: 1, y: 1 };
var pointP2 = { x: 5, y: 4 };

// 调用函数计算最短距离和最短距离点的坐标
var result = pointToLineDistance(pointC, pointP1, pointP2);

console.log("最短距离:", result.distance);
console.log("最短距离点坐标:", result.shortestPoint);

export const ShortestPoint: FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const canvas = canvasRef.current! as HTMLCanvasElement;
        const ctx = canvas.getContext("2d")!;

        // 定义点和直线的坐标
        var pointC = { x: 250, y: 150 };
        var pointP1 = { x: 100, y: 100 };
        var pointP2 = { x: 300, y: 300 };

        const {distance, shortestPoint} = pointToLineDistance(pointC, pointP1, pointP2);

        const drawPoint = (point:Point, color?:string) => {
            ctx.beginPath();
            ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
            ctx.fillStyle = color || "red";
            ctx.fill();
        }

        const drawLine = (point1:Point, point2:Point) => {
            ctx.beginPath();
            ctx.moveTo(point1.x, point1.y);
            ctx.lineTo(point2.x, point2.y);
            ctx.stroke();
            ctx.closePath();
        }

        drawPoint(pointC, 'blue');
        drawPoint(pointP1);
        drawPoint(pointP2);

        drawPoint(shortestPoint, 'blue');

        drawLine(pointP1, pointP2);
        drawLine(pointC, shortestPoint);

    }, []);

    return (<>
        <h2>ShortestPoint</h2>
        <canvas ref={canvasRef} id="myCanvas" width="600" height="600" style={{width: '600px', height: '600px'}}></canvas>
    </>);
};