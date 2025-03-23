import request from "supertest";
import { server } from "../src";
import { describe, beforeAll, afterAll, test, expect } from "@jest/globals";

describe("AI-Quiz Service Integration Tests", () => {
  // Start the server before running the tests
  beforeAll(done => {
    server.listen(done);
  });

  // Ensure the server is closed after tests
  afterAll(done => {
    server.close(done);
  });

  test("should allow an unauthorized user to create a quiz (generate a question)", async () => {
    const response = await request(server)
      .post("/generate-question")
      .send({
        category: "science",
        language: "English",
        type: "buzzerquestion"
      });

    expect(response.status).toBe(200);
    try {
      const data = JSON.parse(response.text);
      expect(data).toHaveProperty("question");
      expect(data).toHaveProperty("answer");
    } catch (error) {
      expect(response.text).toContain("question");
      expect(response.text).toContain("answer");
    }
  });

  test("should create a question when valid parameters are provided", async () => {
    const response = await request(server)
      .post("/generate-question")
      .send({
        category: "history",
        language: "English",
        type: "estimationquestion"
      });

    expect(response.status).toBe(200);
    try {
      const data = JSON.parse(response.text);
      expect(data).toHaveProperty("question");
      expect(data).toHaveProperty("answer");
    } catch (error) {
      expect(response.text).toContain("question");
      expect(response.text).toContain("answer");
    }
  });

  test("should show service running message on GET /", async () => {
    const response = await request(server).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toContain("AI Quiz Service is Running!");
  });
});