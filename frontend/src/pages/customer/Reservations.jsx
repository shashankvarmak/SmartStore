import { useEffect, useState } from "react";

import { getMyReservations } from "../../services/reservationService";

function Reservations() {

    const [reservations, setReservations] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        fetchReservations();

    }, []);

    const fetchReservations = async () => {

        try {

            const response = await getMyReservations();

            setReservations(response.data);

        }

        catch (error) {

            console.error(error);

            setError("Unable to load reservations.");

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return <div className="mt-20 text-center">Loading...</div>;

    }

    if (error) {

        return <div className="mt-20 text-center text-red-500">{error}</div>;

    }

    return (

       <section className="mx-auto max-w-6xl px-6 py-10">

           <h1 className="text-4xl font-bold">

               My Reservations

           </h1>

           <p className="mt-2 text-slate-500">

               Track your grocery reservations.

           </p>

           {

               reservations.length === 0 ?

                   (

                       <div className="mt-20 text-center">

                           <h2 className="text-2xl font-semibold">

                               No reservations found.

                           </h2>

                       </div>

                   )

                   :

                   (

                       <div className="mt-10 space-y-6">

                           {

                               reservations.map(reservation => (

                                   <div

                                       key={reservation.reservationId}

                                       className="rounded-3xl bg-white p-6 shadow"

                                   >

                                       <div className="flex items-center justify-between">

                                           <h2 className="text-xl font-bold">

                                               Reservation #{reservation.reservationId}

                                           </h2>

                                           <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">

                                               {reservation.status}

                                           </span>

                                       </div>

                                       <div className="mt-6 grid grid-cols-2 gap-6">

                                           <div>

                                               <p className="text-sm text-slate-500">

                                                   Reserved On

                                               </p>

                                               <p className="font-semibold">

                                                   {new Date(reservation.reservationDate).toLocaleString()}

                                               </p>

                                           </div>

                                           <div>

                                               <p className="text-sm text-slate-500">

                                                   Total Amount

                                               </p>

                                               <p className="font-semibold text-emerald-600">

                                                   ₹{reservation.totalAmount}

                                               </p>

                                           </div>

                                       </div>

                                   </div>

                               ))

                           }

                       </div>

                   )

           }

       </section>

    );

}

export default Reservations;