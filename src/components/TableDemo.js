import React, { useState  } from "react";
import CreateIcon from "@material-ui/icons/Create";
import {
	Box, Button, Snackbar, Table,
	TableBody, TableCell, TableHead, TableRow
} from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddBoxIcon from "@material-ui/icons/AddBox";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { database, ref } from '../firebase';
import { useAuth } from '../contexts/AuthContext'
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import "../Styles/Table.css"
// Creating styles
const useStyles = makeStyles({
	root: {
		"& > *": {
			borderBottom: "unset",
		},
	},
	table: {
		 maxWidth: 600,
	},
	snackbar: {
		bottom: "104px",
	},
});

function TableDemo(Info) {
	// Creating style object
	const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
	}));
	const classes = useStyles();

	const StyledTableRow = styled(TableRow)(({ theme }) => ({
	  '&:nth-of-type(odd)': {
	    backgroundColor: theme.palette.action.hover,
	  },
	  // hide last border
	  '&:last-child td, &:last-child th': {
	    border: 0,
	  },
	}));

	// Defining a state named rows
	// which we can update by calling on setRows function
	const [rows, setRows] = useState(Info);
		//  { id: "", firstname: "", price: "", date: "" },


	// Initial states
	const [open, setOpen] = React.useState(true);
	const [isEdit, setEdit] = React.useState(false);
	const [disable, setDisable] = React.useState(true);
	const [showConfirm, setShowConfirm] = React.useState(false);
	const { currentUser } = useAuth()

	// Function For closing the alert snackbar
	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpen(false);
	};

	// Function For adding new row object
	const handleAdd = () => {
		setRows([
			...rows,
			{
				id: rows.length + 1, firstname: "",
				price: " ", date: ""
			},
		]);
		setEdit(true);
	};

	// Function to handle edit
	const handleEdit = (i) => {
		// If edit mode is true setEdit will
		// set it to false and vice versa
		setEdit(!isEdit);
		// setDisable(true);
		// setOpen(true);
	};

    const convertEmail = (userEmail) => {
		// If edit mode is true setEdit will
		// set it to false and vice versa
		let email = userEmail.replace(".",">")
		email = email.replace("#",">")
		email = email.replace("$",">")
		email = email.replace("[",">")
		email = email.replace("]",">")
		return email
	};

    const Push = () => {
		const userEmail = convertEmail(currentUser.email)
        database.ref(userEmail).set({
          rows : rows,
        }).catch(alert);
      }

	// Function to handle save
	const handleSave = () => {
        Push()
		setEdit(!isEdit);
        setRows(rows);
		console.log("saved : ", rows);
		setDisable(true);
		setOpen(true);
	};

	// The handleInputChange handler can be set up to handle
	// many different inputs in the form, listen for changes
	// to input elements and record their values in state
	const handleInputChange = (e, index) => {
		setDisable(false);
		const { name, value } = e.target;
		const list = [...rows];
		list[index][name] = value;
		setRows(list);
		handleSave()
	};

	// Showing delete confirmation to users
	const handleConfirm = () => {
		setShowConfirm(true);
	};

	// Handle the case of delete confirmation where
	// user click yes delete a specific row of id:i
	const handleRemoveClick = (i) => {
		const list = [...rows];
		list.splice(i, 1);
		setRows(list);
		setShowConfirm(false);

		const userEmail = convertEmail(currentUser.email)
		const ref = database.ref(userEmail + '/rows/'+ i);
		ref.set(null)
	};

	// Handle the case of delete confirmation
	// where user click no
	const handleNo = () => {
		setShowConfirm(false);
	};
		
