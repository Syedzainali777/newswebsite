import { Client, Storage } from "appwrite";

export const appwriteConfig = {
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID || "",
  storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID || "",
  url: import.meta.env.VITE_APPWRITE_URL || "",
};

if (!appwriteConfig.url || !appwriteConfig.projectId) {
  console.error(
    "Appwrite environment variables are missing. Check your .env file."
  );u
}

export const client = new Client();

try {
  client.setEndpoint(appwriteConfig.url);
  client.setProject(appwriteConfig.projectId);
} catch (error) {
  console.error("Error initializing Appwrite client:", error);
}

export const storage = new Storage(client);
