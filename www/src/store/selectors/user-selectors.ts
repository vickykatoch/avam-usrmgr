import { IUser } from "../models";

export function mapToArray<T>(users: Record<string, T>): T[] {
  return Object.values(users);
}
