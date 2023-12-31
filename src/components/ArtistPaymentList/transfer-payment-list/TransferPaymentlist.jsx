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
import { IconButton } from "@mui/material";
import { BiCloudDownload } from "react-icons/bi";
import DownloadIcon from "../../../assets/buttonsicons/DownloadIcon.png";

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
                {/* <TableCell className={classess.table__col}>
                  <span className={classess.table__col__heading}>COMMENTS</span>
                </TableCell> */}
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
                      <span className={classess.table__row__transection_id}>
                        {transaction.transection_id}
                      </span>
                    </TableCell>

                    <TableCell className={classess.table__row}>
                      <span className={classess.table__row__date}>
                        {moment(transaction.createdAt).format("MMM DD YYYY")}
                      </span>
                    </TableCell>

                    <TableCell className={classess.table__row}>
                      <span className={classess.table__row__mode}>
                        {transaction.mode}
                      </span>
                    </TableCell>

                    <TableCell className={classess.table__row}>
                      <span className={classess.table__row__mode}>
                        ${" "}
                        {internationalNumberFormat.format(
                          transaction.amount_paid
                        )}
                      </span>
                    </TableCell>

                    <TableCell className={classess.table__row}>
                      <span className={classess.table__row__mode}>
                        {transaction.paid_against}
                      </span>
                    </TableCell>

                    <TableCell className={classess.table__row}>
                      <span className={classess.table__row__mode}>
                        {transaction.status}
                      </span>
                    </TableCell>

                    <TableCell
                      className={classess.table__row}
                      sx={{
                        borderTopRightRadius: "12px",
                        borderBottomRightRadius: "12px",
                      }}
                    >
                      <span className={classess.table__row__mode}>
                        <IconButton
                          className={classess.table__row__mode__iconContainer}
                        >
                          <img
                            src={DownloadIcon}
                            alt="Eye"
                            style={{ height: "12px", width: "16px" }}
                          />
                        </IconButton>
                      </span>
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
