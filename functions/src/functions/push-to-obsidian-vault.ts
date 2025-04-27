import { logger } from "firebase-functions/v2";
import { ArticleFileType } from "../types";

/**
 * 記事を指定されたGitHubリポジトリの指定パスにpushする
 * pathは `_published/news/${filename}`
 * commit messageは `[bot投稿🤖] ${filename}`
 * @param article { filename: string, body: string } 形式の記事データ
 * @throws Error GitHubへのPushに失敗した場合
 */
export const pushToObsidianVault = async (
  article: ArticleFileType,
  githubToken: string,
  githubRepoOwner: string,
  githubRepoName: string
): Promise<void> => {
  const { Octokit } = await import("@octokit/rest");
  const { filename, body } = article;

  const octokit = new Octokit({ auth: githubToken });

  if (!octokit) {
    logger.error(
      "Octokit client is not initialized. Cannot push to GitHub. Check GITHUB_TOKEN."
    );
    throw new Error("GitHub client is not initialized. Missing GITHUB_TOKEN.");
  }

  const owner = githubRepoOwner;
  const repo = githubRepoName;

  if (!owner || !repo) {
    throw new Error("GitHub repository configuration is missing.");
  }

  const filePath = `_published/news/${filename}`;
  const commitMessage = `[bot投稿🤖] ${filename}`;

  logger.info(
    `Attempting to push file to GitHub: ${owner}/${repo}/${filePath}`
  );

  try {
    const contentEncoded = Buffer.from(body, "utf-8").toString("base64");

    // https://docs.github.com/ja/rest/repos/contents#create-or-update-file-contents
    const response = await octokit.repos.createOrUpdateFileContents({
      owner: owner,
      repo: repo,
      path: filePath,
      message: commitMessage,
      content: contentEncoded,
      branch: "main",
    });

    logger.info(
      `Successfully pushed file to GitHub. Commit SHA: ${response.data.commit.sha}`,
      { path: filePath }
    );
  } catch (error) {
    logger.error(
      `Failed to push file "${filePath}" to GitHub repository ${owner}/${repo}`
    );
    throw error;
  }
};
