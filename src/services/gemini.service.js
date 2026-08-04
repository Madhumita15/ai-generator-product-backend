const ai = require("../utils/gemini");

class GeminiService {
  static async generateProductContent(productData) {
    const { productName, category, brand, keyFeatures, targetAudience } =
      productData;

    const prompt = `
Generate marketing content for the following product:

Product Name: ${productName}
Category: ${category}
Brand: ${brand}
Key Features: ${keyFeatures.join(", ")}
Target Audience: ${targetAudience}

Return valid JSON with these exact keys:
{
  "description": "",
  "shortDescription": "",
  "sellingPoints": [],
  "seoKeywords": [],
  "tagline": ""
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    return response;
  }

  static async generateProductCaption(productData) {
    const { productName, category, brand, keyFeatures, targetAudience } =
      productData;
    const prompt = `
You are a professional social media marketing expert.

Generate engaging social media captions for the following product.

Product Name: ${productName}
Category: ${category}
Brand: ${brand}
Key Features: ${keyFeatures.join(", ")}
Target Audience: ${targetAudience}

Generate:

1. Instagram Caption (2-3 lines with emojis)
2. Facebook Caption (3-4 lines)
3. LinkedIn Caption (Professional tone)
4. Five relevant hashtags

Return ONLY valid JSON.

Example:

{
  "instagram": "",
  "facebook": "",
  "linkedin": "",
  "hashtags": []
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });
    return response;
  }
}

module.exports = GeminiService;
