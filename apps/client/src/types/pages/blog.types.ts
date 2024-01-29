export interface ContentSection {
  heading: string;
  content: string;
}

export interface Post {
  slug: string;
  title?: string;
  createdAt?: string;
  updatedAt?: string;
  category?: string;
  recipeUIDs?: string[];
  contentSections?: ContentSection[];
  id?: string;
  img?: string;
  excerpt?: string;
}
