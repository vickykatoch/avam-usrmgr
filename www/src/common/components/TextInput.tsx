import React, { FC } from "react";
import "./TextInput.css";

interface IInputPros {
  id: string;
  name: string;
  label: string;
  onChange: (evt: any) => void;
  value: string;
  error?: string;
}

const TextInput: FC<IInputPros> = (props: IInputPros) => {
  let wrapperClass = "d-flex flex-column mt-2";
  props.error && props.error.length > 0 && (wrapperClass += " has-error");
  return (
    <div className={wrapperClass}>     
      <span>{props.label}</span>
      <input id={props.id} type="text" onChange={props.onChange} name={props.name} value={props.value} />
      {props.error && <div className="alert alert-danger">{props.error}</div>}
    </div>
  );
};

export default TextInput;
