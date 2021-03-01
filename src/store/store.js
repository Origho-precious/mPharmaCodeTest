import {createSlice} from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    products: null
  },
  reducers: {
    getProducts: (state, action) => {

    }
  }
});

export default appSlice;