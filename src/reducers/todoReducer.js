const todosFromLocalStorage = JSON.parse(localStorage.getItem('todos'))
const initialState = {
	todos: todosFromLocalStorage || [],
	sort: 'all'
}

const todoReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_TODO':
			const newTodo = {
				id: action.payload.id,
				text: action.payload.text,
				colors: action.payload.colors,
				isDone: false
			}
			return {
				...state,
				todos: [...state.todos, newTodo]
			}
		case 'DELETE_TODO':
			const withoutDeletedItem = state.todos.filter(item => item.id !== action.payload.id);
			return {
				...state,
				todos: withoutDeletedItem
			}
		case 'REWRITE_TODO':
			const newTodos = state.todos.map(item => {
				if (item.id === action.payload.id) {
					item.text = action.payload.text
				}
				return item;
			})
			return {
				...state,
				todos: newTodos
			}
		case 'IS_DONE_TODO':
			return {
				...state,
				todos: state.todos.map(todo => todo.id === action.payload.id ? { ...todo, isDone: !action.payload.isDone } : todo)
			}
		case 'CHANGE_ORDER':
			const sourceIndex = action.payload.source.index;
			const destinationIndex = action.payload.destination.index;
			const copyState = state.todos.slice();
			const [sourceItem] = copyState.splice(sourceIndex, 1)
			copyState.splice(destinationIndex, 0, sourceItem)

			return {
				...state,
				todos: copyState
			};
		case 'SORT_TODOS':
			return {
				...state,
				sort: action.payload
			}
		default:
			return state
	}
}

export default todoReducer;