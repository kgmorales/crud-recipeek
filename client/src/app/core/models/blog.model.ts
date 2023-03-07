export interface BlogPost {
  created: string;
  published: string;
  url: string;
  slug: string;
  featured_image: string;
  featured_image_alt: string;
  author: {
    first_name: string;
    last_name: string;
    email: string;
    slug: string;
    bio: string;
    title: string;
    linkedin_url: string;
    facebook_url: string;
    instagram_url: string;
    pinterest_url: string;
    twitter_handle: string;
    profile_image: string;
  };
  tags: [
    {
      name: string;
      slug: string;
    }
  ];
  categories: [
    {
      name: string;
      slug: string;
    }
  ];
  title: string;
  body: string;
  summary: string;
  seo_title: string;
  meta_description: string;
  status: 'published' | 'draft';
}

interface BlogPostShortMeta {
  slug: string;
  title: string;
  featured_image: string;
}

export interface BlogPostMeta {
  next_post: BlogPostShortMeta;
  previous_post: BlogPostShortMeta;
}

export interface PostsData {
  data: BlogPost[];
  meta: {
    count: number;
    next_page: number | null;
    previous_page: number | null;
  };
}
