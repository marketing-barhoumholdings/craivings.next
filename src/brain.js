const okResponse = (data) => ({
  ok: true,
  status: 200,
  json: async () => data,
});

const emptyList = (key) => okResponse({ [key]: [] });

const brain = {
  list_recipes: async () => emptyList("recipes"),
  list_posts: async () => emptyList("posts"),
  get_coming_soon_recipes: async () => emptyList("recipes"),
  get_coming_soon_posts: async () => emptyList("posts"),
  get_recipe_categories: async () => okResponse([]),
  get_approved_testimonials: async () => okResponse([]),
  get_post_by_slug: async () => okResponse({ post: null }),
  subscribe_newsletter: async () => okResponse({ success: true }),
};

export default brain;
