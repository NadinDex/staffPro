import { createSlice } from "@reduxjs/toolkit";
import { ClientDto } from "../../Dto/clientDto";

interface ClientsState {
  clients: ClientDto[];
  isFetching: boolean;
  error?: string;
}

const initialClientsState = {
  isFetching: false,
  clients: new Array<ClientDto>(),
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
