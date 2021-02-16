import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import Sort from './Sort';
// Styles 
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { opacity } from '../animations'
// Redux
import { addTodo, rewriteTodo, sortTodos } from '../actions';
import { useDispatch } from 'react-redux';
// Util
import colors from '../util/colors';

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
		<S.Wrapper>
			<AnimatePresence>
				{isRewrite.cond && <S.Overlay onClick={endRewriting} variants={opacity} initial='hidden' animate='show' exit='exit' />}
			</AnimatePresence>
			<S.Form onSubmit={(e) => onSubmitHandler(e)}>
				<input
					onKeyDown={e => e.key === 'Escape' && endRewriting()}
					ref={input}
					onChange={(e) => setInputValue(e.target.value)}
					value={inputValue}
					type="text"
					autoFocus
					placeholder={isRewrite.cond ? 'Type to rename your todo' : 'Add a todo'} />
				<button>{isRewrite.cond ? 'Confirm' : 'Add todo'}</button>
			</S.Form>
			<Sort dispatch={dispatch} sortTodos={sortTodos} />
		</S.Wrapper>
	)
}

export default Form;

Form.propTypes = {
	input: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({ current: PropTypes.instanceOf(HTMLInputElement) })
	]),
	isRewrite: PropTypes.shape({
		cond: PropTypes.bool,
		id: PropTypes.string,
		text: PropTypes.string
	}),
	setIsRewrite: PropTypes.func
}

const S = {};
S.Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
	margin-bottom: 20px;
`;
S.Overlay = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0, .7);
	border-radius: 15px;
	z-index: 3;
`;
const slide = keyframes`
	0% {transform:translateX(-200%);}
	100% {transform:translateX(100%);}
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
		position: relative;
		width: 120px;
		padding: 15px;
		text-align: center;
		font-size: 18px;
		border: none;
		background: linear-gradient(to left top, #b94fce, #790091);
		color: #fff;
		font-weight: 600;
		cursor: pointer;
		transition: .3s;
		overflow: hidden;
		&:after {
			content:'';
			top:0;
			transform:translateX(100%);
			width:100%;
			height:220px;
			position: absolute;
			z-index:1;
			background: -moz-linear-gradient(left, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(128,186,232,0) 99%, rgba(125,185,232,0) 100%); /* FF3.6+ */
			background: -webkit-gradient(linear, left top, right top, color-stop(0%,rgba(255,255,255,0)), color-stop(50%,rgba(255,255,255,0.8)), color-stop(99%,rgba(128,186,232,0)), color-stop(100%,rgba(125,185,232,0))); /* Chrome,Safari4+ */
			background: -webkit-linear-gradient(left, rgba(255,255,255,0) 0%,rgba(255,255,255,0.8) 50%,rgba(128,186,232,0) 99%,rgba(125,185,232,0) 100%); /* Chrome10+,Safari5.1+ */
			background: -o-linear-gradient(left, rgba(255,255,255,0) 0%,rgba(255,255,255,0.8) 50%,rgba(128,186,232,0) 99%,rgba(125,185,232,0) 100%); /* Opera 11.10+ */
			background: -ms-linear-gradient(left, rgba(255,255,255,0) 0%,rgba(255,255,255,0.8) 50%,rgba(128,186,232,0) 99%,rgba(125,185,232,0) 100%); /* IE10+ */
			background: linear-gradient(to right, rgba(255,255,255,0) 0%,rgba(255,255,255,0.8) 50%,rgba(128,186,232,0) 99%,rgba(125,185,232,0) 100%); /* W3C */
			filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#007db9e8',GradientType=1 );
		}
		&:hover {
			color: #e9c5ff;
			&:after {
				animation: ${slide} 1s ease;
			}
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

