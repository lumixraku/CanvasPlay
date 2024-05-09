import { Router, createHashRouter } from "react-router-dom";
import App from "../App";
import { ErrorPage } from "../components/ErrorPage";
// import { Plum } from "../pages/canvas/plum";
import {

    MathScene,
} from "../pages";
import { PointInPolygon } from '../pages/Math/point-in-polygon';
import { ShortestPoint } from '../pages/Math/shortest-point';
import { RotationWithMatrix } from '../pages/Math/rotation';
import { DetectPointInRectByMatrix } from '../pages/Math/detect-point-in-rect-by-matrix';
import { FontShapePathByOpentype } from '../pages/font/opentype-font-path';
import { FontScene } from '../pages/font';
type HashRouter = ReturnType<typeof createHashRouter>;

export const router: HashRouter = createHashRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                // element: <Plum/>,
                id: "Plum"
            },
            {
                path: "/font",
                element: <FontScene />,
                id: "font",
                children: [
                    {
                        path: "fontShapePathByOpentype",
                        element: <FontShapePathByOpentype />,
                        id: "fontShapePathByOpentype"
                    },
                ]
            },
            {
                path: "/Math",
                element: <MathScene />,
                id: "math",
                children: [
                    {
                        path: "pointInPolygon",
                        element: <PointInPolygon />,
                        id: "PointInPolygon"
                    },
                    {
                        path: "shortestPoint",
                        element: <ShortestPoint />,
                        id: "shortestPoint"
                    },
                    {
                        path: "rotation",
                        element: <RotationWithMatrix />,
                        id: "rotation"
                    },
                    {
                        path: "pointInRotatedRect",
                        element: <DetectPointInRectByMatrix />,
                        id: "pointInRotatedRect"
                    },
                ]
            }
        ]
    }
]);
// export const router: HashRouter = createHashRouter([
//     {
//         path: '/',
//         element: <App />, // 假设你有一个 App 组件作为根组件
//         children: [
//             {
//                 path: 'math',
//                 element: <MathScene />, // Math 组件作为 /math 的元素
//                 children: [
//                     {
//                         path: 'a',
//                         element: <PointInPolygon />, // MathA 组件作为 /math/a 的元素
//                         children: [
//                             {
//                                 path: 'aa', // 注意这里的路径是 'aa' 而不是 '/aa'
//                                 element: <ShortestPoint />, // MathAA 组件作为 /math/a/aa 的元素
//                             },
//                             // 可以继续添加更多的子路由
//                         ],
//                     },
//                     // 可以添加 /math 下的其他子路由
//                 ],
//             },
//             // 可以添加更多的顶级路由
//         ],
//     },
//     // 其他配置...
// ]);