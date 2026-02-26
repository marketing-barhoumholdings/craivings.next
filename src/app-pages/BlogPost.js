import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import brain from 'brain';
import BlogPostLayout from '../components/BlogPostLayout';
import { Button } from '../components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { sanityClient } from '../sanity/client';
import { postBySlugQuery } from '../sanity/queries';
import { buildImageUrl } from '../sanity/image';
import { Header } from "../components/Header";
const BlogPost = ()=>{
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const fallbackPosts = {
        "artisan-sourdough-bread-beginners-guide": {
            title: "Artisan Sourdough Bread: A Beginner’s Guide",
            excerpt: "Everything you need to start baking crunchy, airy sourdough at home.",
            content: "",
            featured_image_url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1600&q=80",
            featured_image_alt: "Artisan sourdough bread",
            author: "Craivings Team",
            category: "Baking",
            tags: ["bread", "baking"],
            published_date: new Date().toISOString(),
            reading_time: "5 min read",
            slug: "artisan-sourdough-bread-beginners-guide"
        },
        "thai-green-curry-masterclass": {
            title: "Thai Green Curry Masterclass",
            excerpt: "Aromatic, creamy, and packed with flavor — learn to make it right.",
            content: "",
            featured_image_url: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=1600&q=80",
            featured_image_alt: "Thai green curry",
            author: "Craivings Team",
            category: "Asian",
            tags: ["curry", "thai"],
            published_date: new Date().toISOString(),
            reading_time: "6 min read",
            slug: "thai-green-curry-masterclass"
        },
        "perfect-italian-carbonara-classic-method": {
            title: "Perfect Italian Carbonara: The Classic Method",
            excerpt: "Learn the simple technique to get a silky, authentic carbonara every time.",
            content: "",
            featured_image_url: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1600&q=80",
            featured_image_alt: "Italian carbonara",
            author: "Craivings Team",
            category: "Pasta",
            tags: ["pasta", "italian"],
            published_date: new Date().toISOString(),
            reading_time: "5 min read",
            slug: "perfect-italian-carbonara-classic-method"
        },
        "weeknight-chicken-stir-fry-fast-fresh-flavorful": {
            title: "Weeknight Chicken Stir‑Fry: Fast, Fresh, and Flavorful",
            excerpt: "A 20‑minute stir‑fry with crisp vegetables, tender chicken, and a glossy sauce.",
            content: "",
            featured_image_url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80",
            featured_image_alt: "Chicken stir-fry",
            author: "Craivings Team",
            category: "Dinner",
            tags: ["stir-fry", "chicken"],
            published_date: new Date().toISOString(),
            reading_time: "4 min read",
            slug: "weeknight-chicken-stir-fry-fast-fresh-flavorful"
        }
    };
    useEffect(()=>{
        const fetchPost = async ()=>{
            const slug = searchParams.get('slug');
            if (!slug) {
                setError(true);
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                const hasSanity = !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && !!process.env.NEXT_PUBLIC_SANITY_DATASET;
                if (hasSanity) {
                    const sanityPost = await sanityClient.fetch(postBySlugQuery, {
                        slug
                    });
                    if (sanityPost) {
                        const featuredImageUrl = sanityPost.featuredImage ? buildImageUrl(sanityPost.featuredImage, {
                            width: 1600,
                            height: 900,
                            fit: "clip"
                        }) : null;
                        const ogImageUrl = sanityPost.seo?.ogImage ? buildImageUrl(sanityPost.seo.ogImage, {
                            width: 1200,
                            height: 630,
                            fit: "clip"
                        }) : null;
                        const twitterImageUrl = sanityPost.seo?.twitterImage ? buildImageUrl(sanityPost.seo.twitterImage, {
                            width: 1200,
                            height: 630,
                            fit: "clip"
                        }) : null;
                        setPost({
                            title: sanityPost.title,
                            excerpt: sanityPost.excerpt,
                            content: sanityPost.content || "",
                            featured_image_url: featuredImageUrl,
                            featured_image_alt: sanityPost.featuredImageAlt,
                            author: sanityPost.author,
                            category: sanityPost.categories?.[0] || null,
                            tags: [],
                            published_date: sanityPost.publishedAt,
                            updated_at: sanityPost.updatedAt,
                            reading_time: sanityPost.readingTime,
                            seo: {
                                ...sanityPost.seo,
                                ogImageUrl,
                                twitterImageUrl,
                                structuredData: sanityPost.seo?.structuredData?.code ?? sanityPost.seo?.structuredData
                            },
                            slug: sanityPost.slug
                        });
                        setError(false);
                        return;
                    }
                }
                const response = await brain.get_post_by_slug({
                    slug
                });
                const data = await response.json();
                const text = `${data?.title || ""} ${data?.excerpt || ""}`.toLowerCase();
                const isCooking = [
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
                if (!isCooking || !data?.title) {
                    const fallback = fallbackPosts[slug];
                    if (fallback) {
                        setPost(fallback);
                        setError(false);
                        return;
                    }
                    setError(true);
                    return;
                }
                setPost(data);
                setError(false);
            } catch (err) {
                console.error('Error fetching blog post:', err);
                const slug = searchParams.get('slug');
                const fallback = slug ? fallbackPosts[slug] : null;
                if (fallback) {
                    setPost(fallback);
                    setError(false);
                } else {
                    setError(true);
                }
            } finally{
                setLoading(false);
            }
        };
        fetchPost();
    }, [
        searchParams
    ]);
    // Loading state
    if (loading) {
        return /*#__PURE__*/ _jsx("div", {
            className: "min-h-screen bg-gradient-to-b from-red-50/30 to-white flex items-center justify-center",
            children: /*#__PURE__*/ _jsxs("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ _jsx(Loader2, {
                        className: "h-12 w-12 animate-spin text-red-600 mx-auto mb-4"
                    }),
                    /*#__PURE__*/ _jsx("p", {
                        className: "text-gray-600",
                        children: "Loading article..."
                    })
                ]
            })
        });
    }
    // Error state / Post not found
    if (error || !post) {
        return /*#__PURE__*/ _jsx("div", {
            className: "min-h-screen bg-gradient-to-b from-red-50/30 to-white flex items-center justify-center px-4",
            children: /*#__PURE__*/ _jsxs("div", {
                className: "text-center max-w-md",
                children: [
                    /*#__PURE__*/ _jsx("h1", {
                        className: "text-4xl font-bold mb-4 text-gray-900",
                        children: "Post Not Found"
                    }),
                    /*#__PURE__*/ _jsx("p", {
                        className: "text-gray-600 mb-6",
                        children: "The blog post you're looking for doesn't exist or has been removed."
                    }),
                    /*#__PURE__*/ _jsxs(Button, {
                        onClick: ()=>navigate('/blog'),
                        className: "bg-red-600 hover:bg-red-700",
                        children: [
                            /*#__PURE__*/ _jsx(ArrowLeft, {
                                className: "mr-2 h-4 w-4"
                            }),
                            "Back to Blog"
                        ]
                    })
                ]
            })
        });
    }
    // Render content with proper HTML parsing
    const renderContent = ()=>{
        const fallbackContent = `\n${post?.title || "Recipe Guide"}\n\nThis article is a practical, step‑by‑step guide built for real kitchens. You’ll learn the essential technique, the why behind each step, and simple fixes if something feels off along the way.\n\nStart with the basics: the ingredients, the order, and the temperature. Good results come from a few reliable rules—proper hydration, controlled heat, and timing that matches the texture you want.\n\nFor best results, prep everything before you begin. Measure your ingredients, preheat your tools, and keep a timer nearby. Small details like pan temperature and resting time make a huge difference in flavor and texture.\n\nIf your result seems too dense, too dry, or lacking flavor, adjust one variable at a time. Add a touch of moisture, lower the heat, or extend the resting time. These small changes quickly improve consistency.\n\nOnce you’ve mastered the core method, experiment with variations. Try different seasonings, swap proteins, or introduce a new finishing technique like broiling, glazing, or a quick herb oil.\n\nMost importantly, keep notes. The fastest way to improve is to record what worked, what didn’t, and what you’ll tweak next time. That’s how dependable home cooking is built.\n\nLooking for more like this? Check the related posts for additional recipes, timing charts, and technique breakdowns.`;
        const safeContent = (post?.content && post.content.trim().length > 0) ? post.content : fallbackContent;
        // Parse content as HTML if it contains HTML tags, otherwise render as paragraphs
        if ((safeContent || "").includes('<')) {
            return /*#__PURE__*/ _jsx("div", {
                dangerouslySetInnerHTML: {
                    __html: safeContent || ""
                }
            });
        }
        // Split by double newlines to create paragraphs
        const paragraphs = (safeContent || "").split('\n\n');
        return /*#__PURE__*/ _jsx(_Fragment, {
            children: paragraphs.map((para, index)=>/*#__PURE__*/ _jsx("p", {
                    className: "mb-4",
                    children: para
                }, index))
        });
    };
    return /*#__PURE__*/ _jsx(BlogPostLayout, {
        title: post.title,
        content: renderContent(),
        excerpt: post.excerpt,
        featuredImage: post.featured_image_url,
        author: post.author,
        category: post.category,
        tags: post.tags,
        publishedDate: post.published_date,
        seoTitle: post.seo?.metaTitle || post.seo_title,
        seoDescription: post.seo?.metaDescription || post.seo_description,
        seo: post.seo,
        featuredImageAlt: post.featured_image_alt,
        readingTime: post.reading_time,
        slug: post.slug
    });
};
export default BlogPost;


