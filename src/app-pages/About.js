import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from "../components/ui/card";
import { Sparkles, Video, Cpu, Wand2, Target, Rocket, Users, Award } from "lucide-react";
import { Footer } from "../components/Footer";
import { useSanityPage } from "../sanity/useSanityPage";
import { Header } from "../components/Header";
const About = ()=>{
    const { page } = useSanityPage("about");
    if (page?.contentHtml) {
        return /*#__PURE__*/ _jsxs("div", {
            className: "min-h-screen bg-gradient-to-b from-red-50/30 to-white",
            children: [
                /*#__PURE__*/ _jsx(Header, {}),
                /*#__PURE__*/ _jsx("div", {
                    className: "container mx-auto px-4 py-16",
                    dangerouslySetInnerHTML: {
                        __html: page.contentHtml
                    }
                })
            ]
        });
    }
    const values = [
        {
            icon: Sparkles,
            title: "Innovation First",
            description: "We push the boundaries of what's possible with AI, constantly exploring new technologies and techniques."
        },
        {
            icon: Target,
            title: "Quality Content",
            description: "Every video is crafted with attention to detail, ensuring authentic recipes and cinematic production value."
        },
        {
            icon: Rocket,
            title: "Creative Excellence",
            description: "We blend technical prowess with artistic vision to create content that inspires and educates."
        },
        {
            icon: Users,
            title: "Community Driven",
            description: "Our audience fuels our creativity. We listen, learn, and create content that resonates."
        }
    ];
    const milestones = [
        {
            number: "16+",
            label: "YouTube Subscribers"
        },
        {
            number: "21+",
            label: "AI-Generated Videos"
        },
        {
            number: "8,169+",
            label: "Total Views"
        },
        {
            number: "50%",
            label: "AI-Powered"
        }
    ];
    const techStack = [
        {
            icon: Cpu,
            name: "GPT-4 & Claude",
            description: "Recipe generation & content creation"
        },
        {
            icon: Video,
            name: "Veo 3",
            description: "Realistic video scene generation"
        },
        {
            icon: Wand2,
            name: "Midjourney",
            description: "Storyboarding & visual concepts"
        },
        {
            icon: Award,
            name: "Custom AI Models",
            description: "Proprietary culinary algorithms"
        }
    ];
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
                        className: "absolute top-20 right-20 w-96 h-96 bg-red-200 rounded-full blur-3xl opacity-20"
                    }),
                    /*#__PURE__*/ _jsxs("div", {
                        className: "container mx-auto relative z-10 text-center",
                        children: [
                            /*#__PURE__*/ _jsx("h1", {
                                className: "text-6xl md:text-7xl font-bold mb-6 leading-tight",
                                children: /*#__PURE__*/ _jsx("span", {
                                    className: "bg-gradient-to-r from-gray-900 via-red-900 to-gray-900 bg-clip-text text-transparent",
                                    children: "About Byte of Taste"
                                })
                            }),
                            /*#__PURE__*/ _jsx("p", {
                                className: "text-xl text-gray-600 max-w-3xl mx-auto",
                                children: "We're not a restaurant. We're a YouTube content creation studio pioneering the future of culinary media through AI."
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ _jsx("section", {
                className: "py-20 px-4",
                children: /*#__PURE__*/ _jsx("div", {
                    className: "container mx-auto",
                    children: /*#__PURE__*/ _jsxs("div", {
                        className: "grid lg:grid-cols-2 gap-16 items-center",
                        children: [
                            /*#__PURE__*/ _jsx("div", {
                                children: /*#__PURE__*/ _jsx("img", {
                                    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
                                    alt: "Craivings cooking content",
                                    className: "rounded-3xl shadow-2xl"
                                })
                            }),
                            /*#__PURE__*/ _jsxs("div", {
                                children: [
                                    /*#__PURE__*/ _jsx("h2", {
                                        className: "text-5xl font-bold mb-6 leading-tight",
                                        children: "Our Mission"
                                    }),
                                    /*#__PURE__*/ _jsx("div", {
                                        className: "w-20 h-1 bg-gradient-to-r from-brand-500 to-brand-300 mb-8"
                                    }),
                                    /*#__PURE__*/ _jsx("p", {
                                        className: "text-gray-600 text-lg leading-relaxed mb-6",
                                        children: "Byte of Taste exists to revolutionize how recipe content is created and consumed. We believe artificial intelligence can unlock infinite culinary possibilities, creating content that would be impossible through traditional filming."
                                    }),
                                    /*#__PURE__*/ _jsx("p", {
                                        className: "text-gray-600 text-lg leading-relaxed mb-6",
                                        children: "Every video you watch is 100% AI-generated — from the recipe itself to the final rendered scenes. Our workflow combines cutting-edge AI models with expert culinary knowledge to produce content that's both authentic and innovative."
                                    }),
                                    /*#__PURE__*/ _jsx("p", {
                                        className: "text-gray-600 text-lg leading-relaxed",
                                        children: "We're building the future of food media, one algorithm at a time."
                                    }),
                                ]
                            })
                        ]
                    })
                })
            }),
            /*#__PURE__*/ _jsx("section", {
                className: "py-20 px-4",
                children: /*#__PURE__*/ _jsx("div", {
                    className: "container mx-auto",
                    children: /*#__PURE__*/ _jsxs("div", {
                        className: "grid lg:grid-cols-2 gap-16 items-center",
                        children: [
                            /*#__PURE__*/ _jsx("div", {
                                className: "lg:-mt-[7.5rem] lg:order-2",
                                children: /*#__PURE__*/ _jsx("img", {
                                    src: "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=1200&q=80",
                                    alt: "Our Vision cooking",
                                    className: "rounded-3xl shadow-2xl w-full max-h-[360px] object-cover"
                                })
                            }),
                            /*#__PURE__*/ _jsxs("div", {
                                className: "lg:order-1",
                                children: [
                                    /*#__PURE__*/ _jsx("h2", {
                                        className: "text-5xl font-bold mb-6 leading-tight",
                                        children: "Our Vision"
                                    }),
                                    /*#__PURE__*/ _jsx("div", {
                                        className: "w-20 h-1 bg-gradient-to-r from-brand-500 to-brand-300 mb-8"
                                    }),
                                    /*#__PURE__*/ _jsx("p", {
                                        className: "text-gray-600 text-lg leading-relaxed mb-2",
                                        children: "Cook smarter. Eat better."
                                    }),
                                    /*#__PURE__*/ _jsx("p", {
                                        className: "text-gray-600 text-lg leading-relaxed mb-4",
                                        children: "Where cooking finally makes sense."
                                    }),
                                    /*#__PURE__*/ _jsx("p", {
                                        className: "text-gray-600 text-lg leading-relaxed mb-4",
                                        children: "Craivings is an AI-powered cooking channel focused on simple, reliable, step-by-step recipes that actually work in real kitchens."
                                    }),
                                    /*#__PURE__*/ _jsx("p", {
                                        className: "text-gray-600 text-lg leading-relaxed mb-4",
                                        children: "We break down cooking using clear visuals, exact timings, temperatures, and smart techniques—so you understand why food works, not just how to cook it."
                                    }),
                                    /*#__PURE__*/ _jsxs("div", {
                                        className: "mb-6",
                                        children: [
                                            /*#__PURE__*/ _jsx("p", {
                                                className: "text-gray-600 text-lg leading-relaxed mb-3 font-semibold",
                                                children: "Expect:"
                                            }),
                                            /*#__PURE__*/ _jsxs("ul", {
                                                className: "grid sm:grid-cols-2 gap-2 text-gray-600 text-lg leading-relaxed",
                                                children: [
                                                    /*#__PURE__*/ _jsx("li", {
                                                        children: "• Easy home cooking recipes"
                                                    }),
                                                    /*#__PURE__*/ _jsx("li", {
                                                        children: "• Air fryer, oven & stovetop methods"
                                                    }),
                                                    /*#__PURE__*/ _jsx("li", {
                                                        children: "• Weeknight dinners & meal prep"
                                                    }),
                                                    /*#__PURE__*/ _jsx("li", {
                                                        children: "• Beginner-friendly cooking basics"
                                                    }),
                                                    /*#__PURE__*/ _jsx("li", {
                                                        children: "• High-protein & family-friendly meals"
                                                    }),
                                                    /*#__PURE__*/ _jsx("li", {
                                                        children: "• Visual cooking explanations"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ _jsx("p", {
                                        className: "text-gray-600 text-lg leading-relaxed",
                                        children: "Whether you’re new to cooking or tired of confusing recipes, Craivings helps you cook with confidence—every time."
                                    })
                                ]
                            })
                        ]
                    })
                })
            }),
            /*#__PURE__*/ _jsx("section", {
                className: "py-20 px-4",
                children: /*#__PURE__*/ _jsxs("div", {
                    className: "container mx-auto",
                    children: [
                        /*#__PURE__*/ _jsxs("div", {
                            className: "text-center mb-16",
                            children: [
                                /*#__PURE__*/ _jsx("h2", {
                                    className: "text-5xl font-bold mb-4",
                                    children: "Our Values"
                                }),
                                /*#__PURE__*/ _jsx("p", {
                                    className: "text-xl text-gray-600 max-w-2xl mx-auto",
                                    children: "The principles that guide everything we create"
                                })
                            ]
                        }),
                        /*#__PURE__*/ _jsx("div", {
                            className: "grid md:grid-cols-2 gap-8",
                            children: values.map((value, index)=>/*#__PURE__*/ _jsxs(Card, {
                                    className: "p-8 border-0 shadow-lg hover:shadow-xl transition-shadow bg-white",
                                    children: [
                                        /*#__PURE__*/ _jsx("div", {
                                            className: "w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl flex items-center justify-center mb-6",
                                            children: /*#__PURE__*/ _jsx(value.icon, {
                                                className: "h-8 w-8 text-white"
                                            })
                                        }),
                                        /*#__PURE__*/ _jsx("h3", {
                                            className: "text-2xl font-bold mb-4",
                                            children: value.title
                                        }),
                                        /*#__PURE__*/ _jsx("p", {
                                            className: "text-gray-600 text-lg leading-relaxed",
                                            children: value.description
                                        })
                                    ]
                                }, index))
                        })
                    ]
                })
            }),
            /*#__PURE__*/ _jsx(Footer, {})
        ]
    });
};
export default About;


