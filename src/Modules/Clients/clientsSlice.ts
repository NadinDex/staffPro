import { createSlice } from "@reduxjs/toolkit";
import { ClientDto } from "../../Dto/clientDto";
import { initialClients } from "../../Common/Constants/clients";

export interface ClientsState {
  clients: ClientDto[];
  isFetching: boolean;
  error?: string;
}

const getInitialClients = () => {
  return fetch("http://localhost:3002/allClients")
    .then((r) => r.json())
    .then((r) =>
      (r as ClientDto[]).map((x) => {
        x.imageSrc = "http://localhost:3002" + x.imageSrc;
        return x;
      })
    );
  /*try {
    const responce = await fetch("http://localhost:3002/allClients");
    const json = await responce.json();
    return (await JSON.parse(json)) as ClientDto[];
  } catch (e) {
    console.log(e);
  }*/
};

const initialClientsState = ({
  isFetching: false,
  clients: getInitialClients(),
} as unknown) as ClientsState;

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
