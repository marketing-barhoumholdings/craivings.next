import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./app-pages/App";
import About from "./app-pages/About";
import Contact from "./app-pages/Contact";
import Recipes from "./app-pages/Recipes";
import Blog from "./app-pages/Blog";
import BlogPost from "./app-pages/BlogPost";

const NotFound = () => /*#__PURE__*/ _jsx("div", {
  className: "min-h-screen flex items-center justify-center bg-gradient-to-b from-[#FFF9F3] to-white",
  children: /*#__PURE__*/ _jsxs("div", {
    className: "text-center px-6",
    children: [
      /*#__PURE__*/ _jsx("h1", { className: "text-3xl font-bold mb-2", children: "Page Not Found" }),
      /*#__PURE__*/ _jsx("p", { className: "text-gray-600", children: "The page you are looking for does not exist." })
    ]
  })
});

export default function ClientApp() {
  return (
    /*#__PURE__*/ _jsx(BrowserRouter, {
      children: /*#__PURE__*/ _jsxs(Routes, {
        children: [
          /*#__PURE__*/ _jsx(Route, { path: "/", element: /*#__PURE__*/ _jsx(App, {}) }, "home"),
          /*#__PURE__*/ _jsx(Route, { path: "/about", element: /*#__PURE__*/ _jsx(About, {}) }, "about"),
          /*#__PURE__*/ _jsx(Route, { path: "/contact", element: /*#__PURE__*/ _jsx(Contact, {}) }, "contact"),
          /*#__PURE__*/ _jsx(Route, { path: "/recipes", element: /*#__PURE__*/ _jsx(Recipes, {}) }, "recipes"),
          /*#__PURE__*/ _jsx(Route, { path: "/blog", element: /*#__PURE__*/ _jsx(Blog, {}) }, "blog"),
          /*#__PURE__*/ _jsx(Route, { path: "/blog-post", element: /*#__PURE__*/ _jsx(BlogPost, {}) }, "blog-post"),
          /*#__PURE__*/ _jsx(Route, { path: "*", element: /*#__PURE__*/ _jsx(NotFound, {}) }, "notfound")
        ]
      })
    })
  );
}