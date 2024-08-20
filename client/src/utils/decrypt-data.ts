import CryptoJS from "crypto-js";

const ENCRYPTION_KEY = "qmHDScj4XutE1ckRw9cIK-2gsvX_f--QwqLZjRWWJLU="; // Use the same key as in the backend

// Function to decrypt the data
export function decryptData(encryptedData: string): string | null {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

    // Check if decryption resulted in valid UTF-8 data
    if (!decryptedData) {
      console.error("Decryption failed or produced invalid data.");
      return null;
    }

    return decryptedData;
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
}
