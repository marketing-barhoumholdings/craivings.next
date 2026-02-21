import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import brain from 'brain';
import BlogPostLayout from 'components/BlogPostLayout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { sanityClient } from '@/sanity/client';
import { postBySlugQuery } from '@/sanity/queries';
import { buildImageUrl } from '@/sanity/image';
const BlogPost = ()=>{
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
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
                setPost(data);
                setError(false);
            } catch (err) {
                console.error('Error fetching blog post:', err);
                setError(true);
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
        // Parse content as HTML if it contains HTML tags, otherwise render as paragraphs
        if (post.content.includes('<')) {
            return /*#__PURE__*/ _jsx("div", {
                dangerouslySetInnerHTML: {
                    __html: post.content
                }
            });
        }
        // Split by double newlines to create paragraphs
        const paragraphs = post.content.split('\n\n');
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
