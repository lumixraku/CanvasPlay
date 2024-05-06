import { Menu, Navbar } from "./components";
import { Outlet, useNavigation } from "react-router-dom";

function App() {
    const navigation = useNavigation();

    const loadedClassNames = "flex-1 flex flex-col overflow-hidden";

    return (
        <div className="flex flex-col h-screen">
            <Navbar/>

            <div
                className="flex-1 flex flex-row"
            >
                <Menu/>
                <main
                    className={
                        navigation.state === "loading" ? "w-1/4 loading" : loadedClassNames
                    }
                >
                    <div className="outlet">

                    <Outlet/>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default App;