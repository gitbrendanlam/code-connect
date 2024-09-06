import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './../store'

// Define a type for the slice state
interface AvailabilityState {
  AvailabilityBlocks: ITimeBlock[]
}

interface ITimeBlock {
  week_of: string,
  date: string,
  week_day: number,
  start_time: string,
  recurring: string,
}

// Define the initial state using that type
const initialState: AvailabilityState = {
  AvailabilityBlocks: [],
}

export const availabilitySlice = createSlice({
  name: 'availability',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addAvailability: (state, action: PayloadAction<ITimeBlock>) => {
      state.AvailabilityBlocks.push(action.payload);
    },
    deleteAvailability: (state, action: PayloadAction<number>) => {
      state.AvailabilityBlocks.splice(action.payload, 1);
    },
  },
})

export const { addAvailability, deleteAvailability } = availabilitySlice.actions


export default availabilitySlice.reducer