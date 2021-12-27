import React, { useState  } from "react";


export default function Statistics(Info) {
    const [rows, setRows] = useState(Info);
    function totalMade() {
        var total = 0
		for(let i = 0; i < rows.length; i++)
		{
			total += parseInt(((rows[i]['price'])))
        }
        return total
	};


    return (
        <div>
            <h1
				style={{
					display: 'flex', justifyContent: 'center', padding: '15px',
					border: '13px solid #b4f0b4', color: 'rgb(11, 167, 11)'
				}}>
				Stats
			</h1>   
            <div>
                Total Money Made : {totalMade()}
            </div>
        </div>
    )
}