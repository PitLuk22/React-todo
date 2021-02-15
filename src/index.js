import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import ErrorBoundary from './components/ErrorBoundary';
// Styles
import GlobalStyles from './GlobalStyles';
// Redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import todoReducer from './reducers/todoReducer';


const store = createStore(
	todoReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<ErrorBoundary>
				<GlobalStyles />
				<App />
			</ErrorBoundary>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

