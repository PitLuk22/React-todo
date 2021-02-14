import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
// Styles 
import styled from 'styled-components';
// Redux
import { addTodo, rewriteTodo, sortTodos } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
// Util
import colors from '../util/colors';

const Form = ({ input, isRewrite, setIsRewrite }) => {


	const [inputValue, setInputValue] = useState('');
	const [colorCounter, setColorCounter] = useState(0);

	const dispatch = useDispatch();
	const { sort } = useSelector(state => state);

	useEffect(() => {
		setInputValue(isRewrite.text)
	}, [isRewrite])

	// Add or rewrite todo if input is not empty
	const onSubmitHandler = (e) => {
		e.preventDefault()
		if (inputValue && !isRewrite.cond) {
			dispatch(addTodo(uuidv4(), inputValue, getColors()))
		}
		if (inputValue && isRewrite.cond) {
			dispatch(rewriteTodo(isRewrite.id, inputValue))
			endRewriting()
		}
		setInputValue('')
		input.current.focus();
	}

	// Get color for todo item from util.js
	const getColors = () => {
		colorCounter >= colors.length - 1 ? setColorCounter(0) : setColorCounter(colorCounter + 1);
		return colors[colorCounter];
	}

	// if we want to close rewriting condition
	const endRewriting = () => {
		setIsRewrite({ cond: false, id: null, text: '' })
		setInputValue('')
	}

	// Sort Todos
	const onSortTodos = (typeOfSort) => {
		dispatch(sortTodos(typeOfSort))
	}

	return (
		<S.Wrapper>
			{isRewrite.cond && <S.Overlay onClick={endRewriting} />}
			<S.Form onSubmit={(e) => onSubmitHandler(e)}>
				<input
					ref={input}
					onChange={(e) => setInputValue(e.target.value)}
					value={inputValue}
					type="text"
					autoFocus
					placeholder={isRewrite.cond ? 'Type to rename your todo' : 'Add a todo'} />
				<button>{isRewrite.cond ? 'Confirm' : 'Add todo'}</button>
			</S.Form>
			<S.Sort>
				<button className={sort === 'all' ? 'active' : ''} onClick={() => onSortTodos('all')}>All</button>
				<button className={sort === 'done' ? 'active' : ''} onClick={() => onSortTodos('done')}>Done</button>
				<button className={sort === 'in-progress' ? 'active' : ''} onClick={() => onSortTodos('in-progress')}>In progress</button>
			</S.Sort>
		</S.Wrapper>
	)
}

export default Form;

const S = {};
S.Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
	margin-bottom: 20px;
`;
S.Overlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0, .7);
	border-radius: 15px;
	z-index: 3;
`;
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
	}
	@media(max-width: 576px) {
		button{
			padding:  15px;
			font-size: 10px;
		}
	}
	
`;
S.Form = styled.form`
	position: relative;
	width: 100%;
	margin-bottom: 20px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border: 2px solid #7f0e93;
	border-radius: 5px;
	box-shadow: 0 0 10px #8f06a7;
	z-index: 4;
	input {
		flex: 1;
		min-width: 20px;
		font-size: 18px;
		padding: 15px 20px;
		border: none;
		outline: none;
		font-weight: 600;
		background-color: #0f0b28;
		color: #fff;
	}
	button {
		padding: 15px;
		text-align: center;
		font-size: 18px;
		border: none;
		background: linear-gradient(to left top, #b94fce, #790091);
		color: #fff;
		font-weight: 600;
		cursor: pointer;
		transition: .3s;
		&:hover {
			color: #e9c5ff;
		}
	}
	@media(max-width: 576px) {
		input{
			padding: 15px 15px;
			font-size: 10px;
		}
		button{
			padding:  15px 10px;
			font-size: 10px;
		}
	}
`;