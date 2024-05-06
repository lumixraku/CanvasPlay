import { createHashRouter } from "react-router-dom";
import App from "../App";
import { ErrorPage } from "../components/ErrorPage";
// import { Plum } from "../pages/canvas/plum";
import {
    
    BasicScene,
} from "../pages";

export const router = createHashRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/",
                // element: <Plum/>,
                id: "Plum"
            },
            {
                path: "/BasicScene",
                element: <BasicScene/>,
                id: "BasicScene"
            },
        ]
    }
]);