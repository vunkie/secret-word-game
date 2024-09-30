import "./styles.css";

const index = ({ startGame }) => {
	

	return (
		<div className='start'>
			<h1>Secret Word</h1>
			<p>Click on the button below to start playing</p>
			<button onClick={startGame}>Start the game</button>
		</div>
	);
};

export default index;
