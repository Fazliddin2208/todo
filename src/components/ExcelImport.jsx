import React, { useState } from "react";
import * as XLSX from "xlsx"

function ExcelImport({ onImport }) {
  const [data, setData] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (e) => {
        const data = e.target.result
        const workbook = XLSX.read(data, { type: 'binary'})
        const sheetName = workbook.SheetNames[0]
        const sheet = workbook.Sheets[sheetName]
        const parsedData = XLSX.utils.sheet_to_json(sheet)
    }
  };

  return (
    <div>
      <input type="file" accept=".xls, .xlsx" onChange={handleFileUpload} />
      {data && (
        <div>
          <h2>Imported Data</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default ExcelImport;
