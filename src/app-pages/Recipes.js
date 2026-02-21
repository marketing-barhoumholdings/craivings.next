import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Play, Filter, Grid3x3, List, Clock, Star, ChefHat, X, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Footer } from "components/Footer";
import brain from "brain";
import { Badge } from "@/components/ui/badge";
const Recipes = ()=>{
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);
    const [selectedDietaryTag, setSelectedDietaryTag] = useState(null);
    const [viewMode, setViewMode] = useState("grid");
    const [sortBy, setSortBy] = useState("recent");
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    useEffect(()=>{
        const fetchRecipes = async ()=>{
            try {
                setLoading(true);
                const response = await brain.list_recipes({
                    limit: 3,
                    offset: 0,
                    is_published: true
                });
                const data = await response.json();
                const fallbackRecipes = [
                    {
                        id: "fallback-1",
                        title: "Perfect Italian Carbonara",
                        slug: "perfect-italian-carbonara",
                        featured_image_url: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=800&q=80",
                        category: "Pasta",
                        difficulty: "Medium",
                        prep_time: 25,
                        average_rating: 4.8,
                        dietary_tags: ["Classic"]
                    },
                    {
                        id: "fallback-2",
                        title: "Artisan Sourdough Bread",
                        slug: "artisan-sourdough-bread",
                        featured_image_url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
                        category: "Baking",
                        difficulty: "Hard",
                        prep_time: 180,
                        average_rating: 4.7,
                        dietary_tags: ["Vegetarian"]
                    },
                    {
                        id: "fallback-3",
                        title: "Thai Green Curry Masterclass",
                        slug: "thai-green-curry-masterclass",
                        featured_image_url: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=800&q=80",
                        category: "Asian",
                        difficulty: "Medium",
                        prep_time: 40,
                        average_rating: 4.9,
                        dietary_tags: ["Spicy"]
                    }
                ];
                const incoming = data.recipes || [];
                setRecipes(incoming.length > 0 ? incoming : fallbackRecipes);
                setError(false);
            } catch (err) {
                console.error('Error fetching recipes:', err);
                setRecipes([
                    {
                        id: "fallback-1",
                        title: "Perfect Italian Carbonara",
                        slug: "perfect-italian-carbonara",
                        featured_image_url: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=800&q=80",
                        category: "Pasta",
                        difficulty: "Medium",
                        prep_time: 25,
                        average_rating: 4.8,
                        dietary_tags: ["Classic"]
                    },
                    {
                        id: "fallback-2",
                        title: "Artisan Sourdough Bread",
                        slug: "artisan-sourdough-bread",
                        featured_image_url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
                        category: "Baking",
                        difficulty: "Hard",
                        prep_time: 180,
                        average_rating: 4.7,
                        dietary_tags: ["Vegetarian"]
                    },
                    {
                        id: "fallback-3",
                        title: "Thai Green Curry Masterclass",
                        slug: "thai-green-curry-masterclass",
                        featured_image_url: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=800&q=80",
                        category: "Asian",
                        difficulty: "Medium",
                        prep_time: 40,
                        average_rating: 4.9,
                        dietary_tags: ["Spicy"]
                    }
                ]);
                setError(false);
            } finally{
                setLoading(false);
            }
        };
        fetchRecipes();
    }, []);
    // Get unique categories, difficulties, and dietary tags from recipes
    const categories = Array.from(new Set(recipes.map((r)=>r.category).filter(Boolean)));
    const difficulties = Array.from(new Set(recipes.map((r)=>r.difficulty).filter(Boolean)));
    const allDietaryTags = Array.from(new Set(recipes.flatMap((r)=>r.dietary_tags || [])));
    useEffect(()=>{
        const category = searchParams.get("category");
        if (category && category !== "All") {
            setSelectedCategory(category);
        } else {
            setSelectedCategory(null);
        }
    }, [
        searchParams
    ]);
    const filteredRecipes = recipes.filter((recipe)=>{
        const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = !selectedCategory || recipe.category === selectedCategory;
        const matchesDifficulty = !selectedDifficulty || recipe.difficulty === selectedDifficulty;
        const matchesDietaryTag = !selectedDietaryTag || recipe.dietary_tags && recipe.dietary_tags.includes(selectedDietaryTag);
        return matchesSearch && matchesCategory && matchesDifficulty && matchesDietaryTag;
    });
    const handleCategoryClick = (categoryName)=>{
        if (categoryName === "All") {
            setSelectedCategory(null);
            setSearchParams({});
        } else {
            setSelectedCategory(categoryName);
            setSearchParams({
                category: categoryName
            });
        }
    };
    const clearFilters = ()=>{
        setSelectedCategory(null);
        setSearchQuery("");
        setSearchParams({});
    };
    return /*#__PURE__*/ _jsxs("div", {
        className: "min-h-screen bg-gradient-to-b from-[#FFF9F3] to-white overflow-x-hidden",
        children: [
            /*#__PURE__*/ _jsx("section", {
                className: "py-20 px-4 bg-gradient-to-br from-brand-600 to-brand-700 text-white",
                children: /*#__PURE__*/ _jsxs("div", {
                    className: "container mx-auto text-center",
                    children: [
                        /*#__PURE__*/ _jsx("h1", {
                            className: "text-5xl md:text-6xl font-bold mb-6",
                            children: "Recipe Collection"
                        }),
                        /*#__PURE__*/ _jsx("p", {
                            className: "text-xl text-brand-100 max-w-2xl mx-auto",
                            children: "Explore our complete library of AI-generated cooking videos"
                        })
                    ]
                })
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: "container mx-auto px-4 py-12",
                children: [
                    /*#__PURE__*/ _jsxs("div", {
                        className: "mb-12 space-y-6",
                        children: [
                            /*#__PURE__*/ _jsxs("div", {
                                className: "flex flex-col md:flex-row gap-4 items-center justify-between",
                                children: [
                                    /*#__PURE__*/ _jsxs("div", {
                                        className: "relative w-full md:w-96",
                                        children: [
                                            /*#__PURE__*/ _jsx(Search, {
                                                className: "absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                                            }),
                                            /*#__PURE__*/ _jsx(Input, {
                                                type: "text",
                                                placeholder: "Search recipes...",
                                                value: searchQuery,
                                                onChange: (e)=>setSearchQuery(e.target.value),
                                                className: "pl-12 h-12 border-2 border-gray-200 focus:border-brand-400 rounded-xl"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ _jsxs("div", {
                                        className: "flex gap-3",
                                        children: [
                                            /*#__PURE__*/ _jsxs("select", {
                                                value: sortBy,
                                                onChange: (e)=>setSortBy(e.target.value),
                                                className: "px-4 py-2 border-2 border-gray-200 rounded-xl bg-white cursor-pointer hover:border-brand-400 transition-colors",
                                                children: [
                                                    /*#__PURE__*/ _jsx("option", {
                                                        value: "recent",
                                                        children: "Most Recent"
                                                    }),
                                                    /*#__PURE__*/ _jsx("option", {
                                                        value: "popular",
                                                        children: "Most Popular"
                                                    }),
                                                    /*#__PURE__*/ _jsx("option", {
                                                        value: "rating",
                                                        children: "Highest Rated"
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ _jsxs("div", {
                                                className: "flex gap-2 border-2 border-gray-200 rounded-xl p-1",
                                                children: [
                                                    /*#__PURE__*/ _jsx(Button, {
                                                        size: "sm",
                                                        variant: viewMode === "grid" ? "default" : "ghost",
                                                        onClick: ()=>setViewMode("grid"),
                                                        className: viewMode === "grid" ? "bg-brand-600" : "",
                                                        children: /*#__PURE__*/ _jsx(Grid3x3, {
                                                            className: "h-4 w-4"
                                                        })
                                                    }),
                                                    /*#__PURE__*/ _jsx(Button, {
                                                        size: "sm",
                                                        variant: viewMode === "list" ? "default" : "ghost",
                                                        onClick: ()=>setViewMode("list"),
                                                        className: viewMode === "list" ? "bg-brand-600" : "",
                                                        children: /*#__PURE__*/ _jsx(List, {
                                                            className: "h-4 w-4"
                                                        })
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            }),
                            (selectedCategory || searchQuery) && /*#__PURE__*/ _jsxs("div", {
                                className: "flex items-center gap-3 flex-wrap",
                                children: [
                                    /*#__PURE__*/ _jsx("span", {
                                        className: "text-sm text-gray-600",
                                        children: "Active filters:"
                                    }),
                                    selectedCategory && /*#__PURE__*/ _jsxs("div", {
                                        className: "flex items-center gap-2 bg-brand-100 text-brand-700 px-3 py-1 rounded-full text-sm",
                                        children: [
                                            /*#__PURE__*/ _jsx("span", {
                                                children: selectedCategory
                                            }),
                                            /*#__PURE__*/ _jsx("button", {
                                                onClick: ()=>handleCategoryClick("All"),
                                                className: "hover:bg-brand-200 rounded-full p-0.5",
                                                children: /*#__PURE__*/ _jsx(X, {
                                                    className: "h-3 w-3"
                                                })
                                            })
                                        ]
                                    }),
                                    searchQuery && /*#__PURE__*/ _jsxs("div", {
                                        className: "flex items-center gap-2 bg-brand-100 text-brand-700 px-3 py-1 rounded-full text-sm",
                                        children: [
                                            /*#__PURE__*/ _jsxs("span", {
                                                children: [
                                                    'Search: "',
                                                    searchQuery,
                                                    '"'
                                                ]
                                            }),
                                            /*#__PURE__*/ _jsx("button", {
                                                onClick: ()=>setSearchQuery(""),
                                                className: "hover:bg-brand-200 rounded-full p-0.5",
                                                children: /*#__PURE__*/ _jsx(X, {
                                                    className: "h-3 w-3"
                                                })
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ _jsx("button", {
                                        onClick: clearFilters,
                                        className: "text-sm text-brand-600 hover:text-brand-700 underline",
                                        children: "Clear all"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ _jsxs("div", {
                        className: "mb-12",
                        children: [
                            /*#__PURE__*/ _jsx("h3", {
                                className: "text-xl font-bold mb-4",
                                children: "Browse by Category"
                            }),
                            /*#__PURE__*/ _jsxs("div", {
                                className: "flex gap-3 overflow-x-auto pb-4",
                                children: [
                                    /*#__PURE__*/ _jsxs("button", {
                                        onClick: ()=>handleCategoryClick("All"),
                                        className: `flex items-center gap-2 px-6 py-3 rounded-xl border-2 transition-all whitespace-nowrap ${!selectedCategory ? "bg-brand-600 text-white border-brand-600 shadow-lg" : "bg-white border-gray-200 hover:border-brand-400 hover:shadow-md"}`,
                                        children: [
                                            /*#__PURE__*/ _jsx(Grid3x3, {
                                                className: "h-4 w-4"
                                            }),
                                            /*#__PURE__*/ _jsx("span", {
                                                className: "font-semibold",
                                                children: "All"
                                            }),
                                            /*#__PURE__*/ _jsxs("span", {
                                                className: "text-sm opacity-75",
                                                children: [
                                                    "(",
                                                    recipes.length,
                                                    ")"
                                                ]
                                            })
                                        ]
                                    }),
                                    categories.map((category, index)=>/*#__PURE__*/ _jsxs("button", {
                                            onClick: ()=>handleCategoryClick(category),
                                            className: `flex items-center gap-2 px-6 py-3 rounded-xl border-2 transition-all whitespace-nowrap ${selectedCategory === category ? "bg-brand-600 text-white border-brand-600 shadow-lg" : "bg-white border-gray-200 hover:border-brand-400 hover:shadow-md"}`,
                                            children: [
                                                /*#__PURE__*/ _jsx(ChefHat, {
                                                    className: "h-4 w-4"
                                                }),
                                                /*#__PURE__*/ _jsx("span", {
                                                    className: "font-semibold",
                                                    children: category
                                                }),
                                                /*#__PURE__*/ _jsxs("span", {
                                                    className: "text-sm opacity-75",
                                                    children: [
                                                        "(",
                                                        recipes.filter((r)=>r.category === category).length,
                                                        ")"
                                                    ]
                                                })
                                            ]
                                        }, index))
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ _jsxs("div", {
                        className: "mb-8 grid md:grid-cols-2 gap-6",
                        children: [
                            /*#__PURE__*/ _jsxs("div", {
                                children: [
                                    /*#__PURE__*/ _jsx("h3", {
                                        className: "text-lg font-bold mb-3",
                                        children: "Difficulty Level"
                                    }),
                                    /*#__PURE__*/ _jsx("div", {
                                        className: "flex gap-2 flex-wrap",
                                        children: difficulties.map((difficulty)=>/*#__PURE__*/ _jsx(Button, {
                                                variant: selectedDifficulty === difficulty ? "default" : "outline",
                                                size: "sm",
                                                onClick: ()=>setSelectedDifficulty(selectedDifficulty === difficulty ? null : difficulty),
                                                className: selectedDifficulty === difficulty ? "bg-brand-600 hover:bg-brand-700" : "",
                                                children: difficulty
                                            }, difficulty))
                                    })
                                ]
                            }),
                            /*#__PURE__*/ _jsxs("div", {
                                children: [
                                    /*#__PURE__*/ _jsx("h3", {
                                        className: "text-lg font-bold mb-3",
                                        children: "Dietary Tags"
                                    }),
                                    /*#__PURE__*/ _jsx("div", {
                                        className: "flex gap-2 flex-wrap",
                                        children: allDietaryTags.map((tag)=>/*#__PURE__*/ _jsx(Button, {
                                                variant: selectedDietaryTag === tag ? "default" : "outline",
                                                size: "sm",
                                                onClick: ()=>setSelectedDietaryTag(selectedDietaryTag === tag ? null : tag),
                                                className: selectedDietaryTag === tag ? "bg-brand-600 hover:bg-brand-700" : "",
                                                children: tag
                                            }, tag))
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ _jsx("div", {
                        className: "mb-6 flex items-center justify-between",
                        children: /*#__PURE__*/ _jsxs("p", {
                            className: "text-gray-600",
                            children: [
                                "Showing ",
                                /*#__PURE__*/ _jsx("span", {
                                    className: "font-bold text-gray-900",
                                    children: filteredRecipes.length
                                }),
                                " recipes",
                                selectedCategory && selectedCategory !== "All" && /*#__PURE__*/ _jsxs("span", {
                                    children: [
                                        " in ",
                                        /*#__PURE__*/ _jsx("span", {
                                            className: "font-bold text-brand-600",
                                            children: selectedCategory
                                        })
                                    ]
                                })
                            ]
                        })
                    }),
                    loading ? /*#__PURE__*/ _jsxs("div", {
                        className: "text-center py-20",
                        children: [
                            /*#__PURE__*/ _jsx(Loader2, {
                                className: "h-16 w-16 text-gray-300 mx-auto mb-4"
                            }),
                            /*#__PURE__*/ _jsx("h3", {
                                className: "text-2xl font-bold text-gray-900 mb-2",
                                children: "Loading recipes..."
                            }),
                            /*#__PURE__*/ _jsx("p", {
                                className: "text-gray-600 mb-6",
                                children: "Please wait while we fetch the recipes."
                            })
                        ]
                    }) : error ? /*#__PURE__*/ _jsxs("div", {
                        className: "text-center py-20",
                        children: [
                            /*#__PURE__*/ _jsx(Filter, {
                                className: "h-16 w-16 text-gray-300 mx-auto mb-4"
                            }),
                            /*#__PURE__*/ _jsx("h3", {
                                className: "text-2xl font-bold text-gray-900 mb-2",
                                children: "Error loading recipes"
                            }),
                            /*#__PURE__*/ _jsx("p", {
                                className: "text-gray-600 mb-6",
                                children: "There was an error loading the recipes. Please try again later."
                            }),
                            /*#__PURE__*/ _jsx(Button, {
                                onClick: ()=>window.location.reload(),
                                className: "bg-red-600 hover:bg-red-700",
                                children: "Retry"
                            })
                        ]
                    }) : filteredRecipes.length > 0 ? /*#__PURE__*/ _jsx("div", {
                        className: viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4",
                        children: filteredRecipes.map((recipe)=>viewMode === "grid" ? /*#__PURE__*/ _jsxs(Card, {
                                className: "group overflow-hidden hover:shadow-2xl transition-all cursor-pointer",
                                onClick: ()=>navigate(`/recipe-detail?slug=${recipe.slug}`),
                                children: [
                                    /*#__PURE__*/ _jsxs("div", {
                                        className: "relative aspect-video overflow-hidden",
                                        children: [
                                            /*#__PURE__*/ _jsx("img", {
                                                src: recipe.featured_image_url || "https://via.placeholder.com/600",
                                                alt: recipe.title,
                                                className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            }),
                                            /*#__PURE__*/ _jsx("div", {
                                                className: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center",
                                                children: /*#__PURE__*/ _jsx(Play, {
                                                    className: "h-12 w-12 text-white"
                                                })
                                            }),
                                            /*#__PURE__*/ _jsx("div", {
                                                className: "absolute top-3 left-3 bg-brand-600 text-white px-2 py-1 rounded-lg text-xs font-bold",
                                                children: recipe.category
                                            }),
                                            /*#__PURE__*/ _jsx("div", {
                                                className: "absolute bottom-3 right-3 bg-black/80 text-white px-2 py-1 rounded-lg text-xs",
                                                children: recipe.total_time ? `${Math.floor(recipe.total_time / 60)}:${(recipe.total_time % 60).toString().padStart(2, '0')}` : "N/A"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ _jsxs("div", {
                                        className: "p-4",
                                        children: [
                                            /*#__PURE__*/ _jsx("h3", {
                                                className: "font-bold text-lg mb-2 group-hover:text-red-600 transition-colors",
                                                children: recipe.title
                                            }),
                                            /*#__PURE__*/ _jsxs("div", {
                                                className: "flex items-center justify-between text-sm text-gray-600",
                                                children: [
                                                    /*#__PURE__*/ _jsxs("div", {
                                                        className: "flex items-center gap-1",
                                                        children: [
                                                            /*#__PURE__*/ _jsx(Star, {
                                                                className: "h-4 w-4 text-red-500 fill-red-500"
                                                            }),
                                                            /*#__PURE__*/ _jsx("span", {
                                                                children: recipe.rating
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ _jsxs("span", {
                                                        children: [
                                                            recipe.views,
                                                            " views"
                                                        ]
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ _jsx("div", {
                                                className: "mt-2",
                                                children: /*#__PURE__*/ _jsx("span", {
                                                    className: `text-xs px-2 py-1 rounded-full ${recipe.difficulty === "Easy" ? "bg-green-100 text-green-700" : recipe.difficulty === "Medium" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`,
                                                    children: recipe.difficulty
                                                })
                                            })
                                        ]
                                    })
                                ]
                            }, recipe.id) : /*#__PURE__*/ _jsxs(Card, {
                                className: "flex gap-6 p-4 hover:shadow-xl transition-all cursor-pointer",
                                onClick: ()=>navigate(`/recipe-detail?slug=${recipe.slug}`),
                                children: [
                                    /*#__PURE__*/ _jsxs("div", {
                                        className: "relative w-48 h-32 overflow-hidden rounded-lg flex-shrink-0",
                                        children: [
                                            /*#__PURE__*/ _jsx("img", {
                                                src: recipe.featured_image_url || "https://via.placeholder.com/600",
                                                alt: recipe.title,
                                                className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            }),
                                            /*#__PURE__*/ _jsx("div", {
                                                className: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center",
                                                children: /*#__PURE__*/ _jsx(Play, {
                                                    className: "h-8 w-8 text-white"
                                                })
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ _jsxs("div", {
                                        className: "flex-1",
                                        children: [
                                            /*#__PURE__*/ _jsxs("div", {
                                                className: "flex items-center gap-2 mb-2",
                                                children: [
                                                    recipe.category && /*#__PURE__*/ _jsx(Badge, {
                                                        className: "bg-brand-600",
                                                        children: recipe.category
                                                    }),
                                                    recipe.difficulty && /*#__PURE__*/ _jsx(Badge, {
                                                        variant: "outline",
                                                        className: `${recipe.difficulty === "Easy" ? "border-green-600 text-green-600" : recipe.difficulty === "Medium" ? "border-yellow-600 text-yellow-600" : "border-red-600 text-red-600"}`,
                                                        children: recipe.difficulty
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ _jsx("h3", {
                                                className: "font-bold text-xl mb-2 group-hover:text-red-600 transition-colors",
                                                children: recipe.title
                                            }),
                                            recipe.excerpt && /*#__PURE__*/ _jsx("p", {
                                                className: "text-gray-600 mb-3 line-clamp-2",
                                                children: recipe.excerpt
                                            }),
                                            /*#__PURE__*/ _jsxs("div", {
                                                className: "flex items-center gap-4 text-sm text-gray-600",
                                                children: [
                                                    /*#__PURE__*/ _jsxs("div", {
                                                        className: "flex items-center gap-1",
                                                        children: [
                                                            /*#__PURE__*/ _jsx(Clock, {
                                                                className: "h-4 w-4"
                                                            }),
                                                            /*#__PURE__*/ _jsx("span", {
                                                                children: recipe.total_time ? `${recipe.total_time} min` : "N/A"
                                                            })
                                                        ]
                                                    }),
                                                    recipe.dietary_tags && recipe.dietary_tags.length > 0 && /*#__PURE__*/ _jsx("div", {
                                                        className: "flex gap-1 flex-wrap",
                                                        children: recipe.dietary_tags.slice(0, 2).map((tag, idx)=>/*#__PURE__*/ _jsx(Badge, {
                                                                variant: "secondary",
                                                                className: "text-xs",
                                                                children: tag
                                                            }, idx))
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            }, recipe.id))
                    }) : /*#__PURE__*/ _jsxs("div", {
                        className: "text-center py-20",
                        children: [
                            /*#__PURE__*/ _jsx(Filter, {
                                className: "h-16 w-16 text-gray-300 mx-auto mb-4"
                            }),
                            /*#__PURE__*/ _jsx("h3", {
                                className: "text-2xl font-bold text-gray-900 mb-2",
                                children: "No recipes found"
                            }),
                            /*#__PURE__*/ _jsx("p", {
                                className: "text-gray-600 mb-6",
                                children: "Try adjusting your search or filters"
                            }),
                            /*#__PURE__*/ _jsx(Button, {
                                onClick: clearFilters,
                                className: "bg-red-600 hover:bg-red-700",
                                children: "Clear Filters"
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ _jsx(Footer, {})
        ]
    });
};
export default Recipes;
