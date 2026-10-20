# Engineer Mode — LOG

家庭教師（Claude Code）がセッションの始めに読み、終わりに追記する。新しい記録が上。

## 現在地

- **Project 3: GitHub User Search** — Day 2 まで完了。**次は Day 3（既存コードに仕様を1つ追加）**
- Day 3 は `03-api-app-day2/` をコピーした `03-api-app-day3/` で行う
- その次: Phase 2（React）。Phase 1 で作ったものを React で作り直す

## 記録

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
