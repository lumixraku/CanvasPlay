import { FC, useEffect, useRef } from 'react';
import { Bezier } from "./bezierinfo/bezier.js";
export const BezierjsDemo: FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {

        // 获取Canvas上下文
        const ctx = canvasRef.current!.getContext('2d')!;

        // now do things. Like this:
        const curve = new Bezier(100, 25, 10, 90, 110, 100, 150, 195);

        const p = curve.points,
            p1 = p[0],
            p2 = p[1],
            p3 = p[2],
            p4 = p[3];

        // draw the curve
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.bezierCurveTo(p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);
        ctx.stroke();
        ctx.closePath();


        var LUT = curve.getLUT(16);
        LUT.forEach((p: any) => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = 'blue'; // 设置填充颜色
            ctx.fill(); // 填充圆，使其看起来像一个圆点
            ctx.closePath();

        });
        // what do we know about the curve?
        let len = curve.length();
        let bbox = JSON.stringify(curve.bbox());
        console.log(bbox);
    }, []);
    return (<>
        <canvas ref={canvasRef} id="myCanvas" width="600" height="600" style={{ width: '600px', height: '600px' }}></canvas>
    </>);

};