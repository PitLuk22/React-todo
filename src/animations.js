export const listAnim = {
	hidden: { opacity: 0, },
	show: { opacity: 1, transition: { duration: .25, staggerChildren: 0.3 } },
	exit: { opacity: 0, y: 65, transition: { duration: .25 } }
}

export const fadeIn = {
	hidden: { opacity: 0, x: 200 },
	show: { opacity: 1, y: 0, x: 0 },
	exit: { opacity: 0, x: 800, transition: { duration: .3 } }
}
export const opacity = {
	hidden: { opacity: 0 },
	show: { opacity: 1 },
	exit: { opacity: 0, transition: { duration: .3 } }
}
