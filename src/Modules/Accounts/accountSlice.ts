import { createSlice } from "@reduxjs/toolkit";
import { AccountDto } from "../../Dto/accountDto";

export interface AccountsState {
  accounts: AccountDto[];
}

const initialState = {
  accounts: new Array<AccountDto>(),
} as AccountsState;

const accountSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addAccount: (state, action) => {
      const account = action.payload as AccountDto;
      if (!state.accounts.find((x) => x.id == account.id))
        state.accounts.push(account);
      //else update account
    },
    updateAccount: (state, action) => {
      const newValue = action.payload as AccountDto;
      let accountForUpdate = state.accounts.find((x) => x.id == newValue.id);
      if (accountForUpdate) {
        accountForUpdate.deposit = newValue.deposit;
        accountForUpdate.date = newValue.date;
        accountForUpdate.paid = newValue.paid;
        accountForUpdate.state = newValue.state;
      } else {
        state.accounts.push(newValue);
      }
    },
    deleteAccount: (state, action) => {
      const id = action.payload as string;
      const account = state.accounts.find((x) => x.id == id);
      if (account) {
        const accountIndex = state.accounts.indexOf(account);
        state.accounts.splice(accountIndex, 1);
      }
    },
  },
});

export const accountActions = { ...accountSlice.actions };
export default accountSlice.reducer;
