import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Youtube, Instagram, Twitter, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import brain from "brain";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
export const Footer = ()=>{
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [subscribing, setSubscribing] = useState(false);
    const handleNewsletterSubmit = async (e)=>{
        e.preventDefault();
        setSubscribing(true);
        try {
            const response = await brain.subscribe_newsletter({
                email: email,
                name: name || undefined
            });
            const data = await response.json();
            if (data.success) {
                toast.success(data.message || "Successfully subscribed to newsletter!");
                setEmail("");
                setName("");
            } else {
                toast.error("Failed to subscribe. Please try again.");
            }
        } catch (error) {
            console.error("Error subscribing to newsletter:", error);
            toast.error("Failed to subscribe. Please try again.");
        } finally{
            setSubscribing(false);
        }
    };
    return /*#__PURE__*/ _jsx("footer", {
        className: "bg-gray-900 text-white py-16 px-4",
        children: /*#__PURE__*/ _jsxs("div", {
            className: "container mx-auto",
            children: [
                /*#__PURE__*/ _jsxs("div", {
                    className: "grid md:grid-cols-4 gap-12 mb-12",
                    children: [
                        /*#__PURE__*/ _jsxs("div", {
                            className: "md:col-span-2",
                            children: [
                                /*#__PURE__*/ _jsx("h3", {
                                    className: "text-3xl font-bold mb-4",
                                    children: "Craivings"
                                }),
                                /*#__PURE__*/ _jsx("p", {
                                    className: "text-gray-400 mb-6 max-w-md",
                                    children: "AI-powered YouTube content creation studio revolutionizing recipe videos through cutting-edge technology."
                                }),
                                /*#__PURE__*/ _jsxs("div", {
                                    className: "mt-4 flex gap-4",
                                    children: [
                                        /*#__PURE__*/ _jsx("a", {
                                            href: "https://www.youtube.com/@Craivings",
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "w-10 h-10 bg-white/10 hover:bg-brand-600 rounded-lg flex items-center justify-center transition-colors",
                                            children: /*#__PURE__*/ _jsx(Youtube, {
                                                className: "h-5 w-5"
                                            })
                                        }),
                                        /*#__PURE__*/ _jsx("a", {
                                            href: "https://www.instagram.com/craivingsai/",
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "w-10 h-10 bg-white/10 hover:bg-brand-600 rounded-lg flex items-center justify-center transition-colors",
                                            children: /*#__PURE__*/ _jsx(Instagram, {
                                                className: "h-5 w-5"
                                            })
                                        }),
                                        /*#__PURE__*/ _jsx("a", {
                                            href: "https://x.com/craivingsai",
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "w-10 h-10 bg-white/10 hover:bg-brand-600 rounded-lg flex items-center justify-center transition-colors",
                                            children: /*#__PURE__*/ _jsx(Twitter, {
                                                className: "h-5 w-5"
                                            })
                                        }),
                                        /*#__PURE__*/ _jsx("a", {
                                            href: "https://www.tiktok.com/@craivings",
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "w-10 h-10 bg-white/10 hover:bg-brand-600 rounded-lg flex items-center justify-center transition-colors",
                                            children: /*#__PURE__*/ _jsxs("svg", {
                                                xmlns: "http://www.w3.org/2000/svg",
                                                viewBox: "0 0 24 24",
                                                fill: "currentColor",
                                                className: "h-5 w-5",
                                                children: [
                                                    /*#__PURE__*/ _jsx("path", {
                                                        d: "M16 3h-1.5a6.5 6.5 0 0 0 5.5 5.5V10a8 8 0 0 1-4-1.1V15a5 5 0 1 1-5-5c.4 0 .8 0 1.2.1v2.1a3 3 0 1 0 1.8 2.8V3Z"
                                                    }),
                                                    /*#__PURE__*/ _jsx("path", {
                                                        d: "M14.5 3c.2 1.2.8 2.3 1.7 3.1A6.3 6.3 0 0 0 20 7.9V6.2a4.7 4.7 0 0 1-4.6-3.2h-.9Z",
                                                        opacity: ".6"
                                                    })
                                                ]
                                            })
                                        })
                                    ]
                                }),
                            ]
                        }),
                        /*#__PURE__*/ _jsxs("div", {
                            children: [
                                /*#__PURE__*/ _jsx("h4", {
                                    className: "font-semibold mb-4 text-lg",
                                    children: "Explore"
                                }),
                                /*#__PURE__*/ _jsxs("ul", {
                                    className: "space-y-3 text-gray-400",
                                    children: [
                                        /*#__PURE__*/ _jsx("li", {
                                            children: /*#__PURE__*/ _jsx(Link, {
                                                to: "/recipes",
                                                className: "hover:text-brand-400 transition-colors",
                                                children: "Recipes"
                                            })
                                        }),
                                        /*#__PURE__*/ _jsx("li", {
                                            children: /*#__PURE__*/ _jsx(Link, {
                                                to: "/blog",
                                                className: "hover:text-brand-400 transition-colors",
                                                children: "Blog"
                                            })
                                        }),
                                        /*#__PURE__*/ _jsx("li", {
                                            children: /*#__PURE__*/ _jsx(Link, {
                                                to: "/about",
                                                className: "hover:text-brand-400 transition-colors",
                                                children: "About"
                                            })
                                        }),
                                        /*#__PURE__*/ _jsx("li", {
                                            children: /*#__PURE__*/ _jsx(Link, {
                                                to: "/contact",
                                                className: "hover:text-brand-400 transition-colors",
                                                children: "Contact"
                                            })
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ _jsxs("div", {
                            children: [
                                /*#__PURE__*/ _jsx("h4", {
                                    className: "font-semibold mb-4 text-lg",
                                    children: "Resources"
                                }),
                                /*#__PURE__*/ _jsxs("ul", {
                                    className: "space-y-3 text-gray-400",
                                    children: [
                                        /*#__PURE__*/ _jsx("li", {
                                            children: /*#__PURE__*/ _jsx("a", {
                                                href: "#",
                                                className: "hover:text-brand-400 transition-colors",
                                                children: "Our Process"
                                            })
                                        }),
                                        /*#__PURE__*/ _jsx("li", {
                                            children: /*#__PURE__*/ _jsx("a", {
                                                href: "#",
                                                className: "hover:text-brand-400 transition-colors",
                                                children: "Technology"
                                            })
                                        }),
                                        /*#__PURE__*/ _jsx("li", {
                                            children: /*#__PURE__*/ _jsx("a", {
                                                href: "#",
                                                className: "hover:text-brand-400 transition-colors",
                                                children: "FAQ"
                                            })
                                        }),
                                        /*#__PURE__*/ _jsx("li", {
                                            children: /*#__PURE__*/ _jsx("a", {
                                                href: "#",
                                                className: "hover:text-brand-400 transition-colors",
                                                children: "Partner With Us"
                                            })
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ _jsx("div", {
                    className: "border-t border-gray-800 pt-8",
                    children: /*#__PURE__*/ _jsxs("div", {
                        className: "flex flex-col md:flex-row justify-between items-center gap-4",
                        children: [
                            /*#__PURE__*/ _jsx("p", {
                                className: "text-gray-400 text-sm",
                                children: "© 2026 Byte of Taste. All rights reserved."
                            }),
                            /*#__PURE__*/ _jsxs("div", {
                                className: "flex gap-6 text-sm text-gray-400",
                                children: [
                                    /*#__PURE__*/ _jsx("a", {
                                        href: "#",
                                        className: "hover:text-brand-400 transition-colors",
                                        children: "Privacy Policy"
                                    }),
                                    /*#__PURE__*/ _jsx("a", {
                                        href: "#",
                                        className: "hover:text-brand-400 transition-colors",
                                        children: "Terms of Service"
                                    })
                                ]
                            })
                        ]
                    })
                })
            ]
        })
    });
};


