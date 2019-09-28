import React, { FC } from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { IColumn } from "../../../../services/GridColumnProvider";
import { IUser } from "../../../../store/models";
import { Button } from "@material-ui/core";

interface IViewProps {
  columns: IColumn[];
  users: IUser[];
  onEdit: (user: IUser) => void;
}

const UserList: FC<IViewProps> = props => {
  const { columns, users, onEdit } = props;
  return (
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          {columns.map(column => (
            <TableCell key={column.field} align={column.align} style={{ minWidth: column.minWidth }}>
              {column.label}
            </TableCell>
          ))}
          <TableCell key="edit" style={{ minWidth: 100 }} align="right"></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map(user => {
          return (
            <TableRow hover role="checkbox" tabIndex={-1} key={user.id}>
              {columns.map(column => {
                return (
                  <TableCell padding="none" key={column.field} align={column.align}>
                    {column.format(user)}
                  </TableCell>
                );
              })}
              <TableCell key="edit" align="right" padding="none">
                <Button color="primary" onClick={() => onEdit(user)}>
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default UserList;
