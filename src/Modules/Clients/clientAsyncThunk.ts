import { createAsyncThunk } from "@reduxjs/toolkit";
import { ClientDto } from "../../Dto/clientDto";
import { AppStateType } from "../../Config/Redux/configureStore";

export const getClientsFromServer = createAsyncThunk(
  `client/getClients`,
  async (_, { rejectWithValue }) => {
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
