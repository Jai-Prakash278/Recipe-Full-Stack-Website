import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AddRecipe = () => {
  const navigate = useNavigate();
  const [recipeData, setRecipeDate] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const { id } = useParams();
  const isEdit = Boolean(id);

  useEffect(() => {
    if (!isEdit) return;

    const getData = async () => {
      const response = await axios.get(`http://localhost:5000/recipes/${id}`);

      const res = response.data;

      setRecipeDate({
        title: res.title,
        ingredients: res.ingredients.join(","),
        instruction: res.instruction,
        time: res.time,
      });
      if (res.imageUrl) {
        setImagePreview(`http://localhost:5000/images/${res.imageUrl}`);
      }
    };

    getData();
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setRecipeDate((prev) => ({
        ...prev,
        [name]: files[0],
      }));

      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setRecipeDate((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (let key in recipeData) {
      formData.append(key, recipeData[key]);
    }

    const url = isEdit
      ? `http://localhost:5000/recipes/${id}`
      : "http://localhost:5000/recipes";

    const method = isEdit ? "put" : "post";

    await axios[method](url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    navigate("/myRecipe");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-emerald-50 to-gray-100 px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 mt-8 mb-8">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-emerald-600 mb-6">
          {isEdit ? "Edit Recipe" : "Share a New Recipe"}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Recipe Title
            </label>
            <input
              type="text"
              name="title"
              required
              onChange={handleChange}
              value={recipeData.title || ""}
              placeholder="Enter recipe title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cooking Time
            </label>
            <input
              type="text"
              name="time"
              required
              value={recipeData.time || ""}
              onChange={handleChange}
              placeholder="e.g. 30 minutes"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Ingredients */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ingredients
            </label>
            <textarea
              name="ingredients"
              rows={4}
              required
              value={recipeData.ingredients || ""}
              onChange={handleChange}
              placeholder="Enter ingredients separated by commas"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Instructions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Instructions
            </label>
            <textarea
              name="instruction"
              rows={4}
              required
              value={recipeData.instruction || ""}
              onChange={handleChange}
              placeholder="Write cooking instructions"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Image Upload */}
          <div>
            {imagePreview && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Current Recipe Image
                </p>
                <img
                  src={imagePreview}
                  alt="Recipe Preview"
                  className="w-full h-48 object-cover rounded-xl border"
                />
              </div>
            )}
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recipe Image
            </label>
            <input
              type="file"
              name="file"
              onChange={handleChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-emerald-50 file:text-emerald-600
                hover:file:bg-emerald-100"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-emerald-500 text-white py-3 rounded-xl font-semibold hover:bg-emerald-600 transition"
          >
            {isEdit ? "Update Recipe" : "Add Recipe"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;
