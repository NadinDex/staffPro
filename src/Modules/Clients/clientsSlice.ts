import { createSlice } from "@reduxjs/toolkit";
import { ClientDto } from "../../Dto/clientDto";
import { initialClients } from "../../Common/Constants/clients";

export interface ClientsState {
  clients: ClientDto[];
  isFetching: boolean;
  error?: string;
}

const initialClientsState = {
  isFetching: false,
  clients: initialClients,
} as ClientsState;

const clientsSlice = createSlice({
  name: "clients",
  initialState: initialClientsState,
  reducers: {
    setClients: (state, action) => {
      state.clients = action.payload as ClientDto[];
    },
  },
});

export const clientsActions = { ...clientsSlice.actions };
export default clientsSlice.reducer;
