import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1>サプリレコメンドサービス</h1>
      <p>このサービスは、あなたの生活習慣、食事傾向、悩み、目標から適したサプリメントをAIが提案します。</p>
      <p>簡単な質問に答えるだけで、あなたに不足していそうな栄養素やサプリを自動でレコメンドします。</p>

      <h2>サービス概要</h2>
      <ul>
        <li>数クリックで栄養素不足をチェック</li>
        <li>AIによるサプリメント提案</li>
        <li>準備されたサプリリストから最適なものを自動選定</li>
      </ul>

      <h2>開発者について</h2>
      <p>このサービスは[開発者名]が作成しました。健康や栄養に興味がある方の一助となることを目的としています。</p>
      <p>フィードバックは歓迎です！</p>

      <div className="mt-8">
        <Link href="/questions">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">サービスを開始する</button>
        </Link>
      </div>
    </div>
  );
}
