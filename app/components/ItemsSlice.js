import { createSlice } from '@reduxjs/toolkit'

import data from '../data/data'

const ItemsSlice = createSlice({
  name: 'items',
  initialState: {
    itemsData: data,
    AdminCode: '7788',
  },
  reducers: {
    itemAdded(state, action) {
      state.itemsData.push(action.payload)
    }
  }
})

export const { itemAdded } = ItemsSlice.actions

export const AdminCode = state => state.items.AdminCode
export const itemsData = state => state.items.itemsData

export default ItemsSlice.reducer

