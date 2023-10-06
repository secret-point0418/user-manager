import { IUserBasicInfo } from "../types/common";
import instance from "./axios";

export const createUser = async (user: IUserBasicInfo) => {
  const response = await instance.post("/users", user);
  return response.data;
};

export const getUser = async (id: string) => {
  const response = await instance.get(`/users/${id}`);
  return response.data;
};

export const updateUser = async (id: string, user: IUserBasicInfo) => {
  const response = await instance.put(`/users/${id}`, user);
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await instance.delete(`/users/${id}`);
  return response.data;
};
