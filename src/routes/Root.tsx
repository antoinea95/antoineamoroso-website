import { Outlet } from "react-router-dom"

export const Root = () => {


    return (
        <main className="font-degular text-sm sm:text-base relative">
            <Outlet />
        </main>
    )
}