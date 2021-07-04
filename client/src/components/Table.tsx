import React from "react";

const TableHeaders: React.FC<{ headers: string[] }> = ({ headers }) => (
  <thead>
    <tr>
      {headers.map((header, i) => (
        <th key={header + i}>{header}</th>
      ))}
    </tr>
  </thead>
);

const TableRow: React.FC<{ columns: string[] }> = ({ columns }) => (
  <tr>
    {columns.map((column, i) => (
      <td key={column + i}>{column}</td>
    ))}
  </tr>
);

const TableBody: React.FC = ({ children }) => <tbody>{children}</tbody>;

const Table: React.FC = ({ children }) => {
  return <table>{children}</table>;
};

export { Table, TableHeaders, TableBody, TableRow };
