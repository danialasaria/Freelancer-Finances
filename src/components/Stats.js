import { TableCell, TableBody, TableRow } from "@material-ui/core";
import React, { useState, useEffect  } from "react";
// import { Button } from "react-bootstrap"
// import { useAuth } from '../contexts/AuthContext'
// import { database, ref } from '../firebase';
// var list = ([
//     {name: "a", balance: 0},
// ]);
const Statistics = ({lessons}) => {
    console.log(lessons)
    const [Profit, setProfit] = useState(0);

    //commenting this out creates turner 11
    const [rows, setRows] = useState([
        // {name: "", balance: 0},
    ]);
        function totalMade() {
            var total = 0
            for(let i = 0; i < lessons.length; i++)
            {
                if((lessons[i]['price'])==="")
                {
                    continue
                }
                else{
                    total += parseInt(((lessons[i]['price'])))
                }
            }
            return total
        }

        function handleBalance(index, priceval)
        {
            setRows([index]['balance'] += parseInt(priceval));
        }

        function handleAdd(nameval, balanceval)
        {
            setRows([
                ...rows,
                {
                    name: nameval,
                    balance: balanceval
                },
            ]);
        }

        const calculateBalances = () => {
            console.log(lessons)
            for(let i = 0; i < lessons.length; i++)
            {
                console.log(rows)
                // var found = false
                if((lessons[i]['price'])==="")
                {
                    console.log("EMPTY ROW")
                    continue
                }
                else{
                    console.log("ENTERED ELSE")
                    //loop through rows of names to see if already
                    //instead find index of name in balance - if yes add price 
                    //if no then add name
                    // for(let j = 0; j < lessons.length; j++)
                    // {
                        console.log(rows)
                        console.log(lessons[i]['name'])
                        const index =  rows.findIndex( (element) => element.name === lessons[i]['name']);
                        // var two = list[0]['name']
                        console.log(lessons[i]['name'])
                        console.log(index)
                        if(index!= -1)
                        {
                            console.log("FOund same")
                            handleBalance(index, lessons[i]['price'])
                            // rows[index]['balance'] += parseInt(((lessons[i]['price'])))
                            // found = true
                            // break
                        }
                        else if(index == -1)
                        {
                            console.log("Not Found")
                            //length isn't increasing after line 65
                            //do i have to handle this in a separate func?
                            handleAdd(lessons[i]['name'], lessons[i]['price']);
                            // setRows([
                            //     ...rows,
                            //     {
                            //         name: lessons[i]['name'],
                            //         balance: lessons[i]['price']
                            //     },
                            // ]);
                            // rows[rows.length-1]['name'] = lessons[i]['name']
                            // rows[rows.length-1]['balance'] = lessons[i]['price']
                            console.log(rows)
                            console.log(i)
                        }
                    }
                    // if(!found)
                    // {
                    //     console.log(lessons[i]['name'])
                    //     console.log(lessons[i]['price'])
                    //     list[0]['name'] = lessons[i]['name']
                    //     list[0]['balance'] = lessons[i]['price']
                    //     console.log("NAME NOT ALREADy INSERTED")
                        // setbalances([
                        //     ...balances,
                        //     {
                        //         firstname: rows[i]['firstname'],
                        //         balance: rows[i]['price'], 
                        //     },
                        // ]);
                        // console.log(list)
                        // setRows(list)
                    // }
            }            
            // setRows(list)
            console.log(rows)
        }
        function Update() {
            console.log("Update called")
            setProfit(totalMade())
            calculateBalances()
            console.log(rows)
        }

    return (
        <div>
            <h1>
                <button onClick={Update}>Update Stats</button> 
            </h1>
            <h2
				style={{
					display: 'flex', justifyContent: 'center', 
					border: '13px solid #b4f0b4', color: 'rgb(11, 167, 11)', position: 'sticky'
				}}>
                <span style={{width:"6.3vw"}}> Stats </span>
			</h2>   
            <h7 style={{
                    justifyContent: 'center', top: '10vw', position: 'absolute'
				}}>
            Total Profit : ${(Profit)}
            </h7>
            <h7 style={{
                    justifyContent: 'center', top: '12vw', position: 'absolute'
				}}>
            Balances : $
            <TableBody>
            {/*maybe the above functions are correct and im printing wrong*/}
          {rows.map((row) => {
              return (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.balance}
              </TableCell>
            </TableRow>
             );
            })}
        </TableBody>
            </h7>
        </div>
    )
}

export default Statistics