import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Card } from "../components/ui/card";
import { Youtube, Instagram, Twitter, Mail, MessageSquare, Send } from "lucide-react";
import { useState } from "react";
import { Footer } from "../components/Footer";
import { useSanityPage } from "../sanity/useSanityPage";
import { Header } from "../components/Header";
const Contact = ()=>{
    const { page } = useSanityPage("contact");
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
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [submitting, setSubmitting] = useState(false);
    const handleSubmit = (e)=>{
        e.preventDefault();
        setSubmitting(true);
        // Handle form submission
        console.log("Form submitted:", formData);
        setTimeout(()=>{
            setSubmitting(false);
        }, 2000);
    };
    const socialLinks = [
        {
            icon: Youtube,
            name: "YouTube",
            handle: "@byteoftaste",
            followers: "2M subscribers",
            color: "from-red-500 to-red-600"
        },
        {
            icon: Instagram,
            name: "Instagram",
            handle: "@byteoftaste",
            followers: "500K followers",
            color: "from-pink-500 to-purple-600"
        },
        {
            icon: Twitter,
            name: "Twitter",
            handle: "@byteoftaste",
            followers: "250K followers",
            color: "from-blue-400 to-blue-600"
        }
    ];
    const contactReasons = [
        "Partnership & Collaboration Opportunities",
        "Press & Media Inquiries",
        "Technical Questions About Our AI Workflow",
        "Recipe Suggestions",
        "General Feedback"
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
                        className: "absolute top-20 left-20 w-96 h-96 bg-red-200 rounded-full blur-3xl opacity-20"
                    }),
                    /*#__PURE__*/ _jsxs("div", {
                        className: "container mx-auto relative z-10 text-center",
                        children: [
                            /*#__PURE__*/ _jsx("h1", {
                                className: "text-6xl md:text-7xl font-bold mb-6 leading-tight",
                                children: /*#__PURE__*/ _jsx("span", {
                                    className: "bg-gradient-to-r from-gray-900 via-red-900 to-gray-900 bg-clip-text text-transparent",
                                    children: "Get in Touch"
                                })
                            }),
                            /*#__PURE__*/ _jsx("p", {
                                className: "text-xl text-gray-600 max-w-3xl mx-auto",
                                children: "Have questions about our AI production process? Want to collaborate? We'd love to hear from you."
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
                        className: "grid lg:grid-cols-2 gap-16",
                        children: [
                            /*#__PURE__*/ _jsxs("div", {
                                children: [
                                    /*#__PURE__*/ _jsx("h2", {
                                        className: "text-4xl font-bold mb-4",
                                        children: "Send Us a Message"
                                    }),
                                    /*#__PURE__*/ _jsx("p", {
                                        className: "text-gray-600 text-lg mb-8",
                                        children: "Fill out the form below and we'll get back to you within 24-48 hours."
                                    }),
                                    /*#__PURE__*/ _jsxs("form", {
                                        onSubmit: handleSubmit,
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
                                                        value: formData.name,
                                                        onChange: (e)=>setFormData({
                                                                ...formData,
                                                                name: e.target.value
                                                            }),
                                                        className: "h-12 border-2 border-gray-200 focus:border-red-400 rounded-xl",
                                                        required: true
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ _jsxs("div", {
                                                children: [
                                                    /*#__PURE__*/ _jsx("label", {
                                                        className: "block text-sm font-semibold text-gray-700 mb-2",
                                                        children: "Email Address"
                                                    }),
                                                    /*#__PURE__*/ _jsx(Input, {
                                                        type: "email",
                                                        placeholder: "john@example.com",
                                                        value: formData.email,
                                                        onChange: (e)=>setFormData({
                                                                ...formData,
                                                                email: e.target.value
                                                            }),
                                                        className: "h-12 border-2 border-gray-200 focus:border-red-400 rounded-xl",
                                                        required: true
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ _jsxs("div", {
                                                children: [
                                                    /*#__PURE__*/ _jsx("label", {
                                                        className: "block text-sm font-semibold text-gray-700 mb-2",
                                                        children: "Subject"
                                                    }),
                                                    /*#__PURE__*/ _jsx(Input, {
                                                        type: "text",
                                                        placeholder: "What's this about?",
                                                        value: formData.subject,
                                                        onChange: (e)=>setFormData({
                                                                ...formData,
                                                                subject: e.target.value
                                                            }),
                                                        className: "h-12 border-2 border-gray-200 focus:border-red-400 rounded-xl",
                                                        required: true
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ _jsxs("div", {
                                                children: [
                                                    /*#__PURE__*/ _jsx("label", {
                                                        className: "block text-sm font-semibold text-gray-700 mb-2",
                                                        children: "Message"
                                                    }),
                                                    /*#__PURE__*/ _jsx(Textarea, {
                                                        placeholder: "Tell us more...",
                                                        value: formData.message,
                                                        onChange: (e)=>setFormData({
                                                                ...formData,
                                                                message: e.target.value
                                                            }),
                                                        className: "min-h-[150px] border-2 border-gray-200 focus:border-red-400 rounded-xl",
                                                        required: true
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ _jsxs(Button, {
                                                type: "submit",
                                                size: "lg",
                                                disabled: submitting,
                                                className: "w-full h-14 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed",
                                                children: [
                                                    /*#__PURE__*/ _jsx(Send, {
                                                        className: "mr-2 h-5 w-5"
                                                    }),
                                                    submitting ? "Sending..." : "Send Message"
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ _jsxs("div", {
                                className: "space-y-8",
                                children: [
                                    /*#__PURE__*/ _jsxs(Card, {
                                        className: "p-8 border-0 shadow-lg bg-white",
                                        children: [
                                            /*#__PURE__*/ _jsxs("div", {
                                                className: "flex items-center gap-3 mb-6",
                                                children: [
                                                    /*#__PURE__*/ _jsx("div", {
                                                        className: "w-12 h-12 bg-gradient-to-br from-brand-400 to-brand-600 rounded-xl flex items-center justify-center",
                                                        children: /*#__PURE__*/ _jsx(MessageSquare, {
                                                            className: "h-6 w-6 text-white"
                                                        })
                                                    }),
                                                    /*#__PURE__*/ _jsx("h3", {
                                                        className: "text-2xl font-bold",
                                                        children: "What can we help with?"
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ _jsx("ul", {
                                                className: "space-y-3",
                                                children: contactReasons.map((reason, index)=>/*#__PURE__*/ _jsxs("li", {
                                                        className: "flex items-start gap-2",
                                                        children: [
                                                            /*#__PURE__*/ _jsx("span", {
                                                                className: "text-brand-500 mt-1",
                                                                children: "•"
                                                            }),
                                                            /*#__PURE__*/ _jsx("span", {
                                                                className: "text-gray-700",
                                                                children: reason
                                                            })
                                                        ]
                                                    }, index))
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ _jsxs(Card, {
                                        className: "p-8 border-0 shadow-lg bg-gradient-to-br from-brand-50 to-white",
                                        children: [
                                            /*#__PURE__*/ _jsxs("div", {
                                                className: "flex items-center gap-3 mb-4",
                                                children: [
                                                    /*#__PURE__*/ _jsx("div", {
                                                        className: "w-12 h-12 bg-gradient-to-br from-brand-400 to-brand-600 rounded-xl flex items-center justify-center",
                                                        children: /*#__PURE__*/ _jsx(Mail, {
                                                            className: "h-6 w-6 text-white"
                                                        })
                                                    }),
                                                    /*#__PURE__*/ _jsxs("div", {
                                                        children: [
                                                            /*#__PURE__*/ _jsx("h3", {
                                                                className: "text-xl font-bold",
                                                                children: "Email Us Directly"
                                                            }),
                                                            /*#__PURE__*/ _jsx("p", {
                                                                className: "text-gray-600",
                                                                children: "For urgent inquiries"
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ _jsx("a", {
                                                href: "mailto:hello@byteoftaste.com",
                                                className: "text-brand-600 font-semibold text-lg hover:text-brand-700",
                                                children: "hello@byteoftaste.com"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ _jsxs("div", {
                                        children: [
                                            /*#__PURE__*/ _jsx("h3", {
                                                className: "text-2xl font-bold mb-6",
                                                children: "Connect With Us"
                                            }),
                                            /*#__PURE__*/ _jsx("div", {
                                                className: "space-y-4",
                                                children: socialLinks.map((social, index)=>/*#__PURE__*/ _jsx(Card, {
                                                        className: "p-6 border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer bg-white group",
                                                        children: /*#__PURE__*/ _jsxs("div", {
                                                            className: "flex items-center gap-4",
                                                            children: [
                                                                /*#__PURE__*/ _jsx("div", {
                                                                    className: `w-14 h-14 bg-gradient-to-br ${social.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`,
                                                                    children: /*#__PURE__*/ _jsx(social.icon, {
                                                                        className: "h-7 w-7 text-white"
                                                                    })
                                                                }),
                                                                /*#__PURE__*/ _jsxs("div", {
                                                                    className: "flex-1",
                                                                    children: [
                                                                        /*#__PURE__*/ _jsx("h4", {
                                                                            className: "font-bold text-lg",
                                                                            children: social.name
                                                                        }),
                                                                        /*#__PURE__*/ _jsx("p", {
                                                                            className: "text-gray-600",
                                                                            children: social.handle
                                                                        }),
                                                                        /*#__PURE__*/ _jsx("p", {
                                                                            className: "text-sm text-gray-500",
                                                                            children: social.followers
                                                                        })
                                                                    ]
                                                                })
                                                            ]
                                                        })
                                                    }, index))
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                })
            }),
            /*#__PURE__*/ _jsx("section", {
                className: "py-20 px-4 bg-gradient-to-br from-gray-900 to-gray-800 text-white",
                children: /*#__PURE__*/ _jsxs("div", {
                    className: "container mx-auto text-center",
                    children: [
                        /*#__PURE__*/ _jsx("h2", {
                            className: "text-4xl md:text-5xl font-bold mb-6",
                            children: "Prefer Social Media?"
                        }),
                        /*#__PURE__*/ _jsx("p", {
                            className: "text-xl text-gray-300 mb-8 max-w-2xl mx-auto",
                            children: "Follow us on your favorite platform and send us a DM. We're active and responsive across all channels."
                        }),
                        /*#__PURE__*/ _jsxs("div", {
                            className: "flex flex-wrap justify-center gap-4",
                            children: [
                                /*#__PURE__*/ _jsxs(Button, {
                                    size: "lg",
                                    className: "bg-white text-gray-900 hover:bg-gray-100 rounded-xl px-8 py-6",
                                    children: [
                                        /*#__PURE__*/ _jsx(Youtube, {
                                            className: "mr-2 h-5 w-5"
                                        }),
                                        "YouTube"
                                    ]
                                }),
                                /*#__PURE__*/ _jsxs(Button, {
                                    size: "lg",
                                    className: "bg-white text-gray-900 hover:bg-gray-100 rounded-xl px-8 py-6",
                                    children: [
                                        /*#__PURE__*/ _jsx(Instagram, {
                                            className: "mr-2 h-5 w-5"
                                        }),
                                        "Instagram"
                                    ]
                                }),
                                /*#__PURE__*/ _jsxs(Button, {
                                    size: "lg",
                                    className: "bg-white text-gray-900 hover:bg-gray-100 rounded-xl px-8 py-6",
                                    children: [
                                        /*#__PURE__*/ _jsx(Twitter, {
                                            className: "mr-2 h-5 w-5"
                                        }),
                                        "Twitter"
                                    ]
                                })
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ _jsx(Footer, {})
        ]
    });
};
export default Contact;


