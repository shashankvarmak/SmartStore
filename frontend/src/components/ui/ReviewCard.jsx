function ReviewCard({ name, review }) {
    return (
        <div className="rounded-3xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-2xl">

            <div className="mb-4 text-yellow-500 text-xl">
                ★★★★★
            </div>

            <p className="text-slate-600 italic">
                "{review}"
            </p>

            <h4 className="mt-5 font-semibold text-slate-800">
                {name}
            </h4>

        </div>
    );
}

export default ReviewCard;