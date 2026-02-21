import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Calendar, Tag as TagIcon, ArrowLeft, Clock, Share2, List } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Footer } from 'components/Footer';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import brain from 'brain';
export default function BlogPostLayout({ title, content, excerpt, featuredImage, featuredImageAlt, author, category, tags = [], publishedDate, seoTitle, seoDescription, seo, readingTime, slug }) {
    const [headings, setHeadings] = useState([]);
    const [activeHeading, setActiveHeading] = useState('');
    const [showMobileToc, setShowMobileToc] = useState(false);
    const [recentPosts, setRecentPosts] = useState([]);
    const [latestRecipes, setLatestRecipes] = useState([]);
    const finalSeoTitle = (seo?.metaTitle || seoTitle || title) ?? title;
    const finalSeoDescription = (seo?.metaDescription || seoDescription || excerpt || title) ?? title;
    const canonicalUrl = seo?.canonicalUrl || (typeof window !== 'undefined' ? window.location.href : '');
    const ogTitle = seo?.ogTitle || finalSeoTitle;
    const ogDescription = seo?.ogDescription || finalSeoDescription;
    const ogImageUrl = seo?.ogImageUrl || featuredImage;
    const ogImageAlt = seo?.ogImageAlt || featuredImageAlt || title;
    const twitterTitle = seo?.twitterTitle || finalSeoTitle;
    const twitterDescription = seo?.twitterDescription || finalSeoDescription;
    const twitterImageUrl = seo?.twitterImageUrl || ogImageUrl || featuredImage;
    const twitterImageAlt = ogImageAlt;
    const robots = seo?.metaRobots || `${seo?.noIndex ? 'noindex' : 'index'},${seo?.noFollow ? 'nofollow' : 'follow'}`;
    const keywords = Array.isArray(seo?.keywords) && seo.keywords.length > 0 ? seo.keywords.join(", ") : null;
    let structuredData = null;
    if (seo?.structuredData) {
        try {
            structuredData = JSON.stringify(JSON.parse(seo.structuredData));
        } catch (error) {
            structuredData = null;
        }
    }
    const publishDate = publishedDate ? new Date(publishedDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }) : null;
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    // Fetch recent blog posts and recipes
    useEffect(()=>{
        const fetchSidebarContent = async ()=>{
            try {
                // Fetch recent blog posts
                const postsResponse = await brain.list_posts({
                    limit: 4,
                    offset: 0
                });
                const postsData = await postsResponse.json();
                setRecentPosts(postsData.posts.filter((post)=>post.slug !== slug).slice(0, 3));
                // Fetch latest recipes
                const recipesResponse = await brain.list_recipes({
                    limit: 3,
                    offset: 0,
                    is_published: true
                });
                const recipesData = await recipesResponse.json();
                setLatestRecipes(recipesData.recipes);
            } catch (error) {
                console.error('Error fetching sidebar content:', error);
            }
        };
        fetchSidebarContent();
    }, [
        slug
    ]);
    // Extract headings from content for table of contents
    useEffect(()=>{
        const articleContent = document.querySelector('.article-content');
        if (!articleContent) return;
        const headingElements = articleContent.querySelectorAll('h1, h2, h3');
        const extractedHeadings = [];
        headingElements.forEach((heading, index)=>{
            const id = `heading-${index}`;
            heading.id = id;
            const level = parseInt(heading.tagName.substring(1));
            extractedHeadings.push({
                id,
                text: heading.textContent || '',
                level
            });
        });
        setHeadings(extractedHeadings);
    }, [
        content
    ]);
    // Handle scroll to track active heading
    useEffect(()=>{
        const handleScroll = ()=>{
            const headingElements = headings.map((h)=>document.getElementById(h.id));
            for(let i = headingElements.length - 1; i >= 0; i--){
                const element = headingElements[i];
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 150) {
                        setActiveHeading(headings[i].id);
                        break;
                    }
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return ()=>window.removeEventListener('scroll', handleScroll);
    }, [
        headings
    ]);
    const scrollToHeading = (id)=>{
        const element = document.getElementById(id);
        if (element) {
            const offset = 100;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: elementPosition - offset,
                behavior: 'smooth'
            });
            setShowMobileToc(false);
        }
    };
    return /*#__PURE__*/ _jsxs(_Fragment, {
        children: [
            /*#__PURE__*/ _jsxs(Helmet, {
                children: [
                    /*#__PURE__*/ _jsxs("title", {
                        children: [
                            finalSeoTitle,
                            " | Craivings"
                        ]
                    }),
                    /*#__PURE__*/ _jsx("meta", {
                        name: "description",
                        content: finalSeoDescription
                    }),
                    /*#__PURE__*/ _jsx("link", {
                        rel: "canonical",
                        href: canonicalUrl || shareUrl
                    }),
                    keywords && /*#__PURE__*/ _jsx("meta", {
                        name: "keywords",
                        content: keywords
                    }),
                    /*#__PURE__*/ _jsx("meta", {
                        name: "robots",
                        content: robots
                    }),
                    /*#__PURE__*/ _jsx("meta", {
                        property: "og:title",
                        content: ogTitle
                    }),
                    /*#__PURE__*/ _jsx("meta", {
                        property: "og:description",
                        content: ogDescription
                    }),
                    /*#__PURE__*/ _jsx("meta", {
                        property: "og:type",
                        content: "article"
                    }),
                    /*#__PURE__*/ _jsx("meta", {
                        property: "og:url",
                        content: shareUrl
                    }),
                    ogImageUrl && /*#__PURE__*/ _jsx("meta", {
                        property: "og:image",
                        content: ogImageUrl
                    }),
                    ogImageAlt && /*#__PURE__*/ _jsx("meta", {
                        property: "og:image:alt",
                        content: ogImageAlt
                    }),
                    /*#__PURE__*/ _jsx("meta", {
                        name: "twitter:card",
                        content: twitterImageUrl ? "summary_large_image" : "summary"
                    }),
                    /*#__PURE__*/ _jsx("meta", {
                        name: "twitter:title",
                        content: twitterTitle
                    }),
                    /*#__PURE__*/ _jsx("meta", {
                        name: "twitter:description",
                        content: twitterDescription
                    }),
                    twitterImageUrl && /*#__PURE__*/ _jsx("meta", {
                        name: "twitter:image",
                        content: twitterImageUrl
                    }),
                    twitterImageAlt && /*#__PURE__*/ _jsx("meta", {
                        name: "twitter:image:alt",
                        content: twitterImageAlt
                    }),
                    publishedDate && /*#__PURE__*/ _jsx("meta", {
                        property: "article:published_time",
                        content: publishedDate
                    }),
                    author && /*#__PURE__*/ _jsx("meta", {
                        property: "article:author",
                        content: author
                    }),
                    structuredData && /*#__PURE__*/ _jsx("script", {
                        type: "application/ld+json",
                        dangerouslySetInnerHTML: {
                            __html: structuredData
                        }
                    })
                ]
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: "min-h-screen bg-gradient-to-b from-red-50/40 to-white",
                children: [
                    /*#__PURE__*/ _jsx("div", {
                        className: "container mx-auto px-4 pt-6",
                        children: /*#__PURE__*/ _jsx(Button, {
                            variant: "ghost",
                            asChild: true,
                            className: "text-gray-600 hover:text-red-600 hover:bg-red-50",
                            children: /*#__PURE__*/ _jsxs(Link, {
                                to: "/blog",
                                children: [
                                    /*#__PURE__*/ _jsx(ArrowLeft, {
                                        className: "mr-2 h-4 w-4"
                                    }),
                                    "Back to Blog"
                                ]
                            })
                        })
                    }),
                    featuredImage && /*#__PURE__*/ _jsx("div", {
                        className: "container mx-auto px-4 py-6",
                        children: /*#__PURE__*/ _jsx("div", {
                            className: "flex justify-center",
                            children: /*#__PURE__*/ _jsx("div", {
                                className: "aspect-[21/9] max-h-[400px] max-w-4xl w-full overflow-hidden rounded-2xl shadow-xl",
                                children: /*#__PURE__*/ _jsx("img", {
                                    src: featuredImage,
                                    alt: featuredImageAlt || title,
                                    className: "h-full w-full object-cover"
                                })
                            })
                        })
                    }),
                    /*#__PURE__*/ _jsxs("div", {
                        className: "container mx-auto px-4 py-8 max-w-4xl",
                        children: [
                            category && /*#__PURE__*/ _jsx(Badge, {
                                className: "mb-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0",
                                children: category.name
                            }),
                            /*#__PURE__*/ _jsx("h1", {
                                className: "text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight",
                                children: title
                            }),
                            excerpt && /*#__PURE__*/ _jsx("p", {
                                className: "text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed font-light",
                                children: excerpt
                            }),
                            /*#__PURE__*/ _jsxs("div", {
                                className: "flex flex-wrap items-center gap-6 text-gray-600 pb-6 border-b border-gray-200",
                                children: [
                                    author && /*#__PURE__*/ _jsxs("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ _jsx("div", {
                                                className: "h-10 w-10 rounded-full bg-gradient-to-br from-red-400 to-red-500 flex items-center justify-center text-white font-semibold",
                                                children: author.charAt(0).toUpperCase()
                                            }),
                                            /*#__PURE__*/ _jsxs("div", {
                                                children: [
                                                    /*#__PURE__*/ _jsx("p", {
                                                        className: "text-sm font-medium text-gray-900",
                                                        children: author
                                                    }),
                                                    /*#__PURE__*/ _jsx("p", {
                                                        className: "text-xs text-gray-500",
                                                        children: "Author"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    publishDate && /*#__PURE__*/ _jsxs("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ _jsx(Calendar, {
                                                className: "h-4 w-4 text-red-500"
                                            }),
                                            /*#__PURE__*/ _jsx("time", {
                                                dateTime: publishedDate,
                                                className: "text-sm",
                                                children: publishDate
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ _jsxs("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ _jsx(Clock, {
                                                className: "h-4 w-4 text-red-500"
                                            }),
                                            /*#__PURE__*/ _jsx("span", {
                                                className: "text-sm",
                                                children: readingTime ? `${readingTime} min read` : "5 min read"
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ _jsx("div", {
                        className: "container mx-auto px-4 pb-16",
                        children: /*#__PURE__*/ _jsxs("div", {
                            className: "flex gap-8 max-w-7xl mx-auto relative",
                            children: [
                                headings.length > 0 && /*#__PURE__*/ _jsx("aside", {
                                    className: "hidden lg:block",
                                    style: {
                                        width: '20%',
                                        flexShrink: 0
                                    },
                                    children: /*#__PURE__*/ _jsx("div", {
                                        className: "sticky top-24",
                                        children: /*#__PURE__*/ _jsxs(Card, {
                                            className: "p-6 bg-white border-red-100 shadow-lg",
                                            children: [
                                                /*#__PURE__*/ _jsxs("div", {
                                                    className: "flex items-center gap-2 mb-4",
                                                    children: [
                                                        /*#__PURE__*/ _jsx(List, {
                                                            className: "h-5 w-5 text-red-600"
                                                        }),
                                                        /*#__PURE__*/ _jsx("h3", {
                                                            className: "font-bold text-lg text-gray-900",
                                                            children: "Jump to Section"
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ _jsx("nav", {
                                                    className: "space-y-1",
                                                    children: headings.map((heading)=>/*#__PURE__*/ _jsx("button", {
                                                            onClick: ()=>scrollToHeading(heading.id),
                                                            className: `block w-full text-left py-2 px-3 rounded-lg transition-all text-sm ${heading.level === 1 ? 'font-semibold' : heading.level === 2 ? 'pl-5 font-medium' : 'pl-7'} ${activeHeading === heading.id ? 'bg-gradient-to-r from-red-50 to-red-50 text-red-600 border-l-2 border-red-600' : 'text-gray-600 hover:text-red-600 hover:bg-red-50'}`,
                                                            children: heading.text
                                                        }, heading.id))
                                                })
                                            ]
                                        })
                                    })
                                }),
                                headings.length > 0 && /*#__PURE__*/ _jsx("div", {
                                    className: "lg:hidden fixed bottom-6 right-6 z-40",
                                    children: /*#__PURE__*/ _jsx(Button, {
                                        onClick: ()=>setShowMobileToc(!showMobileToc),
                                        className: "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-xl rounded-full h-14 w-14 p-0",
                                        children: /*#__PURE__*/ _jsx(List, {
                                            className: "h-6 w-6"
                                        })
                                    })
                                }),
                                showMobileToc && headings.length > 0 && /*#__PURE__*/ _jsx("div", {
                                    className: "lg:hidden fixed inset-0 bg-black/50 z-50",
                                    onClick: ()=>setShowMobileToc(false),
                                    children: /*#__PURE__*/ _jsxs("div", {
                                        className: "absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 max-h-[70vh] overflow-y-auto",
                                        onClick: (e)=>e.stopPropagation(),
                                        children: [
                                            /*#__PURE__*/ _jsxs("div", {
                                                className: "flex items-center justify-between mb-4",
                                                children: [
                                                    /*#__PURE__*/ _jsx("h3", {
                                                        className: "font-bold text-lg text-gray-900",
                                                        children: "Jump to Section"
                                                    }),
                                                    /*#__PURE__*/ _jsx("button", {
                                                        onClick: ()=>setShowMobileToc(false),
                                                        className: "text-gray-500",
                                                        children: "✕"
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ _jsx("nav", {
                                                className: "space-y-1",
                                                children: headings.map((heading)=>/*#__PURE__*/ _jsx("button", {
                                                        onClick: ()=>scrollToHeading(heading.id),
                                                        className: `block w-full text-left py-3 px-4 rounded-lg transition-all ${heading.level === 1 ? 'font-semibold text-base' : heading.level === 2 ? 'pl-6 font-medium' : 'pl-8 text-sm'} ${activeHeading === heading.id ? 'bg-gradient-to-r from-red-50 to-red-50 text-red-600' : 'text-gray-700 hover:bg-red-50'}`,
                                                        children: heading.text
                                                    }, heading.id))
                                            })
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ _jsxs("article", {
                                    className: "min-w-0",
                                    style: {
                                        width: '80%'
                                    },
                                    children: [
                                        /*#__PURE__*/ _jsx("div", {
                                            className: "article-content prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-h1:text-3xl prose-h1:md:text-4xl prose-h1:mb-8 prose-h1:mt-16 prose-h1:border-b prose-h1:border-gray-200 prose-h1:pb-4 prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mb-6 prose-h2:mt-12 prose-h2:text-red-900 prose-h3:text-xl prose-h3:md:text-2xl prose-h3:mb-5 prose-h3:mt-10 prose-h3:text-red-900 prose-p:text-gray-700 prose-p:text-base prose-p:md:text-lg prose-p:leading-relaxed prose-p:mb-8 prose-a:text-red-600 prose-a:no-underline hover:prose-a:text-red-700 hover:prose-a:underline prose-strong:text-gray-900 prose-strong:font-semibold prose-ul:my-8 prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-3 prose-ol:my-8 prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-3 prose-li:text-gray-700 prose-li:mb-2 prose-li:leading-relaxed prose-blockquote:border-l-4 prose-blockquote:border-red-500 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-700 prose-blockquote:bg-red-50 prose-blockquote:py-6 prose-blockquote:my-8 prose-blockquote:rounded-r-lg prose-code:text-red-600 prose-code:bg-red-50 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-6 prose-pre:rounded-xl prose-pre:my-8 prose-img:rounded-xl prose-img:shadow-lg prose-img:my-10 ",
                                            children: content
                                        }),
                                        tags.length > 0 && /*#__PURE__*/ _jsx("div", {
                                            className: "mt-12 pt-8 border-t border-gray-200",
                                            children: /*#__PURE__*/ _jsxs("div", {
                                                className: "flex flex-wrap items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ _jsx(TagIcon, {
                                                        className: "h-5 w-5 text-gray-500"
                                                    }),
                                                    /*#__PURE__*/ _jsx("span", {
                                                        className: "text-sm font-semibold text-gray-700 mr-2",
                                                        children: "Tags:"
                                                    }),
                                                    tags.map((tag)=>/*#__PURE__*/ _jsx(Link, {
                                                            to: `/blog?tag=${tag.slug}`,
                                                            children: /*#__PURE__*/ _jsx(Badge, {
                                                                variant: "outline",
                                                                className: "hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-all",
                                                                children: tag.name
                                                            })
                                                        }, tag.id))
                                                ]
                                            })
                                        }),
                                        /*#__PURE__*/ _jsx("div", {
                                            className: "mt-8 pt-8 border-t border-gray-200",
                                            children: /*#__PURE__*/ _jsx("div", {
                                                className: "bg-gradient-to-r from-red-50 to-red-50 rounded-2xl p-6",
                                                children: /*#__PURE__*/ _jsxs("div", {
                                                    className: "flex items-center justify-between flex-wrap gap-4",
                                                    children: [
                                                        /*#__PURE__*/ _jsxs("div", {
                                                            className: "flex items-center gap-3",
                                                            children: [
                                                                /*#__PURE__*/ _jsx(Share2, {
                                                                    className: "h-5 w-5 text-red-600"
                                                                }),
                                                                /*#__PURE__*/ _jsx("h3", {
                                                                    className: "font-semibold text-gray-900",
                                                                    children: "Share this article"
                                                                })
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ _jsxs("div", {
                                                            className: "flex gap-3",
                                                            children: [
                                                                /*#__PURE__*/ _jsx(Button, {
                                                                    variant: "outline",
                                                                    size: "sm",
                                                                    asChild: true,
                                                                    className: "hover:bg-white hover:text-red-600 hover:border-red-300",
                                                                    children: /*#__PURE__*/ _jsx("a", {
                                                                        href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`,
                                                                        target: "_blank",
                                                                        rel: "noopener noreferrer",
                                                                        children: "Twitter"
                                                                    })
                                                                }),
                                                                /*#__PURE__*/ _jsx(Button, {
                                                                    variant: "outline",
                                                                    size: "sm",
                                                                    asChild: true,
                                                                    className: "hover:bg-white hover:text-red-600 hover:border-red-300",
                                                                    children: /*#__PURE__*/ _jsx("a", {
                                                                        href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
                                                                        target: "_blank",
                                                                        rel: "noopener noreferrer",
                                                                        children: "Facebook"
                                                                    })
                                                                }),
                                                                /*#__PURE__*/ _jsx(Button, {
                                                                    variant: "outline",
                                                                    size: "sm",
                                                                    asChild: true,
                                                                    className: "hover:bg-white hover:text-red-600 hover:border-red-300",
                                                                    children: /*#__PURE__*/ _jsx("a", {
                                                                        href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
                                                                        target: "_blank",
                                                                        rel: "noopener noreferrer",
                                                                        children: "LinkedIn"
                                                                    })
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                })
                                            })
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ _jsx("aside", {
                                    className: "hidden xl:block",
                                    style: {
                                        width: 'auto',
                                        flexShrink: 0
                                    },
                                    children: /*#__PURE__*/ _jsxs("div", {
                                        className: "sticky top-24 space-y-6 w-64",
                                        children: [
                                            recentPosts.length > 0 && /*#__PURE__*/ _jsxs(Card, {
                                                className: "bg-white border-red-100 shadow-lg overflow-hidden",
                                                children: [
                                                    /*#__PURE__*/ _jsx(CardHeader, {
                                                        className: "bg-gradient-to-r from-red-50 to-red-50 border-b border-red-100",
                                                        children: /*#__PURE__*/ _jsx(CardTitle, {
                                                            className: "text-lg font-bold text-gray-900",
                                                            children: "Recent Blogs"
                                                        })
                                                    }),
                                                    /*#__PURE__*/ _jsx(CardContent, {
                                                        className: "p-4 space-y-4",
                                                        children: recentPosts.map((post)=>/*#__PURE__*/ _jsxs(Link, {
                                                                to: `/blog-post?slug=${post.slug}`,
                                                                className: "block group",
                                                                children: [
                                                                    /*#__PURE__*/ _jsxs("div", {
                                                                        className: "space-y-2",
                                                                        children: [
                                                                            post.featured_image_url && /*#__PURE__*/ _jsx("div", {
                                                                                className: "aspect-video rounded-lg overflow-hidden",
                                                                                children: /*#__PURE__*/ _jsx("img", {
                                                                                    src: post.featured_image_url,
                                                                                    alt: post.title,
                                                                                    className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                                                })
                                                                            }),
                                                                            /*#__PURE__*/ _jsx("h4", {
                                                                                className: "font-semibold text-sm text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2",
                                                                                children: post.title
                                                                            }),
                                                                            post.published_date && /*#__PURE__*/ _jsxs("p", {
                                                                                className: "text-xs text-gray-500 flex items-center gap-1",
                                                                                children: [
                                                                                    /*#__PURE__*/ _jsx(Calendar, {
                                                                                        className: "h-3 w-3"
                                                                                    }),
                                                                                    new Date(post.published_date).toLocaleDateString('en-US', {
                                                                                        month: 'short',
                                                                                        day: 'numeric',
                                                                                        year: 'numeric'
                                                                                    })
                                                                                ]
                                                                            })
                                                                        ]
                                                                    }),
                                                                    recentPosts.indexOf(post) < recentPosts.length - 1 && /*#__PURE__*/ _jsx(Separator, {
                                                                        className: "mt-4"
                                                                    })
                                                                ]
                                                            }, post.id))
                                                    })
                                                ]
                                            }),
                                            latestRecipes.length > 0 && /*#__PURE__*/ _jsxs(Card, {
                                                className: "bg-white border-red-100 shadow-lg overflow-hidden",
                                                children: [
                                                    /*#__PURE__*/ _jsx(CardHeader, {
                                                        className: "bg-gradient-to-r from-red-50 to-red-50 border-b border-red-100",
                                                        children: /*#__PURE__*/ _jsx(CardTitle, {
                                                            className: "text-lg font-bold text-gray-900",
                                                            children: "Latest Recipes"
                                                        })
                                                    }),
                                                    /*#__PURE__*/ _jsx(CardContent, {
                                                        className: "p-4 space-y-4",
                                                        children: latestRecipes.map((recipe)=>/*#__PURE__*/ _jsxs(Link, {
                                                                to: `/recipe-detail?slug=${recipe.slug}`,
                                                                className: "block group",
                                                                children: [
                                                                    /*#__PURE__*/ _jsxs("div", {
                                                                        className: "space-y-2",
                                                                        children: [
                                                                            recipe.video_url && /*#__PURE__*/ _jsx("div", {
                                                                                className: "aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-red-100 to-red-100",
                                                                                children: /*#__PURE__*/ _jsx("video", {
                                                                                    src: recipe.video_url,
                                                                                    className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300",
                                                                                    muted: true,
                                                                                    playsInline: true
                                                                                })
                                                                            }),
                                                                            /*#__PURE__*/ _jsx("h4", {
                                                                                className: "font-semibold text-sm text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2",
                                                                                children: recipe.title
                                                                            }),
                                                                            /*#__PURE__*/ _jsxs("div", {
                                                                                className: "flex items-center gap-2 text-xs text-gray-500",
                                                                                children: [
                                                                                    recipe.difficulty && /*#__PURE__*/ _jsx(Badge, {
                                                                                        variant: "outline",
                                                                                        className: "text-xs px-2 py-0",
                                                                                        children: recipe.difficulty
                                                                                    }),
                                                                                    recipe.prep_time && /*#__PURE__*/ _jsxs("span", {
                                                                                        className: "flex items-center gap-1",
                                                                                        children: [
                                                                                            /*#__PURE__*/ _jsx(Clock, {
                                                                                                className: "h-3 w-3"
                                                                                            }),
                                                                                            recipe.prep_time,
                                                                                            " min"
                                                                                        ]
                                                                                    })
                                                                                ]
                                                                            })
                                                                        ]
                                                                    }),
                                                                    latestRecipes.indexOf(recipe) < latestRecipes.length - 1 && /*#__PURE__*/ _jsx(Separator, {
                                                                        className: "mt-4"
                                                                    })
                                                                ]
                                                            }, recipe.id))
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ _jsx(Card, {
                                                className: "bg-gradient-to-br from-red-500 to-red-600 border-0 shadow-xl text-white overflow-hidden",
                                                children: /*#__PURE__*/ _jsxs(CardContent, {
                                                    className: "p-6",
                                                    children: [
                                                        /*#__PURE__*/ _jsx("h3", {
                                                            className: "font-bold text-xl mb-3",
                                                            children: "Stay Updated!"
                                                        }),
                                                        /*#__PURE__*/ _jsx("p", {
                                                            className: "text-sm mb-4 text-white/90",
                                                            children: "Get the latest recipes and cooking tips delivered to your inbox."
                                                        }),
                                                        /*#__PURE__*/ _jsx(Button, {
                                                            asChild: true,
                                                            variant: "secondary",
                                                            className: "w-full bg-white text-red-600 hover:bg-gray-100 font-semibold",
                                                            children: /*#__PURE__*/ _jsx(Link, {
                                                                to: "/contact",
                                                                children: "Subscribe Now"
                                                            })
                                                        })
                                                    ]
                                                })
                                            })
                                        ]
                                    })
                                })
                            ]
                        })
                    })
                ]
            }),
            /*#__PURE__*/ _jsx(Footer, {})
        ]
    });
}
