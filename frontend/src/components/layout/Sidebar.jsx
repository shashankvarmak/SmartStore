import { NavLink } from "react-router-dom";

function Sidebar() {

    const menus = [

        {
            name: "Dashboard",
            path: "/admin/dashboard"
        },
        {
            name: "Reservations",
            path: "/admin/reservations"
        },
        {
            name: "Products",
            path: "/admin/products"
        },
        {
            name: "Categories",
            path: "/admin/categories"
        }

    ];

    return (

        <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col bg-slate-900 text-white shadow-xl">

            <div className="border-b border-slate-700 p-6">

                <h1 className="text-3xl font-bold text-emerald-400">

                    SmartStore

                </h1>

                <p className="mt-2 text-sm text-slate-400">

                    Admin Panel

                </p>

            </div>

            <nav className="mt-6 flex flex-col gap-2 px-4">

                {

                    menus.map(menu => (

                        <NavLink

                            key={menu.path}

                            to={menu.path}

                            className={({ isActive }) =>

                                `rounded-xl px-4 py-3 transition

                                ${isActive

                                    ? "bg-emerald-600"

                                    : "hover:bg-slate-800"

                                }`

                            }

                        >

                            {menu.name}

                        </NavLink>

                    ))

                }

            </nav>

        </aside>

    );

}

export default Sidebar;