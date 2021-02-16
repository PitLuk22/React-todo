import React, { useState } from 'react';
import PropTypes from 'prop-types'
import LottieFireWorks from './LottieFireWorks';
// Redux 
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodo, isDoneTodo } from '../actions'
// Styles
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn } from '../animations';
// Icons 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrashAlt, faCheckCircle, faTimesCircle, faBars } from '@fortawesome/free-solid-svg-icons'

import { Draggable } from 'react-beautiful-dnd';

const Item = ({ index, input, id, text, colors, setIsRewrite }) => {

	const [lottie, setLottie] = useState(null)

	const [isDelete, setIsDelete] = useState(false);
	const dispatch = useDispatch();

	const { isDone } = useSelector(state => state.todos.find(todo => todo.id === id))

	const onDeleteHandler = () => {
		setIsDelete(true)
		setTimeout(() => {
			dispatch(deleteTodo(id))
		}, 300);
	}

	const setIsDoneHandler = () => {
		dispatch(isDoneTodo(id, isDone))

		if (isDone) {
			// change from true to false
			setLottie(null)
		} else {
			// change from false to true
			setLottie(<LottieFireWorks isDone={!isDone} />)
		}
	}


	return (
		<Draggable draggableId={id} index={index}>
			{(provided) => (
				<S.Li
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}>

					<motion.div variants={fadeIn}>
						<AnimatePresence>

							{!isDelete && <S.TodoItem colors={colors} isDone={isDone} variants={fadeIn} initial='hidden' animate='show' exit='exit' >
								<div className='todo-content'>
									<FontAwesomeIcon icon={faBars} size='sm' />
									<span>{text}</span>
								</div>

								{lottie}

								<S.Icons className='icons' isDone={isDone}>
									<FontAwesomeIcon icon={isDone ? faTimesCircle : faCheckCircle} size='lg' onClick={() => setIsDoneHandler()} />
									<FontAwesomeIcon icon={faPen} size='lg' onClick={() => {
										setIsRewrite({ cond: true, id, text })
										input.current.focus();
									}} />
									<FontAwesomeIcon icon={faTrashAlt} size='lg' onClick={onDeleteHandler} />
								</S.Icons>
							</S.TodoItem>}

						</AnimatePresence>
					</motion.div>

				</S.Li>
			)}
		</Draggable>
	)
}


export default Item;

Item.propTypes = {
	index: PropTypes.number,
	input: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({ current: PropTypes.instanceOf(HTMLInputElement) })
	]),
	id: PropTypes.string,
	text: PropTypes.string,
	color: PropTypes.arrayOf(PropTypes.string),
	setIsRewrite: PropTypes.func
}

const S = {};
S.Li = styled.li`
	margin-bottom: 10px;
`;
S.TodoItem = styled(motion.div)`
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20px;
	font-size: 17px;
	font-weight: 600;
	background: ${props => `linear-gradient(to left, ${props.colors[1]}, ${props.colors[0]} )`};
	color: #fff;
	border-radius: 5px;
	overflow: hidden;
	.todo-content {
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}
	span {
		margin: 0 20px;
	}
	&:hover .icons{			
		opacity: 1;
	}
	&:after {
		content: '';
		position: absolute;
		visibility: ${props => props.isDone ? 'visible' : 'hidden'};
		opacity: ${props => props.isDone ? '1' : '0'} ;
		top: 0;
		left: ${props => props.isDone ? '0' : '-150%'};
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0, .7);
		box-shadow: 10px 0 10px 20px rgba(0,0,0,.7);
		transition: all .5s ease;
	}
	@media(max-width: 576px) {
		font-size: 11px;
		padding: 20px 10px;
		span {
			margin: 0 10px;
		}
	}
`;

S.Icons = styled.div`
	min-width: 100px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	opacity: 0;
	transition: all .3s ease;
	z-index: 2;
	svg {
		position: relative;
		color:rgba(255,255,255, .8);
		cursor: pointer;
		&:nth-child(1) {
			&:hover {
				color: ${props => props.isDone ? '#ff4f4f' : '#7dff49'};
			}
		}
		&:nth-child(2) {
			&:hover {
				color: #578cff;
			}
		}
		&:nth-child(3) {
			&:hover {
				color: #ff4f4f;
			}
		}
	}
	@media(max-width: 576px) {
		font-size: 11px;
		min-width: 70px;
	}
`;