# Engineer Mode — LOG

家庭教師（Claude Code）がセッションの始めに読み、終わりに追記する。新しい記録が上。

## 現在地

- **Project 3: GitHub User Search** — Day 3 まで完了。Phase 1 はここで終わり
- **次は Phase 2（React）**。Phase 1 で作ったものを React で作り直す

## 記録

### 2026-10-28  Project 3  Day 3
- 足した仕様: プロフィールの下に公開リポジトリを5件表示（更新が新しい順、名前とスター数、0件なら `No repositories`、プロフィール取得に失敗したら出さない）
- 自力で書けた（前回書けなかったもののうち）: `unknown`・`Record` を使った型ガード（`isGithubRepo`）/ `createElement()`・`textContent`・`appendChild()` / テンプレートリテラル / `?sort=updated&per_page=5` の URL の組み立て
- 自力で書けなかった（ヒント・答えをもらった）:
  - `type` と型ガードの違い（型はコンパイル時だけで消える。型ガードは実行時に中身を確かめる）
  - リポジトリの `name`・`stargazers_count` に `| null` は要らない（型と型ガードはそろえる）
  - 2本目の `fetch` の置き場所（`if (profile)` の外、`try` の中）→ **答えをもらった**
  - 配列レスポンスの確認 `Array.isArray()` + `every(isGithubRepo)` → **答えをもらった**。`json()` に型を書くだけでは確かめたことにならない
  - アロー関数でオブジェクトを返すときは `=> ({ ... })`
  - `.js` を作るコマンド `npx tsc --watch`（`--noEmit` はチェックだけでファイルを作らない）→ **答えをもらった**
  - 何も出ないときは開発者ツールの Console を見る
- 説明できた（レビュー）: narrowing の流れ / 存在しないユーザーで2本目の `fetch` が動かない理由 / 空配列の `forEach` は1回も動かない
- 指摘: `responseRepo` と `reposData` の単数・複数と並びがそろっていない。`response`・`data` は `userResponse`・`userData` に
- 残した問題（仕様の外）: リポジトリの取得だけ失敗すると、`catch` でプロフィールまで `Network error` に置き換わる
- 次にやること: Phase 2（React）

### 2026-10-21  Project 3  Day 2
- 作ったもの: 前日のコードを見ずに、環境構築からゼロで再実装
- 説明が要ったもの: TypeScript の環境構築のコマンド / `unknown`・`Record`・型ガード / HTTP エラーと通信エラーの違い / `createElement()`・`textContent`・`appendChild()`
- 残っている問題: `03-api-app-day2/main.ts` の81行目に余分な `}` があり、コンパイルが通らない（`tsc`: `main.ts(83,1): error TS1005`）。Shogo が自分で直す
- 次にやること: Day 3

### 2026-10-20  Project 3  Day 1
- 作ったもの: GitHub User Search（`fetch` / `async`・`await` / `response.ok` / `try`・`catch` / Loading 表示 / 型ガード / `replaceChildren()`）
- 自力で書けなかった: `addEventListener` のコールバックを `async` にして中で `await` する書き方 / テンプレートリテラル / `??` / `unknown`・`Record`・型ガード / `createElement()`・`appendChild()`・`replaceChildren()` / tsconfig（ES Modules と CommonJS）

### 2026-09-24  Project 2  Day 3
- 足した仕様: All / Active / Done フィルター
- 自力で書けなかった: 表示用の配列を持たず表示時に `filter` する設計 / `todos = todos.filter(...)` で元データが消えること / DOM を空にして描き直す発想 / `renderTodo` と `renderTodos` の責務分離 / `npx tsc --watch`
- 指摘: 文字列なのに `element` という名前 / `currentFilter` を `string` ではなく `type Filter = "all" | "active" | "done"` に

### それ以前

Project 1（Workout Timer）と Project 2（Todo App）の Day 1〜2 の詳細は、Shogo の Obsidian Vault の `Projects/Engineer Mode.md` にある。
