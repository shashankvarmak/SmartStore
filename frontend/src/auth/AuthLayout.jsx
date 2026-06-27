import {
    ShoppingCart,
    ShoppingBasket,
    Clock3,
    BadgeCheck
} from "lucide-react";

function AuthLayout({ children }) {

    return (

        <section className="h-screen overflow-hidden">

            <div className="grid h-full lg:grid-cols-2">

                {/* LEFT PANEL */}

                <div className="hidden bg-emerald-600 lg:flex">

                    <div className="mx-auto flex w-full max-w-xl flex-col justify-center px-20">

                        {/* Logo */}

                        <ShoppingCart
                            size={72}
                            strokeWidth={2.2}
                            className="text-white"
                        />

                        <h1 className="mt-6 text-6xl font-extrabold tracking-tight text-white">
                            SmartStore
                        </h1>

                        <p className="mt-5 text-xl leading-relaxed text-emerald-50">
                            Fresh groceries.
                            Faster pickup.
                            Smarter shopping.
                        </p>

                        {/* Features */}

                        <div className="mt-14 rounded-3xl bg-white/10 p-8 backdrop-blur-sm">

                            <div className="space-y-6">

                                <div className="flex items-start gap-4">

                                    <div className="rounded-2xl bg-white/10 p-3">

                                        <ShoppingBasket size={24} />

                                    </div>

                                    <div>

                                        <h3 className="text-lg font-semibold">
                                            Reserve Products
                                        </h3>

                                        <p className="mt-1 text-sm leading-6 text-emerald-100">
                                            Reserve groceries before visiting the store.
                                        </p>

                                    </div>

                                </div>

                                <div className="flex items-start gap-4">

                                    <div className="rounded-2xl bg-white/10 p-3">

                                        <Clock3 size={24} />

                                    </div>

                                    <div>

                                        <h3 className="text-lg font-semibold">
                                            Skip Long Queues
                                        </h3>

                                        <p className="mt-1 text-sm leading-6 text-emerald-100">
                                            Pick up your groceries quickly without waiting.
                                        </p>

                                    </div>

                                </div>

                                <div className="flex items-start gap-4">

                                    <div className="rounded-2xl bg-white/10 p-3">

                                        <BadgeCheck size={24} />

                                    </div>

                                    <div>

                                        <h3 className="text-lg font-semibold">
                                            Fresh & Trusted
                                        </h3>

                                        <p className="mt-1 text-sm leading-6 text-emerald-100">
                                            Quality products from trusted local stores.
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                {/* RIGHT PANEL */}

                <div className="flex items-center justify-center bg-slate-50 px-8">

                    <div className="w-full max-w-md">

                        {children}

                    </div>

                </div>

            </div>

        </section>

    );

}

export default AuthLayout;