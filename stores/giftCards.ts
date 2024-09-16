import { defineStore } from 'pinia'
import useAppWrite from "../composables/useAppWrite"
import { ID, Query } from "appwrite"
import type { IGiftCard } from "../types"

import giftCardsList from "../consts/giftCards.json"

interface IGiftCardsStore {
  itemsPerPage: number,
  loading: boolean,
  list: IGiftCard[],
  totalDocuments: number,
  selectedItem: IGiftCard | null
}

// Configuration to access AppWrite database and collection IDs from runtime configuration
const config = useRuntimeConfig()
const {
  APPWRITE_DATABASE_ID,
  APPWRITE_GIFT_CARD_COLLECTION_ID
} = config.public

// Get the database service from the AppWrite composable
const { databases } = useAppWrite()

// Define the Pinia store for GiftCards
export const useGiftCardsStore = defineStore('giftCards', {
  // State holds the reactive properties of the store
  state: () => {
    return {
      itemsPerPage: 10,        // Number of items per page for pagination
      loading: false,          // Indicates if data is being loaded
      list: [],                // List of gift cards
      totalDocuments: 0,       // Total number of gift card documents in the database
      selectedItem: null       // The selected gift card item (if any)
    } as IGiftCardsStore
  },

  // Actions to interact with the AppWrite database
  actions: {
    // Fetch a paginated list of gift cards with optional search and offset
    async listGiftCards(limit: number, offset: number, search: string) {
      this.loading = true // Set loading state to true while fetching data
      // Fetch gift card documents from the database
      const promise = databases.listDocuments(
        APPWRITE_DATABASE_ID,
        APPWRITE_GIFT_CARD_COLLECTION_ID,
        [
          Query.limit(limit),           // Limit the number of results
          Query.offset(offset),         // Offset for pagination
          Query.orderDesc("$createdAt"), // Order the results by "attribute" in ascending order
          Query.or([                    // Search for documents containing the search term in "name" or "code"
            Query.contains("name", search),
            Query.contains("code", search)
          ])
        ]
      )

      // Handle the response from AppWrite or fallback to local data on error
      await promise.then((response) => {
        this.list = response.documents as IGiftCard[]   // Update the gift card list with the response data
        this.totalDocuments = response.total            // Set the total number of documents
        console.log(response.documents)
      }).catch((error) => {
        console.log(error)
        // Filter the local data by search term (if any)
        const filteredData = giftCardsList.documents.filter(card => 
          card.name.includes(search) || card.code.includes(search)
        ) as IGiftCard[]

        // Apply pagination logic using limit and offset
        const paginatedData = filteredData.slice(offset, offset + limit)

        // Update the store state with the filtered and paginated data
        this.list = paginatedData
        this.totalDocuments = filteredData.length
      }).finally(() => {
        this.loading = false // Set loading state to false after fetching
      })
    },

    // Create a new gift card in the AppWrite database
    async createGiftCard(data: Partial<IGiftCard>) {
      const promise = databases.createDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_GIFT_CARD_COLLECTION_ID,
        ID.unique(),  // Generate a unique ID for the new document
        data          // The data for the new gift card
      )

      await promise.then((response) => {
        console.log(response)  // Log the response on success
      }).catch((error) => {
        console.log(error)     // Log the error if something goes wrong
      })
    },

    // Get a single gift card by its ID from the AppWrite database
    getGiftCard(id: IGiftCard['$id']) {
      const promise = databases.getDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_GIFT_CARD_COLLECTION_ID,
        id
      )

      return promise // Return the promise so the caller can handle the response
    },

    // Update an existing gift card in the AppWrite database
    async updateGiftCard(data: Partial<IGiftCard>) {
      if (!data.$id) {
        throw new Error("Gift card ID is required for updating.")  // Ensure the ID is provided
      }

      const promise = databases.updateDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_GIFT_CARD_COLLECTION_ID,
        data.$id,    // Use the ID of the gift card to update
        data         // The updated gift card data
      )

      await promise.then((response) => {
        console.log(response)  // Log the response on success
      }).catch((error) => {
        console.log(error)     // Log the error if something goes wrong
      })
    },

    // Delete a gift card by its ID from the AppWrite database
    async deleteGiftCard(id: IGiftCard['$id']) {
      const promise = databases.deleteDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_GIFT_CARD_COLLECTION_ID,
        id
      )

      await promise.then((response) => {
        console.log(response)  // Log the response on success
      }).catch((error) => {
        console.log(error)     // Log the error if something goes wrong
      })
    }
  }
})
