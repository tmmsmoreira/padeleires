import { defineStore } from 'pinia'
import useAppWrite from "../composables/useAppWrite"
import { ID } from "appwrite"
import type { IPlayer } from "@/types"

interface IPlayersStore {
  list: IPlayer[]
  loading: boolean
  total: number | undefined
}

// Configuration to access AppWrite database and collection IDs from runtime configuration
const config = useRuntimeConfig()
const {
  APPWRITE_DATABASE_ID,
  APPWRITE_PLAYERS_COLLECTION_ID
} = config.public

export const usePlayersStore = defineStore('players', {
  state: () => {
    return {
      list: [],
      loading: false,
      total: undefined
    } as IPlayersStore
  },

  actions: {
    async listPlayers(/*limit: number, offset: number, search: string*/) {
      const { databases } = useAppWrite()

      this.loading = true

      try {
        const response = await databases.value?.listDocuments(
          APPWRITE_DATABASE_ID,
          APPWRITE_PLAYERS_COLLECTION_ID,
          // [
          //   Query.limit(limit),           // Limit the number of results
          //   Query.offset(offset),         // Offset for pagination
          //   Query.orderDesc("$createdAt"), // Order the results by "attribute" in ascending order
          //   Query.or([                    // Search for documents containing the search term in "name" or "code"
          //     Query.contains("name", search),
          //     Query.contains("code", search)
          //   ])
          // ]
        )

        this.list = response?.documents as IPlayer[]
        this.total = response?.total
        console.log(response?.documents)
      } catch (error) {
        console.error('Logout error:', error)
      }
    },

    async createPlayer(data: Partial<IPlayer>) {
      const { databases } = useAppWrite()

      try {
        const response = await databases.value?.createDocument(
          APPWRITE_DATABASE_ID,
          APPWRITE_PLAYERS_COLLECTION_ID,
          ID.unique(),
          data
        )
      } catch (error) {
        console.log(error)
      }
    },

    async getPlayer(id: IPlayer['$id']) {
      const { databases } = useAppWrite()

      try {
        const response = await databases.value?.getDocument(
          APPWRITE_DATABASE_ID,
          APPWRITE_PLAYERS_COLLECTION_ID,
          id
        )

        return response
      } catch (error) { }
    },

    async updatePlayer(data: Partial<IPlayer>) {
      const { databases } = useAppWrite()

      if (!data.$id) {
        throw new Error("Player ID is required for updating.")
      }

      try {
        const response = await databases.value?.updateDocument(
          APPWRITE_DATABASE_ID,
          APPWRITE_PLAYERS_COLLECTION_ID,
          data.$id,
          data
        )
      } catch (error) { }
    },

    async deletePlayer(id: IPlayer['$id']) {
      const { databases } = useAppWrite()

      try {
        const response = await databases.value?.deleteDocument(
          APPWRITE_DATABASE_ID,
          APPWRITE_PLAYERS_COLLECTION_ID,
          id
        )
      } catch (error) { }
    }
  },

  getters: {

  }
})
