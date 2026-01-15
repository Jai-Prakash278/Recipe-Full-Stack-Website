import { useParams } from "react-router-dom";
import { BsStopwatchFill } from "react-icons/bs";
import axios from "axios";
import { useEffect, useState } from "react";

function ViewRecipe() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const res = await axios.get(`http://localhost:5000/recipes/${id}`);
      setRecipe(res.data);
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return (
      <p className="text-center mt-24 text-lg text-gray-500 animate-pulse">
        Loading recipe...
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white px-6 py-10">
      <div
        className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden
        transition-all duration-500 hover:shadow-emerald-200"
      >
        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-[50%_50%]">
          {/* LEFT — IMAGE (WIDER) */}
          <div className="relative group overflow-hidden">
            <img
              src={`http://localhost:5000/images/${recipe.imageUrl}`}
              alt={recipe.title}
              className="w-full h-full object-cover
                transition-transform duration-700
                group-hover:scale-105"
            />

            {/* Soft overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>

          {/* RIGHT — CONTENT */}
          <div className="p-10 space-y-8 animate-fadeIn">
            {/* TITLE + TIME */}
            <div>
              <h1 className="text-red-600 text-2xl text-center lg:text-4xl font-extrabold text-gray-800 mb-3">
                {recipe.title}
              </h1>

              <div className="flex items-center gap-3 text-gray-600">
                <BsStopwatchFill className="text-emerald-500 text-lg" />
                <span className="font-medium">{recipe.time}</span>
              </div>
            </div>

            {/* INGREDIENTS LIST */}
            <div className="bg-emerald-50 rounded-2xl p-6 shadow-inner">
              <h3 className="text-xl font-bold text-emerald-700 mb-4">
                🧂 Ingredients
              </h3>

              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {Array.isArray(recipe.ingredients)
                  ? recipe.ingredients.map((ing, index) => (
                      <li key={index} className="leading-relaxed">
                        {ing}
                      </li>
                    ))
                  : recipe.ingredients.split(",").map((ing, index) => (
                      <li key={index} className="leading-relaxed">
                        {ing.trim()}
                      </li>
                    ))}
              </ul>
            </div>

            {/* INSTRUCTIONS */}
            <div className="bg-orange-50 rounded-2xl p-6 shadow-inner">
              <h3 className="text-xl font-bold text-orange-600 mb-3">
                👨‍🍳 Instructions
              </h3>

              <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                {recipe.instruction}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewRecipe;
