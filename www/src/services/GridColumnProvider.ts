import { ColDef } from "ag-grid-community";

class GridColumnProviderService {
  private gridsColumnMap = new Map<string, ColDef[]>();
  constructor() {
    this.gridsColumnMap.set("UsersGrid", [
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
  }

  public getColumns(gridName: string): ColDef[] {
    const columns = this.gridsColumnMap.get(gridName);
    return (columns && columns) || [];
  }
}
export default new GridColumnProviderService();
