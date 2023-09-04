import React from "react";
import classess from "./style.module.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import moment from "moment";

const TransferPaymentList = ({ props, transefered_payments }) => {
  const internationalNumberFormat = new Intl.NumberFormat("en-US");

  return (
    <Box className={classess.page} varient="div" component="div">
      <Box component="div" varient="div" className={classess.page__list}>
        <TableContainer className={classess.table}>
          <Table stickyHeader={true} aria-label="sticky table">
            <TableHead className={classess.table__head}>
              <TableRow>
                <TableCell
                  className={classess.table__col}
                  sx={{
                    width: "150px",
                    maxWidth: "150px",
                  }}
                >
                  <span className={classess.table__col__heading}>
                    TRANSACTION ID
                  </span>
                </TableCell>
                <TableCell className={classess.table__col}>
                  <span className={classess.table__col__heading}>DATE</span>
                </TableCell>
                <TableCell className={classess.table__col}>
                  <span className={classess.table__col__heading}>MODE</span>
                </TableCell>
                <TableCell className={classess.table__col}>
                  <span className={classess.table__col__heading}>
                    AMOUNT PAID
                  </span>
                </TableCell>
                <TableCell className={classess.table__col}>
                  <span className={classess.table__col__heading}>
                    PAID AGAINST
                  </span>
                </TableCell>
                <TableCell className={classess.table__col}>
                  <span className={classess.table__col__heading}>STATUS</span>
                </TableCell>
                <TableCell className={classess.table__col}>
                  <span className={classess.table__col__heading}>COMMENTS</span>
                </TableCell>
                <TableCell className={classess.table__col}>
                  <span className={classess.table__col__heading}>RECEIPT</span>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={classess.table__brow}>
              {transefered_payments.map((transaction) => (
                <>
                  <Box sx={{ m: "1rem" }} />
                  <TableRow key={transaction.id}>
                    <TableCell
                      className={classess.table__row}
                      sx={{
                        width: "150px",
                        maxWidth: "150px",
                        borderTopLeftRadius: "12px",
                        borderBottomLeftRadius: "12px",
                      }}
                    >
                      <span className={classess.table__row__artistname}>
                        <a
                          className={classess.table__row__href}
                          rel="noopener noreferrer"
                        >
                          {transaction.transection_id}
                        </a>
                      </span>
                    </TableCell>

                    <TableCell
                      className={classess.table__row}
                      sx={{ color: "#fff" }}
                    >
                      {moment(transaction.createdAt).format("MMMM-DD-YYYY")}
                    </TableCell>

                    <TableCell
                      className={classess.table__row}
                      sx={{ maxWidth: 50, color: "#fff" }}
                    >
                      {transaction.mode}
                    </TableCell>

                    <TableCell
                      className={classess.table__row}
                      sx={{ color: "#fff" }}
                    >
                      ${" "}
                      {internationalNumberFormat.format(
                        transaction.amount_paid
                      )}
                    </TableCell>

                    <TableCell
                      className={classess.table__row}
                      sx={{ color: "#fff" }}
                    >
                      {transaction.paid_against}
                    </TableCell>

                    <TableCell
                      className={classess.table__row}
                      sx={{ color: "#fff" }}
                    >
                      {transaction.status}
                    </TableCell>

                    <TableCell
                      className={classess.table__row}
                      sx={{ color: "#fff" }}
                    >
                      View
                    </TableCell>

                    <TableCell
                      className={classess.table__row}
                      sx={{
                        borderTopRightRadius: "12px",
                        borderBottomRightRadius: "12px",
                        color: "#fff",
                      }}
                    >
                      .
                    </TableCell>
                  </TableRow>
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default TransferPaymentList;
