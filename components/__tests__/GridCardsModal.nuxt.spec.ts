import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount, shallowMount, flushPromises } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import GiftCardsModal from '../GiftCardsModal.vue' // Replace with the actual path
import { useGiftCardsStore } from '../../stores/giftCards'
import { EModalActions } from '../../types'

// Mock dependencies
vi.mock('../stores/giftCards', () => ({
  useGiftCardsStore: vi.fn(() => ({
    itemsPerPage: { value: 10 },
    updateGiftCard: vi.fn().mockResolvedValue(undefined),
    createGiftCard: vi.fn().mockResolvedValue(undefined),
    getGiftCard: vi.fn().mockResolvedValue(undefined),
    listGiftCards: vi.fn(),
  }))
}))

vi.mock('../utils', () => ({
  formatDate: vi.fn((date) => date), // Mock formatDate to return the input date
  generateAlphanumericCode: vi.fn(() => 'TESTCODE123')
}))

describe('GiftCardsModal', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = shallowMount(GiftCardsModal, {
      global: {
        plugins: [createTestingPinia()],
        components: {
          'nord-modal': true,
          'nord-stack': true,
          'nord-input': true,
          'nord-button-group': true,
          'nord-button': true
        }
      }
    })
  })

  it('should display the correct modal title based on the modal action', async () => {
    wrapper.vm.modalAction = EModalActions.CREATE
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#title').text()).toBe('Create new Gift Card')

    wrapper.vm.modalAction = EModalActions.UPDATE
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#title').text()).toBe('Update Gift Card')

    wrapper.vm.modalAction = EModalActions.VIEW
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#title').text()).toBe('Gift Card Details')
  })

  it('should initialize fields when opening modal for an existing card', async () => {
    const mockGiftCard = {
      $id: '123',
      name: 'Test Card',
      type: 'Type A',
      code: 'CODE123',
      typeData: 'Data A',
      $createdAt: '2024-01-01',
      status: true
    }
    
    const giftCardsStore = useGiftCardsStore()
    giftCardsStore.getGiftCard.mockResolvedValue(mockGiftCard)
    
    await wrapper.vm.openModal(EModalActions.UPDATE, undefined, '123')
    await flushPromises()

    expect(wrapper.vm.name.value).toBe('Test Card')
    expect(wrapper.vm.type.value).toBe('Type A')
    expect(wrapper.vm.code.value).toBe('CODE123')
    expect(wrapper.vm.typeData.value).toBe('Data A')
    expect(wrapper.vm.createdAt.value).toBe('2024-01-01')
    expect(wrapper.vm.status.value).toBe(true)
  })

  it('should call handleSubmit and create a new gift card', async () => {
    const giftCardsStore = useGiftCardsStore()
    giftCardsStore.createGiftCard.mockResolvedValue()

    await wrapper.vm.openModal(EModalActions.CREATE)
    await flushPromises()
  
    wrapper.vm.name.value = 'New Card'
    wrapper.vm.type.value = 'Type B'
    wrapper.vm.code.value = 'NEWCODE456'
    wrapper.vm.typeData.value = 'Data B'
  
    await wrapper.vm.handleSubmit()
    await flushPromises()
  
    expect(giftCardsStore.createGiftCard).toHaveBeenCalledWith({
      name: 'New Card',
      type: 'Type B',
      code: 'NEWCODE456',
      typeData: 'Data B',
      status: false
    })
  })

  it('should call closeModal and clean modal state', async () => {
    await wrapper.vm.openModal(EModalActions.CREATE)
    await flushPromises()
  
    // Call closeModal
    wrapper.vm.closeModal()
    await flushPromises()
  
    // Access properties directly (without .value)
    expect(wrapper.vm.modalAction).toBeUndefined()
    expect(wrapper.vm.modalData).toBeUndefined()
    expect(wrapper.vm.id).toBe('')
    expect(wrapper.vm.name.value).toBe('')
    expect(wrapper.vm.type.value).toBe('')
    expect(wrapper.vm.code.value).toBe('')
    expect(wrapper.vm.createdAt.value).toBe('')
    expect(wrapper.vm.status.value).toBe('')
    expect(wrapper.vm.typeData.value).toBe('')
  })
  
})
