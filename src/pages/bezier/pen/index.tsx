import { FC, useEffect, useRef, useState } from 'react';
import * as paper from 'paper';
import { marked } from 'marked';
import { existsSamePoint } from './util.mjs';
type GlobalState = {
    startPoint: Paper.Point | null;
    endPoint: paper.Point | null;
    drewLines: paper.Path[];
    currLine: paper.Path | null; //new paper.Path();;
    drawing: boolean;
    isDragging: boolean; // drag 松开时, cp 确定, 更新端点
    recKeyPoints: paper.Point[];
};

const htmlContent = marked.parse(`
## A Tool simulated pen tool in PS.

drawing a bezier curve when drag, create direct line when click
`);
export const PenDemo: FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [globalState] = useState<GlobalState>({
        recKeyPoints: [],
        startPoint: null,
        endPoint: null,
        drewLines: [],
        currLine: null,
        drawing: false,
        isDragging: false,    // drag 松开时, cp 确定, 更新端点         
    });
    const init = (canvas: HTMLCanvasElement) => {
        canvas.width = 600;
        canvas.height = 600;
        paper.setup(canvas);
        var dpr = window.devicePixelRatio || 1; // 获取设备像素比
        // 绑定事件处理程序
        paper.view.onMouseDown = onMouseDown;
        paper.view.onMouseDrag = onMouseDrag;
        paper.view.onMouseMove = onMouseMove;
        paper.view.onMouseUp = onMouseUp;
        paper.view.onClick = onMouseClick;
        (paper.view as (typeof paper.view & { onKeyDown: (e: any) => void; })).onKeyDown = onKeyDown;
    };
    // 当前的 controlPoint
    let cp1: paper.Path.Circle;
    let cp2: paper.Path.Circle;
    let cp1HandleLine: any;
    let cp2HandleLine: any;
    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvasRef.current!.getContext('2d')!;
        init(canvas);
    }, []);

    // 监听鼠标点击事件
    function onMouseDown(event: paper.MouseEvent) {

        if (!globalState.drawing) {
            globalState.drawing = true;
            globalState.currLine = startNewLine(event);
            drawASmallCircle(event.point);
            putAPoint(event.point);
        }

    }



    function onMouseMove(event: paper.MouseEvent) {
        console.log('moving', event.point);
        if (!globalState.drawing) return;
        // endPoint s= event.point; // 更新终点位置
        updateLastPoint(event);
    }


    // 监听鼠标拖拽事件
    function onMouseDrag(event: paper.MouseEvent) {
        if (!globalState.drawing) return;


        const lastSeg = getLastSegmentOfCurrLine();
        if (!globalState.isDragging) {
            // 创建 controlPoint
            let control = createControlPoint(lastSeg);
            cp1 = control.cp1;
            cp2 = control.cp2;
            cp1HandleLine = control.cp1HandleLine;
            cp2HandleLine = control.cp2HandleLine;
        }
        updateControlPoint(event, lastSeg, { cp1, cp2, cp1HandleLine, cp2HandleLine });
        globalState.isDragging = true;
    }

    // 监听鼠标Up事件
    // 新一轮的开始
    function onMouseUp(event: paper.MouseEvent) {

        let rawPoint = new paper.Point(event.point.x, event.point.y);
        let point = rawPoint;

        let filteredArray = globalState.recKeyPoints.slice(0, globalState.recKeyPoints.length - 1);
        let { exists, neareastPoint } = existsSamePoint(filteredArray, point);

        // end of curr line
        if (exists) {
            point = neareastPoint;
            endOfDraw();
        } else {
            putAPoint(point);
        }
    }

    // 监听键盘按下事件
    function onKeyDown(event: KeyboardEvent) {
        if (event.key === 'escape') {
            // 在按下ESC键时执行的操作
            console.log('结束编辑');
            endOfDraw();
        }
    }

    function onMouseClick(event: MouseEvent) {
        // debugger
        // isBezierMode = false;
    }


    function endOfDraw() {
        globalState.drawing = false;
        globalState.startPoint = null;
        globalState.drewLines.push(globalState.currLine!);
        // currCertainLine = null;
    }


    function startNewLine(event: paper.MouseEvent) {

        let currCertainLine = new paper.Path();
        currCertainLine.strokeColor = new paper.Color('black');
        currCertainLine.add(event.point);
        return currCertainLine;
    }

    function updateControlPoint(event: paper.MouseEvent, seg: paper.Segment, { cp1, cp2, cp1HandleLine, cp2HandleLine }: {
        cp1: paper.Path.Circle;
        cp2: paper.Path.Circle;
        cp1HandleLine: paper.Path;
        cp2HandleLine: paper.Path;
    }) {

        const pointOfSeg = seg.point;
        const eventPoint = event.point;
        cp1.position = eventPoint;
        const delta = eventPoint.subtract(pointOfSeg);
        cp2.position = pointOfSeg.subtract(delta);
        seg.handleIn = cp2.position.subtract(pointOfSeg);
        cp1HandleLine.segments[0].point = pointOfSeg;
        cp1HandleLine.segments[1].point = cp1.position;
        cp2HandleLine.segments[0].point = pointOfSeg;
        cp2HandleLine.segments[1].point = cp2.position;
    }

    function createControlPoint(seg: Paper.Segment) {

        let cp1HandleLine = new paper.Path();
        let cp2HandleLine = new paper.Path();
        let cp2 = new paper.Path.Circle(new paper.Point(-10, -10), 5);
        let cp1 = new paper.Path.Circle(new paper.Point(-10, -10), 5);
        cp1.fillColor = new paper.Color('green');
        cp2.fillColor = new paper.Color('blue');
        cp1HandleLine.strokeColor = new paper.Color('grey');
        cp1HandleLine.dashArray = [5, 5]; // 设置虚线样式    
        cp2HandleLine.strokeColor = new paper.Color('grey');
        cp2HandleLine.dashArray = [5, 5]; // 设置虚线样式    
        cp1HandleLine.add([-10, -10], [-10, -10]);
        cp2HandleLine.add([-10, -10], [-10, -10]);

        cp1.on('mousedown', function (event: paper.MouseEvent) {
            event.stopPropagation();
        });
        cp1.on('mouseup', function (event: paper.MouseEvent) {
            event.stopPropagation();
            globalState.isDragging = false;
            let lastSeg = getLastSegmentOfCurrLine();
            lastSeg.handleOut = cp1.position.subtract(lastSeg.point);
            if (globalState.drawing) {
                globalState.currLine!.add(event.point);  // 作为当前曲线的末端点                    
            }

        });
        cp1.on('mousedrag', function (event: paper.MouseEvent) {
            event.stopPropagation();

            cp1.position = cp1.position.add(event.delta);
            cp1HandleLine.segments[1].point = cp1.position;
            seg.handleOut = cp1.position.subtract(seg.point);
        });

        cp2.on('mousedown', function (event: paper.MouseEvent) {
            event.stopPropagation();
        });
        cp2.on('mouseup', function (event: paper.MouseEvent) {
            event.stopPropagation();

            globalState.isDragging = false;
            let lastSeg = getLastSegmentOfCurrLine();
            lastSeg.handleOut = cp2.position.subtract(lastSeg.point);
            if (globalState.drawing) {
                globalState.currLine!.add(event.point);  // 作为当前曲线的末端点                    
            }
        });
        cp2.on('mousedrag', function (event: paper.MouseEvent) {
            event.stopPropagation();

            cp2.position = cp2.position.add(event.delta);
            cp2HandleLine.segments[1].point = cp2.position;
            seg.handleIn = cp2.position.subtract(seg.point);
        });

        return { cp1HandleLine, cp2HandleLine, cp1, cp2 };

    }


    function drawASmallCircle(point: paper.Point) {
        const pointShape = new paper.Path.Circle(point, 5);
        pointShape.fillColor = new paper.Color('black');
        return pointShape;
    }

    function putAPoint(point: paper.Point) {
        globalState.startPoint = point;
        globalState.endPoint = point;

        globalState.currLine!.add(point);
        const pointIdx = Math.max(0, globalState.currLine!.segments.length - 1);
        globalState.recKeyPoints.push(point);
    }

    function updateLastPoint(event: paper.MouseEvent) {
        // 更新点的位置
        const lastSeg = getLastSegmentOfCurrLine();
        lastSeg.point = event.point;
    }

    function getLastSegmentOfCurrLine() {
        let lastOne = Math.max(0, globalState.currLine!.segments.length - 1);
        return globalState.currLine!.segments[lastOne];

    }

    return (<>
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        <canvas ref={canvasRef}></canvas>
    </>);
};