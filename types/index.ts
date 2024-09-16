import type { Models } from "appwrite"

export enum EModalActions {
  CREATE = 'create',
  UPDATE = 'update',
  VIEW = 'view'
}

export enum EGiftCardTypes {
  PRICE = 'price',
  SERVICE = 'service'
}

export interface IGiftCard extends Models.Document {
  name: string,
  type?: EGiftCardTypes,
  typeData: string,
  code?: string,
  status?: boolean
}
