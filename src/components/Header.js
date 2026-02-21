import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Menu, X, Youtube } from "lucide-react";
export const Header = ()=>{
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navLinks = [
        {
            name: "Home",
            path: "/"
        },
        {
            name: "Recipes",
            path: "/recipes"
        },
        {
            name: "Blog",
            path: "/blog"
        },
        {
            name: "About",
            path: "/about"
        },
        {
            name: "Contact",
            path: "/contact"
        }
    ];
    return /*#__PURE__*/ _jsxs("header", {
        className: "sticky top-0 z-50 w-full bg-[#FFF7F1] shadow-sm",
        children: [
            /*#__PURE__*/ _jsx("div", {
                className: "container mx-auto px-6",
                children: /*#__PURE__*/ _jsxs("div", {
                className: "flex items-center justify-between h-20",
                    children: [
                        /*#__PURE__*/ _jsx(Link, {
                            to: "/",
                            className: "flex items-center pl-2",
                            children: /*#__PURE__*/ _jsx("img", {
                                src: "https://static.databutton.com/public/f8561ce9-46fe-4464-aab7-b37531a002fc/Cravings Ai logo.png",
                                alt: "Craivings Logo",
                                className: "h-12 w-auto"
                            })
                        }),
                        /*#__PURE__*/ _jsx("nav", {
                            className: "hidden md:flex items-center space-x-8",
                            children: navLinks.map((link)=>/*#__PURE__*/ _jsx(Link, {
                                    to: link.path,
                            className: "font-poppins font-medium text-gray-700 hover:text-brand-600 transition-colors",
                                    children: link.name
                                }, link.name))
                        }),
                        /*#__PURE__*/ _jsx("div", {
                            className: "hidden md:flex items-center",
                            children: /*#__PURE__*/ _jsx("a", {
                                href: "https://www.youtube.com/@Craivings",
                                target: "_blank",
                                rel: "noopener noreferrer",
                                className: "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 font-poppins font-medium text-white bg-gradient-to-r from-[#DC2626] to-[#EF4444] hover:from-[#B91C1C] hover:to-[#DC2626] rounded-lg",
                                style: {
                                    borderRadius: "10px"
                                },
                                children: [
                                    "Watch on YouTube",
                                    /*#__PURE__*/ _jsx("span", {
                                        className: "ml-3 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-black",
                                        children: /*#__PURE__*/ _jsx("span", {
                                            className: "h-2 w-2 rounded-full bg-yellow-400 animate-pulse"
                                        })
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ _jsx("div", {
                            className: "md:hidden",
                            children: /*#__PURE__*/ _jsx("button", {
                                onClick: ()=>setIsMenuOpen(!isMenuOpen),
                                children: isMenuOpen ? /*#__PURE__*/ _jsx(X, {
                                    size: 28
                                }) : /*#__PURE__*/ _jsx(Menu, {
                                    size: 28
                                })
                            })
                        })
                    ]
                })
            }),
            isMenuOpen && /*#__PURE__*/ _jsx("div", {
                className: "md:hidden bg-[#FFF7F1] shadow-lg absolute top-20 left-0 w-full",
                children: /*#__PURE__*/ _jsxs("nav", {
                    className: "flex flex-col items-center space-y-4 py-8",
                    children: [
                        navLinks.map((link)=>/*#__PURE__*/ _jsx(Link, {
                                to: link.path,
                                className: "font-poppins font-medium text-lg text-gray-700 hover:text-brand-600 transition-colors",
                                onClick: ()=>setIsMenuOpen(false),
                                children: link.name
                            }, link.name)),
                        /*#__PURE__*/ _jsx("a", {
                            href: "https://www.youtube.com/@Craivings",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className: "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 font-poppins font-medium text-white bg-gradient-to-r from-[#DC2626] to-[#EF4444] hover:from-[#B91C1C] hover:to-[#DC2626] rounded-lg mt-4",
                            style: {
                                borderRadius: "10px"
                            },
                            children: [
                                "Watch on YouTube",
                                /*#__PURE__*/ _jsx("span", {
                                    className: "ml-3 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-black",
                                    children: /*#__PURE__*/ _jsx("span", {
                                        className: "h-2 w-2 rounded-full bg-yellow-400 animate-pulse"
                                    })
                                })
                            ]
                        })
                    ]
                })
            })
        ]
    });
};


