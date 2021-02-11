const initialState = [];

const todoReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_TODO':
			const newTodo = {
				id: action.payload.id,
				text: action.payload.text,
				colors: action.payload.colors,
				isDone: false
			}
			return [
				...state,
				newTodo
			]
		case 'DELETE_TODO':
			const withoutDeletedItem = state.filter(item => item.id !== action.payload.id);
			return [
				...withoutDeletedItem
			]
		case 'REWRITE_TODO':
			const newTodos = state.map(item => {
				if (item.id === action.payload.id) {
					item.text = action.payload.text
				}
				return item;
			})
			return [...newTodos]
		case 'IS_DONE_TODO':
			return [
				...state.map(todo => todo.id === action.payload.id ? { ...todo, isDone: !action.payload.isDone } : todo)
			]
		case 'CHANGE_ORDER':
			return [
				...action.payload
			]
		default:
			return state
	}
}

export default todoReducer;