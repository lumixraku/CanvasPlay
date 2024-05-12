import { FC } from "react";
import { LightModeIcon } from "../../assets/svg/lightModeIcon.tsx";
import { GithubLogoLight } from "../../assets/svg/githubLogoLight.tsx";
import { useTheme } from "../../hooks/useTheme.ts";

export const Navbar: FC = () => {
    const {theme, setTheme} = useTheme();
    return (
        <div className="navbar sticky top-0 z-30 bg-opacity-90 backdrop-blur shadow-sm">
            <div className="flex-1">
                <a href="/" className="btn btn-ghost text-xl">Canvas play</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal">
                    <li>
                        <a onClick={() => {
                            setTheme(theme === "dark" ? "light" : "dark");
                        }}>
                            <LightModeIcon className="h-6 w-6"/>
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/lumixraku/canvasPlay" target="_blank"
                           rel="noopener noreferrer">
                            <GithubLogoLight className="h-6 w-6"/>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};