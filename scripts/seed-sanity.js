/* eslint-disable no-console */
const { createClient } = require("@sanity/client");

require("dotenv").config({ path: ".env.local" });
require("dotenv").config();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
  console.error("Missing env: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-02-20",
  token,
  useCdn: false
});

const now = new Date().toISOString();

const docs = [
  {
    _id: "author-dr-hafiz-waqas",
    _type: "author",
    name: "Dr. Hafiz Waqas",
    slug: { _type: "slug", current: "dr-hafiz-waqas" }
  },
  {
    _id: "category-sustainability",
    _type: "category",
    name: "Sustainability",
    slug: { _type: "slug", current: "sustainability" }
  },
  {
    _id: "post-from-tee-to-sea",
    _type: "post",
    title: "From Tee to Sea: The Timeline for Biodegradable Golf Balls to Dissolve",
    slug: { _type: "slug", current: "from-tee-to-sea-biodegradable-golf-balls-dissolve-timeline" },
    excerpt:
      "Discover what happens to biodegradable golf balls after they land in water. Learn the real dissolution timeline, environmental impact, and how eco golf balls safely break down in nature.",
    content:
      "Picture this — you’re standing on the dock after a long summer afternoon, club in hand, sun dipping low. You line up your shot over the water, take a smooth swing, and watch the ball arc perfectly… before splashing into the lake.\n\nIf it’s a conventional golf ball, you know it's going to sit there for decades — maybe centuries. But if it’s a biodegradable golf ball, the story’s different.\n\nThis is sample seeded content. Replace it with your full article.",
    featuredImageAlt: "Biodegradable golf ball dissolving in water after landing in a lake or ocean",
    author: { _type: "reference", _ref: "author-dr-hafiz-waqas" },
    categories: [{ _type: "reference", _ref: "category-sustainability" }],
    publishedAt: now,
    updatedAt: now,
    readingTime: 8,
    seo: {
      metaTitle: "How Long Do Biodegradable Golf Balls Take to Dissolve? | PlayGreenly Eco Golf",
      metaDescription:
        "Discover how biodegradable golf balls dissolve in lakes, oceans, and backyards. Learn PlayGreenly’s 2-week eco timeline and why dissolvable golf balls are safe, non-toxic, and perfect for guilt-free play.",
      keywords: ["biodegradable golf balls", "dissolvable golf balls", "eco golf balls"],
      metaRobots: "index, follow",
      canonicalUrl: "https://playgreenly.com/blog/from-tee-to-sea",
      includeInSitemap: true,
      enableArticleSchema: true,
      enableFaqSchema: false
    }
  },
  {
    _id: "page-home",
    _type: "page",
    title: "Home",
    slug: { _type: "slug", current: "home" },
    seo: {
      metaTitle: "Craivings | Home",
      metaDescription: "Welcome to Craivings."
    }
  },
  {
    _id: "page-about",
    _type: "page",
    title: "About",
    slug: { _type: "slug", current: "about" },
    seo: {
      metaTitle: "About | Craivings",
      metaDescription: "Learn more about Craivings."
    }
  },
  {
    _id: "page-contact",
    _type: "page",
    title: "Contact",
    slug: { _type: "slug", current: "contact" },
    seo: {
      metaTitle: "Contact | Craivings",
      metaDescription: "Get in touch with Craivings."
    }
  }
];

async function seed() {
  for (const doc of docs) {
    await client.createOrReplace(doc);
    console.log(`Seeded ${doc._type}: ${doc._id}`);
  }
}

seed()
  .then(() => {
    console.log("Seeding complete.");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
