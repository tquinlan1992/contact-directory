import React from "react";

export const TableHeaders: React.FC<{ headers: string[] }> = ({ headers }) => (
  <thead>
    <tr>
      {headers.map((header, i) => (
        <th key={header + i}>{header}</th>
      ))}
    </tr>
  </thead>
);

export const TableRow: React.FC<{ columns: string[] }> = ({ columns }) => (
  <tr>
    {columns.map((column, i) => (
      <td key={column + i}>{column}</td>
    ))}
  </tr>
);

export const TableBody: React.FC = ({ children }) => <tbody>{children}</tbody>;

export const Table: React.FC = ({ children }) => {
  return <table>{children}</table>;
};
