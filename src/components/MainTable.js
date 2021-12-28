import React, { useEffect, useState } from "react";
import TableDemo from "./TableDemo";
import { database, ref } from '../firebase';
import { useAuth } from '../contexts/AuthContext'
import Statistics from './Stats'

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

function MainTable() {
	var Info = []
	var length
	const { currentUser } = useAuth()
	useEffect(() => {
		// Runs ONCE after initial rendering
		const userEmail = convertEmail(currentUser.email)
		var userData;						 
		const ref = database.ref(userEmail + '/rows/');
		ref.once("value", snapshot => {
		userData = snapshot.val();
			if(userData)
				{
					Info = Object.assign(Info, userData)
				}
		 	else {
				console.log("no data there")
				}
			});
		console.log(Object.keys(Info).length)
	  }, []);
	  //Set parent state rows in MainTable so child components can inherit and edit in sync
	  const [rows, setRows] = useState(Info);
	return (
		<div>
			<div style = {{position: 'absolute', top: '3vw', padding: "15px"}}>
			<Statistics rows = {rows} length = {length}/>
			</div>
			{/* Header with inline css */}
			<div className = "w-50" style={{margin: 'auto', width: '50%'}}>
			<h>
			<div className = "text-bold" style = {{position: 'absolute', top: '3vw'}}>
			Start logging your lessons by pressing "ADD LESSON” and filling in the relevant information!
			</div>
			</h>
			<h1
				style={{
					display: 'flex', justifyContent: 'center', padding: '15px',
					border: '13px solid #b4f0b4', color: 'rgb(11, 167, 11)'
				}}>
				Freelancer Finances
			</h1>
			{/* Table component below header */}
			<TableDemo setRows = {setRows} rows = {rows}/>
			</div>
		</div>
	)
}

export default MainTable;
