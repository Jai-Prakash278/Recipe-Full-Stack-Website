import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { BsStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";

function Recipes() {
  const allRecipes = useLoaderData();
  const navigate = useNavigate();

  const [favourites, setFavourites] = useState([]);

  const handleFavourite = async (recipeId) => {
    const res = await axios.post(
      `http://localhost:5000/recipes/favourite/${recipeId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setFavourites(res.data.favourites);
    // navigate("/favourites");
  };

  useEffect(() => {
    const fetchFavourites = async () => {
      const res = await axios.get("http://localhost:5000/recipes/favourites", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setFavourites(res.data.map((r) => r._id));
    };

    fetchFavourites();
  }, []);

  return (
    <section className="bg-gradient-to-b from-emerald-50 to-white px-6 py-12">
      {/* Title */}
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
        Explore Recipes 🍽️
      </h2>

      {/* Grid */}
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {allRecipes.map((item) => {
          const isFav = favourites.includes(item._id);

          return (
            <div
              key={item._id}
              className="group bg-white rounded-3xl overflow-hidden shadow-md
                hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={`http://localhost:5000/images/${item.imageUrl}`}
                  alt={item.title}
                  className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* ❤️ Favourite Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFavourite(item._id);
                  }}
                  className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md
                    shadow-lg transition-all duration-300
                    ${
                      isFav
                        ? "bg-red-500/90 scale-110 animate-pulse"
                        : "bg-white/80 hover:scale-110"
                    }`}
                  title={isFav ? "Remove from favourites" : "Add to favourites"}
                >
                  <FaHeart
                    className={`text-xl ${
                      isFav ? "text-white" : "text-gray-500"
                    }`}
                  />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-3">
                <h3 className="text-xl font-bold text-gray-800 line-clamp-1">
                  {item.title}
                </h3>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-2 font-medium">
                    <BsStopwatchFill className="text-emerald-500" />
                    {item.time}
                  </div>

                  <Link
                    to={`/viewRecipe/${item._id}`}
                    className="text-xs font-semibold text-emerald-600 hover:underline cursor-pointer"
                  >
                    View Recipe →
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty */}
      {!allRecipes ||
        (allRecipes.length === 0 && (
          <p className="text-center text-gray-500 mt-16">
            No recipes available yet.
          </p>
        ))}
    </section>
  );
}

export default Recipes;
