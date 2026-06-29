function TopBar() {

    return (

        <header className="flex items-center justify-between border-b bg-white px-8 py-5 shadow-sm">

            <div>

                <h2 className="text-2xl font-bold">

                    Admin Dashboard

                </h2>

                <p className="text-slate-500">

                    Welcome back!

                </p>

            </div>

            <div className="text-right">

                <p className="font-semibold">

                    Admin

                </p>

                <p className="text-sm text-slate-500">

                    {new Date().toLocaleDateString()}

                </p>

            </div>

        </header>

    );

}

export default TopBar;