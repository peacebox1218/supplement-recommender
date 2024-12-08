import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Questions() {
  const [lifestyle, setLifestyle] = useState('');
  const [dietType, setDietType] = useState('');
  const [dietDetail, setDietDetail] = useState('');
  const [issue, setIssue] = useState('');
  const [issueDetail, setIssueDetail] = useState('');
  const [goal, setGoal] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push({
      pathname: '/result',
      query: {
        lifestyle,
        dietType,
        dietDetail,
        issue,
        issueDetail,
        goal
      }
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1>あなたに合ったサプリを探す</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">

        <label>
          生活習慣:
          <select value={lifestyle} onChange={(e) => setLifestyle(e.target.value)}>
            <option value="">選択してください</option>
            <option value="active">定期的に運動する</option>
            <option value="sedentary">あまり運動しない</option>
            <option value="night">夜型生活</option>
          </select>
        </label>

        <label>
          食事傾向（選択肢）:
          <select value={dietType} onChange={(e) => setDietType(e.target.value)}>
            <option value="">選択してください</option>
            <option value="balanced">バランス型</option>
            <option value="meatHeavy">肉中心</option>
            <option value="lessVeg">野菜少なめ</option>
            <option value="vegan">ヴィーガン・ベジタリアン</option>
          </select>
        </label>

        <label>
          よく食べるもの（自由記述）:
          <textarea value={dietDetail} onChange={(e) => setDietDetail(e.target.value)} />
        </label>

        <label>
          悩み（選択肢）:
          <select value={issue} onChange={(e) => setIssue(e.target.value)}>
            <option value="">選択してください</option>
            <option value="fatigue">疲れやすい</option>
            <option value="skin">肌荒れが気になる</option>
            <option value="focus">集中力不足</option>
            <option value="sleep">眠りが浅い</option>
          </select>
        </label>

        <label>
          悩み詳細（自由記述）:
          <textarea value={issueDetail} onChange={(e) => setIssueDetail(e.target.value)} />
        </label>

        <label>
          目標（選択肢）:
          <select value={goal} onChange={(e) => setGoal(e.target.value)}>
            <option value="">選択してください</option>
            <option value="muscle">筋肉増量</option>
            <option value="diet">ダイエット</option>
            <option value="relax">リラックス</option>
            <option value="beauty">美肌</option>
          </select>
        </label>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          おすすめを見る
        </button>
      </form>
    </div>
  );
}
