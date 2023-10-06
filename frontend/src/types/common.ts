export interface IUserBasicInfo {
  email: string;
  name: string;
  phoneNumber: string;
}

export type TResponseStatus = "success" | "info" | "warning" | "error";

export type TUserInfo = Array<Record<string, string | number>>;
