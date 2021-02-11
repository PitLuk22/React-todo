import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
// Styles 
import styled from 'styled-components';
// Redux
import { addTodo, rewriteTodo } from '../actions';
import { useDispatch } from 'react-redux';
// Util
import colors from '../util';

const Form = ({ input, isRewrite, setIsRewrite }) => {


	const [inputValue, setInputValue] = useState('');
	const [colorCounter, setColorCounter] = useState(0);

	const dispatch = useDispatch();

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

	return (
		<>
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

		</>
	)
}

export default Form;

const S = {};
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
S.Form = styled.form`
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
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