import {
  createSlice,
  createEntityAdapter,
  createSelector,
  EntityState,
} from "@reduxjs/toolkit";
import { AccountDto } from "../../Dto/accountDto";
import { AppStateType } from "../../Config/Redux/configureStore";

export interface AccountsState {
  accounts: AccountDto[];
  operationSucceded?: boolean;
}

const initialState = {
  accounts: new Array<AccountDto>(),
} as AccountsState;

const dateSortingFunc = (x: AccountDto, y: AccountDto) =>
  Date.parse(JSON.stringify(x.date)) - Date.parse(JSON.stringify(x.date));
const accountAdapter = createEntityAdapter<AccountDto>({
  selectId: (account) => account.id,
  // Keep the "all IDs" array sorted based on book titles
  sortComparer: dateSortingFunc,
});

const accountSlice = createSlice({
  name: "invoices",
  initialState: accountAdapter.getInitialState(),
  reducers: {
    addAccount: accountAdapter.addOne,
    updateAccount: accountAdapter.updateOne,
    deleteAccount: accountAdapter.removeOne,
  },
});

export const {
  selectAll: selectAllAccounts,
  selectIds,
} = accountAdapter.getSelectors((store: AppStateType) => store.invoices);
export const accountSelectorWithFilter = (
  filter: (accounts: AccountDto[]) => AccountDto[]
) => createSelector(selectAllAccounts, filter);
export const accountActions = { ...accountSlice.actions };
export default accountSlice.reducer;
