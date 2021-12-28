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
	  }, []);
	  const [rows, setRows] = useState(Info);
	  console.log(rows)
	return (
		<div>
			<div style = {{position: 'absolute', top: '3vw',}}>
			<Statistics rows = {rows}/>
			</div>
			{/* Header with inline css */}
			<h1
				style={{
					display: 'flex', justifyContent: 'center', padding: '15px',
					border: '13px solid #b4f0b4', color: 'rgb(11, 167, 11)'
				}}>
				Freelancer Finances
			</h1>
			{/* Table component below header */}
			<TableDemo setRows = {setRows} rows = {rows}/>
			{/* { TableDemo(Info)} */}
		</div>
	)
}

export default MainTable;
