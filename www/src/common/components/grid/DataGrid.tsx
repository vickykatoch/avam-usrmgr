import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import { GridOptions } from "ag-grid-community";


export interface IGridProps {
    options: GridOptions;
}

export default class extends Component<IGridProps> {
  constructor(props: IGridProps) {
    super(props);
  }

  render() {
      const options = this.props
      return <AgGridReact></AgGridReact>;
  }
}
