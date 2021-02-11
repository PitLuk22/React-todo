import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
	*{
		margin: 0;
		padding: 0;
		box-sizing: border-box;	
	}
	body {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
			'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
			sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		width: 100vw;
		min-height: 100vh;
	}
	#root {
		display: flex;
		justify-content: center;
		align-items: flex-start;
		padding-top: 50px;
		width: inherit;
		min-height: inherit;
		background: linear-gradient(to left top, #7979f4, #3434ff);
	}
	ul {
		padding: 0;
		margin: 0;
	}
	li {
		list-style: none;
	}

`;

export default GlobalStyle;
