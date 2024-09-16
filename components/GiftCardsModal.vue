<script setup lang="ts">
import "@nordhealth/components/lib/Stack"
import "@nordhealth/components/lib/Spinner"
import "@nordhealth/components/lib/Input"
import "@nordhealth/components/lib/Modal"
import "@nordhealth/components/lib/ButtonGroup"
import "@nordhealth/components/lib/Select"

import type { Modal } from "@nordhealth/components"
import type { IGiftCard } from "../types"
import { EModalActions } from "../types"
import giftCards from "../consts/giftCards.json"
import { generateAlphanumericCode, debounce, formatDate } from "../utils"

import { useGiftCardsStore } from "../stores/giftCards"
import useField from "../composables/useField"

const modalAction = ref()
const loadingModalData = ref(false)
const modalElement = ref<InstanceType<typeof Modal>>()
const modalData = ref<IGiftCard | undefined>()

const giftCardsStore = useGiftCardsStore()
const { itemsPerPage } = storeToRefs(giftCardsStore)

// Define emit to send events
const emit = defineEmits(['closed'])

const modalTitle = computed(() => {
  switch (modalAction.value) {
    case EModalActions.CREATE:
      return 'Create new Gift Card'
    case EModalActions.UPDATE:
      return 'Update Gift Card'
    case EModalActions.VIEW:
      return 'Gift Card Details'
    default:
      return 'Gift Card'
  }
})

const id = ref('')
const name = useField('')
const type = useField('')
const code = useField('')
const createdAt = useField('')
const status = useField('')
const typeData = useField('')

const handleSubmit = () => {
  loadingModalData.value = true

  if (modalAction.value === EModalActions.UPDATE) {
    giftCardsStore.updateGiftCard({
      $id: id.value as string,
      name: name.value,
      typeData: typeData.value,
    }).then(() => {
      closeModal()
    }).catch(() => {
      // TODO: improve UI to handle errors for failed requests
    })
  }

  if (modalAction.value === EModalActions.CREATE) {
    giftCardsStore.createGiftCard({
      name: name.value,
      type: type.value,
      code: code.value,
      typeData: typeData.value,
      status: false
    }).then(() => {
      closeModal()
    }).catch(() => {
      // TODO: improve UI to handle errors for failed requests
    })
  }

}

const openModal = async (action: EModalActions, cardType?: IGiftCard['$type'], cardId?: IGiftCard['$id']) => {
  loadingModalData.value = true
  modalAction.value = action
  modalElement.value?.showModal()

  if (cardId) {
    id.value = cardId

    await giftCardsStore.getGiftCard(id.value).then(giftCard => {
      console.log(giftCard)
      modalData.value = giftCard as IGiftCard
    }).catch(error => {
      // fallback to local data
      console.log(error)
      modalData.value = giftCards.documents.find(card => {
        return card.$id === cardId
      }) as IGiftCard | undefined
    })

    if (modalData.value) {
      name.value = modalData.value.name || ''
      type.value = modalData.value.type || ''
      typeData.value = modalData.value.typeData || ''
      code.value = modalData.value.code || ''
      createdAt.value = modalData.value.$createdAt || ''
      status.value = modalData.value.status || ''
    }
  } else {
    type.value = cardType
    code.value = generateAlphanumericCode() || ''
  }

  loadingModalData.value = false
}

const cleanModal = () => {
  loadingModalData.value = false
  modalAction.value = undefined
  modalData.value = undefined

  id.value = ''
  name.value = ''
  type.value = ''
  code.value = ''
  createdAt.value = ''
  status.value = ''
  typeData.value = ''
}

const closeModal = (e?: Event) => {
  // Close the modal programmatically if no event is provided
  if (!e) {
    modalElement.value?.close()
    emit('closed')
  }

  if (modalAction.value) {
    cleanModal()
  }
}

defineExpose({ openModal })
</script>

<template>
  <nord-modal ref="modalElement" size="m" aria-labelledby="title" @close="closeModal">
    <h2 slot="header" id="title">{{ modalTitle }}</h2>
    <form action="#" @submit.prevent="handleSubmit" :disable="loadingModalData">
      <nord-stack>
        <nord-input label="Name" name="name" :readonly="modalAction === EModalActions.VIEW" v-model="name.value" />

        <nord-input v-if="modalAction !== EModalActions.CREATE" label="Issued Date" name="createdAt"
          :readonly="modalAction === EModalActions.VIEW || modalAction === EModalActions.UPDATE"
          :value="createdAt.value ? formatDate(createdAt.value) : ''" />

        <nord-input label="Type" name="type" readonly v-model="type.value" />

        <nord-input label="Type Data" name="typeData" :readonly="modalAction === EModalActions.VIEW"
          v-model="typeData.value" />

        <nord-input label="Code" name="code" :readonly="modalAction === EModalActions.VIEW"
          :disabled="modalAction === EModalActions.CREATE || modalAction === EModalActions.UPDATE"
          v-model="code.value" />
      </nord-stack>
    </form>

    <nord-button-group v-if="modalAction !== EModalActions.VIEW" slot="footer" variant="spaced">
      <nord-button variant="primary" @click="handleSubmit" :disabled="loadingModalData" :loading="loadingModalData">
        {{ modalAction === EModalActions.CREATE ? 'Create' : 'Save changes' }}
      </nord-button>
    </nord-button-group>
  </nord-modal>
</template>

<style scoped>
/* Your component styles here */
</style>