import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import type OpenAI from "openai";
import { generateQuestion } from "../src/openaiService";

const mockCreate = jest.fn<
  (request: OpenAI.Responses.ResponseCreateParamsNonStreaming) =>
    Promise<Partial<OpenAI.Responses.Response>>
>();

jest.mock("openai", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    responses: {
      create: (request: OpenAI.Responses.ResponseCreateParamsNonStreaming) => mockCreate(request),
    },
  })),
}));

describe("generateQuestion", () => {
  beforeEach(() => {
    mockCreate.mockReset();
  });

  test.each(["buzzerquestion", "estimationquestion"] as const)(
    "generates a structured %s with the requested model and reasoning",
    async (questionType) => {
      const output = JSON.stringify({ question: "Test question?", answer: "42" });
      mockCreate.mockResolvedValue({ status: "completed", output_text: output });

      await expect(generateQuestion("science", "English", questionType)).resolves.toBe(output);

      expect(mockCreate).toHaveBeenCalledWith({
        model: "gpt-6-luna",
        service_tier: "default",
        input: [{
          role: "user",
          content: expect.stringContaining("science"),
        }],
        text: {
          format: expect.objectContaining({
            type: "json_schema",
            name: "question",
            strict: true,
            schema: expect.objectContaining({
              required: ["question", "answer"],
            }),
          }),
        },
        reasoning: { effort: "low", mode: "standard", summary: "auto" },
      });
      const prompt = mockCreate.mock.calls[0][0].input;
      expect(prompt).toEqual([{
        role: "user",
        content: expect.stringContaining("English"),
      }]);
      expect(prompt).toEqual([{
        role: "user",
        content: expect.stringContaining(
          questionType === "estimationquestion" ? "a number" : "a single word or a short phrase"
        ),
      }]);
    }
  );

  test("surfaces API errors", async () => {
    mockCreate.mockRejectedValue(new Error("API unavailable"));

    await expect(generateQuestion("science", "English", "buzzerquestion"))
      .rejects.toThrow("API unavailable");
  });

  test("rejects incomplete output", async () => {
    mockCreate.mockResolvedValue({
      status: "incomplete",
      incomplete_details: { reason: "max_output_tokens" },
      output_text: '{"question":',
    });

    await expect(generateQuestion("science", "English", "buzzerquestion"))
      .rejects.toThrow("Question generation did not complete: max_output_tokens");
  });

  test("surfaces failed responses", async () => {
    mockCreate.mockResolvedValue({
      status: "failed",
      error: { code: "server_error", message: "Generation failed" },
    });

    await expect(generateQuestion("science", "English", "buzzerquestion"))
      .rejects.toThrow("Generation failed");
  });

  test("rejects a response without output text", async () => {
    mockCreate.mockResolvedValue({ status: "completed", output_text: "" });

    await expect(generateQuestion("science", "English", "buzzerquestion"))
      .rejects.toThrow("Question generation returned no text");
  });
});
