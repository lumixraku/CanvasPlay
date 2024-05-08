import { FC } from 'react';
import { NavLink, Outlet, useNavigation } from "react-router-dom";
import { router } from '../../router';

interface MenuProps {
    parentId: string;
}

export const Menu: FC<MenuProps> = (props: { parentId: string; }) => {
    const { parentId } = props;
    const { routes } = router;
    const subMenus = routes[0]?.children?.filter(c => c.id == parentId);
    if (!subMenus || subMenus?.length == 0) return null;
    const subMenu = subMenus[0];

    return (
        <div className="flex border-b">
            {
                subMenu?.children?.map((route) => (
                    <div className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 focus:outline-none transition duration-150 ease-in-out"
                        key={route.id}
                    ><NavLink to={route.path!}>{route.id}</NavLink>
                    </div>
                ))
            }
        </div>
    );
};
export const MathScene: FC = () => {
    const navigation = useNavigation();

    const loadedClassNames = "flex-1 flex flex-col overflow-hidden";

    return <>
        <h2>Math Scene</h2>
        <Menu parentId="Math"></Menu>
        <div
            className="flex-1 flex flex-row"
        >
            <main
                className={
                    navigation.state === "loading" ? "w-1/4 loading" : loadedClassNames
                }
            >
                <div className="outlet">

                    <Outlet />
                </div>
            </main>
        </div>
    </>;
};

// const router = createHashRouter([
//     {
//         path: "/Math",
//         element: <MathScene/>,
//         errorElement: <ErrorPage/>,
//         children: [
//             {
//                 path: "/Math/PointInPlygon",
//                 element: <MathScene/>,
//                 id: "PointInPlygon"
//             },          
//         ]
//     }
// ]);

// export const router = createHashRouter([
//     {
//         path: "/",
//         element: <App/>,
//         errorElement: <ErrorPage/>,
//         children: [
//             {
//                 path: "/",
//                 // element: <Plum/>,
//                 id: "Plum"
//             },
//             {
//                 path: "/BasicScene",
//                 element: <MathScene/>,
//                 id: "BasicScene"
//             },
//         ]
//     }
// ]);