function ReservationCard({

    reservation,

    activeTab,

    onReady,

    onComplete,

    onCancel

}) {

    return (

        <div className="rounded-2xl bg-white p-6 shadow">

            <div className="flex items-center justify-between">

                <div>

                    <h2 className="text-xl font-bold">

                        Reservation #{reservation.reservationId}

                    </h2>

                    <p className="mt-2">

                        <span className="font-semibold">

                            Customer:

                        </span>{" "}

                        {reservation.customerName}

                    </p>

                    <p className="text-slate-500">

                        {reservation.customerEmail}

                    </p>

                    <p className="mt-2 text-sm text-slate-500">

                        {new Date(
                            reservation.reservationDate
                        ).toLocaleString()}

                    </p>

                </div>

                <div className="text-right">

                    <p className="text-2xl font-bold text-emerald-600">

                        ₹{reservation.totalAmount}

                    </p>

                </div>

            </div>

            <div className="mt-6 flex justify-end gap-3">

                {

                    activeTab === "PENDING" &&

                    <>

                        <button

                            onClick={() =>
                                onReady(reservation.reservationId)
                            }

                            className="rounded-xl bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"

                        >

                            Ready

                        </button>

                        <button

                            onClick={() =>
                                onCancel(reservation.reservationId)
                            }

                            className="rounded-xl bg-red-600 px-5 py-2 text-white hover:bg-red-700"

                        >

                            Cancel

                        </button>

                    </>

                }

                {

                    activeTab === "READY" &&

                    <button

                        onClick={() =>
                            onComplete(reservation.reservationId)
                        }

                        className="rounded-xl bg-emerald-600 px-5 py-2 text-white hover:bg-emerald-700"

                    >

                        Complete

                    </button>

                }

            </div>

        </div>

    );

}

export default ReservationCard;