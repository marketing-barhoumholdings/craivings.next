import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Calendar, Clock, ArrowRight, Tag, Loader2 } from 'lucide-react';
import { Footer } from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import brain from 'brain';
import { Header } from "../components/Header";
const Blog = ()=>{
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    useEffect(()=>{
        const fetchPosts = async ()=>{
            try {
                setLoading(true);
                const response = await brain.list_posts({
                    limit: 20,
                    offset: 0
                });
                const data = await response.json();
                const isCookingPost = (post)=>{
                    const text = `${post?.title || ""} ${post?.excerpt || ""}`.toLowerCase();
                    return [
                        "recipe",
                        "cook",
                        "cooking",
                        "kitchen",
                        "food",
                        "meal",
                        "dish",
                        "bake",
                        "bread",
                        "curry",
                        "pasta"
                    ].some((keyword)=>text.includes(keyword));
                };
                const fallbackPosts = [
                    {
                        id: "fallback-1",
                        title: "Artisan Sourdough Bread: A Beginner’s Guide",
                        slug: "artisan-sourdough-bread-beginners-guide",
                        excerpt: "Everything you need to start baking crunchy, airy sourdough at home.",
                        featured_image_url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80",
                        published_date: new Date().toISOString()
                    },
                    {
                        id: "fallback-2",
                        title: "Thai Green Curry Masterclass",
                        slug: "thai-green-curry-masterclass",
                        excerpt: "Aromatic, creamy, and packed with flavor — learn to make it right.",
                        featured_image_url: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=1200&q=80",
                        published_date: new Date().toISOString()
                    },
                    {
                        id: "fallback-3",
                        title: "Perfect Italian Carbonara: The Classic Method",
                        slug: "perfect-italian-carbonara-classic-method",
                        excerpt: "Learn the simple technique to get a silky, authentic carbonara every time.",
                        featured_image_url: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1200&q=80",
                        published_date: new Date().toISOString()
                    },
                    {
                        id: "fallback-4",
                        title: "Weeknight Chicken Stir‑Fry: Fast, Fresh, and Flavorful",
                        slug: "weeknight-chicken-stir-fry-fast-fresh-flavorful",
                        excerpt: "A 20‑minute stir‑fry with crisp vegetables, tender chicken, and a glossy sauce.",
                        featured_image_url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
                        published_date: new Date().toISOString()
                    }
                ];
                const incoming = data.posts || [];
                const cookingPosts = incoming.filter(isCookingPost);
                setPosts(cookingPosts.length > 0 ? cookingPosts : fallbackPosts);
                setError(false);
            } catch (err) {
                console.error('Error fetching blog posts:', err);
                setPosts([
                    {
                        id: "fallback-1",
                        title: "Artisan Sourdough Bread: A Beginner’s Guide",
                        slug: "artisan-sourdough-bread-beginners-guide",
                        excerpt: "Everything you need to start baking crunchy, airy sourdough at home.",
                        featured_image_url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80",
                        published_date: new Date().toISOString()
                    },
                    {
                        id: "fallback-2",
                        title: "Thai Green Curry Masterclass",
                        slug: "thai-green-curry-masterclass",
                        excerpt: "Aromatic, creamy, and packed with flavor — learn to make it right.",
                        featured_image_url: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=1200&q=80",
                        published_date: new Date().toISOString()
                    },
                    {
                        id: "fallback-3",
                        title: "Perfect Italian Carbonara: The Classic Method",
                        slug: "perfect-italian-carbonara-classic-method",
                        excerpt: "Learn the simple technique to get a silky, authentic carbonara every time.",
                        featured_image_url: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1200&q=80",
                        published_date: new Date().toISOString()
                    },
                    {
                        id: "fallback-4",
                        title: "Weeknight Chicken Stir‑Fry: Fast, Fresh, and Flavorful",
                        slug: "weeknight-chicken-stir-fry-fast-fresh-flavorful",
                        excerpt: "A 20‑minute stir‑fry with crisp vegetables, tender chicken, and a glossy sauce.",
                        featured_image_url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
                        published_date: new Date().toISOString()
                    }
                ]);
                setError(false);
            } finally{
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);
    const formatDate = (dateString)=>{
        if (!dateString) return 'Recently';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
    const featuredPost = posts.find((post, index)=>index === 0); // First post as featured
    const regularPosts = posts.slice(1); // Rest of the posts
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
            loading && /*#__PURE__*/ _jsx("section", {
                className: "py-20 px-4",
                children: /*#__PURE__*/ _jsxs("div", {
                    className: "container mx-auto text-center",
                    children: [
                        /*#__PURE__*/ _jsx(Loader2, {
                            className: "h-12 w-12 animate-spin text-red-600 mx-auto mb-4"
                        }),
                        /*#__PURE__*/ _jsx("p", {
                            className: "text-gray-600",
                            children: "Loading articles..."
                        })
                    ]
                })
            }),
            error && !loading && /*#__PURE__*/ _jsx("section", {
                className: "py-20 px-4",
                children: /*#__PURE__*/ _jsxs("div", {
                    className: "container mx-auto text-center max-w-md mx-auto",
                    children: [
                        /*#__PURE__*/ _jsx("h2", {
                            className: "text-2xl font-bold mb-4 text-gray-900",
                            children: "Unable to Load Articles"
                        }),
                        /*#__PURE__*/ _jsx("p", {
                            className: "text-gray-600 mb-6",
                            children: "We're having trouble loading the blog posts. Please try again later."
                        }),
                        /*#__PURE__*/ _jsx(Button, {
                            onClick: ()=>window.location.reload(),
                            className: "bg-red-600 hover:bg-red-700",
                            children: "Retry"
                        })
                    ]
                })
            }),
            !loading && !error && posts.length === 0 && /*#__PURE__*/ _jsx("section", {
                className: "py-20 px-4",
                children: /*#__PURE__*/ _jsxs("div", {
                    className: "container mx-auto text-center max-w-md mx-auto",
                    children: [
                        /*#__PURE__*/ _jsx("h2", {
                            className: "text-2xl font-bold mb-4 text-gray-900",
                            children: "No Articles Yet"
                        }),
                        /*#__PURE__*/ _jsx("p", {
                            className: "text-gray-600",
                            children: "Check back soon for exciting content about AI-powered cooking!"
                        })
                    ]
                })
            }),
            !loading && !error && featuredPost && /*#__PURE__*/ _jsx("section", {
                className: "py-12 px-4",
                children: /*#__PURE__*/ _jsx("div", {
                    className: "container mx-auto",
                    children: /*#__PURE__*/ _jsx(Card, {
                        className: "overflow-hidden border-0 shadow-2xl cursor-pointer hover:shadow-3xl transition-all",
                        onClick: ()=>navigate(`/blog-post?slug=${featuredPost.slug}`),
                        children: /*#__PURE__*/ _jsxs("div", {
                            className: "grid lg:grid-cols-2 gap-0",
                            children: [
                                /*#__PURE__*/ _jsxs("div", {
                                    className: "relative h-52 lg:h-auto",
                                    children: [
                                        featuredPost.featured_image_url ? /*#__PURE__*/ _jsx("img", {
                                            src: featuredPost.featured_image_url,
                                            alt: featuredPost.title,
                                            className: "w-full h-full object-cover"
                                        }) : /*#__PURE__*/ _jsx("div", {
                                            className: "w-full h-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center",
                                            children: /*#__PURE__*/ _jsx("span", {
                                                className: "text-white text-6xl font-bold opacity-20",
                                                children: "C"
                                            })
                                        }),
                                        /*#__PURE__*/ _jsx("div", {
                                            className: "absolute top-4 left-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold",
                                            children: "Featured"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ _jsxs("div", {
                                    className: "p-6 lg:p-8 flex flex-col justify-center bg-white",
                                    children: [
                                        /*#__PURE__*/ _jsxs("div", {
                                            className: "flex items-center gap-4 mb-3",
                                            children: [
                                                featuredPost.category && /*#__PURE__*/ _jsxs(_Fragment, {
                                                    children: [
                                                        /*#__PURE__*/ _jsxs("span", {
                                                            className: "inline-flex items-center gap-2 text-red-600 font-semibold",
                                                            children: [
                                                                /*#__PURE__*/ _jsx(Tag, {
                                                                    className: "h-4 w-4"
                                                                }),
                                                                featuredPost.category.name
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ _jsx("span", {
                                                            className: "text-gray-400",
                                                            children: "•"
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ _jsxs("span", {
                                                    className: "text-gray-500 flex items-center gap-1",
                                                    children: [
                                                        /*#__PURE__*/ _jsx(Calendar, {
                                                            className: "h-4 w-4"
                                                        }),
                                                        formatDate(featuredPost.published_date || featuredPost.created_at)
                                                    ]
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ _jsx("h2", {
                                            className: "text-2xl lg:text-3xl font-bold mb-3 leading-tight",
                                            children: featuredPost.title
                                        }),
                                        /*#__PURE__*/ _jsx("p", {
                                            className: "text-gray-600 text-base mb-5 leading-relaxed",
                                            children: featuredPost.excerpt
                                        }),
                                        /*#__PURE__*/ _jsxs("div", {
                                            className: "flex items-center justify-between",
                                            children: [
                                                /*#__PURE__*/ _jsxs("span", {
                                                    className: "text-gray-500 flex items-center gap-1",
                                                    children: [
                                                        /*#__PURE__*/ _jsx(Clock, {
                                                            className: "h-4 w-4"
                                                        }),
                                                        "5 min read"
                                                    ]
                                                }),
                                                /*#__PURE__*/ _jsxs(Button, {
                                                    onClick: (e)=>{
                                                        e.stopPropagation();
                                                        navigate(`/blog-post?slug=${featuredPost.slug}`);
                                                    },
                                                    className: "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl w-full sm:w-auto h-12 px-6 font-semibold shadow-lg hover:shadow-xl transition-all",
                                                    children: [
                                                        "Read Article",
                                                        /*#__PURE__*/ _jsx(ArrowRight, {
                                                            className: "ml-2 h-4 w-4"
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        })
                    })
                })
            }),
            !loading && !error && regularPosts.length > 0 && /*#__PURE__*/ _jsx("section", {
                className: "py-20 px-4",
                children: /*#__PURE__*/ _jsxs("div", {
                    className: "container mx-auto",
                    children: [
                        /*#__PURE__*/ _jsxs("div", {
                            className: "mb-12",
                            children: [
                                /*#__PURE__*/ _jsx("h2", {
                                    className: "text-4xl font-bold mb-4",
                                    children: "Latest Articles"
                                }),
                                /*#__PURE__*/ _jsx("p", {
                                    className: "text-xl text-gray-600",
                                    children: "Stay updated with our latest thoughts and insights"
                                })
                            ]
                        }),
                        /*#__PURE__*/ _jsx("div", {
                            className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8",
                            children: regularPosts.map((post)=>/*#__PURE__*/ _jsxs(Card, {
                                    className: "group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all cursor-pointer",
                                    onClick: ()=>navigate(`/blog-post?slug=${post.slug}`),
                                    children: [
                                        /*#__PURE__*/ _jsxs("div", {
                                            className: "relative aspect-video overflow-hidden",
                                            children: [
                                                post.featured_image_url ? /*#__PURE__*/ _jsx("img", {
                                                    src: post.featured_image_url,
                                                    alt: post.title,
                                                    className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                }) : /*#__PURE__*/ _jsx("div", {
                                                    className: "w-full h-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center",
                                                    children: /*#__PURE__*/ _jsx("span", {
                                                        className: "text-white text-4xl font-bold opacity-20",
                                                        children: "C"
                                                    })
                                                }),
                                                /*#__PURE__*/ _jsx("div", {
                                                    className: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                                                }),
                                                post.category && /*#__PURE__*/ _jsx("div", {
                                                    className: "absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-red-600 px-3 py-1 rounded-full text-sm font-semibold",
                                                    children: post.category.name
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ _jsxs("div", {
                                            className: "p-6 bg-white flex flex-col",
                                            children: [
                                                /*#__PURE__*/ _jsxs("div", {
                                                    className: "flex items-center gap-4 mb-3 text-sm text-gray-500",
                                                    children: [
                                                        /*#__PURE__*/ _jsxs("span", {
                                                            className: "flex items-center gap-1",
                                                            children: [
                                                                /*#__PURE__*/ _jsx(Calendar, {
                                                                    className: "h-3 w-3"
                                                                }),
                                                                formatDate(post.published_date || post.created_at)
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ _jsx("span", {
                                                            children: "•"
                                                        }),
                                                        /*#__PURE__*/ _jsxs("span", {
                                                            className: "flex items-center gap-1",
                                                            children: [
                                                                /*#__PURE__*/ _jsx(Clock, {
                                                                    className: "h-3 w-3"
                                                                }),
                                                                "5 min read"
                                                            ]
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ _jsx("h3", {
                                                    className: "text-xl font-bold mb-3 group-hover:text-red-600 transition-colors leading-tight",
                                                    children: post.title
                                                }),
                                                /*#__PURE__*/ _jsx("p", {
                                                    className: "text-gray-600 mb-4 line-clamp-3",
                                                    children: post.excerpt
                                                }),
                                                /*#__PURE__*/ _jsxs(Button, {
                                                    className: "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl h-10 px-5 font-semibold shadow-md hover:shadow-lg transition-all mx-auto mt-auto",
                                                    onClick: (e)=>{
                                                        e.stopPropagation();
                                                        navigate(`/blog-post?slug=${post.slug}`);
                                                    },
                                                    children: [
                                                        "Read Article",
                                                        /*#__PURE__*/ _jsx(ArrowRight, {
                                                            className: "ml-2 h-4 w-4"
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                }, post.id))
                        })
                    ]
                })
            }),
            /*#__PURE__*/ _jsx(Footer, {})
        ]
    });
};
export default Blog;



