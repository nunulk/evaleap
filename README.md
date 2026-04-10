# Laravel + React (Inertia)

[Laravel](https://laravel.com/) 12 と [Inertia.js](https://inertiajs.com/) 、[React](https://react.dev/) 、[Vite](https://vite.dev/) を使うフルスタック アプリケーションの雛形です。

## 必要な環境

- PHP 8.2 以上
- [Composer](https://getcomposer.org/)
- [Node.js](https://nodejs.org/) と npm

## セットアップ

```bash
cp .env.example .env
composer install
npm install
php artisan key:generate
```

データベースが SQLite の場合、必要ならファイルを用意してからマイグレーションします。

```bash
touch database/database.sqlite
php artisan migrate
```

## 開発

フロントのみ（Vite）:

```bash
npm run dev
```

サーバ・キュー・ログ・Vite をまとめて起動:

```bash
composer dev
```

SSR 向けビルドと開発:

```bash
composer dev:ssr
```

## ビルド

```bash
npm run build
npm run build:ssr
```

## テスト

```bash
composer test
```

単一テストの例:

```bash
php artisan test --filter TestName
```

## 品質チェック（フロント）

```bash
npm run lint
npm run types
npm run format:check
```

## エージェント向けメモ

エディタや AI 向けの作業ガイドは [CLAUDE.md](./CLAUDE.md) を参照してください。
