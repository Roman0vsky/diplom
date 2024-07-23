import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import ISocialWorker from "../../shared/interfaces/socialWorker";
import IClient from "../../shared/interfaces/client";
import IClientForm from "../../shared/interfaces/clientForm";
import ISocialWorkerAssignedToClient from "../../shared/interfaces/socialWorkerAssignedToClient";
import INurse from "../../shared/interfaces/nurse";
import ICategory from "../../shared/interfaces/category";
import IFavour from "../../shared/interfaces/favour";

interface IInspectorState {
  socialWorkers: ISocialWorker[];
  currentSocialWorker: ISocialWorker | null;
  clients: IClient[];
  currentClient: IClientForm | null;
  unFinishedSocialWorker: ISocialWorkerAssignedToClient | null;
  nurses: INurse[];
  categories: ICategory[];
  currentCategory: ICategory | null;
  currentFavour: IFavour | null;
}

const initialState: IInspectorState = {
  socialWorkers: [],
  currentSocialWorker: null,
  clients: [],
  currentClient: null,
  unFinishedSocialWorker: null,
  nurses: [],
  categories: [],
  currentCategory: null,
  currentFavour: null,
};

export const inspectorSlice = createSlice({
  name: "inspectorSlice",
  initialState,
  reducers: {
    setSocialWorkers: (state, { payload }: PayloadAction<ISocialWorker[]>) => {
      state.socialWorkers = payload;
    },
    setCurrentSocialWorker: (
      state,
      { payload }: PayloadAction<ISocialWorker | null>
    ) => {
      state.currentSocialWorker = payload;
    },
    setClients: (state, { payload }: PayloadAction<IClient[]>) => {
      state.clients = payload;
    },
    setCurrentClient: (
      state,
      { payload }: PayloadAction<IClientForm | null>
    ) => {
      state.currentClient = payload;
    },
    setUnFinishedSocialWorker: (
      state,
      { payload }: PayloadAction<ISocialWorkerAssignedToClient | null>
    ) => {
      state.unFinishedSocialWorker = payload;
    },
    setNurses: (state, { payload }: PayloadAction<INurse[]>) => {
      state.nurses = payload;
    },
    setCategories: (state, { payload }: PayloadAction<ICategory[]>) => {
      state.categories = payload;
    },
    setCurrentCategory: (state, { payload }: PayloadAction<ICategory>) => {
      state.currentCategory = payload;
    },
    setCurrentFavour: (state, { payload }: PayloadAction<IFavour>) => {
      state.currentFavour = payload;
    },
  },
});

export const {
  setSocialWorkers,
  setCurrentSocialWorker,
  setClients,
  setCurrentClient,
  setUnFinishedSocialWorker,
  setNurses,
  setCategories,
  setCurrentCategory,
  setCurrentFavour,
} = inspectorSlice.actions;
export default inspectorSlice.reducer;
