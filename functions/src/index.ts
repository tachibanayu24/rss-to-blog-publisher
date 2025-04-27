import { onSchedule } from "firebase-functions/v2/scheduler";
import * as logger from "firebase-functions/logger";
import { fetchArticle } from "./functions/fetch-article";
import { TARGET_FEEDS, DURATION_MINUTES } from "./config/constants";
import { generateArticle } from "./functions/generate-article";
import { composeObsidianArticle } from "./functions/compose-obsidian-article";
import { pushToObsidianVault } from "./functions/push-to-obsidian-vault";
import { defineSecret } from "firebase-functions/params";

const GEMINI_API_KEY = defineSecret("GEMINI_API_KEY");
const GITHUB_TOKEN = defineSecret("GITHUB_TOKEN");
const GITHUB_REPO_OWNER = defineSecret("GITHUB_REPO_OWNER");
const GITHUB_REPO_NAME = defineSecret("GITHUB_REPO_NAME");

exports.rssToBlogPublisher = onSchedule(
  {
    schedule: `every ${DURATION_MINUTES} minutes`,
    region: "asia-northeast1",
    timeZone: "Asia/Tokyo",
    timeoutSeconds: 540,
    secrets: [
      GEMINI_API_KEY,
      GITHUB_TOKEN,
      GITHUB_REPO_OWNER,
      GITHUB_REPO_NAME,
    ],
  },
  async () => {
    const GEMINI_API_KEY_VALUE = GEMINI_API_KEY.value();
    const GITHUB_TOKEN_VALUE = GITHUB_TOKEN.value();
    const GITHUB_REPO_OWNER_VALUE = GITHUB_REPO_OWNER.value();
    const GITHUB_REPO_NAME_VALUE = GITHUB_REPO_NAME.value();

    logger.info("記事を取得します");
    const articles = await fetchArticle(TARGET_FEEDS);
    logger.info(`${articles.length}件の記事を取得しました`);

    if (articles.length === 0) {
      logger.info("記事が見つかりませんでした");
      return;
    }

    logger.info(articles);

    const blogArticle = await generateArticle(articles, GEMINI_API_KEY_VALUE);
    logger.info(blogArticle);

    const obsidianArticle = composeObsidianArticle(blogArticle);
    logger.info(obsidianArticle);

    await pushToObsidianVault(
      obsidianArticle,
      GITHUB_TOKEN_VALUE,
      GITHUB_REPO_OWNER_VALUE,
      GITHUB_REPO_NAME_VALUE
    );
    return;
  }
);
