import React, { useState } from "react";
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


// const starCountRef = ref(db, 'posts/' + postId + '/starCount');
// onValue(starCountRef, (snapshot) => {
//   const data = snapshot.val();
//   updateStarCount(postElement, data);
// });

// Creating styles
const useStyles = makeStyles({
	root: {
		"& > *": {
			borderBottom: "unset",
		},
	},
	table: {
		minWidth: 650,
	},
	snackbar: {
		bottom: "104px",
	},
});

function TableDemo() {
	// Creating style object
	const classes = useStyles();

	// Defining a state named rows
	// which we can update by calling on setRows function
	const [rows, setRows] = useState([
		{ id: 1, firstname: "", price: "", date: "" },
	]);

	// Initial states
	const [open, setOpen] = React.useState(false);
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
				price: "", date: ""
			},
		]);
		setEdit(true);
	};

	// Function to handle edit
	const handleEdit = (i) => {
		// If edit mode is true setEdit will
		// set it to false and vice versa
		setEdit(!isEdit);
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

		// Attach an asynchronous callback to read the data at our posts reference
		// ref.on('value', (snapshot) => {
		// console.log(snapshot.val());
		// }, (errorObject) => {
		// console.log('The read failed: ' + errorObject.name);
		// }); 
	};

	// Handle the case of delete confirmation
	// where user click no
	const handleNo = () => {
		setShowConfirm(false);
	};

	const populateTable = () => {
		//while(current row exists) - call add func with these paramaters 
		let count = 0
		const userEmail = convertEmail(currentUser.email)
		var userData;
		while(true)
		{
			const ref = database.ref(userEmail + '/rows/'+ count);
			ref.once("value", snapshot => {
				userData = snapshot.val();
					if(userData)
					{
						console.log(userData)
						const firstnameval = userData["firstname"]
						const idval = userData["id"]
						const priceval = userData["price"]
						const dateval = userData["date"]
						setRows([
							...rows,
							{
								id: idval, firstname: firstnameval,
								price: priceval, date: dateval
							},
						]);
						// setEdit(true);
						// handleSave()
						count++
					}
				    else {
					console.log("no data there")
				  }
			});
			if(!userData)
			{
				break
			}
		}
	
	};

return (
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
		<div>
			{isEdit ? (
			<div>
				<Button onClick={handleAdd}>
				<AddBoxIcon onClick={handleAdd} />
				ADD
				</Button>
				{rows.length !== 0 && (
				<div>
					{disable ? (
					<Button disabled align="right" onClick={handleSave}>
						<DoneIcon />
						SAVE
					</Button>
					) : (
					<Button align="right" onClick={handleSave}>
						<DoneIcon />
						SAVE
					</Button>
					)}
				</div>
				)}
			</div>
			) : (
			<div>
				<Button onClick={populateTable}>
				<AddBoxIcon onClick={populateTable} />
				Populate
				</Button>
				<Button onClick={handleAdd}>
				<AddBoxIcon onClick={handleAdd} />
				ADD
				</Button>
				<Button align="right" onClick={handleEdit}>
				<CreateIcon />
				EDIT
				</Button>
			</div>
			)}
		</div>
		</div>
		<TableRow align="center"></TableRow>

		<Table
		className={classes.table}
		size="small"
		aria-label="a dense table"
		>
		<TableHead>
			<TableRow>
			<TableCell>First Name</TableCell>
			<TableCell>Price</TableCell>
			<TableCell >Date</TableCell>
			{/* <TableCell align="center">City</TableCell> */}
			<TableCell align="center"></TableCell>
			</TableRow>
		</TableHead>
		<TableBody>
			{rows.map((row, i) => {
			return (
				<div>
				<TableRow>
					{isEdit ? (
					<div>
						<TableCell padding="none">
						<input
							value={row.firstname}
							name="firstname"
							onChange={(e) => handleInputChange(e, i)}
						/>
						</TableCell>
						<TableCell padding="none">
						<input
							value={row.price}
							name="price"
							onChange={(e) => handleInputChange(e, i)}
						/>
						</TableCell>
						<TableCell padding="none">
						<input
							value={row.date}
							name="date"
							onChange={(e) => handleInputChange(e, i)}
						/>
						</TableCell>
						{/* <TableCell padding="none">
						<select
							style={{ width: "100px" }}
							name="city"
							value={row.city}
							onChange={(e) => handleInputChange(e, i)}
						>
							<option value=""></option>
							<option value="Karanja">Karanja</option>
							<option value="Hingoli">Hingoli</option>
							<option value="Bhandara">Bhandara</option>
							<option value="Amaravati">Amaravati</option>
							<option value="Pulgaon">Pulgaon</option>
						</select>
						</TableCell> */}
					</div>
					) : (
					<div>
						<TableCell component="th" scope="row">
						{row.firstname}
						</TableCell>
						<TableCell component="th" scope="row">
						{row.price}
						</TableCell>
						<TableCell component="th" scope="row">
						{row.date}
						</TableCell>
						{/* <TableCell component="th" scope="row" align="center">
						{row.city}
						</TableCell> */}
						<TableCell
						component="th"
						scope="row"
						align="center"
						></TableCell>
					</div>
					)}
					{isEdit ? (
					<Button className="mr10" onClick={handleConfirm}>
						<ClearIcon />
					</Button>
					) : (
					<Button className="mr10" onClick={handleConfirm}>
						<DeleteOutlineIcon />
					</Button>
					)}
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
);
}

export default TableDemo;
