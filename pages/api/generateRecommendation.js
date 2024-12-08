import { Configuration, OpenAIApi } from 'openai';
import supplementsData from '../../data/supplements.json';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const { lifestyle, dietType, dietDetail, issue, issueDetail, goal } = req.body;

  // サプリ一覧をJSON文字列に変換
  const supplementsJson = JSON.stringify(supplementsData);

  const prompt = `
あなたは栄養学とサプリメント選定の専門家です。以下のユーザー情報に基づいて、最適なサプリを提案してください。

[ユーザー情報]
- 生活習慣: ${lifestyle}
- 食事傾向: ${dietType}, 詳細: ${dietDetail}
- 悩み: ${issue}, 詳細: ${issueDetail}
- 目標: ${goal}

[サプリ一覧]
${supplementsJson}

出力形式:
1. ユーザーに対するアドバイスを日本語で150文字程度でまとめてください。
2. 上記サプリ一覧から最大3つ、ユーザーに最適と思われるサプリを選んでください。選ぶ際には、選んだサプリの "id"（数字） を参照してください。
3. 選んだサプリを以下のJSON形式で出力してください:
\`\`\`json
{
  "supplement_ids": [サプリIDの配列]
}
\`\`\`

以上に従い、出力してください。
`;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }]
    });

    const aiText = completion.data.choices[0].message.content.trim();

    // AIレスポンスからJSON部分を抽出（簡易パーサー）
    const jsonMatch = aiText.match(/```json([\s\S]*?)```/);
    let selectedIds = [];
    if (jsonMatch && jsonMatch[1]) {
      try {
        const parsedJson = JSON.parse(jsonMatch[1]);
        selectedIds = parsedJson.supplement_ids || [];
      } catch (e) {
        console.error("JSON parse error:", e);
      }
    }

    // 選択されたIDに対応するサプリを抽出
    const recommendedSupplements = supplementsData.filter(s => selectedIds.includes(s.id));

    // JSON部分以外（アドバイス部分）を抽出
    // アドバイスはJSONより前にある想定
    const adviceText = aiText.split('```json')[0].trim();

    res.status(200).json({
      text: adviceText,
      supplements: recommendedSupplements
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
