function DashboardCard({

    title,

    value,

    color

}) {

    return (

        <div
            className={`rounded-3xl ${color} p-6 shadow-lg`}
        >

            <h3 className="text-lg font-semibold text-slate-700">

                {title}

            </h3>

            <p className="mt-4 text-4xl font-bold">

                {value}

            </p>

        </div>

    );

}

export default DashboardCard;