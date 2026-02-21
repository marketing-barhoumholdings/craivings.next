import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Youtube, Instagram, Twitter, Music, Star, Play, Clock, Sparkles, Wand2, Film, Video, Calendar, MessageSquare, Send, ArrowRight } from "lucide-react";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import brain from "brain";
import { toast } from "sonner";
import { useSanityPage } from "../sanity/useSanityPage";
import { Header } from "../components/Header";
export default function App() {
    const navigate = useNavigate();
    const { page } = useSanityPage("home");
    if (page?.contentHtml) {
        return /*#__PURE__*/ _jsxs("div", {
            className: "min-h-screen bg-gradient-to-b from-red-50/30 to-white",
            children: [
                /*#__PURE__*/ _jsx(Header, {}),
                /*#__PURE__*/ _jsx("div", {
                    className: "container mx-auto px-6 py-16",
                    dangerouslySetInnerHTML: {
                        __html: page.contentHtml
                    }
                })
            ]
        });
    }
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [recipeRequest, setRecipeRequest] = useState({
        name: "",
        recipe: "",
        message: ""
    });
    const [latestRecipes, setLatestRecipes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [testimonialApi, setTestimonialApi] = useState();
    const [fanFavoriteRecipes, setFanFavoriteRecipes] = useState([]);
    const [comingSoonRecipes, setComingSoonRecipes] = useState([]);
    const [comingSoonBlogPosts, setComingSoonBlogPosts] = useState([]);
    const [latestBlogPosts, setLatestBlogPosts] = useState([]);
    useEffect(()=>{
        const fetchLatestRecipes = async ()=>{
            try {
                const response = await brain.list_recipes({
                    limit: 3,
                    offset: 0
                });
                const data = await response.json();
                if (data.recipes) {
                    setLatestRecipes(data.recipes);
                }
            } catch (error) {
                console.error("Error fetching latest recipes:", error);
            }
        };
        fetchLatestRecipes();
    }, []);
    useEffect(()=>{
        const fetchFanFavorites = async ()=>{
            try {
                const response = await brain.list_recipes({
                    limit: 100,
                    offset: 0
                });
                const data = await response.json();
                if (data.recipes) {
                    // Filter for recipes with 4+ rating and sort by rating
                    const topRated = data.recipes.filter((recipe)=>recipe.average_rating && recipe.average_rating >= 4).sort((a, b)=>(b.average_rating || 0) - (a.average_rating || 0)).slice(0, 6);
                    setFanFavoriteRecipes(topRated);
                }
            } catch (error) {
                console.error("Error fetching fan favorites:", error);
            }
        };
        fetchFanFavorites();
    }, []);
    useEffect(()=>{
        const fetchComingSoon = async ()=>{
            try {
                const response = await brain.get_coming_soon_recipes();
                const data = await response.json();
                if (data.recipes) {
                    setComingSoonRecipes(data.recipes.slice(0, 3));
                }
            } catch (error) {
                console.error("Error fetching coming soon recipes:", error);
            }
        };
        fetchComingSoon();
    }, []);
    useEffect(()=>{
        const fetchComingSoonBlogs = async ()=>{
            try {
                const response = await brain.get_coming_soon_posts();
                const data = await response.json();
                if (data.posts) {
                    setComingSoonBlogPosts(data.posts.slice(0, 3));
                }
            } catch (error) {
                console.error("Error fetching coming soon blog posts:", error);
            }
        };
        fetchComingSoonBlogs();
    }, []);
    useEffect(()=>{
        const fetchLatestBlogs = async ()=>{
            try {
                const response = await brain.list_posts({
                    limit: 3,
                    offset: 0
                });
                const data = await response.json();
                if (data.posts) {
                    setLatestBlogPosts(data.posts);
                }
            } catch (error) {
                console.error("Error fetching latest blog posts:", error);
            }
        };
        fetchLatestBlogs();
    }, []);
    useEffect(()=>{
        const fetchCategories = async ()=>{
            try {
                const response = await brain.get_recipe_categories();
                const data = await response.json();
                if (data) {
                    setCategories(data);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);
    useEffect(()=>{
        const fetchTestimonials = async ()=>{
            try {
                const response = await brain.get_approved_testimonials({
                    limit: 10
                });
                const data = await response.json();
                if (data) {
                    setTestimonials(data);
                }
            } catch (error) {
                console.error("Error fetching testimonials:", error);
            }
        };
        fetchTestimonials();
    }, []);
    // Autoplay for testimonials carousel
    useEffect(()=>{
        if (!testimonialApi) return;
        const autoplay = setInterval(()=>{
            testimonialApi.scrollNext();
        }, 4000); // Auto-scroll every 4 seconds
        return ()=>clearInterval(autoplay);
    }, [
        testimonialApi
    ]);
    const featuredVideos = [
        {
            id: 1,
            title: "Perfect Italian Carbonara",
            thumbnail: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=800&q=80",
            duration: "8:45",
            views: "127K"
        },
        {
            id: 2,
            title: "Artisan Sourdough Bread",
            thumbnail: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
            duration: "12:30",
            views: "89K"
        },
        {
            id: 3,
            title: "Thai Green Curry Masterclass",
            thumbnail: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=800&q=80",
            duration: "10:15",
            views: "156K"
        }
    ];
    const productionSteps = [
        {
            icon: Sparkles,
            title: "Quality First",
            description: "Every recipe is carefully tested and perfected to ensure delicious results every time"
        },
        {
            icon: Wand2,
            title: "Easy to Follow",
            description: "Clear step-by-step instructions that make cooking accessible for everyone"
        },
        {
            icon: Film,
            title: "Fresh Content",
            description: "New recipes and cooking videos released regularly to keep your kitchen inspired"
        },
        {
            icon: Video,
            title: "Community Driven",
            description: "Your feedback shapes our content, bringing you the recipes you love most"
        }
    ];
    const features = [
        "Professionally tested recipes",
        "High-quality video production",
        "Authentic, delicious recipes",
        "Weekly new releases"
    ];
    const trendingRecipes = [
        {
            title: "Japanese Ramen Bowl",
            description: "Authentic flavors in a comforting bowl",
            time: "25 mins",
            rating: "4.8",
            difficulty: "Easy",
            image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=400&q=80"
        },
        {
            title: "French Croissants",
            description: "Flaky, buttery perfection",
            time: "45 mins",
            rating: "4.9",
            difficulty: "Medium",
            image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80"
        },
        {
            title: "Chocolate Lava Cake",
            description: "Molten chocolate indulgence",
            time: "20 mins",
            rating: "5.0",
            difficulty: "Easy",
            image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=400&q=80"
        },
        {
            title: "Thai Green Curry",
            description: "Aromatic and spicy Thai classic",
            time: "35 mins",
            rating: "4.7",
            difficulty: "Medium",
            image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=400&q=80"
        },
        {
            title: "Classic Margherita Pizza",
            description: "Simple Italian perfection",
            time: "30 mins",
            rating: "4.9",
            difficulty: "Easy",
            image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=400&q=80"
        },
        {
            title: "Beef Wellington",
            description: "Elegant British showstopper",
            time: "60 mins",
            rating: "4.8",
            difficulty: "Hard",
            image: "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?auto=format&fit=crop&w=400&q=80"
        }
    ];
    const handleRecipeRequest = async (e)=>{
        e.preventDefault();
        console.log("Recipe request:", recipeRequest);
        toast.success("Thanks for your suggestion! We'll consider it for future videos.");
        setRecipeRequest({
            name: "",
            recipe: "",
            message: ""
        });
    };
    return /*#__PURE__*/ _jsxs("div", {
        className: "min-h-screen bg-gradient-to-b from-[#F0F9F4] via-[#FFF9F3] to-white overflow-x-hidden",
        children: [
            /*#__PURE__*/ _jsx(Header, {}),
            /*#__PURE__*/ _jsxs("section", {
                className: "relative py-16 lg:py-20 px-6 overflow-hidden bg-gradient-to-br from-red-50 via-white to-red-50",
                children: [
                    /*#__PURE__*/ _jsxs("div", {
                        className: "absolute inset-0 overflow-hidden opacity-30",
                        children: [
                            /*#__PURE__*/ _jsx("div", {
                                className: "absolute top-40 right-1/4 w-96 h-96 bg-red-200 rounded-full blur-3xl animate-pulse",
                                style: {
                                    animationDuration: '4s'
                                }
                            }),
                            /*#__PURE__*/ _jsx("div", {
                                className: "absolute bottom-20 left-1/4 w-80 h-80 bg-red-200 rounded-full blur-3xl animate-pulse",
                                style: {
                                    animationDuration: '5s',
                                    animationDelay: '1s'
                                }
                            })
                        ]
                    }),
                    /*#__PURE__*/ _jsxs("div", {
                        className: "w-full relative z-10",
                        children: [
                            /*#__PURE__*/ _jsxs("div", {
                                className: "grid lg:grid-cols-2 gap-12 lg:gap-16 items-center",
                                children: [
                                    /*#__PURE__*/ _jsxs("div", {
                                        className: "space-y-6",
                                        children: [
                                            /*#__PURE__*/ _jsxs("div", {
                                                children: [
                                                    /*#__PURE__*/ _jsxs("h1", {
                                                        className: "text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 animate-fade-in",
                                                        children: [
                                                            /*#__PURE__*/ _jsx("span", {
                                                                className: "text-gray-900 block mb-2",
                                                                children: "Your everyday"
                                                            }),
                                                            /*#__PURE__*/ _jsxs("span", {
                                                                className: "relative inline-block",
                                                                children: [
                                                                    /*#__PURE__*/ _jsx("span", {
                                                                        className: "relative z-10 text-gray-900",
                                                                        children: "cooking inspiration"
                                                                    }),
                                                                    /*#__PURE__*/ _jsx("svg", {
                                                                        className: "absolute -bottom-2 left-0 w-full animate-draw",
                                                                        viewBox: "0 0 400 20",
                                                                        fill: "none",
                                                                        xmlns: "http://www.w3.org/2000/svg",
                                                                        children: /*#__PURE__*/ _jsx("path", {
                                                                            d: "M5 15C100 5, 300 5, 395 15",
                                                                            stroke: "#DC2626",
                                                                            strokeWidth: "8",
                                                                            strokeLinecap: "round",
                                                                            fill: "none"
                                                                        })
                                                                    })
                                                                ]
                                                            }),
                                                            /*#__PURE__*/ _jsx("span", {
                                                                className: "text-gray-900",
                                                                children: "."
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ _jsx("p", {
                                                        className: "text-lg text-gray-600 leading-relaxed animate-fade-in",
                                                        style: {
                                                            animationDelay: '0.2s'
                                                        },
                                                        children: "Discover delicious recipes and cooking videos that make every meal special"
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ _jsxs("div", {
                                                className: "flex flex-wrap gap-4 animate-fade-in",
                                                style: {
                                                    animationDelay: '0.4s'
                                                },
                                                children: [
                                                    /*#__PURE__*/ _jsxs(Button, {
                                                        size: "lg",
                                                        onClick: ()=>window.open("https://www.youtube.com/@Craivings", "_blank", "noopener,noreferrer"),
                                                        className: "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 rounded-md px-8 bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-700 text-white px-6 py-5 text-base rounded-xl shadow-lg hover:shadow-2xl transition-all hover:scale-105 hover:-translate-y-1",
                                                        children: [
                                                            /*#__PURE__*/ _jsx(Play, {
                                                                className: "mr-2 h-5 w-5",
                                                                fill: "currentColor"
                                                            }),
                                                            "Watch Videos"
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ _jsx(Button, {
                                                        size: "lg",
                                                        variant: "outline",
                                                        className: "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-10 rounded-md px-8 border-2 border-gray-300 hover:border-brand-600 hover:bg-brand-50 text-gray-700 hover:text-brand-600 px-6 py-5 text-base rounded-xl transition-all hover:scale-105 hover:-translate-y-1",
                                                        children: "Browse Recipes"
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ _jsxs("div", {
                                                className: "grid grid-cols-3 gap-4 pt-2 animate-fade-in",
                                                style: {
                                                    animationDelay: '0.6s'
                                                },
                                                children: [
                                                    /*#__PURE__*/ _jsxs("div", {
                                                        className: "group cursor-pointer",
                                                        children: [
                                                            /*#__PURE__*/ _jsx("div", {
                                                                className: "text-3xl md:text-4xl font-bold text-brand-600 mb-1 group-hover:scale-110 transition-transform duration-300",
                                                                children: "500+"
                                                            }),
                                                            /*#__PURE__*/ _jsx("div", {
                                                                className: "text-xs text-gray-600",
                                                                children: "Videos"
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ _jsxs("div", {
                                                        className: "group cursor-pointer",
                                                        children: [
                                                            /*#__PURE__*/ _jsx("div", {
                                                                className: "text-3xl md:text-4xl font-bold text-brand-600 mb-1 group-hover:scale-110 transition-transform duration-300",
                                                                children: "2M+"
                                                            }),
                                                            /*#__PURE__*/ _jsx("div", {
                                                                className: "text-xs text-gray-600",
                                                                children: "Viewers"
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ _jsxs("div", {
                                                        className: "group cursor-pointer",
                                                        children: [
                                                            /*#__PURE__*/ _jsx("div", {
                                                                className: "text-3xl md:text-4xl font-bold text-brand-600 mb-1 group-hover:scale-110 transition-transform duration-300",
                                                                children: "150+"
                                                            }),
                                                            /*#__PURE__*/ _jsx("div", {
                                                                className: "text-xs text-gray-600",
                                                                children: "Recipes"
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ _jsxs("div", {
                                        className: "relative max-w-lg mx-auto w-full animate-fade-in",
                                        style: {
                                            animationDelay: '0.3s'
                                        },
                                        children: [
                                            /*#__PURE__*/ _jsx(Card, {
                                                className: "overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group cursor-pointer hover:-translate-y-2 animate-float-slow",
                                                children: /*#__PURE__*/ _jsxs("div", {
                                                    className: "relative aspect-video",
                                                    children: [
                                                        /*#__PURE__*/ _jsx("img", {
                                                            src: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80",
                                                            alt: "Featured Recipe",
                                                            className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                        }),
                                                        /*#__PURE__*/ _jsx("div", {
                                                            className: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all duration-500"
                                                        }),
                                                        /*#__PURE__*/ _jsx("div", {
                                                            className: "absolute inset-0 flex items-center justify-center",
                                                            children: /*#__PURE__*/ _jsx("div", {
                                                                className: "w-14 h-14 bg-white rounded-full flex items-center justify-center group-hover:scale-125 transition-all duration-300 shadow-2xl group-hover:shadow-brand-600/50",
                                                                children: /*#__PURE__*/ _jsx(Play, {
                                                                    className: "h-6 w-6 text-brand-600 ml-1 group-hover:text-red-600 transition-colors",
                                                                    fill: "currentColor"
                                                                })
                                                            })
                                                        }),
                                                        /*#__PURE__*/ _jsx("div", {
                                                            className: "absolute top-3 right-3 opacity-90 group-hover:opacity-100 transition-opacity",
                                                            children: /*#__PURE__*/ _jsx("div", {
                                                                className: "px-2.5 py-1 bg-black/70 backdrop-blur-sm text-white text-xs font-semibold rounded-lg",
                                                                children: "5:30"
                                                            })
                                                        }),
                                                        /*#__PURE__*/ _jsxs("div", {
                                                            className: "absolute bottom-0 left-0 right-0 p-4 transform group-hover:translate-y-0 transition-transform",
                                                            children: [
                                                                /*#__PURE__*/ _jsx("h3", {
                                                                    className: "text-white text-lg font-bold mb-1",
                                                                    children: "Perfect Italian Carbonara"
                                                                }),
                                                                /*#__PURE__*/ _jsxs("div", {
                                                                    className: "flex items-center gap-3 text-white/90 text-xs",
                                                                    children: [
                                                                        /*#__PURE__*/ _jsxs("div", {
                                                                            className: "flex items-center gap-1",
                                                                            children: [
                                                                                /*#__PURE__*/ _jsx(Star, {
                                                                                    className: "h-3 w-3 fill-yellow-400 text-yellow-400"
                                                                                }),
                                                                                /*#__PURE__*/ _jsx("span", {
                                                                                    children: "4.9"
                                                                                })
                                                                            ]
                                                                        }),
                                                                        /*#__PURE__*/ _jsx("span", {
                                                                            children: "•"
                                                                        }),
                                                                        /*#__PURE__*/ _jsx("span", {
                                                                            children: "234K views"
                                                                        })
                                                                    ]
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                })
                                            }),
                                            /*#__PURE__*/ _jsxs("div", {
                                                className: "grid grid-cols-2 gap-3 mt-4",
                                                children: [
                                                    /*#__PURE__*/ _jsx(Card, {
                                                        className: "overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer hover:-translate-y-2 animate-fade-in",
                                                        style: {
                                                            animationDelay: '0.5s'
                                                        },
                                                        children: /*#__PURE__*/ _jsxs("div", {
                                                            className: "relative aspect-video",
                                                            children: [
                                                                /*#__PURE__*/ _jsx("img", {
                                                                    src: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=400&q=80",
                                                                    alt: "Recipe Video",
                                                                    className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                                }),
                                                                /*#__PURE__*/ _jsx("div", {
                                                                    className: "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/70 transition-all"
                                                                }),
                                                                /*#__PURE__*/ _jsx("div", {
                                                                    className: "absolute inset-0 flex items-center justify-center",
                                                                    children: /*#__PURE__*/ _jsx("div", {
                                                                        className: "w-9 h-9 bg-white rounded-full flex items-center justify-center opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all",
                                                                        children: /*#__PURE__*/ _jsx(Play, {
                                                                            className: "h-3.5 w-3.5 text-brand-600 ml-0.5",
                                                                            fill: "currentColor"
                                                                        })
                                                                    })
                                                                }),
                                                                /*#__PURE__*/ _jsxs("div", {
                                                                    className: "absolute bottom-2 left-2 right-2",
                                                                    children: [
                                                                        /*#__PURE__*/ _jsx("div", {
                                                                            className: "text-white text-xs font-semibold mb-0.5",
                                                                            children: "Fluffy Pancakes"
                                                                        }),
                                                                        /*#__PURE__*/ _jsx("div", {
                                                                            className: "text-white/80 text-xs",
                                                                            children: "4:20"
                                                                        })
                                                                    ]
                                                                })
                                                            ]
                                                        })
                                                    }),
                                                    /*#__PURE__*/ _jsx(Card, {
                                                        className: "overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer hover:-translate-y-2 animate-fade-in",
                                                        style: {
                                                            animationDelay: '0.6s'
                                                        },
                                                        children: /*#__PURE__*/ _jsxs("div", {
                                                            className: "relative aspect-video",
                                                            children: [
                                                                /*#__PURE__*/ _jsx("img", {
                                                                    src: "https://images.unsplash.com/photo-1588013273468-31508b946d4d?auto=format&fit=crop&w=400&q=80",
                                                                    alt: "Recipe Video",
                                                                    className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                                }),
                                                                /*#__PURE__*/ _jsx("div", {
                                                                    className: "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/70 transition-all"
                                                                }),
                                                                /*#__PURE__*/ _jsx("div", {
                                                                    className: "absolute inset-0 flex items-center justify-center",
                                                                    children: /*#__PURE__*/ _jsx("div", {
                                                                        className: "w-9 h-9 bg-white rounded-full flex items-center justify-center opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all",
                                                                        children: /*#__PURE__*/ _jsx(Play, {
                                                                            className: "h-3.5 w-3.5 text-brand-600 ml-0.5",
                                                                            fill: "currentColor"
                                                                        })
                                                                    })
                                                                }),
                                                                /*#__PURE__*/ _jsxs("div", {
                                                                    className: "absolute bottom-2 left-2 right-2",
                                                                    children: [
                                                                        /*#__PURE__*/ _jsx("div", {
                                                                            className: "text-white text-xs font-semibold mb-0.5",
                                                                            children: "Thai Green Curry"
                                                                        }),
                                                                        /*#__PURE__*/ _jsx("div", {
                                                                            className: "text-white/80 text-xs",
                                                                            children: "6:15"
                                                                        })
                                                                    ]
                                                                })
                                                            ]
                                                        })
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            }),
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ _jsx("section", {
                className: "py-20 px-4 bg-gradient-to-br from-brand-600 to-brand-700 text-white",
                children: /*#__PURE__*/ _jsxs("div", {
                    className: "container mx-auto text-center",
                    children: [
                        /*#__PURE__*/ _jsx("h2", {
                            className: "text-4xl md:text-5xl font-bold mb-6",
                            children: "Follow Our Culinary Journey"
                        }),
                        /*#__PURE__*/ _jsx("p", {
                            className: "text-xl text-brand-100 mb-12 max-w-2xl mx-auto",
                            children: "Join millions of food enthusiasts across all platforms. Never miss a recipe!"
                        }),
                        /*#__PURE__*/ _jsxs("div", {
                            className: "grid md:grid-cols-4 gap-6 max-w-4xl mx-auto",
                            children: [
                                /*#__PURE__*/ _jsx("a", {
                                    href: "https://www.youtube.com/@Craivings",
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    className: "h-full",
                                    children: /*#__PURE__*/ _jsxs(Card, {
                                        className: "p-8 bg-white border-0 hover:shadow-2xl transition-all cursor-pointer group h-full flex flex-col",
                                        children: [
                                            /*#__PURE__*/ _jsx(Youtube, {
                                                className: "h-12 w-12 mx-auto mb-4 text-brand-600"
                                            }),
                                            /*#__PURE__*/ _jsx("h3", {
                                                className: "font-bold text-lg mb-2 text-brand-600",
                                                children: "YouTube"
                                            }),
                                            /*#__PURE__*/ _jsx("p", {
                                                className: "text-gray-600 text-sm mb-3",
                                                children: "2M+ Subscribers"
                                            }),
                                            /*#__PURE__*/ _jsx(Button, {
                                                className: "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full bg-brand-600 text-white hover:bg-brand-700 mt-auto",
                                                children: "Subscribe"
                                            })
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ _jsx("a", {
                                    href: "https://www.instagram.com/craivingsai/",
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    className: "h-full",
                                    children: /*#__PURE__*/ _jsxs(Card, {
                                        className: "p-8 bg-white border-0 hover:shadow-2xl transition-all cursor-pointer group h-full flex flex-col",
                                        children: [
                                            /*#__PURE__*/ _jsx(Instagram, {
                                                className: "h-12 w-12 mx-auto mb-4 text-brand-600"
                                            }),
                                            /*#__PURE__*/ _jsx("h3", {
                                                className: "font-bold text-lg mb-2 text-brand-600",
                                                children: "Instagram"
                                            }),
                                            /*#__PURE__*/ _jsx("p", {
                                                className: "text-gray-600 text-sm mb-3",
                                                children: "500K+ Followers"
                                            }),
                                            /*#__PURE__*/ _jsx(Button, {
                                                className: "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full bg-brand-600 text-white hover:bg-brand-700 mt-auto",
                                                children: "Follow"
                                            })
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ _jsx("a", {
                                    href: "https://www.tiktok.com/@craivings",
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    className: "h-full",
                                    children: /*#__PURE__*/ _jsxs(Card, {
                                        className: "p-8 bg-white border-0 hover:shadow-2xl transition-all cursor-pointer group h-full flex flex-col",
                                        children: [
                                            /*#__PURE__*/ _jsx(Music, {
                                                className: "h-12 w-12 mx-auto mb-4 text-brand-600"
                                            }),
                                            /*#__PURE__*/ _jsx("h3", {
                                                className: "font-bold text-lg mb-2 text-brand-600",
                                                children: "TikTok"
                                            }),
                                            /*#__PURE__*/ _jsx("p", {
                                                className: "text-gray-600 text-sm mb-3",
                                                children: "1M+ Followers"
                                            }),
                                            /*#__PURE__*/ _jsx(Button, {
                                                className: "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full bg-brand-600 text-white hover:bg-brand-700 mt-auto",
                                                children: "Follow"
                                            })
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ _jsx("a", {
                                    href: "https://x.com/craivingsai",
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    className: "h-full",
                                    children: /*#__PURE__*/ _jsxs(Card, {
                                        className: "p-8 bg-white border-0 hover:shadow-2xl transition-all cursor-pointer group h-full flex flex-col",
                                        children: [
                                            /*#__PURE__*/ _jsx(Twitter, {
                                                className: "h-12 w-12 mx-auto mb-4 text-brand-600"
                                            }),
                                            /*#__PURE__*/ _jsx("h3", {
                                                className: "font-bold text-lg mb-2 text-brand-600",
                                                children: "Twitter"
                                            }),
                                            /*#__PURE__*/ _jsx("p", {
                                                className: "text-gray-600 text-sm mb-3",
                                                children: "300K+ Followers"
                                            }),
                                            /*#__PURE__*/ _jsx(Button, {
                                                className: "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full bg-brand-600 text-white hover:bg-brand-700 mt-auto",
                                                children: "Follow"
                                            })
                                        ]
                                    })
                                })
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ _jsxs("section", {
                className: "mt-20 px-6",
                children: [
                    /*#__PURE__*/ _jsxs("div", {
                        className: "text-center mb-10 animate-fade-in",
                        style: {
                            animationDelay: '0.8s'
                        },
                        children: [
                            /*#__PURE__*/ _jsx("h2", {
                                className: "text-3xl font-bold text-gray-900 mb-2",
                                children: "Trending Recipes"
                            }),
                            /*#__PURE__*/ _jsx("p", {
                                className: "text-base text-gray-600",
                                children: "Discover what everyone is cooking"
                            })
                        ]
                    }),
                    /*#__PURE__*/ _jsx("div", {
                        className: "overflow-hidden",
                        children: /*#__PURE__*/ _jsx("div", {
                            className: "flex gap-5 trending-marquee",
                            children: [
                                ...trendingRecipes,
                                ...trendingRecipes
                            ].map((recipe, index)=>/*#__PURE__*/ _jsxs("div", {
                                    className: "flex-[0_0_280px] min-w-0",
                                    key: `${recipe.title}-${index}`,
                                    children: [
                                        /*#__PURE__*/ _jsxs("div", {
                                            className: "rounded-xl border bg-card text-card-foreground shadow overflow-hidden hover:shadow-xl transition-all duration-500 cursor-pointer group bg-white hover:-translate-y-2",
                                            children: [
                                                /*#__PURE__*/ _jsxs("div", {
                                                    className: "relative aspect-square overflow-hidden",
                                                    children: [
                                                        /*#__PURE__*/ _jsx("img", {
                                                            src: recipe.image,
                                                            alt: recipe.title,
                                                            className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                        }),
                                                        /*#__PURE__*/ _jsx("div", {
                                                            className: "absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent group-hover:from-black/60 transition-all"
                                                        }),
                                                        /*#__PURE__*/ _jsx("div", {
                                                            className: "absolute top-3 right-3 transform group-hover:scale-110 transition-transform",
                                                            children: /*#__PURE__*/ _jsx("div", {
                                                                className: "px-2.5 py-1 bg-white/90 backdrop-blur-sm text-brand-600 text-xs font-bold rounded-lg shadow-lg",
                                                                children: recipe.difficulty
                                                            })
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ _jsxs("div", {
                                                    className: "p-4",
                                                    children: [
                                                        /*#__PURE__*/ _jsx("h3", {
                                                            className: "text-base font-bold mb-1.5 text-gray-900 group-hover:text-brand-600 transition-colors duration-300",
                                                            children: recipe.title
                                                        }),
                                                        /*#__PURE__*/ _jsx("p", {
                                                            className: "text-xs text-gray-600 mb-3",
                                                            children: recipe.description
                                                        }),
                                                        /*#__PURE__*/ _jsxs("div", {
                                                            className: "flex items-center justify-between",
                                                            children: [
                                                                /*#__PURE__*/ _jsxs("div", {
                                                                    className: "flex items-center gap-1 text-xs text-gray-600",
                                                                    children: [
                                                                        /*#__PURE__*/ _jsx(Clock, {
                                                                            className: "h-3.5 w-3.5 text-brand-600"
                                                                        }),
                                                                        /*#__PURE__*/ _jsx("span", {
                                                                            children: recipe.time
                                                                        })
                                                                    ]
                                                                }),
                                                                /*#__PURE__*/ _jsxs("div", {
                                                                    className: "flex items-center gap-1 text-xs font-semibold text-gray-900",
                                                                    children: [
                                                                        /*#__PURE__*/ _jsx(Star, {
                                                                            className: "h-3.5 w-3.5 fill-yellow-400 text-yellow-400 group-hover:scale-110 transition-transform"
                                                                        }),
                                                                        /*#__PURE__*/ _jsx("span", {
                                                                            children: recipe.rating
                                                                        })
                                                                    ]
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                }))
                        })
                    })
                ]
            }),
            /*#__PURE__*/ _jsx("section", {
                className: "py-32 px-6 relative",
                children: /*#__PURE__*/ _jsx("div", {
                    className: "container mx-auto",
                    children: /*#__PURE__*/ _jsxs("div", {
                        className: "grid lg:grid-cols-5 gap-12 items-center",
                        children: [
                            /*#__PURE__*/ _jsxs("div", {
                                className: "lg:col-span-2",
                                children: [
                                    /*#__PURE__*/ _jsxs("h2", {
                                        className: "text-5xl font-bold mb-6 leading-tight",
                                        children: [
                                            "Redefining",
                                            /*#__PURE__*/ _jsx("span", {
                                                className: "block text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-700",
                                                children: "Recipe Content"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ _jsx("div", {
                                        className: "w-20 h-1 bg-gradient-to-r from-brand-500 to-brand-300 mb-6"
                                    }),
                                    /*#__PURE__*/ _jsx("p", {
                                        className: "text-gray-600 text-lg leading-relaxed mb-8",
                                        children: "Craivings is your ultimate destination for delicious recipes and inspiring cooking content. We create engaging videos and detailed recipe guides that make cooking enjoyable and accessible for everyone."
                                    }),
                                    /*#__PURE__*/ _jsx("p", {
                                        className: "text-gray-600 text-lg leading-relaxed",
                                        children: "From quick weeknight dinners to impressive weekend feasts, we bring you recipes that work every time. Join our community of food lovers and discover your next favorite dish."
                                    })
                                ]
                            }),
                            /*#__PURE__*/ _jsx("div", {
                                className: "lg:col-span-3",
                                children: /*#__PURE__*/ _jsxs("div", {
                                    className: "grid grid-cols-2 gap-6",
                                    children: [
                                        /*#__PURE__*/ _jsxs(Card, {
                                            className: "p-8 bg-white/60 backdrop-blur-sm border-brand-100 hover:shadow-xl transition-shadow",
                                            children: [
                                                /*#__PURE__*/ _jsx("div", {
                                                    className: "text-4xl font-bold text-brand-600 mb-2",
                                                    children: "500+"
                                                }),
                                                /*#__PURE__*/ _jsx("div", {
                                                    className: "text-gray-600",
                                                    children: "Recipe Videos"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ _jsxs(Card, {
                                            className: "p-8 bg-white/60 backdrop-blur-sm border-brand-100 hover:shadow-xl transition-shadow mt-8",
                                            children: [
                                                /*#__PURE__*/ _jsx("div", {
                                                    className: "text-4xl font-bold text-brand-600 mb-2",
                                                    children: "2M+"
                                                }),
                                                /*#__PURE__*/ _jsx("div", {
                                                    className: "text-gray-600",
                                                    children: "YouTube Subscribers"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ _jsxs(Card, {
                                            className: "p-8 bg-white/60 backdrop-blur-sm border-brand-100 hover:shadow-xl transition-shadow",
                                            children: [
                                                /*#__PURE__*/ _jsx("div", {
                                                    className: "text-4xl font-bold text-brand-600 mb-2",
                                                    children: "50M+"
                                                }),
                                                /*#__PURE__*/ _jsx("div", {
                                                    className: "text-gray-600",
                                                    children: "Total Views"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ _jsxs(Card, {
                                            className: "p-8 bg-white/60 backdrop-blur-sm border-brand-100 hover:shadow-xl transition-shadow mt-8",
                                            children: [
                                                /*#__PURE__*/ _jsx("div", {
                                                    className: "text-4xl font-bold text-brand-600 mb-2",
                                                    children: "100%"
                                                }),
                                                /*#__PURE__*/ _jsx("div", {
                                                    className: "text-gray-600",
                                                    children: "Tested Recipes"
                                                })
                                            ]
                                        })
                                    ]
                                })
                            })
                        ]
                    })
                })
            }),
            /*#__PURE__*/ _jsxs("section", {
                className: "py-32 px-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden",
                children: [
                    /*#__PURE__*/ _jsxs("div", {
                        className: "absolute inset-0 opacity-10",
                        children: [
                            /*#__PURE__*/ _jsx("div", {
                                className: "absolute top-0 left-1/4 w-96 h-96 bg-brand-500 rounded-full blur-3xl"
                            }),
                            /*#__PURE__*/ _jsx("div", {
                                className: "absolute bottom-0 right-1/4 w-96 h-96 bg-brand-600 rounded-full blur-3xl"
                            })
                        ]
                    }),
                    /*#__PURE__*/ _jsxs("div", {
                        className: "container mx-auto relative z-10",
                        children: [
                            /*#__PURE__*/ _jsxs("div", {
                                className: "text-center mb-20",
                                children: [
                                    /*#__PURE__*/ _jsx("h2", {
                                        className: "text-5xl font-bold mb-6",
                                        children: "Our Values"
                                    }),
                                    /*#__PURE__*/ _jsx("p", {
                                        className: "text-xl text-gray-300  mx-auto",
                                        children: "What makes Craivings special and drives everything we create"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ _jsx("div", {
                                className: "grid md:grid-cols-2 lg:grid-cols-4 gap-8",
                                children: productionSteps.map((step, index)=>/*#__PURE__*/ _jsx("div", {
                                        className: "relative",
                                        children: /*#__PURE__*/ _jsxs(Card, {
                                            className: "p-8 bg-white/90 backdrop-blur-md border-white/20 hover:bg-white transition-all h-full",
                                            children: [
                                                /*#__PURE__*/ _jsx("div", {
                                                    className: "mb-6",
                                                    children: /*#__PURE__*/ _jsx("div", {
                                                        className: "w-16 h-16 bg-gradient-to-br from-brand-500 to-brand-700 rounded-2xl flex items-center justify-center",
                                                        children: /*#__PURE__*/ _jsx(step.icon, {
                                                            className: "h-8 w-8 text-white"
                                                        })
                                                    })
                                                }),
                                                /*#__PURE__*/ _jsxs("div", {
                                                    className: "text-sm text-brand-600 font-semibold mb-2",
                                                    children: [
                                                        "VALUE ",
                                                        index + 1
                                                    ]
                                                }),
                                                /*#__PURE__*/ _jsx("h3", {
                                                    className: "text-xl font-bold mb-3 text-gray-900",
                                                    children: step.title
                                                }),
                                                /*#__PURE__*/ _jsx("p", {
                                                    className: "text-gray-700 leading-relaxed",
                                                    children: step.description
                                                })
                                            ]
                                        })
                                    }, index))
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ _jsx("section", {
                className: "py-32 px-6",
                children: /*#__PURE__*/ _jsxs("div", {
                    className: "container mx-auto",
                    children: [
                        /*#__PURE__*/ _jsxs("div", {
                            className: "flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-16",
                            children: [
                                /*#__PURE__*/ _jsxs("div", {
                                    children: [
                                        /*#__PURE__*/ _jsx("h2", {
                                            className: "text-5xl font-bold mb-4",
                                            children: "Latest Releases"
                                        }),
                                        /*#__PURE__*/ _jsx("p", {
                                            className: "text-xl text-gray-600",
                                            children: "Watch our newest recipe videos"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ _jsxs(Button, {
                                    variant: "outline",
                                    className: "border-2 border-brand-600 text-brand-600 hover:bg-brand-600 hover:text-white",
                                    onClick: ()=>navigate('/recipes'),
                                    children: [
                                        "View All Videos",
                                        /*#__PURE__*/ _jsx(ArrowRight, {
                                            className: "ml-2 h-4 w-4"
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ _jsx("div", {
                            className: "grid md:grid-cols-3 gap-8",
                            children: latestRecipes.length > 0 ? latestRecipes.map((recipe)=>/*#__PURE__*/ _jsxs(Card, {
                                    className: "group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all cursor-pointer",
                                    onClick: ()=>navigate(`/recipe-detail?slug=${recipe.slug}`),
                                    children: [
                                        /*#__PURE__*/ _jsxs("div", {
                                            className: "relative aspect-video overflow-hidden",
                                            children: [
                                                /*#__PURE__*/ _jsx("img", {
                                                    src: recipe.featured_image_url || "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80",
                                                    alt: recipe.title,
                                                    className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                }),
                                                /*#__PURE__*/ _jsx("div", {
                                                    className: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center",
                                                    children: /*#__PURE__*/ _jsx("div", {
                                                        className: "w-16 h-16 bg-white rounded-full flex items-center justify-center",
                                                        children: /*#__PURE__*/ _jsx(Play, {
                                                            className: "h-6 w-6 text-brand-600 ml-1",
                                                            fill: "currentColor"
                                                        })
                                                    })
                                                }),
                                                recipe.prep_time && /*#__PURE__*/ _jsxs("div", {
                                                    className: "absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded text-white text-sm font-medium",
                                                    children: [
                                                        recipe.prep_time,
                                                        " min"
                                                    ]
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ _jsxs("div", {
                                            className: "p-6 bg-white",
                                            children: [
                                                /*#__PURE__*/ _jsx("h3", {
                                                    className: "text-lg font-bold mb-2 group-hover:text-brand-600 transition-colors",
                                                    children: recipe.title
                                                }),
                                                /*#__PURE__*/ _jsx("p", {
                                                    className: "text-gray-500",
                                                    children: recipe.category || 'Recipe'
                                                })
                                            ]
                                        })
                                    ]
                                }, recipe.id)) : featuredVideos.map((video)=>/*#__PURE__*/ _jsxs(Card, {
                                    className: "group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all cursor-pointer",
                                    onClick: ()=>navigate('/recipe-detail'),
                                    children: [
                                        /*#__PURE__*/ _jsxs("div", {
                                            className: "relative aspect-video overflow-hidden",
                                            children: [
                                                /*#__PURE__*/ _jsx("img", {
                                                    src: video.thumbnail,
                                                    alt: video.title,
                                                    className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                }),
                                                /*#__PURE__*/ _jsx("div", {
                                                    className: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center",
                                                    children: /*#__PURE__*/ _jsx("div", {
                                                        className: "w-16 h-16 bg-white rounded-full flex items-center justify-center",
                                                        children: /*#__PURE__*/ _jsx(Play, {
                                                            className: "h-6 w-6 text-brand-600 ml-1",
                                                            fill: "currentColor"
                                                        })
                                                    })
                                                }),
                                                /*#__PURE__*/ _jsx("div", {
                                                    className: "absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded text-white text-sm font-medium",
                                                    children: video.duration
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ _jsxs("div", {
                                            className: "p-6 bg-white",
                                            children: [
                                                /*#__PURE__*/ _jsx("h3", {
                                                    className: "text-lg font-bold mb-2 group-hover:text-brand-600 transition-colors",
                                                    children: video.title
                                                }),
                                                /*#__PURE__*/ _jsxs("p", {
                                                    className: "text-gray-500",
                                                    children: [
                                                        video.views,
                                                        " views"
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                }, video.id))
                        })
                    ]
                })
            }),
            /*#__PURE__*/ _jsx("section", {
                className: "py-32 px-6 bg-gradient-to-br from-brand-50 to-white",
                children: /*#__PURE__*/ _jsxs("div", {
                    className: "container mx-auto",
                    children: [
                        /*#__PURE__*/ _jsxs("div", {
                            className: "text-center mb-16",
                            children: [
                                /*#__PURE__*/ _jsx("h2", {
                                    className: "text-5xl font-bold mb-4",
                                    children: "Our Journey"
                                }),
                                /*#__PURE__*/ _jsx("p", {
                                    className: "text-xl text-gray-600",
                                    children: "From passion to a thriving cooking community"
                                })
                            ]
                        }),
                        /*#__PURE__*/ _jsx("div", {
                            className: "space-y-8",
                            children: [
                                {
                                    year: "2024",
                                    month: "January",
                                    title: "The Beginning",
                                    description: "Started sharing our love for cooking with the world"
                                },
                                {
                                    year: "2024",
                                    month: "April",
                                    title: "Growing Community",
                                    description: "Reached our first 100K followers who share our passion"
                                },
                                {
                                    year: "2024",
                                    month: "July",
                                    title: "Multi-Platform Presence",
                                    description: "Expanded to Instagram, TikTok, and Twitter to reach more food lovers"
                                },
                                {
                                    year: "2024",
                                    month: "October",
                                    title: "1M+ Community",
                                    description: "Built a community of over 1 million passionate home cooks"
                                },
                                {
                                    year: "2025",
                                    month: "January",
                                    title: "Culinary Milestone",
                                    description: "Became a trusted source for authentic, tested recipes"
                                }
                            ].map((milestone, index)=>/*#__PURE__*/ _jsxs("div", {
                                    className: "flex gap-6 group",
                                    children: [
                                        /*#__PURE__*/ _jsxs("div", {
                                            className: "flex flex-col items-center",
                                            children: [
                                                /*#__PURE__*/ _jsx("div", {
                                                    className: "w-4 h-4 rounded-full bg-brand-600 group-hover:scale-150 transition-transform"
                                                }),
                                                index < 4 && /*#__PURE__*/ _jsx("div", {
                                                    className: "w-0.5 h-full bg-brand-200 mt-2"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ _jsxs(Card, {
                                            className: "flex-1 p-6 bg-white/60 backdrop-blur-sm hover:shadow-xl transition-all",
                                            children: [
                                                /*#__PURE__*/ _jsxs("div", {
                                                    className: "text-sm text-brand-600 font-semibold mb-1",
                                                    children: [
                                                        milestone.month,
                                                        " ",
                                                        milestone.year
                                                    ]
                                                }),
                                                /*#__PURE__*/ _jsx("h3", {
                                                    className: "text-2xl font-bold mb-2 text-gray-900",
                                                    children: milestone.title
                                                }),
                                                /*#__PURE__*/ _jsx("p", {
                                                    className: "text-gray-600",
                                                    children: milestone.description
                                                })
                                            ]
                                        })
                                    ]
                                }, index))
                        })
                    ]
                })
            }),
            /*#__PURE__*/ _jsx("section", {
                className: "py-32 px-6",
                children: /*#__PURE__*/ _jsxs("div", {
                    className: "container mx-auto",
                    children: [
                        /*#__PURE__*/ _jsxs("div", {
                            className: "text-center mb-16",
                            children: [
                                /*#__PURE__*/ _jsxs("div", {
                                    className: "flex items-center justify-center gap-3 mb-4",
                                    children: [
                                        /*#__PURE__*/ _jsx(Calendar, {
                                            className: "h-8 w-8 text-brand-600"
                                        }),
                                        /*#__PURE__*/ _jsx("h2", {
                                            className: "text-3xl md:text-5xl font-bold",
                                            children: "Coming Soon"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ _jsx("p", {
                                    className: "text-base md:text-xl text-gray-600",
                                    children: comingSoonRecipes.length > 0 || comingSoonBlogPosts.length > 0 ? "Exciting new content dropping soon" : "Stay tuned for upcoming recipes and blog posts"
                                })
                            ]
                        }),
                        /*#__PURE__*/ _jsxs("div", {
                            className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-8",
                            children: [
                                comingSoonRecipes.map((recipe)=>/*#__PURE__*/ _jsxs(Card, {
                                        className: "overflow-hidden bg-white hover:shadow-xl transition-all cursor-pointer group",
                                        children: [
                                            /*#__PURE__*/ _jsxs("div", {
                                                className: "p-6",
                                                children: [
                                                    /*#__PURE__*/ _jsxs("div", {
                                                        className: "text-sm text-gray-500 mb-3",
                                                        children: [
                                                            /*#__PURE__*/ _jsx("span", {
                                                                className: "inline-block px-2 py-0.5 bg-brand-600 text-white text-xs font-semibold rounded-full mr-2",
                                                                children: "Recipe"
                                                            }),
                                                            "Coming Soon"
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ _jsx("h3", {
                                                        className: "text-lg font-bold mb-2 group-hover:text-brand-600 transition-colors",
                                                        children: recipe.title
                                                    }),
                                                    /*#__PURE__*/ _jsx("p", {
                                                        className: "text-gray-600 mb-4",
                                                        children: recipe.excerpt || recipe.description
                                                    }),
                                                    /*#__PURE__*/ _jsxs("div", {
                                                        className: "text-brand-600 font-semibold text-sm flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ _jsx(Clock, {
                                                                className: "h-4 w-4"
                                                            }),
                                                            "Coming Soon"
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    }, recipe.id)),
                                comingSoonBlogPosts.map((post)=>/*#__PURE__*/ _jsxs(Card, {
                                        className: "overflow-hidden bg-white hover:shadow-xl transition-all cursor-pointer group",
                                        children: [
                                            /*#__PURE__*/ _jsxs("div", {
                                                className: "p-6",
                                                children: [
                                                    /*#__PURE__*/ _jsxs("div", {
                                                        className: "text-sm text-gray-500 mb-3",
                                                        children: [
                                                            /*#__PURE__*/ _jsx("span", {
                                                                className: "inline-block px-2 py-0.5 bg-green-600 text-white text-xs font-semibold rounded-full mr-2",
                                                                children: "Blog Post"
                                                            }),
                                                            "Coming Soon"
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ _jsx("h3", {
                                                        className: "text-lg font-bold mb-2 group-hover:text-brand-600 transition-colors",
                                                        children: post.title
                                                    }),
                                                    /*#__PURE__*/ _jsx("p", {
                                                        className: "text-gray-600 mb-4",
                                                        children: post.excerpt
                                                    }),
                                                    /*#__PURE__*/ _jsxs("div", {
                                                        className: "text-brand-600 font-semibold text-sm flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ _jsx(Clock, {
                                                                className: "h-4 w-4"
                                                            }),
                                                            "Coming Soon"
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    }, post.id)),
                                comingSoonRecipes.length === 0 && comingSoonBlogPosts.length === 0 && /*#__PURE__*/ _jsx("div", {
                                    className: "col-span-full text-center py-12",
                                    children: /*#__PURE__*/ _jsx("p", {
                                        className: "text-gray-500 text-lg",
                                        children: "No scheduled content at the moment. Check back soon!"
                                    })
                                })
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ _jsx("section", {
                className: "py-32 px-6 bg-gradient-to-br from-gray-50 to-white",
                children: /*#__PURE__*/ _jsxs("div", {
                    className: "container mx-auto",
                    children: [
                        /*#__PURE__*/ _jsxs("div", {
                            className: "flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-16",
                            children: [
                                /*#__PURE__*/ _jsxs("div", {
                                    children: [
                                        /*#__PURE__*/ _jsx("h2", {
                                            className: "text-5xl font-bold mb-4",
                                            children: "From Our Blog"
                                        }),
                                        /*#__PURE__*/ _jsx("p", {
                                            className: "text-xl text-gray-600",
                                            children: "Insights, tips, and behind-the-scenes stories"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ _jsxs(Button, {
                                    variant: "outline",
                                    className: "border-2 border-brand-500 text-brand-600 hover:bg-brand-50",
                                    onClick: ()=>navigate('/blog'),
                                    children: [
                                        "View All Posts",
                                        /*#__PURE__*/ _jsx(ArrowRight, {
                                            className: "ml-2 h-4 w-4"
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ _jsx("div", {
                            className: "grid md:grid-cols-3 gap-8",
                            children: latestBlogPosts.length > 0 ? latestBlogPosts.map((post)=>/*#__PURE__*/ _jsxs(Card, {
                                    className: "overflow-hidden bg-white hover:shadow-xl transition-all cursor-pointer group",
                                    onClick: ()=>navigate(`/blog-post?slug=${post.slug}`),
                                    children: [
                                        post.featured_image_url && /*#__PURE__*/ _jsxs("div", {
                                            className: "relative aspect-video overflow-hidden",
                                            children: [
                                                /*#__PURE__*/ _jsx("img", {
                                                    src: post.featured_image_url,
                                                    alt: post.title,
                                                    className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                }),
                                                /*#__PURE__*/ _jsx("div", {
                                                    className: "absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ _jsxs("div", {
                                            className: "p-6",
                                            children: [
                                                /*#__PURE__*/ _jsxs("div", {
                                                    className: "text-sm text-gray-500 mb-3",
                                                    children: [
                                                        new Date(post.published_date || post.created_at).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric'
                                                        }),
                                                        " · 5 min read"
                                                    ]
                                                }),
                                                /*#__PURE__*/ _jsx("h3", {
                                                    className: "text-lg font-bold mb-3 group-hover:text-brand-600 transition-colors",
                                                    children: post.title
                                                }),
                                                /*#__PURE__*/ _jsx("p", {
                                                    className: "text-gray-600 mb-4 line-clamp-2",
                                                    children: post.excerpt
                                                }),
                                                /*#__PURE__*/ _jsxs("div", {
                                                    className: "flex items-center text-brand-600 font-semibold",
                                                    children: [
                                                        /*#__PURE__*/ _jsx("span", {
                                                            children: "Read More"
                                                        }),
                                                        /*#__PURE__*/ _jsx(ArrowRight, {
                                                            className: "ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform"
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                }, post.id)) : [
                                {
                                    title: "How AI is Revolutionizing Recipe Creation",
                                    excerpt: "Discover the technology behind our AI-generated cooking videos",
                                    date: "Nov 15, 2025",
                                    readTime: "5 min"
                                },
                                {
                                    title: "Behind the Scenes: Creating a Video",
                                    excerpt: "A deep dive into our production workflow from start to finish",
                                    date: "Nov 12, 2025",
                                    readTime: "7 min"
                                },
                                {
                                    title: "Top 10 Most Requested Recipes",
                                    excerpt: "Here's what our community wants to see next",
                                    date: "Nov 8, 2025",
                                    readTime: "4 min"
                                }
                            ].map((post, index)=>/*#__PURE__*/ _jsxs(Card, {
                                    className: "p-6 bg-white hover:shadow-xl transition-all cursor-pointer group",
                                    children: [
                                        /*#__PURE__*/ _jsxs("div", {
                                            className: "text-sm text-gray-500 mb-3",
                                            children: [
                                                post.date,
                                                " · ",
                                                post.readTime,
                                                " read"
                                            ]
                                        }),
                                        /*#__PURE__*/ _jsx("h3", {
                                            className: "text-lg font-bold mb-3 group-hover:text-brand-600 transition-colors",
                                            children: post.title
                                        }),
                                        /*#__PURE__*/ _jsx("p", {
                                            className: "text-gray-600 mb-4 line-clamp-2",
                                            children: post.excerpt
                                        }),
                                        /*#__PURE__*/ _jsxs("div", {
                                            className: "flex items-center text-brand-600 font-semibold",
                                            children: [
                                                /*#__PURE__*/ _jsx("span", {
                                                    children: "Read More"
                                                }),
                                                /*#__PURE__*/ _jsx(ArrowRight, {
                                                    className: "ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform"
                                                })
                                            ]
                                        })
                                    ]
                                }, index))
                        })
                    ]
                })
            }),
            /*#__PURE__*/ _jsx("section", {
                className: "py-32 px-6",
                children: /*#__PURE__*/ _jsxs("div", {
                    className: "container mx-auto",
                    children: [
                        /*#__PURE__*/ _jsxs("div", {
                            className: "text-center mb-16",
                            children: [
                                /*#__PURE__*/ _jsx("h2", {
                                    className: "text-5xl font-bold mb-4",
                                    children: "Frequently Asked Questions"
                                }),
                                /*#__PURE__*/ _jsx("p", {
                                    className: "text-xl text-gray-600",
                                    children: "Everything you need to know about our AI cooking videos"
                                })
                            ]
                        }),
                        /*#__PURE__*/ _jsx("div", {
                            className: "space-y-6",
                            children: [
                                {
                                    q: "Are the recipes actually made by AI?",
                                    a: "Yes! Every recipe, script, and video scene is generated using advanced AI models. We use GPT-4 for recipe development and Veo 3 for video generation."
                                },
                                {
                                    q: "Can I actually cook these recipes?",
                                    a: "Absolutely! Every recipe is tested for authenticity and accuracy. Our AI analyzes thousands of successful recipes to create dishes that actually work."
                                },
                                {
                                    q: "How long does it take to create one video?",
                                    a: "Our AI workflow can produce a complete video in 24-48 hours, compared to 2-3 weeks for traditional production."
                                },
                                {
                                    q: "Do you take recipe requests?",
                                    a: "Yes! We love hearing from our community. Use the recipe request form below to suggest what you'd like to see next."
                                },
                                {
                                    q: "Why focus on YouTube Shorts?",
                                    a: "Our audience loves quick, engaging content. Shorts allow us to deliver complete recipes in bite-sized format that's perfect for mobile viewing."
                                }
                            ].map((faq, index)=>/*#__PURE__*/ _jsxs(Card, {
                                    className: "p-6 bg-white/60 backdrop-blur-sm hover:shadow-lg transition-all",
                                    children: [
                                        /*#__PURE__*/ _jsxs("h3", {
                                            className: "text-xl font-bold mb-3 flex items-start gap-3",
                                            children: [
                                                /*#__PURE__*/ _jsx(MessageSquare, {
                                                    className: "h-6 w-6 text-brand-600 flex-shrink-0 mt-1"
                                                }),
                                                faq.q
                                            ]
                                        }),
                                        /*#__PURE__*/ _jsx("p", {
                                            className: "text-gray-600 leading-relaxed ml-9",
                                            children: faq.a
                                        })
                                    ]
                                }, index))
                        })
                    ]
                })
            }),
            /*#__PURE__*/ _jsx("section", {
                className: "py-32 px-6 bg-gradient-to-br from-brand-50 to-white",
                children: /*#__PURE__*/ _jsxs("div", {
                    className: "container mx-auto",
                    children: [
                        /*#__PURE__*/ _jsxs("div", {
                            className: "text-center mb-16",
                            children: [
                                /*#__PURE__*/ _jsx("h2", {
                                    className: "text-5xl font-bold mb-4",
                                    children: "As Seen In"
                                }),
                                /*#__PURE__*/ _jsx("p", {
                                    className: "text-xl text-gray-600",
                                    children: "Featured in leading tech and food publications"
                                })
                            ]
                        }),
                        /*#__PURE__*/ _jsx("div", {
                            className: "grid md:grid-cols-4 gap-8 mb-12",
                            children: [
                                {
                                    name: "TechCrunch",
                                    quote: "Revolutionary AI cooking content"
                                },
                                {
                                    name: "The Verge",
                                    quote: "The future of recipe videos"
                                },
                                {
                                    name: "Food & Wine",
                                    quote: "Surprisingly authentic and delicious"
                                },
                                {
                                    name: "Wired",
                                    quote: "AI-generated content at its finest"
                                }
                            ].map((press, index)=>/*#__PURE__*/ _jsxs(Card, {
                                    className: "p-6 text-center bg-white hover:shadow-xl transition-all",
                                    children: [
                                        /*#__PURE__*/ _jsx("div", {
                                            className: "text-2xl font-bold text-gray-900 mb-2",
                                            children: press.name
                                        }),
                                        /*#__PURE__*/ _jsxs("p", {
                                            className: "text-sm text-gray-600 italic",
                                            children: [
                                                '"',
                                                press.quote,
                                                '"'
                                            ]
                                        })
                                    ]
                                }, index))
                        })
                    ]
                })
            }),
            /*#__PURE__*/ _jsx("section", {
                className: "py-32 px-6",
                children: /*#__PURE__*/ _jsxs("div", {
                    className: "container mx-auto",
                    children: [
                        /*#__PURE__*/ _jsxs("div", {
                            className: "text-center mb-12",
                            children: [
                                /*#__PURE__*/ _jsx("h2", {
                                    className: "text-5xl font-bold mb-4",
                                    children: "Request a Recipe"
                                }),
                                /*#__PURE__*/ _jsx("p", {
                                    className: "text-xl text-gray-600",
                                    children: "Have a recipe you'd love to see? Let us know!"
                                })
                            ]
                        }),
                        /*#__PURE__*/ _jsx(Card, {
                            className: "p-8 bg-white/60 backdrop-blur-sm max-w-4xl mx-auto",
                            children: /*#__PURE__*/ _jsxs("form", {
                                onSubmit: handleRecipeRequest,
                                className: "space-y-6",
                                children: [
                                    /*#__PURE__*/ _jsxs("div", {
                                        children: [
                                            /*#__PURE__*/ _jsx("label", {
                                                className: "block text-sm font-semibold text-gray-700 mb-2",
                                                children: "Your Name"
                                            }),
                                            /*#__PURE__*/ _jsx(Input, {
                                                type: "text",
                                                placeholder: "John Doe",
                                                value: recipeRequest.name,
                                                onChange: (e)=>setRecipeRequest({
                                                        ...recipeRequest,
                                                        name: e.target.value
                                                    }),
                                                className: "h-12 border-2 border-gray-200 focus:border-brand-400 rounded-xl",
                                                required: true
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ _jsxs("div", {
                                        children: [
                                            /*#__PURE__*/ _jsx("label", {
                                                className: "block text-sm font-semibold text-gray-700 mb-2",
                                                children: "Recipe Name"
                                            }),
                                            /*#__PURE__*/ _jsx(Input, {
                                                type: "text",
                                                placeholder: "e.g., Authentic Thai Green Curry",
                                                value: recipeRequest.recipe,
                                                onChange: (e)=>setRecipeRequest({
                                                        ...recipeRequest,
                                                        recipe: e.target.value
                                                    }),
                                                className: "h-12 border-2 border-gray-200 focus:border-brand-400 rounded-xl",
                                                required: true
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ _jsxs("div", {
                                        children: [
                                            /*#__PURE__*/ _jsx("label", {
                                                className: "block text-sm font-semibold text-gray-700 mb-2",
                                                children: "Why this recipe? (Optional)"
                                            }),
                                            /*#__PURE__*/ _jsx(Textarea, {
                                                placeholder: "Tell us what makes this recipe special or any specific details you'd like to see...",
                                                value: recipeRequest.message,
                                                onChange: (e)=>setRecipeRequest({
                                                        ...recipeRequest,
                                                        message: e.target.value
                                                    }),
                                                className: "border-2 border-gray-200 focus:border-brand-400 rounded-xl min-h-32"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ _jsxs(Button, {
                                        type: "submit",
                                        className: "w-full h-12 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white rounded-xl text-lg font-semibold",
                                        children: [
                                            /*#__PURE__*/ _jsx(Send, {
                                                className: "mr-2 h-5 w-5"
                                            }),
                                            "Submit Request"
                                        ]
                                    })
                                ]
                            })
                        })
                    ]
                })
            }),
            
            /*#__PURE__*/ _jsxs("section", {
                className: "py-32 px-6 relative overflow-hidden",
                children: [
                    /*#__PURE__*/ _jsx("div", {
                        className: "absolute inset-0 bg-gradient-to-br from-brand-100 via-white to-brand-50"
                    }),
                    /*#__PURE__*/ _jsx("div", {
                        className: "absolute top-0 right-0 w-96 h-96 bg-brand-300 rounded-full blur-3xl opacity-30"
                    }),
                    /*#__PURE__*/ _jsx("div", {
                        className: "absolute bottom-0 left-0 w-96 h-96 bg-brand-400 rounded-full blur-3xl opacity-20"
                    }),
                    /*#__PURE__*/ _jsx("div", {
                    className: "container mx-auto relative z-10",
                    children: /*#__PURE__*/ _jsx(Card, {
                            className: "mx-auto max-w-4xl p-12 md:p-16 bg-white border-white/60 shadow-2xl",
                            children: /*#__PURE__*/ _jsxs("div", {
                                className: "text-center",
                                children: [
                                    /*#__PURE__*/ _jsx("h2", {
                                        className: "text-4xl md:text-5xl font-bold mb-6",
                                        children: "Stay in the Loop"
                                    }),
                                    /*#__PURE__*/ _jsx("p", {
                                        className: "text-xl text-gray-600 mb-10  mx-auto",
                                        children: "Get weekly updates on our latest AI-generated recipes, behind-the-scenes insights, and exclusive content."
                                    }),
                                    /*#__PURE__*/ _jsxs("div", {
                                        className: "flex flex-col sm:flex-row gap-4  mx-auto",
                                        children: [
                                            /*#__PURE__*/ _jsx(Input, {
                                                type: "email",
                                                placeholder: "Enter your email address",
                                                value: email,
                                                onChange: (e)=>setEmail(e.target.value),
                                                className: "h-14 text-lg px-6 border-2 border-gray-200 focus:border-brand-400 rounded-xl"
                                            }),
                                            /*#__PURE__*/ _jsx(Button, {
                                                size: "lg",
                                                className: "h-14 px-8 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all",
                                                children: "Subscribe"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ _jsx("p", {
                                        className: "text-sm text-gray-500 mt-4",
                                        children: "Join 50,000+ food enthusiasts and tech innovators"
                                    })
                                ]
                            })
                        })
                    })
                ]
            }),
            /*#__PURE__*/ _jsx("footer", {
                className: "bg-gray-900 text-white py-16 px-6",
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
                                            children: "Byte of Taste"
                                        }),
                                        /*#__PURE__*/ _jsx("p", {
                                            className: "text-gray-400 mb-6 max-w-md",
                                            children: "AI-powered YouTube content creation studio revolutionizing recipe videos through cutting-edge technology."
                                        }),
                                        /*#__PURE__*/ _jsxs("div", {
                                            className: "flex gap-4",
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
                                                })
                                            ]
                                        })
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
                                                    children: /*#__PURE__*/ _jsx("a", {
                                                        href: "/recipes",
                                                        className: "hover:text-brand-400 transition-colors",
                                                        children: "Recipes"
                                                    })
                                                }),
                                                /*#__PURE__*/ _jsx("li", {
                                                    children: /*#__PURE__*/ _jsx("a", {
                                                        href: "/blog",
                                                        className: "hover:text-brand-400 transition-colors",
                                                        children: "Blog"
                                                    })
                                                }),
                                                /*#__PURE__*/ _jsx("li", {
                                                    children: /*#__PURE__*/ _jsx("a", {
                                                        href: "/about",
                                                        className: "hover:text-brand-400 transition-colors",
                                                        children: "About"
                                                    })
                                                }),
                                                /*#__PURE__*/ _jsx("li", {
                                                    children: /*#__PURE__*/ _jsx("a", {
                                                        href: "/contact",
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
                                        children: "© 2025 Byte of Taste. All rights reserved."
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
            })
        ]
    });
}

