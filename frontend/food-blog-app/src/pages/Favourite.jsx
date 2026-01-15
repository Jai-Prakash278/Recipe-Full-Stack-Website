import { useEffect, useState } from "react";
import axios from "axios";
import { BsStopwatchFill } from "react-icons/bs";
import { FaHeartBroken } from "react-icons/fa";
import { Link } from "react-router-dom";

const Favourite = () => {
  const [favourites, setFavourites] = useState([]);

  // 🔹 Load favourites
  useEffect(() => {
    const fetchFavourites = async () => {
      const res = await axios.get("http://localhost:5000/recipes/favourites", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setFavourites(res.data);
    };

    fetchFavourites();
  }, []);

  // 🔹 Remove from favourite (toggle)
  const removeFavourite = async (recipeId) => {
    await axios.post(
      `http://localhost:5000/recipes/favourite/${recipeId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    // 🔥 Update UI instantly
    setFavourites((prev) => prev.filter((item) => item._id !== recipeId));
  };

  if (favourites.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-24 text-lg">
        No favourites yet ❤️
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-4xl font-bold text-center mb-10">
        Your Favourite Recipes ❤️
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {favourites.map((item) => (
          <div
            key={item._id}
            className="group bg-white rounded-2xl shadow-md overflow-hidden
              transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            {/* Image */}
            <div className="relative overflow-hidden">
              <img
                src={`http://localhost:5000/images/${item.imageUrl}`}
                alt={item.title}
                className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Remove Button */}
              <button
                onClick={() => removeFavourite(item._id)}
                className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md
                  hover:bg-red-50 transition"
                title="Remove from favourites"
              >
                <FaHeartBroken className="text-red-500 text-lg" />
              </button>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="text-xl font-bold mb-3 text-gray-800">
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
        ))}
      </div>
    </div>
  );
};

export default Favourite;
