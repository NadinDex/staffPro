import { createSlice } from "@reduxjs/toolkit";
import { ClientDto } from "../../Dto/clientDto";
import { getClientsFromServer } from "./clientAsyncThunk";

export interface ClientsState {
  clients: ClientDto[];
  isFetching: boolean;
  error?: string;
}

const initialClientsState = ({
  isFetching: false,
  clients: [],
} as unknown) as ClientsState;

const clientsSlice = createSlice({
  name: "clients",
  initialState: initialClientsState,
  reducers: {
    setClients: (state, action) => {
      state.clients = action.payload as ClientDto[];
    },
    getClients: () => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getClientsFromServer.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(getClientsFromServer.fulfilled, (state, action) => {
        state.isFetching = false;
        state.clients = action.payload as ClientDto[];
        state.error = undefined;
      })
      .addCase(getClientsFromServer.rejected, (state, action) => {
        state.isFetching = false;
        state.error = "Error on getting clients: " + action.error.message;
      });
  },
});

export const clientsActions = { ...clientsSlice.actions, getClientsFromServer };
export default clientsSlice.reducer;
