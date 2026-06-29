import { useEffect, useState } from "react";

import { getDashboard } from "../../services/dashboardService";

function Dashboard() {

    const [dashboard, setDashboard] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        fetchDashboard();

    }, []);

    const fetchDashboard = async () => {

        setLoading(true);

        setError("");

        try {

            const response = await getDashboard();

            setDashboard(response.data);

        }

        catch (error) {

            console.error(error);

            setError("Unable to load dashboard.");

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <div className="text-center mt-20 text-lg font-semibold">

                Loading Dashboard...

            </div>

        );

    }

    if (error) {

        return (

            <div className="text-center mt-20 text-red-500">

                {error}

            </div>

        );

    }

    return (

        <section className="space-y-8">

            <div>

                <h1 className="text-4xl font-bold">

                    Dashboard

                </h1>

                <p className="mt-2 text-slate-500">

                    Welcome back, Admin.

                </p>

            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

                <div className="rounded-2xl bg-blue-100 p-6 shadow">

                    <h2 className="text-lg font-semibold">

                        📦 Products

                    </h2>

                    <p className="mt-4 text-4xl font-bold">

                        {dashboard.totalProducts}

                    </p>

                </div>

                <div className="rounded-2xl bg-green-100 p-6 shadow">

                    <h2 className="text-lg font-semibold">

                        🗂 Categories

                    </h2>

                    <p className="mt-4 text-4xl font-bold">

                        {dashboard.totalCategories}

                    </p>

                </div>

                <div className="rounded-2xl bg-yellow-100 p-6 shadow">

                    <h2 className="text-lg font-semibold">

                        ⏳ Pending

                    </h2>

                    <p className="mt-4 text-4xl font-bold">

                        {dashboard.pendingReservations}

                    </p>

                </div>

                <div className="rounded-2xl bg-emerald-100 p-6 shadow">

                    <h2 className="text-lg font-semibold">

                        ✅ Completed

                    </h2>

                    <p className="mt-4 text-4xl font-bold">

                        {dashboard.completedReservations}

                    </p>

                </div>

                <div className="rounded-2xl bg-red-100 p-6 shadow">

                    <h2 className="text-lg font-semibold">

                        ❌ Cancelled

                    </h2>

                    <p className="mt-4 text-4xl font-bold">

                        {dashboard.cancelledReservations}

                    </p>

                </div>

                <div className="rounded-2xl bg-orange-100 p-6 shadow">

                    <h2 className="text-lg font-semibold">

                        ⚠ Low Stock

                    </h2>

                    <p className="mt-4 text-4xl font-bold">

                        {dashboard.lowStockProducts}

                    </p>

                </div>

            </div>

        </section>

    );

}

export default Dashboard;