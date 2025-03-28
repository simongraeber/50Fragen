import { baseURL, DELETE, POST } from "@/lib/http"

export const fileUploadedBasePath = '/file-manager'

export type UploadedFile = {
  fileURL: string
}

/**
 * Uploads a file to the file service.
 * Note: The gateway will remove the "/file-manager" prefix so the underlying service endpoint is actually "/upload".
 *
 * @param file The file to be uploaded (a File or Blob).
 * @param visibility The visibility of the file ("public" or "private"). Defaults to "public".
 * @returns An object containing the file URL.
 */
export const uploadFile = async (
  file: File,
  visibility: "public" | "private" = "public"
): Promise<UploadedFile> => {
  const formData = new FormData();
  formData.append("file", file);
  const url = `${fileUploadedBasePath}/upload?visibility=${visibility}`;
  const uploadedFile = await POST<UploadedFile, FormData>(
    url, formData, {headers: { 'Content-Type': undefined }}
  );
  uploadedFile.fileURL = baseURL + fileUploadedBasePath + uploadedFile.fileURL;
  return uploadedFile
};


/**
 * Deletes a file from the file service.
 * Note: The gateway will remove the "/file-manager" prefix so the underlying service endpoint is actually "/delete".
 *
 * @param fileName The name of the file to be deleted.
 */
export const deleteFile = async (fileName: string): Promise<void> => {
  console.log("Deleting file", fileName);
  await DELETE(fileName);
}