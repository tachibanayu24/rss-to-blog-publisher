import { TARGET_FEEDS, DURATION_MINUTES } from "../config/constants";
import { Readability } from "@mozilla/readability";
import Parser from "rss-parser";
import * as JSDOM from "jsdom";
import { RSSArticleType } from "../types";

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
    // RSSパーサーの初期化
    const parser = new Parser();
    const articles = [];

    // 各フィードを処理
    for (const feed of targetFeeds) {
      // RSSフィードを解析
      const feedContent = await parser.parseURL(feed.feedUrl);

      // 公開から15分以内の最新の記事を取得する
      // 存在しない場合は空の配列を返す
      if (feedContent.items && feedContent.items.length > 0) {
        // 15分以内に公開された記事をフィルタリング
        const recentArticles = feedContent.items.filter((item) => {
          // 公開日を取得
          const pubDate = item.pubDate || item.isoDate;
          if (!pubDate) return false;

          // 現在時刻と公開時刻の差（ミリ秒）
          const pubTime = new Date(pubDate).getTime();
          const currentTime = new Date().getTime();
          const diffMinutes = (currentTime - pubTime) / (1000 * 60);

          // 15分以内に公開された記事を対象とする
          return diffMinutes <= DURATION_MINUTES;
        });

        // 15分以内に公開された記事がある場合
        if (recentArticles.length > 0) {
          // 最も新しい記事を取得
          const latestArticle = recentArticles[0];

          // 記事のURLが存在する場合、内容を取得
          if (latestArticle.link) {
            // 記事のHTMLを取得
            const response = await fetch(latestArticle.link);
            const html = await response.text();

            // JSDOMでHTMLをパース
            const dom = new JSDOM.JSDOM(html);
            const document = dom.window.document;

            // Readabilityで記事内容を抽出
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
