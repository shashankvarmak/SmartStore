function CategoryCard({
    name,
    imageUrl
}) {

    return (

        <div className="overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

            <img

                src={imageUrl}

                alt={name}

                className="h-40 w-full object-cover"

            />
            <h3 className="p-6 text-center text-xl font-semibold text-slate-800">
                {name}
            </h3>

        </div>

    );

}

export default CategoryCard;