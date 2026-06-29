import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import TopBar from "../components/layout/TopBar";

function AdminLayout() {

    return (

        <div className="flex min-h-screen bg-slate-100">

            <Sidebar />

            <div className="ml-64 flex flex-1 flex-col">

                <TopBar />

                <main className="flex-1 p-8">

                    <Outlet />

                </main>

            </div>

        </div>

    );

}

export default AdminLayout;