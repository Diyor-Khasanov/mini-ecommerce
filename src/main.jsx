import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import NotFound from "./pages/NotFound.jsx";
import Products from "./pages/Products.jsx";
import Details from "./pages/Details.jsx";
import About from "./pages/About.jsx";
import Categories from "./pages/Categories.jsx";
import CategoryDetails from "./pages/CategoryDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/user-cart",
    element: <Cart />,
  },
  {
    path: "products",
    element: <Products />,
  },
  {
    path: "/product/:id",
    element: <Details />,
  },
  {
    path: "/categories",
    element: <Categories />,
  },
  {
    path: "/category/:id",
    element: <CategoryDetails />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
);
