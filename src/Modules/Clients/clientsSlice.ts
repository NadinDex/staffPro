import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ClientDto } from "../../Dto/clientDto";
import { AppStateType } from "../../Config/Redux/configureStore";

export const getClientsFromServer = createAsyncThunk(
  `client/getClients`,
  async (_, { rejectWithValue, dispatch, getState }) => {
    try {
      const responce = await fetch("http://localhost:3002/allClients");
      if (responce) {
        const json = await responce.json();
        return json as ClientDto[];
      } else throw new Error("Clients not found");
    } catch (error) {
      return rejectWithValue(error);
    }
  },
  {
    condition: (_, { getState }) => {
      const { clients } = getState() as AppStateType;
      //if (clients.isFetching || clients.clients.length > 0) return false;
      return true;
    },
  }
);

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
      .addCase(getClientsFromServer.pending, (state, action) => {
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
