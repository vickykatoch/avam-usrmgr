import { IUser } from "../models";

export function mapUsersToArray(users: Record<string, IUser>): IUser[] {
  return Object.values(users);
}
