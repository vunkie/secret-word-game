import "./styles.css";

const index = ({ retry, score }) => {
	return (
		<div>
			<h1>Game Over</h1>
			<h2>Your score was: <span>{score}</span></h2>
			<button onClick={retry}>Retry</button>
		</div>
	);
};

export default index;
