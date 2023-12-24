import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { INavigation } from './navigationSliceTypes';

export const initialState: INavigation = {
    activeTab: 'Admin',
    activeSubTab: 'Başvuru Görüntüle',
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setActiveTab: {
        reducer(state, action: PayloadAction<{ activeTab: string; activeSubTab: string }>) {
          state.activeTab = action.payload.activeTab;
          state.activeSubTab = action.payload.activeSubTab;
        },
        prepare(activeTab: string, activeSubTab: string) {
          return { payload: { activeTab, activeSubTab } };
        },
      },
    },
});

export const selectActiveTab = (state: RootState) => state.navigation.activeTab;
export const selectActiveSubTab = (state: RootState) => state.navigation.activeSubTab;


export const {
    setActiveTab
} = navigationSlice.actions;

export default navigationSlice.reducer;
