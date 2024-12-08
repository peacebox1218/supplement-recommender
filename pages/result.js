import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Result() {
  const router = useRouter();
  const { lifestyle, dietType, dietDetail, issue, issueDetail, goal } = router.query;

  const [loading, setLoading] = useState(true);
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    if (!lifestyle) return;
    const fetchRecommendation = async () => {
      setLoading(true);
      const res = await fetch('/api/generateRecommendation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lifestyle, dietType, dietDetail, issue, issueDetail, goal })
      });
      const data = await res.json();
      setRecommendation(data);
      setLoading(false);
    };
    fetchRecommendation();
  }, [lifestyle, dietType, dietDetail, issue, issueDetail, goal]);

  if (!lifestyle) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2>おすすめ結果</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h3>AIからの提案:</h3>
          <p>{recommendation?.text}</p>
          {recommendation?.supplements && recommendation.supplements.length > 0 && (
            <>
              <h3>おすすめサプリ一覧</h3>
              <ul>
                {recommendation.supplements.map(supp => (
                  <li key={supp.id} className="border p-2 mb-2">
                    <h4>{supp.name}</h4>
                    <p>{supp.description}</p>
                    <a href={supp.link} target="_blank" rel="noopener noreferrer">商品リンク</a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
