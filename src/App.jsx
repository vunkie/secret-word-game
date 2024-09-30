//CSS
import "./App.css";

//React
import { useCallback, useEffect, useState, version } from "react";

//Data
import { wordList } from "./data/words";

//Components
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

const stages = [
	{ id: 1, name: "start" },
	{ id: 2, name: "game" },
	{ id: 3, name: "end" },
];

function App() {
	const [gameStage, setGameStage] = useState(stages[0].name);
	const [words] = useState(wordList);

	const [pickedWord, setPickedWord] = useState("");
	const [pickedCategory, setPickedCategory] = useState("");
	const [letters, setLetters] = useState([]);

	const [guessedLetters, setGuessedLetters] = useState([]);
	const [wrongLetters, setWrongLetters] = useState([]);
	const [guesses, setGuesses] = useState(5);
	const [score, setScore] = useState(0);

	const pickWordandCategory = useCallback(() => {
		const categories = Object.keys(words);
		const category =
			categories[
				Math.floor(Math.random() * Object.keys(categories).length)
			];

		const word =
			words[category][Math.floor(Math.random() * words[category].length)];

		return { word, category };
	},[words]);

	// Starts the game
	const startGame = useCallback(() => {
		// Pick a word and category
		const { word, category } = pickWordandCategory();

		// Create an array of the word's letters
		let wordLetters = word.split("");
		wordLetters = wordLetters.map((l) => l.toLowerCase());
		console.log("🚀 ~ startGame ~ wordLetters:", wordLetters);
		// Fill states
		setPickedWord(word);
		setPickedCategory(category);
		setLetters(wordLetters);

		setGameStage(stages[1].name);
	}, [pickWordandCategory]);

	const verifyLetter = (letter) => {
		const normalizedLetter = letter.toLowerCase();

		// check if letter has been used
		if (
			guessedLetters.includes(normalizedLetter) ||
			wrongLetters.includes(normalizedLetter)
		) {
			return;
		}

		// push guessed letter, or remove a guess

		if (letters.includes(normalizedLetter)) {
			setGuessedLetters((actualGuessedLetters) => [
				...actualGuessedLetters,
				normalizedLetter,
			]);
		} else {
			setWrongLetters((actualWrongLetters) => [
				...actualWrongLetters,
				normalizedLetter,
			]);
			setGuesses((actualGuesses) => actualGuesses - 1);
		}
	};

	function clearLetterStates() {
		setGuessedLetters([]);
		setWrongLetters([]);
	}

	// check if guesses ended
	useEffect(() => {
		if (guesses <= 0) {
			//reset all states
			clearLetterStates();

			setGameStage(stages[2].name);
		}
	}, [guesses]);

	// check if all letters were guessed
	useEffect(() => {
		const uniqueLetters = [...new Set(letters)];

		//win condition
		if (guessedLetters.length === uniqueLetters.length) {
			//reset all states
			clearLetterStates();

			//increment score
			setScore((actualScore) => actualScore += 100);
			setGuesses(5)

			//start a new game
			startGame();
		}

	}, [guessedLetters, letters, startGame]);

	// Restart
	const retry = () => {
		setGuesses(5);
		setScore(0);

		setGameStage(stages[0].name);
	};

	return (
		<div className='App'>
			{gameStage === "start" && <StartScreen startGame={startGame} />}
			{gameStage === "game" && (
				<Game
					verifyLetter={verifyLetter}
					pickedWord={pickedWord}
					pickedCategory={pickedCategory}
					letters={letters}
					guessedLetters={guessedLetters}
					wrongLetters={wrongLetters}
					guesses={guesses}
					score={score}
				/>
			)}
			{gameStage === "end" && <GameOver retry={retry} score={score} />}
		</div>
	);
}

export default App;
