import axios from "axios";

export const queryHF = async (model: string, inputs: any) => {
  try {
    const response = await axios.post(
      `https://api-inference.huggingface.co/models/${model}`,
      inputs,
      {
        headers: { Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}` },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Hugging Face API error:", err);
    return null;
  }
};
