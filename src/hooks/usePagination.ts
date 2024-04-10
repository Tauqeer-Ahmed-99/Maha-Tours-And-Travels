import { useEffect, useMemo, useState } from "react";

const usePagination = <T>(
  initialPage: number,
  initialRowsPerPage: number,
  rows: T[]
) => {
  const [page, setPage] = useState(initialPage);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);

  const rowsCount = useMemo(() => rows.length, [rows.length]);

  const totalNumberOfPages = useMemo(
    () => Math.ceil(rowsCount / rowsPerPage),
    [rowsCount, rowsPerPage]
  );

  const currentShowingMax = useMemo(
    () => rowsPerPage * page,
    [page, rowsPerPage]
  );

  const currentShowingMin = useMemo(
    () => currentShowingMax - rowsPerPage + 1,
    [currentShowingMax, rowsPerPage]
  );

  useEffect(() => {
    if (totalNumberOfPages < page && totalNumberOfPages > 1) {
      setPage(totalNumberOfPages);
    }
  }, [page, totalNumberOfPages]);

  const activeRows = rows.slice(
    rowsPerPage * page - rowsPerPage,
    rowsPerPage * page
  );

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (page: number) => {
    setRowsPerPage(page);
  };

  return {
    page,
    rowsPerPage,
    rowsCount,
    totalNumberOfPages,
    currentShowingMax,
    currentShowingMin,
    handleChangePage,
    handleChangeRowsPerPage,
    activeRows,
  };
};

export default usePagination;
