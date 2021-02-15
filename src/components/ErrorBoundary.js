import React, { Component } from 'react'

export default class ErrorBoundary extends Component {
	state = {
		error: false
	}

	componentDidCatch() {
		this.setState({ error: true })
	}

	render() {
		if (this.state.error) {
			console.log('error');
			return <div>ERROR</div>;
		}
		return (
			<>
				{this.props.children}
			</>
		)

	}
}
