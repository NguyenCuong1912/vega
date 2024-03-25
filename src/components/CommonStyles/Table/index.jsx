import React from "react";
import styles from "./table.module.css";
import { isEmpty } from "lodash";
const Table = ({ headers, body }) => {
  //! state
  //! function
  //! render
  const renderCell = () => {
    if (isEmpty(body)) {
      return (
        <tr>
          <td colSpan={headers?.length} style={{ textAlign: "center" }}>
            No Data
          </td>
        </tr>
      );
    } else {
      return body?.map((row, index) => {
        return (
          <tr>
            {Object.keys(row).map((item) => {
              return <td>{row[item]}</td>;
            })}
          </tr>
        );
      });
    }
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {headers?.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>{renderCell()}</tbody>
    </table>
  );
};

export default Table;
