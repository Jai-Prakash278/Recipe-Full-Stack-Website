import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import MainNavigation from "./components/MainNavigation";
import axios from "axios";
import Login from "./components/Login";
import AddRecipe from "./pages/AddRecipe";
import MyRecipe from "./pages/MyRecipe";
import Recipes from "./pages/Recipes";
import Favourite from "./pages/Favourite";
import ViewRecipe from "./pages/ViewRecipe";

const getAllRecipes = async () => {
  let allRecipes = [];
  await axios.get("http://localhost:5000/recipes").then((res) => {
    allRecipes = res.data;
  });
  return allRecipes;
};

const getMyRecipe = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return [];
  }

  const allRecipes = await getAllRecipes();
  return allRecipes.filter((item) => item.createdBy?.toString() === user._id);
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainNavigation />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "myRecipe", element: <MyRecipe />, loader: getMyRecipe },
      { path: "recipes", element: <Recipes />, loader: getAllRecipes },
      { path: "favourites", element: <Favourite /> },
      { path: "addRecipe", element: <AddRecipe /> },
      { path: "editRecipe/:id", element: <AddRecipe /> },
      { path: "viewRecipe/:id", element: <ViewRecipe /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
