import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

// Initialize the API client
// Note: In a real production app, you might want to proxy this through a backend 
// to avoid exposing the key, or use a specific scoped key.
// We assume process.env.API_KEY is available as per instructions.

let chatSession: Chat | null = null;

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is missing from environment variables.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const initializeChat = () => {
  const client = getClient();
  if (!client) return null;

  const systemInstruction = `
    You are 'FinBot', a professional AI assistant for Maitrayee Vishnu's portfolio website.
    Your goal is to answer visitor questions about her finance skills, experience, and background.
    
    Profile:
    - Name: Maitrayee Vishnu
    - Role: FP&A Professional & MS in Finance Student at Stevens Institute of Technology.
    - Key Experience: 3+ years at JP Morgan Chase (FP&A Associate), Finance Intern at Aditya Birla Sun Life Insurance.
    - Core Skills: Financial Planning & Analysis, Budgeting ($1.06B managed), Forecasting, Excel, Power BI, SQL, Python, Tableau.
    
    Key Projects & Initiatives:
    1. Budget Optimization: Power BI dashboard tracking $1.06B budget, achieving 6-8% YoY expense reduction.
    2. Strategic Location Modelling: Data-driven model for cost structures leading to $6M annualized savings.
    3. Forecasting Automation: Python/VBA automation reducing manual processes by 30%.
    4. Headcount Planning Model: Framework for 7,041 FTEs incorporating salary projections and attrition.
    5. Fx Exposure Automation: Automated multi-currency P&L forecasting reducing variance by 15%.
    6. MIS Dashboard Tracking: 50+ annual reports for senior leadership with KPI tracking.
    
    Tone: Professional, analytical, articulate, and helpful.
    If asked about contact info, suggest the contact form or her email (maitrayeeanandvishnu@gmail.com).
    If asked about experience, highlight her impact at JP Morgan (cost savings, budget management).
  `;

  chatSession = client.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction,
      temperature: 0.7,
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<AsyncIterable<string>> => {
  if (!chatSession) {
    initializeChat();
  }

  if (!chatSession) {
     // Fallback if init failed (e.g. no key)
    throw new Error("AI Service unavailable");
  }

  try {
    const resultStream = await chatSession.sendMessageStream({ message });
    
    // Create an async generator to yield text chunks
    async function* textGenerator() {
      for await (const chunk of resultStream) {
        const c = chunk as GenerateContentResponse;
        if (c.text) {
          yield c.text;
        }
      }
    }

    return textGenerator();

  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    throw error;
  }
};