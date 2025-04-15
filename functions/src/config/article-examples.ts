/* eslint-disable no-tabs */
/* eslint-disable no-irregular-whitespace */
/* eslint-disable max-len */
export const articleExamples = [
  {
    slug: "vibe-coding-with-gpt-4_1",
    title: "GPT-4.1をCursorのAgent Modeで使ってみる",
    content: `
OpenAIがGPT-4.1をリリースし、すぐさまCursorは「肌感を掴んでもらうために当面は無料で提供します」と利用可能のモデルにこれを追加しました。([Xのポスト](https://x.com/cursor_ai/status/1911835651810738406)を参照)

[OpenAIの発表](https://openai.com/index/gpt-4-1/)によると、コーディング能力が向上したり長文コンテキストの処理能力や理解力が改善したということです。さっそくCursorで触ってみます。

# Vibe codingやるぞ

## 対話1: とりあえず作り切らせる

ごく簡単なCRUDを持つアプリケーションを要求します。今回作るのは旅行とかで作成する持ち物リストを管理するためのアプリケーションです。

以下のプロンプトから開始します。

\`\`\`txt title="プロンプト"
旅行の持ち物リストを管理するアプリケーションを作ってみて。とりあえず最後まで作り切ってみて。

- ログイン機能は不要
- ユーザーは持ち物の追加、削除、編集ができる
- データは永続化されるが、デモアプリなので簡易的な手段を選択して良い（SQLiteなど）
- テンプレートを追加できる（財布など行き先に関係なく必ず持っていくようなものをまとめることができる）
- カバンに入れたかどうかの状態をcheckboxで管理できる
- おしゃれでモダンなUI
\`\`\`

で、特に躓くことなくここまではコーディングしてくれました。

![[Screenshot 2025-04-15 at 5.03.21.png]]
バックエンドはexpress, sqlite3、フロントエンドはvite, typescript, react, emotion, muiというスタックを選択したようです。

\`npm create vite@latest . -- --template react-ts\` でプロジェクトを開始した際に作成された \`index.css\` により color-schema が dark になっており、そのせいで見づらいようです。

しかしちゃんとデータの永続化はできていますね。（画像の入力値はこちらで入れたもの）

\`\`\`txt title="プロンプト"
> すべてのテーブルの中身を標準出力して

全テーブル（items, templates, template_items）の中身は以下の通りです。

---

### items テーブル

| id | name | packed |
|----|-----------|--------|
| 3 | test | 0 |
| 4 | hogehoge | 0 |

### templates テーブル

| id | name |
|----|----------------|
| 1 | testとhogehoge |

### template_items テーブル

| template_id | name | packed |
|-------------|-----------|--------|
| 1 | test | 0 |
| 1 | hogehoge | 0 |

\`\`\`

## 対話2: ブラッシュアップする

\`\`\`txt title="プロンプト"
ちゃんと動いているようです。以下についてブラッシュアップしてください。

- create viteしたときに生成された余計なファイルが残っています
	- 不要なものは消してください
	- 特に、index.cssが影響して、OSがダークモードのユーザーは視認性がとても悪いです
- UIがダサすぎるのでもっとモダンなwebサービスっぽくして
- タイトルをもっといい感じに考えて
\`\`\`

結果が以下の通り。割と良いのではないでしょうか？

![[Apr-15-2025 05-19-03.mp4]]


## 対話3: ちょっとだけ難しそうなことを言ってみる

限定的なコンテキストしか持たないのでしょうがないんですが、他のシステムに依存するとうまくいかないことが多いので、geminiのAPIを利用するように促してみます。

\`\`\`txt title="プロンプト"
backend/.env に、 GEMINI_API_KEY という命名でgeminiのAPIキーを追加しました。
これで、行き先と泊数を入力したら、持ち物リストを提案してくれて、それを編集して適用できるような機能を追加してください。
\`\`\`

結果は以下。404が帰ってきています。エラーハンドリングはしているようですが、エラーの詳細が標準出力されるようになっていないです。しょうがないのでエラー内容を送信してデバッグを試みます。
![[Screenshot 2025-04-15 at 5.27.26.png]]

デバッグのやり取りは何往復もしたので載せませんが。。

流れとしては、
1. backendの必要な依存関係をインストールしていなかった
2. geminiの存在しないモデルを指定していた
3. geminiに与えるプロンプトがおかしかった

という感じでした。2の解決は結局できず、人間が修正しました。

対話3の完成形は以下のとおりです。良いのではないでしょうか。

　![[Apr-15-2025 05-57-52.mp4]]

まだClaudeやgeminiの最上位と比較してどうかは評価しきれませんが、そんなに悪くなさそうなのでちょっと使ってみようと思います。

最終形のコードベースはこちらです。

[GitHub - tachibanayu24/gpt-4.1-test](https://github.com/tachibanayu24/gpt-4.1-test)

# （おまけ）うざかったところ

今回 cursor ruleとか特に設定せずに素手でやったので、ちゃんとやれば防げるんでしょうけど。

- 人間が修正したところを何回も戻そうとする
- すぐ迷子になって \`cd: no such file or directory\`
- nodeをkillすな！


![[Screenshot 2025-04-15 at 5.33.20.png]]
`,
  },
  {
    slug: "obsidian-vault-partial-publish",
    title: "Obsidian vaultの一部のディレクトリだけをQuartzで公開する",
    content: `
何回目かわからないけどブログを作りました。

試したい技術が現れるたびにブログを作っている気がしますが、今回はちゃんと更新していけるように頑張ります。

このブログは、Obsidianのvault（保管庫 ローカルのディレクトリ）の一部のディレクトリをブログ記事として切り出してSSGで記事化し公開する構成になっているので、その説明をします。

**Quartz自体の説明はここではしません。**

# この構成のメリット

## pushごとに公開

Obsidianのノートを更新してpushするたびにデプロイjobが実行されるので公開が楽です。

## プライベートなvaultと同一リポジトリ内で独立

通常、QuartzなどのSSGでブログを作るときは、SSGリポジトリの内部にObsidianのvaultを配置することになると思います。

その場合、プライベートなvaultとは独立することになりますが、管理が面倒ですし、LLMの恩恵を受けながら記事を書きたい場合は同一のリポジトリで管理して、同じ場所でドキュメントをindex化して活用したいです。

そういったことができるようになります。

# 構成

リポジトリは2つ登場します。

- obsidian-vault
  - プライベートなObsidian vaultで普通にドキュメント管理として使う
  - \`_published\` ディレクトリ内のドキュメントのみブログ記事としてビルドして公開したい
- obsidian-blog
  - ブログのSSGやUIなどを管理する（つまりこのブログの本体）
  - ソースコードは[こちら](https://github.com/tachibanayu24/hokori-log)

アプローチは、obsidian-vaultの \`_published\` ディレクトリ内に変更があったときにGitHub Actionsでeventをdispatchしてobsidian-blog側のGitHub Actionsのトリガーにし、obdsidian-blogではobsidian-vaultをcloneしてきて \`_published\` 内のみSSGで記事を生成して公開するというものです。

ローカルでは obsidian-blog の \`content\` で obsidian-vault のシンボリックリンクを貼ればローカルでもプレビューできます。

\`\`\`mermaid
sequenceDiagram
    participant OV as obsidian-vault
    participant GA1 as GitHub Actions
    participant GB as obsidian-blog
    participant GA2 as GitHub Actions
    participant GH as GitHub Pages

    OV->>GA1: _published/に差分あり
    GA1->>GB: vault-updated event
    GB->>GA2: triggered
    GA2->>OV: クローン
    GA2->>GA2: Quartz 4でビルド
    GA2->>GH: デプロイ
\`\`\`

## Deploy用yml

これで \`_published\` に差分があったときに \`obsidian-blog\` のGAが受け取れるeventをdispatchします。

\`DISPATCH_TOKEN\` は、obsidian-blogの \`contents:read,write\` 権限を持つ personal access token(PAT)です。

\`\`\`yml title="obsidian-vault/.github/workflows/deploy.yml"
name: Trigger Blog Deploy on Published Changes

on:
  push:
    branches:
      - main
    paths:
      - '_published/**/*.md'

jobs:
  dispatch:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger deployment in obsidian-blog repo
        uses: peter-evans/repository-dispatch@v3
        with:
          token: \${{ secrets.DISPATCH_TOKEN }}
          repository: tachibanayu24/obsidian-blog
          event-type: vault-updated
\`\`\`



これで \`obsidian-vault\` から受け取ったeventをトリガーにしてデプロイを実行します。 \`obsidian-blog\` でmainブランチにpushしたときにも実行します。

\`VAULT_ACCESS_TOKEN\` は、obsidian-vaultの \`contents:read\` 権限を持つ personal access token(PAT)です。

\`\`\`yml title="obsidian-blog/.github/workflows/deploy.yml"
name: Deploy Blog

on:
  push:
    branches:
      - main

  repository_dispatch:
    types: [vault-updated] # obsidian-vaultの \`_published\` が更新されたらdispatchされる

permissions:
  contents: write

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout obsidian-blog Repo
        uses: actions/checkout@v4
        with:
          path: obsidian-blog

      - name: Checkout obsidian-vault Repo (to temp location)
        uses: actions/checkout@v4
        with:
          repository: tachibanayu24/obsidian-vault
          path: vault-temp
          token: \${{ secrets.VAULT_ACCESS_TOKEN }}

      - name: Prepare content directory
        run: mkdir -p obsidian-blog/content

      - name: Copy published content
        run: |
          if [ -d "vault-temp/_published" ] && [ "$(ls -A vault-temp/_published)" ]; then
            cp -r vault-temp/_published/* obsidian-blog/content/
          else
            echo "Warning: vault-temp/_published directory is empty or does not exist."
          fi

      # attachmentsは通常 \`_published\` には配置しないので、画像など正しく表示するためにこれもコピーする
      - name: Copy attachments to content root
        run: |
          if [ -d "vault-temp/_config/attachment" ] && [ "$(ls -A vault-temp/_config/attachment)" ]; then
            cp -r vault-temp/_config/attachment/* obsidian-blog/content/
          else
            echo "Info: vault-temp/_config/attachment directory is empty or does not exist."
          fi


      - name: Setup Node, Install, Build
        working-directory: obsidian-blog
        env:
          NODE_ENV: production
        run: |
          npm ci
          npx quartz build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: \${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./obsidian-blog/public
          cname: blog.tachibanayu24.com
\`\`\`

# おわり

これで単一vault内でプライベートな領域と公開用の領域で分けることができました。

`,
  },
];
