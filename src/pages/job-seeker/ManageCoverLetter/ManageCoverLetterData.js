import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import withStyles from "@mui/styles/withStyles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { FormControlLabel, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Radio from "@mui/material/Radio";

import colors from "../../../vars.module.scss";

const useStyles = makeStyles({
  tableContainer: {
    margin: "1rem 0px",
  },
  table: {
    minWidth: 650,
  },
  iconBtn: {
    padding: 0,
  },
  data: {
    color: colors.disableColor,
  },
  coverLetterName: {
    color: colors.primaryColor,
    cursor: "pointer",
  },
});

const CustomRadio = withStyles({
  root: {
    padding: 0,
  },
  checked: {
    color: colors.primaryColor,
  },
})((props) => <Radio color="default" {...props} />);

export default function ManageCoverLetterData(props) {
  const classes = useStyles();

  return (
    <div className={classes.tableContainer}>
      <TableContainer>
        <Table className={classes.table} aria-label="manage cover letter table">
          <TableHead>
            <TableRow>
              <TableCell align="left">SI no.</TableCell>
              <TableCell align="center">Active</TableCell>
              <TableCell align="left">Cover letter name</TableCell>
              <TableCell align="left">Last modified</TableCell>
              <TableCell align="right">Manage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows.map((row) => (
              <TableRow key={row.sno}>
                <TableCell
                  className={classes.data}
                  align="left"
                  component="th"
                  scope="row"
                >
                  {row.sno + 1}
                </TableCell>
                <TableCell align="center">
                  <FormControlLabel
                    value={row.cLName}
                    checked={props.value === row.cLName}
                    onChange={props.radioOnChangeHandler}
                    control={<CustomRadio size="small" />}
                    label=""
                  />
                </TableCell>
                <TableCell
                  onClick={() => props.viewCoverLetterHandler(row.sno)}
                  className={classes.coverLetterName}
                  align="left"
                >
                  {row.cLName}
                </TableCell>
                <TableCell className={classes.data} align="left">
                  {row.lastModified}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => props.deleteCoverLetterHandler(row.sno)}
                    size="small"
                    className={classes.iconBtn}
                  >
                    <DeleteIcon className={classes.deleteIcon} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
