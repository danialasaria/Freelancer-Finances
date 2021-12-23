import React from "react";
import TableDemo from "./TableDemo";

function TableUpdate() {
	return (
		<div>
			{/* Header with inline css */}
			<h1
				style={{
					display: 'flex', justifyContent: 'center', padding: '15px',
					border: '13px solid #b4f0b4', color: 'rgb(11, 167, 11)'
				}}>
				Freelancer Finances
			</h1>
			{/* Table component below header */}
			<TableDemo />
		</div>
	)
}

export default TableUpdate;
