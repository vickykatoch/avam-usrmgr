import { ColDef, ICellRendererParams } from "ag-grid-community";

export interface IColumn {
  field: string;
  label: string;
  align?: "inherit" | "left" | "center" | "right" | "justify" | undefined;
  minWidth?: number;
  format: (data: any) => any;
}

class GridServiceProvider {
  private gridsColumnMap = new Map<string, ColDef[]>();
  private tableColumns = new Map<string, IColumn[]>();

  constructor() {
    this.gridsColumnMap.set("UsersGrid", [
      {
        colId: "editcol",
        cellRenderer: (params: ICellRendererParams) => {
          debugger;
          console.log(params.context);
          const onClick = () => params.context.play(params.data);
          return `<button>Edit</button>`;
        }
      },
      {
        headerName: "SID",
        field: "id",
        sortable: true,
        filter: true
      },
      {
        headerName: "First Name",
        field: "firstName",
        sortable: true,
        filter: true
      },
      {
        headerName: "Last Name",
        field: "lastName",
        sortable: true,
        filter: true
      },
      {
        headerName: "Is Active",
        field: "active",
        sortable: true,
        filter: true
      }
    ]);
    this.tableColumns.set("UsersGrid", [
      { field: "id", label: "SID", align: "center", minWidth: 100, format: data => data["id"] },
      { field: "firstName", label: "First Name", align: "center", minWidth: 100, format: data => data["firstName"] },
      { field: "lastName", label: "Last Name", align: "center", minWidth: 100, format: data => data["lastName"] },
      { field: "active", label: "Is Active", align: "center", minWidth: 100, format: data => (data["active"] && "true") || "false" }
    ]);
  }

  public getColumns(gridName: string): IColumn[] {
    const columns = this.tableColumns.get(gridName);
    return (columns && columns) || [];
  }
}
export default new GridServiceProvider();
