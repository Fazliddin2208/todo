import React, { useEffect, useState } from "react";
import ExcelJS from "exceljs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

function ExcelExport() {
  const handleExport = () => {
    const array = JSON.parse(sessionStorage.getItem("todos"));
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet 1");

    const headers = [
      "priority",
      "main_title",
      "main_description",
      "id",
      "isDone",
      "index",
      "childrenId",
      "childrenTitle",
      "childrenDescription",
      "childrenPriority",
      "childrenIsDone",
      "comments",
    ];
    worksheet.addRow(headers);

    array.forEach((item) => {
      const rowData = [
        item.priority,
        item.main_title,
        item.main_description,
        item.id,
        item.isDone,
        item.index,
        item.children.map((child) => child.id).join(", "), // Concatenate children titles
        item.children.map((child) => child.main_title).join(", "), // Concatenate children titles
        item.children.map((child) => child.main_description).join(", "), // Concatenate children titles
        item.children.map((child) => child.priority).join(", "), // Concatenate children titles
        item.children.map((child) => child.isDone).join(", "), // Concatenate children titles
        item.comment.map((c) => c.text).join(", "), // Concatenate comment texts
      ];
      worksheet.addRow(rowData);
    });

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "ToDo datas.xlsx";
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <div>
      <button onClick={handleExport}>Export <FontAwesomeIcon icon={faUpload} /> </button>
    </div>
  );
}

export default ExcelExport;
