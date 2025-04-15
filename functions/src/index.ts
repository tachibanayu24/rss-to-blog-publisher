import {onSchedule} from "firebase-functions/v2/scheduler";
import * as logger from "firebase-functions/logger";
import {fetchArticle} from "./functions/fetch-article";
import {TARGET_FEEDS, DURATION_MINUTES} from "./config/constants";
import {generateArticleFlow} from "./functions/generate-article";
import {composeObsidianArticle} from "./functions/compose-obsidian-article";
import {pushToObsidianVault} from "./functions/push-to-obsidian-vault";

exports.rssToBlogPublisher = onSchedule(`every ${DURATION_MINUTES} minutes`, async (_event) => {
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
