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



