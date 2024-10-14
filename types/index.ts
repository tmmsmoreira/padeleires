import type { Models } from "appwrite"

export interface Option {
  label: string
  value: string
  icon?: Component
}

export interface IPlayer extends Models.Document {
  name: string
  email: string
  profilePicture: string
  points: number
  ranking: number
}