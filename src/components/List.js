import React from 'react';
import PropTypes from 'prop-types'
import Item from './Item';
// Style
import { motion } from 'framer-motion';
import { listAnim } from '../animations'
// DnD
import { Droppable } from 'react-beautiful-dnd';
// Redux
import { useSelector } from 'react-redux';
// Util
import sorting from '../util/sorting';

const List = ({ input, setIsRewrite }) => {

	const state = useSelector(state => state);
	const todosForRendering = sorting(state);

	return (
		<Droppable droppableId='todos'>
			{(provided) => (
				<motion.ul variants={listAnim} initial='hidden' animate='show' exit='exit' {...provided.droppableProps} ref={provided.innerRef}>
					{todosForRendering.map((todo, index) =>
						<Item
							key={todo.id}
							{...todo}
							index={index}
							setIsRewrite={setIsRewrite}
							input={input}
						/>
					)}
					{provided.placeholder}
				</motion.ul>
			)}
		</Droppable>
	)
}

export default List;

List.propTypes = {
	input: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({ current: PropTypes.instanceOf(HTMLInputElement) })
	]),
	setIsRewrite: PropTypes.func
}
