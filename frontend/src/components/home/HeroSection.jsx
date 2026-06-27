import { Link } from "react-router-dom";
import Button from "../ui/Button";
import HeroPreviewCard from "./HeroPreviewCard";

function HeroSection() {
    return (
        <section className="relative w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50">
            {/* Background decorative elements */}
            <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-emerald-200/30 blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-green-100/40 blur-3xl"></div>

            <div className="relative z-10 mx-auto max-w-7xl px-6 py-20">
                <div className="grid grid-cols-2 items-center gap-16">

                    {/* Left Section */}
                    <div className="space-y-8">
                        <span className="inline-block rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-emerald-700">
                            Trusted by Local Communities
                        </span>

                        <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-slate-900 lg:text-6xl">
                            Fresh Groceries,<br />
                            <span className="text-emerald-600">
                                Smarter Shopping.
                            </span>
                        </h1>

                        <p className="max-w-xl text-lg leading-8 text-slate-600">
                            Reserve your favorite products online, avoid the crowded
                            queues, and pick them up whenever it's most convenient for you.
                        </p>

                        {/* Flex container to align buttons nicely */}
                        <div className="flex items-center gap-4">
                            <Link to="/products">
                                <Button variant="primary">
                                    Browse Products
                                </Button>
                            </Link>

                            <Button variant="secondary">
                                Learn More
                            </Button>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex justify-center">
                        <HeroPreviewCard />
                    </div>

                </div>
            </div>
        </section>
    );
}

export default HeroSection;