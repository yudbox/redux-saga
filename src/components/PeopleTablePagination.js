import React from 'react';

const LIMIT = 10;

export const PeopleTablePagination = ({ page, total, onChange = () => {} }) => {
  const totalPages = Math.ceil(total / LIMIT);
  const sw = Array.from({ length: totalPages }, (_, index) => index + 1);
  return (
    <div>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (pageIndex) => {
          const isActive = pageIndex === page;
          return isActive ? (
            <b onClick={() => onChange(pageIndex)} key={pageIndex}>
              {pageIndex}
            </b>
          ) : (
            <span onClick={() => onChange(pageIndex)} key={pageIndex}>
              {pageIndex}
            </span>
          );
        }
      )}
    </div>
  );
};
