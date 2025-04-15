import {onSchedule} from "firebase-functions/v2/scheduler";
import * as logger from "firebase-functions/logger";
import {fetchArticle} from "./functions/fetch-article";
import {TARGET_FEEDS, DURATION_MINUTES} from "./config/constants";
import {generateArticleFlow} from "./functions/generate-article";
import {composeObsidianArticle} from "./functions/compose-obsidian-article";
import {pushToObsidianVault} from "./functions/push-to-obsidian-vault";
import {defineSecret} from "firebase-functions/params";

const GEMINI_API_KEY = defineSecret("GEMINI_API_KEY");
const GITHUB_TOKEN = defineSecret("GITHUB_TOKEN");
const GITHUB_REPO_OWNER = defineSecret("GITHUB_REPO_OWNER");
const GITHUB_REPO_NAME = defineSecret("GITHUB_REPO_NAME");

exports.rssToBlogPublisher = onSchedule({
  schedule: `every ${DURATION_MINUTES} minutes`,
  region: "asia-northeast1",
  timeZone: "Asia/Tokyo",
  secrets: [GEMINI_API_KEY, GITHUB_TOKEN, GITHUB_REPO_OWNER, GITHUB_REPO_NAME],
}, async () => {
  logger.info("fetching articles");
  const articles = await fetchArticle(TARGET_FEEDS);
  logger.info(`fetched ${articles.length} articles`);

  if (articles.length === 0) {
    logger.info("no articles found");
    return;
  }

  const blogArticle = await generateArticleFlow(articles);
  logger.info(blogArticle);

  const obsidianArticle = composeObsidianArticle(blogArticle);
  logger.info(obsidianArticle);

  await pushToObsidianVault(obsidianArticle);
  return;
});


// const TAGS = ["自動投稿", "LLM"];
