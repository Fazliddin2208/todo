import React from "react";
import { Link } from "react-router-dom";
import ExcelExport from "./ExcelExport";

export default function Header() {
  return (
    <div className="header">
      <Link to="/">
        <h2>ToDo</h2>
      </Link>
      <div className="header__actions">
        <ExcelExport />
      </div>
    </div>
  );
}
