import React, { useState, useRef } from 'react';
import Form from './Form';
import Item from './Item';
// DnD
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
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
	const dispatch = useDispatch();
	const todos = useSelector(state => state);

	// Drag
	const onDragEndHandler = (result) => {

		const sourceIndex = result.source.index;
		const destinationIndex = result.destination.index;

		const [sourceItem] = todos.splice(sourceIndex, 1)
		todos.splice(destinationIndex, 0, sourceItem)

		dispatch(changeOrder(todos))
	}


	return (
		<S.TodoBlock>
			<h1>Pit's TODO list</h1>
			<Form input={input} isRewrite={isRewrite} setIsRewrite={setIsRewrite} />
			<DragDropContext onDragEnd={onDragEndHandler}>
				<Droppable droppableId='todos'>
					{(provided) => (
						<ul {...provided.droppableProps} ref={provided.innerRef}>

							{todos.map((todo, index) =>
								<Item
									key={todo.id}
									{...todo}
									index={index}
									setIsRewrite={setIsRewrite}
									input={input} />
							)}

							{provided.placeholder}
						</ul>
					)}
				</Droppable>
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
`;