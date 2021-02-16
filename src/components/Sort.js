import React from 'react';
import PropTypes from 'prop-types';
// Style
import styled from 'styled-components';
// Redux 
import { useSelector } from 'react-redux';

const Sort = ({ dispatch, sortTodos }) => {

	const { todos, sort } = useSelector(state => state);
	// Sort Todos
	const onSortTodos = (typeOfSort) => {
		dispatch(sortTodos(typeOfSort))
	}

	const checkCurrentSort = (typeOfBtn) => {
		if (typeOfBtn === 'done') {
			return !todos.some(todo => todo.isDone)
		} else {
			return !todos.some(todo => !todo.isDone)
		}
	}

	return (
		<S.Sort>
			<button
				className={sort === 'all' ? 'active' : ''}
				onClick={() => onSortTodos('all')}>All</button>
			<button
				disabled={checkCurrentSort('done')}
				className={sort === 'done' ? 'active' : ''}
				onClick={() => onSortTodos('done')}>Done</button>
			<button
				disabled={checkCurrentSort('in-progress')}
				className={sort === 'in-progress' ? 'active' : ''}
				onClick={() => onSortTodos('in-progress')}>In progress</button>
		</S.Sort>
	)
}

Sort.propTypes = {
	dispatch: PropTypes.func,
	sort: PropTypes.string,
	sortTodos: PropTypes.func
}

const S = {};
S.Sort = styled.div`
	display: flex;
	justify-content: flex-start;
	button {
		border-radius: 5px;
		padding: 10px 30px;
		text-align: center;
		font-size: 18px;
		border: none;
		background-color: #1e0541;
		color: #fff;
		font-weight: 400;
		border-radius: 5px;
		cursor: pointer;
		transition: .5s;
		margin-right: 5px;
		&:nth-child(1).active {
			background:linear-gradient(to left, #FF9415, #FFC709);
			color: #000;
		}
		&:nth-child(2).active {
			background:linear-gradient(to left, #1AC67E, #0AC2B7);
			color: #000;
		}
		&:nth-child(3).active {
			background:linear-gradient(to left, #2d8bff, #6cbfff);
			color: #000;
		} 
		&:nth-child(3) {
			margin-right: 0;
		}
		&:disabled {
			background-color: rgba(60,60,70, .5);
			cursor: not-allowed;
		}
	}
	@media(max-width: 576px) {
		button{
			padding:  15px;
			font-size: 10px;
		}
	}
	
`;

export default Sort
