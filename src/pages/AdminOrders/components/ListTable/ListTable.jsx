import React, { useMemo } from "react";
import { LabelStatus, Table, TableCell, TableHeader, TableRow } from "./styles";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";
import { Link } from "react-router-dom";

const ListTable = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: (row, index) => index + 1,
        Cell: ({ value }) => <span>{value}</span>,
      },
      {
        Header: "Items",
        accessor: (row) => row.items.length + row.itemsCustomize.length,
      },
      {
        Header: "Precio",
        accessor: "totalAmount",
      },
      {
        Header: "Fecha de Creación",
        accessor: (row) => {
          const date = new Date(
            row.timestamp.seconds * 1000
          ).toLocaleDateString();
          return `${date}`;
        },
      },
      {
        Header: "Estado",
        accessor: (row) => {
          return <LabelStatus status={row.status}>{row.status}</LabelStatus>;
        },
        sortType: "alphanumeric",
      },
      {
        Header: "Accion",
        accessor: (row) => {
          return (
            <>
              <Link to={`/admin/orders/${row.id}`}>Más</Link>
            </>
          );
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <>
      <Table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableHeader
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : ""}
                  </span>
                </TableHeader>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <TableCell {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </tbody>
      </Table>
      <div>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Anterior
        </button>
        <span>
          Página{" "}
          <strong>
            {pageIndex + 1} de {pageOptions.length}
          </strong>{" "}
        </span>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Siguiente
        </button>
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 20].map((pageSizeOption) => (
            <option key={pageSizeOption} value={pageSizeOption}>
              Mostrar {pageSizeOption}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default ListTable;
