export type RSSArticleType = {
  feedTitle: string;
  articleTitle: string;
  content: string;
  excerpt: string;
  url: string;
  publishedDate: string;
};

export type BlogArticleType = {
  title: string;
  content: string;
  slug: string;
  created: string;
  modified: string;
  tags: string[];
  uid: string;
};
