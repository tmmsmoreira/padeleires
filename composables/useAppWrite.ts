// Import necessary modules from the Appwrite SDK.
// Client: Used to set up the connection to the Appwrite backend.
// Databases: For interacting with the database service.
// Account: For handling user accounts and authentication.
import { Client, Databases, Account } from "appwrite"

// Get runtime configuration (e.g., environment variables) using Nuxt's `useRuntimeConfig()`.
// This helps to fetch public or private configuration like API keys, endpoints, etc.
const config = useRuntimeConfig()

// Create a new instance of the Appwrite Client, which will be used to communicate with the Appwrite backend.
const client = new Client()

// Configure the client with the Appwrite API endpoint and the project ID.
// setEndpoint: Specifies the URL of the Appwrite instance.
// setProject: Sets the project to be used (provided through runtime configuration).
client
  .setEndpoint("https://cloud.appwrite.io/v1") // Appwrite Cloud API endpoint.
  .setProject(config.public.APPWRITE_PROJECT_ID) // Project ID, typically fetched from environment variables.

// Create a new instance of the Account service for user authentication and management.
const account = new Account(client)

// Create a new instance of the Databases service for interacting with the Appwrite database.
const databases = new Databases(client)

// Export a function that provides access to the Appwrite client, account, and databases.
// This can be imported in other parts of the application to interact with Appwrite services.
export default function useAppWrite() {
  return {
    client,    // The initialized Appwrite client instance.
    account,   // The account management service for user-related operations.
    databases, // The database service for CRUD operations on collections and documents.
  }
}
