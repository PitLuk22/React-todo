import { useEffect, useState } from 'react'

const useResize = () => {

	const [width, setWidth] = useState();

	useEffect(() => {
		const updateSize = () => {
			setWidth(window.innerWidth);
		}
		window.addEventListener('resize', updateSize);
		updateSize();
		return () => window.removeEventListener('resize', updateSize);
	}, []);

	return width;
}
export default useResize;