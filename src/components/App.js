import React, { useState, useRef } from 'react';
import Form from './Form';
import List from './List';
// DnD
import { DragDropContext } from 'react-beautiful-dnd';
// Styles
import styled from 'styled-components';
// Redux
import { useDispatch } from 'react-redux';
import { changeOrder } from '../actions';

function App() {

	const input = useRef(null);
	const [isRewrite, setIsRewrite] = useState({
		cond: false,
		id: null,
		text: ''
	});

	const dispatch = useDispatch();

	// Drag
	const onDragEndHandler = (result) => dispatch(changeOrder(result))

	return (
		<S.TodoBlock>
			<h1>Pit's TODO list</h1>
			<Form input={input} isRewrite={isRewrite} setIsRewrite={setIsRewrite} />
			<DragDropContext onDragEnd={onDragEndHandler}>
				<List input={input} setIsRewrite={setIsRewrite} />
			</DragDropContext>
		</S.TodoBlock>
	);
}

export default App;

const S = {};
S.TodoBlock = styled.div`
	position: relative;
	width: 900px;
	padding: 40px 70px;
	margin: 0 40px;
	background-color: #0f0b28;
	border-radius: 15px;
	box-shadow: 0 0 10px 5px rgba(0,0,0,.6);

	h1 {
		text-align: center;
		font-weight: 700;
		color: #fff;
		margin: 0 0 20px 0;
		font-size: 40px;
	}

	@media(max-width: 576px) {
		width: 90%;
		padding: 20px 35px;
		h1 {
			font-size: 25px;
		}
	}
`;