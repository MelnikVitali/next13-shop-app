import { createSlice } from '@reduxjs/toolkit';

export interface ISideMenu {
  isOpenSideMenu: boolean;
}

const initialState: ISideMenu = {
  isOpenSideMenu: false,
};

export const sideMenuSlice = createSlice({
  name: 'sideMenu',
  initialState,
  reducers: {
    toggleSideMenu: (state) => {
      state.isOpenSideMenu = !state.isOpenSideMenu;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleSideMenu } = sideMenuSlice.actions;

export const sideMenuReducer = sideMenuSlice.reducer;
