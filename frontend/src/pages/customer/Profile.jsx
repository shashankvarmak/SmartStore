import { useEffect, useState } from "react";

import { getProfile } from "../../services/userService";
import {
    User,
    Mail,
    Phone,
    Hash
} from "lucide-react";

function Profile() {

    const [profile, setProfile] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        fetchProfile();

    }, []);

    const fetchProfile = async () => {

        try {

            const response = await getProfile();

            setProfile(response.data);

        }

        catch (error) {

            console.error(error);

            setError("Unable to load profile.");

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <div className="mt-20 text-center">

                Loading profile...

            </div>

        );

    }

    if (error) {

        return (

            <div className="mt-20 text-center text-red-500">

                {error}

            </div>

        );

    }

    return (

        <section className="mx-auto max-w-2xl px-6 py-10">

            <div className="rounded-3xl bg-white p-10 shadow-xl">

                {/* Avatar */}

                <div className="flex flex-col items-center">

                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100">

                        <User
                            size={46}
                            className="text-emerald-600"
                        />

                    </div>

                    <h1 className="mt-5 text-3xl font-bold text-slate-800">

                        {profile.name}

                    </h1>

                    <p className="mt-1 text-slate-500">

                        {profile.email}

                    </p>

                </div>

                {/* Information */}

                <div className="mt-10 space-y-6">

                    <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-5">

                        <Mail
                            className="text-emerald-600"
                            size={24}
                        />

                        <div>

                            <p className="text-sm text-slate-500">

                                Email

                            </p>

                            <p className="font-semibold">

                                {profile.email}

                            </p>

                        </div>

                    </div>

                    <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-5">

                        <Phone
                            className="text-emerald-600"
                            size={24}
                        />

                        <div>

                            <p className="text-sm text-slate-500">

                                Phone Number

                            </p>

                            <p className="font-semibold">

                                {profile.phoneNumber}

                            </p>

                        </div>

                    </div>

                    <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-5">

                        <Hash
                            className="text-emerald-600"
                            size={24}
                        />

                        <div>

                            <p className="text-sm text-slate-500">

                                User ID

                            </p>

                            <p className="font-semibold">

                                #{profile.id}

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </section>

    );

}

export default Profile;