export interface AccountDto {
  id: string;
  date: Date;
  deposit: number;
  paid: number;
  state: string;
}
export interface AccountViewDto extends AccountDto {
  depositStr: string;
  paidStr: string;
}
