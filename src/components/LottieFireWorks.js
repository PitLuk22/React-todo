import React from 'react';
// Hook
import usePrevious from './usePrevious'
// Lottie 
import Lottie from 'react-lottie';
import fireworksAnimation from "../img/fireworks.json";
const LottieFireWorks = ({ isDone }) => {

	const prevValue = usePrevious(isDone)

	const defaultOptions = {
		loop: false,
		autoplay: false,
		animationData: fireworksAnimation,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice"
		}
	};
	const style = {
		position: 'absolute',
		width: '150px',
		height: '120%',
		top: '60%',
		transform: 'translateY(-50%)',
		right: '40px',
		pointerEvents: 'none',
		opacity: isDone && isDone !== prevValue ? '1' : '0',
		zIndex: 4
	}

	return (
		<Lottie options={defaultOptions}
			style={style}
			isStopped={!isDone} />
	)
}

export default LottieFireWorks;
