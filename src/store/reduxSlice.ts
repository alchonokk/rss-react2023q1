import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { FormDataNew, SearchCard } from 'interfaces';
import { RootState } from 'store';

export interface BrainState {
  valueApi: { status: string; totalResults: number; articles: SearchCard[] };
  status: string;
  valueSearch: string;
  infoFromForm: FormDataNew[];
}

export const requestApiAsync = createAsyncThunk('brain/axiosBrain', async (URL: string) => {
  const response = await axios.get(URL);
  return response.data;
});

const initialState: BrainState = {
  valueApi: { status: '', totalResults: 0, articles: [] },
  status: 'idle',
  valueSearch: '',
  infoFromForm: [],
};

export const brainSlice = createSlice({
  name: 'brain',
  initialState,
  reducers: {
    changeValueOfSearch: (state, action: PayloadAction<string>) => {
      state.valueSearch = action.payload;
    },
    addCardFromForm: (state, action: PayloadAction<FormDataNew>) => {
      state.infoFromForm.push(action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(requestApiAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(requestApiAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.valueApi = action.payload;
      })
      .addCase(requestApiAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { changeValueOfSearch, addCardFromForm } = brainSlice.actions;

export const selectStatus = (state: RootState) => state.brain.status;
export const valueAPI = (state: RootState) => state.brain.valueApi;
export const valueSearch = (state: RootState) => state.brain.valueSearch;
export const statusAPI = (state: RootState) => state.brain.status;
export const informationFromForm = (state: RootState) => state.brain.infoFromForm;

export default brainSlice.reducer;
