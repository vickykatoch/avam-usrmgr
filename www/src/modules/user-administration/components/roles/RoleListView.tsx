import React, { FC } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { IColumn } from "../../../../services/GridColumnProvider";
import { IRole } from "../../../../store/models";
import { Button } from "@material-ui/core";

interface IViewProps {
  columns: IColumn[];
  roles: IRole[];
  onEdit: (role: IRole) => void;
}

const RoleListView: FC<IViewProps> = props => {
  const { columns, roles, onEdit } = props;
  return (
    <Table stickyHeader size="small">
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
        {roles.map(role => {
          return (
            <TableRow hover role="checkbox" tabIndex={-1} key={role.id}>
              {columns.map(column => {
                return (
                  <TableCell padding="none" key={column.field} align={column.align}>
                    {column.format(role)}
                  </TableCell>
                );
              })}
              <TableCell key="edit" align="right" padding="none">
                <Button color="primary" onClick={() => onEdit(role)}>
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
export default RoleListView;
