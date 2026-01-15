import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { BsStopwatchFill } from "react-icons/bs";
import { FaHeart, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useState, useEffect } from "react";

const MyRecipe = () => {
  const myRecipes = useLoaderData();
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState(myRecipes);
  const [favourites, setFavourites] = useState([]); // ✅ FIX 1

  // ✅ FIX 2 — load favourites
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

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/recipes/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    setRecipes((prev) => prev.filter((item) => item._id !== id));
  };

  // ✅ FIX 3 — toggle favourite + update UI
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

    setFavourites(res.data.favourites); // backend returns updated favourites
    // navigate("/favourites");
  };

  if (!recipes || recipes.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-24 text-lg">
        You haven’t added any recipes yet 🍽️
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">
        My Recipes
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {recipes.map((item) => (
          <div
            key={item._id}
            className="group bg-white rounded-2xl overflow-hidden shadow-md
              transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="relative overflow-hidden">
              <img
                src={`http://localhost:5000/images/${item.imageUrl}`}
                alt={item.title}
                className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* ❤️ HEART */}
              <button
                onClick={() => handleFavourite(item._id)}
                className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md"
              >
                <FaHeart
                  className={`text-xl transition ${
                    favourites.includes(item._id)
                      ? "text-red-500"
                      : "text-gray-400"
                  }`}
                />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-2 font-medium">
                  <BsStopwatchFill className="text-emerald-500" />
                  {item.time}
                </div>

                <div className="flex items-center gap-4">
                  <Link to={`/editRecipe/${item._id}`}>
                    <FaEdit className="text-blue-500" size={20} />
                  </Link>
                  <button onClick={() => handleDelete(item._id)}>
                    <MdDelete className="text-red-500" size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRecipe;
