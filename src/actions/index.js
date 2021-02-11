export const addTodo = (id, text, colors) => {
	return {
		type: 'ADD_TODO',
		payload: {
			text,
			id,
			colors
		}
	}
}
export const deleteTodo = (id) => {
	return {
		type: 'DELETE_TODO',
		payload: {
			id
		}
	}
}
export const rewriteTodo = (id, text) => {
	return {
		type: 'REWRITE_TODO',
		payload: {
			id,
			text
		}
	}
}
export const isDoneTodo = (id, isDone) => {
	return {
		type: 'IS_DONE_TODO',
		payload: {
			id,
			isDone
		}
	}
}
export const changeOrder = (result) => {
	return {
		type: 'CHANGE_ORDER',
		payload: result
	}
}