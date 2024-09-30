import "./styles.css";
import { useState, useRef } from "react";

const index = ({
	verifyLetter,
	pickedWord,
	pickedCategory,
	letters,
	guessedLetters,
	wrongLetters,
	guesses,
	score,
}) => {
	const [letter, setLetter] = useState("");
  const letterInputRef = useRef(null);

  const handeSubmit = (e) => {
    e.preventDefault();
    verifyLetter(letter);
    setLetter("");
    letterInputRef.current.focus();
  }

	return (
		<div className='game'>
			<p className='points'>
				<span>Points: {score}</span>
			</p>
			<h1>Guess the Word: </h1>
			<h3 className='tip'>
				Tip about the word: <span>{pickedCategory}</span>
			</h3>
			<p>You still have {guesses} tries.</p>
			<div className='wordContainer'>
				{letters.map((letter, i) =>
					guessedLetters.includes(letter) ? (
						<span key={i} className='letter'>
							{letter}
						</span>
					) : (
						<span key={i} className='blankSquare'></span>
					)
				)}
			</div>
			<div className='letterContainer'>
				<p>Try to guess a letter: </p>
				<form onSubmit={handeSubmit}>
					<input
						type='text'
						name='letter'
						maxLength='1'
						required
						onChange={(e) => setLetter(e.target.value)}
            value={letter}
            ref={letterInputRef}
					/>
					<button>Play</button>
				</form>
			</div>
			<div className='wrongLettersContainer'>
				<p>Words guessed: </p>
				{wrongLetters.map((letter, i) => (
					<span key={i}>{letter}, </span>
				))}
			</div>
		</div>
	);
};

export default index;
