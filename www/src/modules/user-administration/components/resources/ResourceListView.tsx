import React, { FC } from "react";
import { IColumn } from "../../../../services/GridColumnProvider";
import { IResource } from "../../../../store/models";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Button } from "@material-ui/core";

interface IViewProps {
  columns: IColumn[];
  resources: IResource[];
  onEdit: (resource: IResource) => void;
}

const ResourceListView: FC<IViewProps> = ({ columns, resources, onEdit }) => {
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
        {resources.map(resource => {
          return (
            <TableRow hover role="checkbox" tabIndex={-1} key={resource.id}>
              {columns.map(column => {
                return (
                  <TableCell padding="none" key={column.field} align={column.align}>
                    {column.format(resource)}
                  </TableCell>
                );
              })}
              <TableCell key="edit" align="right" padding="none">
                <Button color="primary" onClick={() => onEdit(resource)}>
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

export default ResourceListView;
