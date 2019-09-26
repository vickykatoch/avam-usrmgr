import React, { Component } from "react";


export default class GridCellButtonRenderer extends Component {
  constructor(props: any) {
    super(props);
    this.invokeParentMethod = this.invokeParentMethod.bind(this);
  }
  invokeParentMethod(args: any) {
    const props: any = this.props;
    props.context.componentParent.methodFromParent(`Row: ${props.node.rowIndex}, Col: ${props.colDef.headerName}`);
  }
  render() {
    return (
      <span>
        <button style={{ height: 20, lineHeight: 0.5 }} onClick={this.invokeParentMethod}>
          Invoke Parent
        </button>
      </span>
    );
  }
}
