import { TARGET_FEEDS, DURATION_MINUTES } from "../config/constants";
import { Readability } from "@mozilla/readability";
import Parser from "rss-parser";
import * as JSDOM from "jsdom";
import { RSSArticleType } from "../types";
import { logger } from "firebase-functions";

// pubDateをUTCとしてパースし、失敗時は0を返す
const parsePubDateAsUtc = (pubDate: string): number => {
  const hasTz = /(?:Z|[+-]\d{2}:?\d{2}|GMT|UTC)/i.test(pubDate);
  const dateStr = hasTz ? pubDate : `${pubDate} UTC`;
  const t = Date.parse(dateStr);
  return isNaN(t) ? 0 : t;
};

/**
 * 1. target-feedのすべてのRSSをみて、最新の記事のURLを得る
 * 2. 取得した記事のURLからreadabilityで記事の内容を取得する
 * 3. 記事の内容を返す
 * @param targetFeeds 取得対象のRSSフィード
 */
export const fetchArticle = async (
  targetFeeds: typeof TARGET_FEEDS
): Promise<RSSArticleType[]> => {
  try {
    const parser = new Parser();
    const articles: RSSArticleType[] = [];

    logger.info(new Date());

    for (const feed of targetFeeds) {
      const feedContent = await parser.parseURL(feed.feedUrl);
      logger.info(feedContent.items[0].pubDate);

      if (feedContent.items && feedContent.items.length > 0) {
        const recentArticles = feedContent.items.filter((item) => {
          const pubDate = item.pubDate || item.isoDate;
          if (!pubDate) return false;

          const pubTime = parsePubDateAsUtc(pubDate);
          if (!pubTime) return false;

          const diffMinutes = (Date.now() - pubTime) / (1000 * 60);
          return diffMinutes <= DURATION_MINUTES;
        });

        if (recentArticles.length > 0) {
          const latestArticle = recentArticles[0];

          if (latestArticle.link) {
            const response = await fetch(latestArticle.link);
            const html = await response.text();

            const dom = new JSDOM.JSDOM(html);
            const document = dom.window.document;

            const reader = new Readability(document);
            const article = reader.parse();

            if (article) {
              articles.push({
                feedTitle: feed.title,
                articleTitle: latestArticle.title || "無題",
                content: article.content || "",
                excerpt: article.excerpt || "",
                url: latestArticle.link,
                publishedDate:
                  latestArticle.pubDate ||
                  latestArticle.isoDate ||
                  new Date().toISOString(),
              });
            }
          }
        }
      }
    }

    return articles;
  } catch (error) {
    console.error("記事の取得中にエラーが発生しました:", error);
    throw error;
  }
};
