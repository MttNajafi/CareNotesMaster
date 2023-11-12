import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Client} from 'types/common';

const clientsSlice = createSlice({
  name: 'clients',
  initialState: [] as Client[],
  reducers: {
    setClients: (state, action: PayloadAction<Client[]>) => action.payload,
  },
});

export const {setClients} = clientsSlice.actions;
export default clientsSlice.reducer;
