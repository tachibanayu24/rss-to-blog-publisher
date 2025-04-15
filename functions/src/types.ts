export type RSSArticleType = {
  feedTitle: string;
  articleTitle: string;
  content: string;
  excerpt: string;
  url: string;
  publishedDate: string;
};

export type BlogArticleType = {
  slug: string;
  uid: string;
  created: string;
  modified: string;
  title: string;
  description: string;
  permalink: string;
  tags: string[];
  draft: boolean;
  content: string;
};

export type ArticleFileType = {
  filename: string;
  body: string;
}
