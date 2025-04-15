import googleAI, {gemini25ProExp0325} from "@genkit-ai/googleai";
import {genkit, z} from "genkit";

const ai = genkit({
  plugins: [googleAI({apiKey: process.env.GEMINI_API_KEY})],
  model: gemini25ProExp0325,
});

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

- title: 記事の内容から最も注目に値する内容をキャッチーに表現したタイトル
- content: 記事の内容をmarkdownでまとめたブログ記事。必要に応じて参照先となるリンクを付ける
- slug: 記事のURLのslug(例: openai-gpt-4.5 **20文字以内**)
`;

export const generateArticleFlow = ai.defineFlow({
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
