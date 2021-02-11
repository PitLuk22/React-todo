import React, { useState, useRef } from 'react';
import Form from './Form';
import Item from './Item'
// Styles
import styled from 'styled-components';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { changeOrder } from '../actions';

function App() {

	const input = useRef(null);
	const [isRewrite, setIsRewrite] = useState({
		cond: false,
		id: null,
		text: ''
	});
	const [currentTodo, setCurrentTodo] = useState(null);
	const dispatch = useDispatch();
	const todos = useSelector(state => state);

	// Drag
	const onDragStartHandler = (e, todo) => {

		setCurrentTodo(todo)

		e.target.style.outline = '1px dashed black';
		e.target.style.opacity = '.7';
	}
	const onDragOverHandler = (e) => {
		e.preventDefault();
		if (e.target.className.includes('drag-item')) {
			e.target.style.boxShadow = '0 5px 5px #8f06a7';
		}
	}
	const onDragLeaveHandler = (e) => {
		e.target.style.boxShadow = 'none';
	}
	const onDragEndHandler = (e) => {
		e.target.style.boxShadow = 'none';
		e.target.style.outline = 'none';
		e.target.style.opacity = '1';
	}
	const onDropHandler = (e, todo) => {
		e.preventDefault();
		e.target.style.boxShadow = 'none';

		const currentIndexItem = todos.indexOf(currentTodo);
		const whereToDropIndex = todos.indexOf(todo)
		if (currentIndexItem < whereToDropIndex) {
			todos.splice(whereToDropIndex + 1, 0, currentTodo)
			todos.splice(currentIndexItem, 1)
		} else {
			todos.splice(whereToDropIndex + 1, 0, currentTodo)
			todos.splice(currentIndexItem + 1, 1)
		}
		dispatch(changeOrder(todos))
	}

	return (
		<S.TodoBlock onDragOver={(e) => onDragOverHandler(e)}>
			<h1>Pit's TODO list</h1>
			<Form input={input} isRewrite={isRewrite} setIsRewrite={setIsRewrite} />
			<ul>
				{todos.map(todo => <Item
					key={todo.id}
					{...todo}
					setIsRewrite={setIsRewrite}
					input={input}
					onDragStartHandler={(e) => onDragStartHandler(e, todo)}
					onDragLeaveHandler={(e) => onDragLeaveHandler(e)}
					onDragEndHandler={(e) => onDragEndHandler(e)}
					onDragOverHandler={(e) => onDragOverHandler(e)}
					onDropHandler={(e) => onDropHandler(e, todo)} />)}
			</ul>
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
`;