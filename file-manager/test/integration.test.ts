import request from "supertest";
import * as fs from "fs";
import * as path from "path";
import { describe, beforeAll, afterAll, test, expect } from "@jest/globals";
import index from "../src";

describe("File Management Microservice", () => {
  // Define test file paths and content for temporary files
  const testFilesDir = path.join(__dirname, "tmp");
  const publicFileName = "public_test.txt";
  const privateFileName = "private_test.txt";
  const publicFilePath = path.join(testFilesDir, publicFileName);
  const privateFilePath = path.join(testFilesDir, privateFileName);
  const publicFileContent = "This is a public test file";
  const privateFileContent = "This is a private test file";
  let uploadedPrivateFilename: string; // to be captured during upload

  // Ensure test temporary directory exists and create test files
  beforeAll(() => {
    if (!fs.existsSync(testFilesDir)) {
      fs.mkdirSync(testFilesDir);
    }
    fs.writeFileSync(publicFilePath, publicFileContent, "utf8");
    fs.writeFileSync(privateFilePath, privateFileContent, "utf8");
  });

  // Clean up test files and temporary directory after tests complete
  afterAll(() => {
    if (fs.existsSync(publicFilePath)) {
      fs.unlinkSync(publicFilePath);
    }
    if (fs.existsSync(privateFilePath)) {
      fs.unlinkSync(privateFilePath);
    }
    if (fs.existsSync(testFilesDir)) {
      fs.rmdirSync(testFilesDir);
    }
  });

  test("should upload and retrieve a public file", async () => {
    // Upload a public file (no authentication required)
    const uploadResponse = await request(index)
      .post("/upload?visibility=public")
      .attach("file", publicFilePath);

    expect(uploadResponse.status).toBe(200);
    expect(uploadResponse.body.fileURL).toMatch(/\/uploads\/public\/.+\.txt/);

    // Retrieve the file using the returned fileURL
    const { fileURL } = uploadResponse.body;
    const retrieveResponse = await request(index).get(fileURL);
    expect(retrieveResponse.status).toBe(200);
    expect(retrieveResponse.text).toBe(publicFileContent);
  });

  test("should upload and retrieve a private file with proper authentication", async () => {
    const userId = "12345";
    const userName = "Alice";
    const userImage = "https://example.com/alice.png";

    // Upload a private file with the required authentication headers
    const uploadResponse = await request(index)
      .post("/upload?visibility=private")
      .set("x-user-id", userId)
      .set("x-user-name", userName)
      .set("x-user-image", userImage)
      .attach("file", privateFilePath);

    expect(uploadResponse.status).toBe(200);
    expect(uploadResponse.body.fileURL).toMatch(/\/uploads\/private\/.+\.txt/);

    // Save the generated private file name for subsequent tests
    const fileURL: string = uploadResponse.body.fileURL;
    uploadedPrivateFilename = fileURL.split("/").pop() || "";

    // Retrieve the uploaded private file using the same user authentication
    const retrieveResponse = await request(index)
      .get(fileURL)
      .set("x-user-id", userId);

    expect(retrieveResponse.status).toBe(200);
    expect(retrieveResponse.text).toBe(privateFileContent);
  });

  test("should fail to upload a private file without authentication", async () => {
    const response = await request(index)
      .post("/upload?visibility=private")
      .attach("file", privateFilePath);

    expect(response.status).toBe(401);
    expect(response.body.error).toBe("Authentication required for private uploads");
  });

  test("should fail to retrieve a private file with incorrect authentication", async () => {
    // Attempt to retrieve the previously uploaded private file using a wrong user id
    const wrongUserId = "wrongUser";
    const fileURL = `/uploads/private/${uploadedPrivateFilename}`;

    const response = await request(index)
      .get(fileURL)
      .set("x-user-id", wrongUserId);

    expect(response.status).toBe(403);
    expect(response.body.error).toBe("You don't have permission to access this file");
  });

  test("should delete a private file with correct authentication", async () => {
    const userId = "12345";
    const fileURL = `/uploads/private/${uploadedPrivateFilename}`;

    // Delete the private file
    const deleteResponse = await request(index)
      .delete(`/uploads/private/${uploadedPrivateFilename}`)
      .set("x-user-id", userId);

    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body.success).toBe(true);

    // Try to retrieve the deleted file – it should return 404
    const getResponse = await request(index)
      .get(fileURL)
      .set("x-user-id", userId);
    expect(getResponse.status).toBe(404);
  });
});