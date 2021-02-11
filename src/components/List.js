import React from 'react';
import Item from './Item';
// DnD
import { Droppable } from 'react-beautiful-dnd';
// Redux
import { useSelector } from 'react-redux';


const List = ({ input, setIsRewrite }) => {

	const todos = useSelector(state => state);

	return (
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
	)
}

export default List