return (
	<TableContainer component={Paper}>
	<TableBody>
	<Snackbar
		open={open}
		autoHideDuration={2000}
		onClose={handleClose}
		className={classes.snackbar}
	>
		<Alert onClose={handleClose} severity="success">
		Record saved successfully!
		</Alert>
	</Snackbar>
	<Box margin={1}>
		<div style={{ display: "flex", justifyContent: "space-between" }}>
		{/*if isEdit is true then show the following div*/}
		<div>
			{isEdit ? (
			<div>
				<Button onClick={handleAdd}>
				<AddBoxIcon onClick={handleAdd} />
				Add Lesson
				</Button>
				{/* {rows.length !== 0 && ( */}
				{/* // <div>
				// 	{disable ? ( */}
				{/* // 	<Button disabled align="right" onClick={handleSave}>
				// 		<DoneIcon />
				// 		SAVE
				// 	</Button>
				// 	) : (
				// 	<Button align="right" onClick={handleSave}>
				// 		<DoneIcon />
				// 		SAVE
				// 	</Button>
				// 	)}
				// </div>
				)} */}
			</div>
			) : (
			<div>
				<Button onClick={handleAdd}>
				<AddBoxIcon onClick={handleAdd} />
				Add Lesson
				</Button>
				{/* <Button align="right" onClick={handleEdit}>
				<CreateIcon />
				EDIT
				</Button> */}
			</div>
			)}
		</div>
		</div>
		{/* <TableRow align="center"></TableRow> */}
		<Table
		className={classes.table}
		size="small"
		aria-label="a dense table"
		>
		<TableHead className="table">
			<TableRow>
			<StyledTableCell padding = "normal">Student Name</StyledTableCell>
			<StyledTableCell padding = "normal">Price</StyledTableCell>
			<StyledTableCell padding = "normal">Date</StyledTableCell>
			{/* <TableCell align="center"></TableCell> */}
			</TableRow>
		</TableHead>
		<TableBody>
			{rows.map((row, i) => {
			return (
				<div>
				<TableRow>
					{isEdit ? (
					<div>
						<TableCell padding="normal">
						<input
							value={row.firstname}
							name="firstname"
							onChange={(e) => handleInputChange(e, i)}
						/>
						</TableCell>
						<TableCell padding="normal">
						<input
							value={row.price}
							name="price"
							onChange={(e) => handleInputChange(e, i)}
						/>
						</TableCell>
						<TableCell padding="normal">
						<input
							value={row.date}
							name="date"
							onChange={(e) => handleInputChange(e, i)}
						/>
						</TableCell>
					</div>
					) : (
						<div>
						<TableCell padding="normal">
						<input
							value={row.firstname}
							name="firstname"
							onChange={(e) => handleInputChange(e, i)}
						/>
						</TableCell>
						<TableCell padding="normal">
						<input
							value={row.price}
							name="price"
							onChange={(e) => handleInputChange(e, i)}
						/>
						</TableCell>
						<TableCell padding="normal">
						<input
							value={row.date}
							name="date"
							onChange={(e) => handleInputChange(e, i)}
						/>
						</TableCell>
					</div>
					)}
					{/* {isEdit ? 
					(
					<Button className="mr10" onClick={handleConfirm}>
						<ClearIcon />
					</Button>
					) : ( */}
					<Button className="mr10" onClick={handleConfirm}>
						<DeleteOutlineIcon />
					</Button>
					{/* )} */}
					{showConfirm && (
					<div>
						<Dialog
						open={showConfirm}
						onClose={handleNo}
						aria-labelledby="alert-dialog-title"
						aria-describedby="alert-dialog-description"
						>
						<DialogTitle id="alert-dialog-title">
							{"Confirm Delete"}
						</DialogTitle>
						<DialogContent>
							<DialogContentText id="alert-dialog-description">
							Are you sure to delete
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button
							onClick={() => handleRemoveClick(i)}
							color="primary"
							autoFocus
							>
							Yes
							</Button>
							<Button
							onClick={handleNo}
							color="primary"
							autoFocus
							>
							No
							</Button>
						</DialogActions>
						</Dialog>
					</div>
					)}
				</TableRow>
				</div>
			);
			})}
		</TableBody>
		</Table>
	</Box>
	</TableBody>
	</TableContainer>
);

}

export default TableDemo;
