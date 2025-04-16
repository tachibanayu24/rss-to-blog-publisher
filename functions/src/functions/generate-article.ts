import googleAI, {gemini25ProExp0325} from "@genkit-ai/googleai";
import {Genkit, genkit, z} from "genkit";
import {articleExamples} from "../config/article-examples";
import {RSSArticleType} from "../types";

const inputSchema = z.array(z.object({
  feedTitle: z.string(),
  articleTitle: z.string(),
  content: z.string(),
  excerpt: z.string(),
  url: z.string(),
  publishedDate: z.string(),
}));

const outputSchema = z.object({
  title: z.string(),
  content: z.string(),
  slug: z.string(),
  // created: z.string(),
  // modified: z.string(),
  // tags: z.array(z.string()),
  // uid: z.string(),
});

const systemPrompt = `
あなたはAIニュースのブロガーです。与えられた情報を指示された形式でブログ記事にまとめてください。
以下のような構成でお願いします。

- title: 記事の内容から最も注目に値する内容をキャッチーに表現したタイトル(40文字までで（）以外の記号を利用しない)
- content: 記事の内容をmarkdownでまとめたブログ記事。必要に応じて参照先となるリンクを付ける（2000文字から4000文字程度）
- slug: 記事のURLのslug(例: openai-gpt-4-1 **20文字以内のケバブケース**)

**contentのルール**
- 基本的にはややフランクなですます調
- 感嘆符やemojiを殆ど使わない
- リストでは句点(。)を利用せず、体言止めで短文にする
  - 補足が必要な場合はこのようにインデントをつける
- YouTube動画の埋め込みは、iframeを使わずに '![[https://www.youtube.com/embed/y__VY7I0dzU]]'  のように独自記法で記述する

具体的な例として、口調や情報のまとめ方、記事の書き方は以下の事例を参考にしてください。
---
${articleExamples.map((example, i) => `
# 例${i + 1}
**slug**
${example.slug}

**title**
${example.title}

**content**
${example.content}
`).join("\n\n")}
`;

const generateArticleFlow = (ai: Genkit) => ai.defineFlow({
  name: "generate-article",
  inputSchema,
  outputSchema,
},
async (input) => {
  const prompt = ai.definePrompt({
    name: "generate-article",
    config: {},
    input: {schema: inputSchema},
    output: {schema: outputSchema},
    system: systemPrompt,
    prompt: async (input) => {
      const rssArticles = input.map((article, i) => `
# ${i + 1}つめの情報源: ${article.feedTitle}
**URL**
${article.url}
**タイトル**
${article.articleTitle}
**記事の内容**
${article.content}
**記事の公開日**
${article.publishedDate}
`);

      const message = `
以下がブログの情報源となる記事です。
${rssArticles.join("\n\n")}

これらの記事をもとに、ブログ記事を生成してください。
`;

      return message;
    },
  });

  const {output} = await prompt(input);


  if (output == null) {
    throw new Error("Response doesn't satisfy schema.");
  }

  return output;
});

export const generateArticle = async (articles: RSSArticleType[], geminiApiKey: string) => {
  const ai = genkit({
    plugins: [googleAI({apiKey: geminiApiKey})],
    model: gemini25ProExp0325,
  });

  return generateArticleFlow(ai)(articles);
};
