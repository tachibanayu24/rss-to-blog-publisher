import {TARGET_FEEDS} from "../config/constants";
import {BlogArticleType, ArticleFileType} from "../types";

export const composeObsidianArticle = (
  blogArticle: Pick<BlogArticleType, "title" | "content" | "slug">
): ArticleFileType => {
  const {title, content, slug} = blogArticle;

  // YYYYMMDDHHmmss
  const uid = (new Date()).toISOString().replace(/[-:Z]/g, "");

  // YYYY-MM-DD
  const created = (new Date()).toISOString().split("T")[0];
  const modified = (new Date()).toISOString().split("T")[0];

  const description = "";
  const permalink = "";
  const tags = ["自動生成記事", "LMM"];
  const draft = true;

  return {
    filename: `${slug}.md`,
    body: `---
uid: ${uid}
created: ${created}
modified: ${modified}
title: 【bot投稿🤖】${title}
description: ${description}
permalink: ${permalink}
tags:
  - ${tags.join("\n  - ")}
draft: ${draft}
---
> [!warning]
> この記事は、以下の情報源を参照し、LLMにより自動で生成・投稿された記事です。
> - ${TARGET_FEEDS.map((feed) => `[${feed.title}](${feed.url})\n`).join("\n  - ")}
> 内容の正確性にご注意ください。

${content}
`,
  };
};
