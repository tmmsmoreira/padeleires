import { Client, Databases, Account } from "appwrite"

const accountRef = ref<Account>();
const clientRef = ref<Client>();
const databaseRef = ref<Databases>();


export default function useAppWrite() {
  const config = useRuntimeConfig()

  clientRef.value = new Client();

  clientRef.value
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(config.public.APPWRITE_PROJECT_ID)

  accountRef.value = new Account(clientRef.value)

  databaseRef.value = new Databases(clientRef.value)

  return {
    client: clientRef,
    account: accountRef,
    databases: databaseRef,
  }
}
