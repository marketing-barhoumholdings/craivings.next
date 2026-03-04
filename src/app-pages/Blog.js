import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Footer } from '../components/Footer';
import { Header } from "../components/Header";

const Blog = ()=>{
    return /*#__PURE__*/ _jsxs("div", {
        className: "min-h-screen bg-gradient-to-b from-[#FFF9F3] to-white overflow-x-hidden",
        children: [
            /*#__PURE__*/ _jsx(Header, {}),
            /*#__PURE__*/ _jsxs("section", {
                className: "relative py-32 px-4 overflow-hidden",
                children: [
                    /*#__PURE__*/ _jsx("div", {
                        className: "absolute inset-0 bg-gradient-to-br from-red-50 via-white to-red-50 opacity-60"
                    }),
                    /*#__PURE__*/ _jsx("div", {
                        className: "absolute top-20 left-20 w-96 h-96 bg-red-200 rounded-full blur-3xl opacity-20"
                    }),
                    /*#__PURE__*/ _jsxs("div", {
                        className: "container mx-auto relative z-10 text-center",
                        children: [
                            /*#__PURE__*/ _jsx("h1", {
                                className: "text-6xl md:text-7xl font-bold mb-6 leading-tight",
                                children: /*#__PURE__*/ _jsx("span", {
                                    className: "bg-gradient-to-r from-gray-900 via-red-900 to-gray-900 bg-clip-text text-transparent",
                                    children: "Our Blog"
                                })
                            }),
                            /*#__PURE__*/ _jsx("p", {
                                className: "text-xl text-gray-600 max-w-3xl mx-auto",
                                children: "Insights, stories, and updates from the frontier of AI-powered culinary content creation."
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ _jsx("section", {
                className: "py-24 px-4",
                children: /*#__PURE__*/ _jsx("div", {
                    className: "container mx-auto"
                })
            }),
            /*#__PURE__*/ _jsx(Footer, {})
        ]
    });
};

export default Blog;
