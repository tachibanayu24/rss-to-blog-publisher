import {TARGET_FEEDS} from "../config/constants";
import {BlogArticleType, ArticleFileType} from "../types";

export const composeObsidianArticle = (
  blogArticle: Pick<BlogArticleType, "title" | "content" | "slug">
): ArticleFileType => {
  const {title, content, slug} = blogArticle;

  // 現在時刻を取得
  const now = new Date();

  // YYYYMMDDHHmmss
  const uid = now.toISOString()
    .replace(/[-:]/g, "")
    .replace("T", "")
    .replace(/\.\d+Z$/, "");

  // YYYY-MM-DD HH:mm:ss
  const created = now.toISOString().replace(/T/, " ").replace(/\.\d+Z$/, "");
  const modified = now.toISOString().replace(/T/, " ").replace(/\.\d+Z$/, "");

  const description = extractPlainText(content).replace(/\n/g, " ").slice(0, 200) + "...";

  const permalink = "";
  const tags = ["自動生成記事", "LMM"];
  const draft = false;

  return {
    filename: `${slug}.md`,
    body: `---
uid: ${uid}
created: ${created}
modified: ${modified}
title: "【bot投稿🤖】${title}"
description: "${description}"
permalink: ${permalink}
tags:
  - ${tags.join("\n  - ")}
draft: ${draft}
---
> [!warning]
> この記事は、以下の情報源を参照し、LLMにより自動で生成・投稿された記事です。
> - ${TARGET_FEEDS.map((feed) => `[${feed.title}](${feed.url})`).join("\n  - ")}
>
> 内容の正確性にご注意ください。

${content}
`,
  };
};


/**
   * マークダウンから純粋なテキストのみを抽出する
   * @param markdown マークダウンテキスト
   * @returns プレーンテキスト
   */
const extractPlainText = (markdown: string): string => {
  return markdown
  // リンクを除去 [リンクテキスト](URL) → リンクテキスト
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
  // 画像を除去 ![alt](URL) → 空文字
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
  // 見出しを除去 # 見出し → 見出し
    .replace(/^#+\s+/gm, "")
  // 強調を除去 **強調** や __強調__ → 強調
    .replace(/(\*\*|__)(.*?)(\*\*|__)/g, "$2")
  // イタリックを除去 *斜体* や _斜体_ → 斜体
    .replace(/(\*|_)(.*?)(\*|_)/g, "$2")
  // コードブロックを除去 ```code``` → code
    .replace(/```[\s\S]*?```/g, "")
  // インラインコードを除去 `code` → code
    .replace(/`([^`]+)`/g, "$1")
  // 水平線を除去 --- や *** や ___ → 空文字
    .replace(/^(---|[*]{3}|___)$/gm, "")
  // リストマーカーを除去 - リスト → リスト
    .replace(/^[\s]*[-*+]\s+/gm, "")
  // 番号付きリストを除去 1. リスト → リスト
    .replace(/^[\s]*\d+\.\s+/gm, "")
  // 引用を除去 > 引用 → 引用
    .replace(/^>\s+/gm, "")
  // 余分な空白行を除去
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};
