import ReviewCard from "../ui/ReviewCard";

function CustomerReviewsSection() {

    const reviews = [

        {
            id: 1,
            name: "Rahul Sharma",
            review: "Fresh groceries and a smooth reservation process. Highly recommended!",
        },

        {
            id: 2,
            name: "Priya Reddy",
            review: "Loved the quality of vegetables and quick pickup service.",
        },

        {
            id: 3,
            name: "Amit Kumar",
            review: "The website is easy to use and saved me a lot of time.",
        },

    ];

    return (

        <section className="mx-auto mt-24 max-w-7xl px-6">

            <h2 className="text-4xl font-bold text-slate-900">
                What Our Customers Say
            </h2>

            <p className="mt-3 text-lg text-slate-500">
                Trusted by hundreds of happy customers.
            </p>

            <div className="mt-12 grid gap-8 md:grid-cols-3">

                {reviews.map((review) => (

                    <ReviewCard

                        key={review.id}

                        name={review.name}

                        review={review.review}

                    />

                ))}

            </div>

        </section>

    );

}

export default CustomerReviewsSection;