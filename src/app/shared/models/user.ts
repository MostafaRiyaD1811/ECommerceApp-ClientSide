import { IToken } from "./token";


export interface IUser {
  userName: string;
  email: string;
  token: IToken;
}
