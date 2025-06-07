import { createSlice } from '@reduxjs/toolkit';

const heartRateSlice = createSlice({
  name: 'heartRate',
  initialState: {
    value: null,
  },
  reducers: {
    setHeartRate: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setHeartRate } = heartRateSlice.actions;
export default heartRateSlice.reducer;