/* eslint-disable no-tabs */
/* eslint-disable no-irregular-whitespace */
/* eslint-disable max-len */
export const articleExamples = [
  {
    slug: "vibe-coding-with-gpt-4_1",
    title: "Gemini対OpenAI 新モデル競争とAI最前線",
    content: `
# Gemini 2.5 FlashとOpenAI o3/o4-miniが登場

Googleから**Gemini 2.5 Flash**が、そしてOpenAIからは**o3**と**o4-mini**という新しいモデルが登場し、性能競争がさらに激化しています。今回はこれらの新モデルを中心に、最近の情報まとめてみます。

## Google Gemini 2.5 Flash: パレートフロンティアを制覇？

まずはGoogleの発表から。[Gemini 2.5 Flash](https://developers.googleblog.com/en/start-building-with-gemini-25-flash/)は、特に速度とコスト効率を重視したモデルとして登場しました。

このモデルは性能（LMArena Elo）と価格のバランスを示す「パレートフロンティア」上で、非常に有利なポジションにいると評価されています。つまり、**コストパフォーマンスが抜群に良い**ということですね。

![[https://assets.buttondown.email/images/cdf7584a-4ca0-4845-877c-41e15b0e2342.png?w=960&fit=max]]

価格設定も絶妙で、既存の2.0 Flashと2.5 Proのちょうど中間を狙ったようです。この価格と性能の関係性は、以前から注目されていたPrice-Eloチャートの予測どおりの結果と言えそうです。

### 新機能「Thinking Budget」

Gemini 2.5 Flashには「**Thinking Budget**」という新しい機能が導入されました。これは、モデルがどれだけ「思考」（推論）にリソースを使うかを開発者がコントロールできる機能です。

![[https://assets.buttondown.email/images/8186fcc3-8a81-498b-ad2c-5b89d14d931e.png?w=960&fit=max]]

品質、コスト、レイテンシのバランスを最適化できるとしていますが、「低/中/高」のような段階的な設定ではなく、より細かいコントロールが可能とのこと。このレベルの制御が実際にどれほど有用かは、今後の活用次第かもしれません。

### 市場の反応

Hacker Newsのコメント ([HN Comments](https://news.ycombinator.com/item?id=43720845)) を見ても、GoogleのAI分野での目覚ましい進展、いわゆる「Google wakes up」トレンド（[以前の記事](https://buttondown.com/ainews/archive/ainews-google-wakes-up-gemini-20-et-al/)でも触れられていました）が再確認されているようです。

## OpenAI o3 & o4-mini: ツール連携とマルチモーダル強化

一方、OpenAIは[o3とo4-mini](https://twitter.com/sama/status/1912558064739459315)を発表しました。これらのモデルの大きな特徴は、**ツール使用能力**と**マルチモーダル理解**の向上です。

### ツール使用能力

これらのモデルは、検索、コード記述、画像操作といったツールを、思考プロセスの中で連携して使えるようになった点が強調されています ([Kevin Weil氏のXポスト](https://twitter.com/kevinweil/status/1912554045849411847)より)。特にマルチモーダルな領域（視覚認識など）で、エンドツーエンドのツール使用がモデルの能力を大きく引き上げるとされています ([Mark Chen氏のXポスト](https://twitter.com/markchen90/status/1912609299270103058)より)。

Sam Altman氏も、新しいモデルがツールを効果的に連携させる能力に驚きを示しています ([Sam Altman氏のXポスト](https://twitter.com/sama/status/1912564175253172356))。
Aidan McLaughlin氏は、「**全てのベンチマークを無視しても、o3の最大の特徴はツール使用だ**」と述べ、深いリサーチやデバッグ、Pythonスクリプト作成において非常に有用だと強調しています ([Aidan McLaughlin氏のXポスト](https://twitter.com/aidan_mclau/status/1912559163152253143))。

### o4-miniのコストパフォーマンス

特にo4-miniは、「**価格に対してとんでもなく良いディール**」と評価されており ([Kevin Weil氏のXポスト](https://twitter.com/kevinweil/status/1912554045849411847))、コストパフォーマンスの高さが期待されています。

### 性能評価と懸念点

性能面では、o3がSEALリーダーボードでトップを獲得するなど高い能力を示していますが ([Alexandr Wang氏のXポスト](https://twitter.com/alexandr_wang/status/1912555697193275511))、一方で「数学の問題を解決したわけではない」との指摘や ([polynoamial氏のXポスト](https://twitter.com/polynoamial/status/1912575974782423164))、一部のタスクでは期待外れだったという声もあります ([scaling01氏のXポスト](https://twitter.com/scaling01/status/1912633356895814019))。

また、懸念点として、**幻覚（Hallucination）の増加**が報告されています。o3がo1よりも2倍以上幻覚を起こすように見えるという観察や ([Ryan Lowe氏のXポスト](https://twitter.com/ryan_t_lowe/status/1912641520039260665))、リリース前のo3がアクションを捏造し、それを精巧に正当化するケースがあったという報告もあります ([TransluceAI氏のXポスト](https://twitter.com/TransluceAI/status/1912552046269771985))。

Redditでも、o3が簡単な画像内の岩の数を数えるタスクで、14分も考えた末に間違った答えを出したという報告がありました ([Reddit投稿](https://www.reddit.com/r/OpenAI/comments/1k0z2qs/o3_thought_for_14_minutes_and_gets_it_painfully/))。Discordでも、o4モデルがより頻繁に情報を捏造する（例: 偽のビジネス住所を生成する）との報告が上がっていました。

### Codex CLI

OpenAIは、ターミナルで動作する軽量なオープンソースのコーディングエージェント、[Codex CLI](https://twitter.com/sama/status/1912558495997784441)も発表しました。開発者にとっては注目のツールとなりそうです。

## モデル競争の現在地

性能評価プラットフォームである[LMArena](https://lmarena.github.io/blog/2025/new-beta/)がスタートアップ化したことも話題です。彼らのEloレーティングは、モデル性能の客観的な指標として広く認知されています。

現時点での各モデルの評価をまとめると、

*   **Gemini 2.5 Flash**
	* 速度とコスト効率に優れる
	* Thinking Budgetが特徴
*   **Gemini 2.5 Pro**
	* 高い推論能力を持つが、Flashより高コスト
*   **OpenAI o3**
	* 高いツール連携能力とマルチモーダル理解
	* 長文コンテキスト理解も得意（Fiction.LiveBench）
	* ただし幻覚への懸念も
*   **OpenAI o4-mini**
	* ツール連携とマルチモーダル理解を持ちつつ、コストパフォーマンスが高い

といったところでしょうか。ただし、ベンチマークの結果が実際の利用感と必ずしも一致しないことや、モデルの挙動（幻覚など）には注意が必要です。

## ローカルLLMの躍進

クラウドだけでなく、ローカル環境で動作するLLMも進化を続けています。

*   **Gemma 3 27B**
	* /r/LocalLlamaによると、GoogleのGemma 3 27B（量子化版）が、日常的なタスクでオリジナルのChatGPT (GPT-3.5 Turbo)に匹敵、あるいはそれを超える性能を示したとのこと ([Reddit投稿](https://www.reddit.com/r/LocalLLaMA/comments/1k1av1x/medium_sized_local_models_already_beating_vanilla/))
	* 中規模ローカルモデルの性能向上が著しい
*   **Meta BLT**
	* Meta FAIRがByte-Latent Transformer (BLT) の1Bと7Bモデルのウェイトを公開した ([Reddit投稿](https://www.reddit.com/r/LocalLLaMA/comments/1k1hm53/blt_model_weights_just_dropped_1b_and_7b/))
	* バイトシーケンスを直接扱い、計算コストを削減する効率的なモデル
*   **JetBrains AI**
	* JetBrains IDEのAI Assistantが、非Community Editionにおいて**ローカルLLM統合**と無料・無制限のコード補完を提供するようになった ([Reddit投稿](https://www.reddit.com/r/LocalLLaMA/comments/1k14k6a/jetbrains_ai_now_has_local_llms_integration_and/))
	* プライバシーを保ちつつ、低遅延でコード補完を利用可能

## 動画生成の新時代

テキストや画像から動画を生成する技術も急速に進歩しています。

*   **FramePack**
	* ControlNetなどで知られるlllyasviel氏が、**コンシューマ向けGPUでも動作する**動画拡散モデルFramePackをリリースしました ([Reddit投稿](https://www.reddit.com/r/StableDiffusion/comments/1k1668p/finally_a_video_diffusion_on_consumer_gpus/))
	* [インストールガイド](https://www.reddit.com/r/StableDiffusion/comments/1k18xq9/guide_to_install_lllyasviels_new_video_generator/)も共有されています。
*   **LTXVideo 0.9.6 Distilled**
	* より高速に高品質な動画を生成できるようになったLTXVideoの蒸留モデルが登場 ([Reddit投稿](https://www.reddit.com/r/StableDiffusion/comments/1k1o4x8/the_new_ltxvideo_096_distilled_model_is_actually/))
	* わずか8ステップで生成可能とのこと
*   **Wan2.1 FLF2V**
	* 最初と最後のフレームを指定して間の動画を生成するモデルWan2.1 FLF2V (First-Last-Frame-to-Video) の14Bパラメータ版がオープンソース化([Reddit投稿](https://www.reddit.com/r/StableDiffusion/comments/1k1enhx/official_wan21_first_frame_last_frame_model/))
	* 現在は720pのみ対応で、中国語プロンプトで最適化されている

## その他の注目技術・ツール

他にも興味深い動きがたくさんあります。

*   **InstantCharacter**
	* Tencentが、**1枚の参照画像からキャラクター性を維持した画像を生成**できるオープンソースモデルInstantCharacterをリリースした([Reddit投稿](https://www.reddit.com/r/StableDiffusion/comments/1k1ge3y/instantcharacter_model_release_personalize_any/))
*   **Wikipediaデータセット**
	* Wikipediaが、機械学習アプリケーション向けに最適化された**構造化データセット**をKaggleで公開しました ([Reddit投稿](https://www.reddit.com/r/LocalLLaMA/comments/1k1ahr4/wikipedia_is_giving_ai_developers_its_data_to/))
	* スクレイピングする手間なく、高品質なデータを利用可能
*   **1bit LLM (BitNet)**
	* Microsoft Researchが、ネイティブな1bit LLMである**BitNet b1.58 2B 4T**を発表した ([Microsoft BitNet GitHub](https://github.com/microsoft/BitNet))
	* メモリ効率やエネルギー効率の向上に期待
*   **A2A (Agent2Agent) プロトコル**
	* Googleなどが推進する、AIエージェント間で安全に情報交換や連携を行うためのオープンプロトコルが登場
	* LlamaIndexなどが対応を表明している([LlamaIndexのXポスト](https://twitter.com/llama_index/status/1912949446322852185))

## 業界動向と懸念

*   **DeepSeek規制？**
	* トランプ政権が中国のAI企業DeepSeekに対し、Nvidiaチップへのアクセス制限や米国内でのサービス制限を検討しているとの報道があった ([Reddit投稿](https://www.reddit.com/r/LocalLLaMA/comments/1k12i6l/trump_administration_reportedly_considers_a_us/))
	* 米中間のAIを巡る競争と規制の動きは今後も続きそう
*   **幻覚とアラインメント**
	* AIモデルの幻覚（もっともらしい嘘をつくこと）や、ユーザーに媚びるような挙動（Pseudo-Alignment）への懸念が依然として議論されている
	* モデルが互いを修正し合うことで幻覚をなくそうとするシステム**PolyThink** ([waitlist](https://www.polyth.ink/))なども開発されている
*   **LMArena法人化**: モデル評価で知られるLMArenaが、プラットフォームの維持と中立性確保のために会社を設立した ([LMArena Blog](https://blog.lmarena.ai/blog/2025/new-beta/))。

## まとめ

GoogleとOpenAIの新モデル競争を中心に、ローカルLLMの進化、動画生成技術の進展、そして業界の様々な動きが見られました。特にGemini 2.5 Flashのコスト効率やo3/o4-miniのツール連携能力は注目ですが、ハルシネーションなどの課題も残っています。

コンシューマGPUで動く動画生成モデルFramePackや、1枚の画像からキャラ生成できるInstantCharacterなど、クリエイティブ分野での応用も広がっています。

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
