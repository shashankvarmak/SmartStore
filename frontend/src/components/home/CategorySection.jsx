import CategoryCard from "../ui/CategoryCard";
import { useEffect, useState } from "react";
import { getCategories } from "../../services/categoryService";


function CategorySection() {
    const [categories, setCategories] = useState([]);
    useEffect(() => {

        const fetchCategories = async () => {

            try {

                const response = await getCategories();

                setCategories(response.data);

            } catch (error) {

                console.error("Failed to fetch categories", error);

            }

        };

        fetchCategories();

    }, []);
    return (
        <section className="mx-auto mt-24 max-w-7xl px-6">

            <h2 className="text-4xl font-bold text-slate-900">
                Featured Categories
            </h2>

            <p className="mt-3 text-lg text-slate-500">
                Browse your favourite grocery categories.
            </p>


            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

                {categories.map((category) => (

                    <CategoryCard

                        key={category.id}

                        name={category.name}

                        imageUrl={category.imageUrl}

                    />

                ))}

            </div>

        </section>
        );
    }
export default CategorySection;