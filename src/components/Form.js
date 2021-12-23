import React, { useState } from 'react';
import StudentForm from './Table';
import jsonData from '../data.json';

function TableData() {
const [studentData, setStudentData] = useState(jsonData);

const tableRows = studentData.map((info) => {
	return (
	<tr>
		<td>{info.id}</td>
		<td>{info.name}</td>
		<td>{info.price}</td>
        <td>{info.date}</td>
	</tr>
	);
});

const addRows = (data) => {
	const totalStudents = studentData.length-1;
	data.id = totalStudents + 1;
	const updatedStudentData = [...studentData];
	updatedStudentData.push(data);
	setStudentData(updatedStudentData);
};

return (
	<div>
	<table className="table table-stripped">
		<thead>
		<tr>
			<th>Student #</th>
			<th>Name</th>
			<th>Price</th>
            <th>Date</th>
		</tr>
		</thead>
		<tbody>{tableRows}</tbody>
	</table>
	<StudentForm func={addRows} />
	</div>
);
}

export default TableData;
