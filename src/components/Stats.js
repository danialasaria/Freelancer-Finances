import React, { useState  } from "react";


const Statistics = ({rows}) => {
    // const [rows, setRows] = useState(Info);
    console.log(rows)
    // function totalMade() {
        var total = 0
        console.log("Stats called")
		for(let i = 0; i < rows.length; i++)
		{
            total += parseInt(((rows[i]['price'])))
            console.log(total)
        }
        // return total
	// };


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
                Total Money Made : {total}
            </div>
        </div>
    )
}

export default Statistics