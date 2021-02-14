const sorting = ({ todos, sort }) => {
	switch (sort) {
		case 'all':
			return todos;
		case 'done':
			return [...todos.filter(todo => todo.isDone)];
		case 'in-progress':
			return [...todos.filter(todo => todo.isDone === false)];
		default:
			return todos;
	}
}
export default sorting;