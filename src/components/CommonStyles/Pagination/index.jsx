import React from "react";
import styles from "./pagination.module.css";
import Icons from "../../../assets/icons";
const Pagination = ({ currentPage, totalPages, handleOnChangePage }) => {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      handleOnChangePage(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <li
            key={i}
            className={currentPage === i ? "active" : ""}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </li>
        );
      }
    } else {
      for (let i = 1; i <= 5; i++) {
        pageNumbers.push(
          <li
            key={i}
            className={currentPage === i ? "active" : ""}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </li>
        );
      }
      pageNumbers.push(<li key="ellipsis">...</li>);
      pageNumbers.push(
        <li key={totalPages} onClick={() => handlePageChange(totalPages)}>
          {totalPages}
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <ul className={styles.pagination}>
      <li
        className={currentPage === 1 ? styles.disabled : ""}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <Icons.ArrowLeft />
      </li>
      {renderPageNumbers()}
      <li
        className={currentPage === totalPages ? styles.disabled : ""}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <Icons.ArrowRight />
      </li>
    </ul>
  );
};

export default Pagination;
