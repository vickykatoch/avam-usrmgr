export interface IRole {
  id: number;
  name: string;
  supreme?: boolean;
  active?: boolean;
  acl: number;
}
