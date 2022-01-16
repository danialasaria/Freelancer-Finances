import React, { useEffect, useState } from "react";
import TableDemo from "./TableDemo";
import { database, ref } from '../firebase';
import { useAuth } from '../contexts/AuthContext'
import Statistics from './Stats'
import { Button } from "react-bootstrap"

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
	var LessonInfo = []
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
					LessonInfo = Object.assign(LessonInfo, userData)
				}
		 	else {
				console.log("no data there")
				}
			});
	  }, []);
	  //Set parent state rows in MainTable so child components can inherit and edit in sync
	  const [rows, setRows] = useState(LessonInfo);
	//   const [stats, setStats] = useState(StatInfo)
	return (
		<div>
			<div style = {{position: 'absolute', top: '3vw', padding: "15px"}}>
			{/* <Button onClick={Statistics.forceUpdate()}>Update Stats</Button>  */}
			<Statistics lessons = {rows}/>
			</div>
			{/* Header with inline css */}
			<div className = "w-50" className="table" style={{margin: 'auto', width: '50%'}}>
			<h>
			<div className = "text-bold" style = {{position: 'absolute', top: '3vw'}}>
			Start logging your lessons by pressing "ADD LESSON” and filling in the relevant information
			<br></br>
			Everything will save automatically!
			</div>
			</h>
			<h1
				style={{
					display: 'flex', justifyContent: 'center', padding: '15px',
					border: '13px solid #b4f0b4', color: 'rgb(11, 167, 11)', position: 'absolute', top: '10vw'
				}}>
				Freelancer Finances
			</h1>
			{/* Table component below header */}
			<div style={{position: 'absolute', top: '18vw'}}>
			<TableDemo setRows = {setRows} rows = {rows}/>
			</div>
			</div>
		</div>
	)
}

export default MainTable;
