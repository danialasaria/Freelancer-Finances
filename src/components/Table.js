// import React, { useState } from 'react';
// import database from '../firebase';

// function StudentForm(props) {
// const [name, setName] = useState('');
// const [price, setPrice] = useState('');
// const [date, setDate] = useState('');

// const changeName = (event) => {
// 	setName(event.target.value);
// };

// const changePrice = (event) => {
// 	setPrice(event.target.value);
// };

// const changeDate = (event) => {
// 	setDate(event.target.value);
// };

// const transferValue = (event) => {
// 	event.preventDefault();
// 	const val = {
// 	name,
//     price,
//     date,
// 	};
// 	props.func(val);
// 	clearState();
// };

// const clearState = () => {
// 	setName('');
//     setPrice('');
//     setDate('');
// };

// const Push = () => {
// 	console.log("Boooooo")
//     database.ref("user").set({
//       name : name,
//       price : price,
//     }).catch(alert);
//   }

// return (
// 	<div>
// 	<label>Name</label>
// 	<input type="text" value={name} onChange={changeName} />
// 	<label>Price</label>
// 	<input type="text" value={price} onChange={changePrice} />
//     <label>Date</label>
// 	<input type="text" value={date} onChange={changeDate} />
// 	<button onClick={transferValue && Push}> Add</button>
// 	</div>
// );
// }

// export default StudentForm;
