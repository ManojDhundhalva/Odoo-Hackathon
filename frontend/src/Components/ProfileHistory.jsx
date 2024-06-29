import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const columns = [
  { id: "user_name", label: "User Name", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 100 },
  {
    id: "contact_number",
    label: "Contact Number",
    minWidth: 170,
    align: "center",
  },
  {
    id: "waste_type",
    label: "Waste Type",
    minWidth: 170,
    align: "center",
  },
  {
    id: "price",
    label: "Price",
    minWidth: 170,
    align: "center",
  },
  {
    id: "transaction_id",
    label: "Transaction ID",
    minWidth: 170,
    align: "center",
  },
];

function createData(
  user_name,
  email,
  contact_number,
  waste_type,
  price,
  transaction_id
) {
  return {
    user_name,
    email,
    contact_number,
    waste_type,
    price,
    transaction_id,
  };
}

const rows = [
  createData(
    "Alice Johnson",
    "alice.johnson@example.com",
    "+1 234-567-8901",
    "Plastic",
    "$15.00",
    "TXN123456"
  ),
  createData(
    "Bob Smith",
    "bob.smith@example.com",
    "+1 234-567-8902",
    "Metal",
    "$25.00",
    "TXN123457"
  ),
  createData(
    "Carol White",
    "carol.white@example.com",
    "+1 234-567-8903",
    "Paper",
    "$10.00",
    "TXN123458"
  ),
  createData(
    "David Brown",
    "david.brown@example.com",
    "+1 234-567-8904",
    "Glass",
    "$20.00",
    "TXN123459"
  ),
  createData(
    "Eva Green",
    "eva.green@example.com",
    "+1 234-567-8905",
    "Organic",
    "$12.00",
    "TXN123460"
  ),
];

export default function ProfileHistory() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", m: 4 }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
