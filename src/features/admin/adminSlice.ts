import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import IRegion from "../../shared/interfaces/region";
import IInspector from "../../shared/interfaces/inspector";

interface IAdminState {
  inspectors: IInspector[];
  currentInspector: IInspector | null;
  regions: IRegion[];
  currentRegion: IRegion | null;
}

const initialState: IAdminState = {
  inspectors: [],
  currentInspector: null,
  regions: [],
  currentRegion: null,
};

export const adminSlice = createSlice({
  name: "adminSlice",
  initialState,
  reducers: {
    setInspectors: (state, { payload }: PayloadAction<IInspector[]>) => {
      state.inspectors = payload;
    },
    setCurrentInspector: (
      state,
      { payload }: PayloadAction<IInspector | null>
    ) => {
      state.currentInspector = payload;
    },
    setRegions: (state, { payload }: PayloadAction<IRegion[]>) => {
      state.regions = payload;
    },
    setCurrentRegion: (state, { payload }: PayloadAction<IRegion | null>) => {
      state.currentRegion = payload;
    },
  },
});

export const {
  setInspectors,
  setCurrentInspector,
  setRegions,
  setCurrentRegion,
} = adminSlice.actions;
export default adminSlice.reducer;
