import Anthropic from "@anthropic-ai/sdk";

export const LLM_MODEL = process.env.LLM_MODEL ?? "MiniMax-M3";

const MINIMAX_ANTHROPIC_BASE_URL = "https://api.minimax.io/anthropic";

export function createLlmClient(): Anthropic {
  const apiKey = process.env.MINIMAX_API_KEY ?? process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("MINIMAX_API_KEY or ANTHROPIC_API_KEY not configured");
  }

  const baseURL =
    process.env.ANTHROPIC_BASE_URL ??
    process.env.MINIMAX_BASE_URL ??
    MINIMAX_ANTHROPIC_BASE_URL;

  return new Anthropic({ apiKey, baseURL });
}

export function llmApiKeyConfigured(): boolean {
  return Boolean(process.env.MINIMAX_API_KEY ?? process.env.ANTHROPIC_API_KEY);
}

/** Collect text blocks only (ignores thinking/tool blocks from MiniMax-M3). */
export function textFromMessage(response: Anthropic.Messages.Message): string {
  const parts: string[] = [];
  for (const block of response.content) {
    if (block.type === "text" && block.text.trim()) {
      parts.push(block.text);
    }
  }
  return parts.join("\n");
}
