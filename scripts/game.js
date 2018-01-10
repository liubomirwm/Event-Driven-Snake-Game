const empty = "0";
const wall = "1";
const apple = "2";
const snake = "3";
const changeDown = "4";
const changeUp = "5";
const changeLeft = "6";
const changeRight = "7";
var points = 0;

var headPosition = { row: 0, col: 0 };
var applePosition = { row: 0, col: 0 };
var tailPosition = { row: 0, col: 0 };
var currentHeadDirection;
var currentTailDirection;
var snakeSize = 1;

var gameMap = [
	[empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
	[empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
	[empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
	[empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
	[empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
	[empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, wall, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, wall, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
	[empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, wall, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, wall, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
	[empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, wall, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, wall, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
	[empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, wall, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, wall, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
	[empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, wall, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, wall, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
	[empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, wall, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, wall, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
	[empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, wall, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, wall, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
	[empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, wall, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, wall, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
	[empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
	[empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
	[empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
	[empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
	[empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
	[empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
];

function randomIntFromInterval(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function setInitialSnakeAndAppleCoords(rowsNum, colsNum) {
	do {
		headPosition.row = randomIntFromInterval(0, rowsNum - 1);
		headPosition.col = randomIntFromInterval(0, colsNum - 1);
	} while (gameMap[headPosition.row][headPosition.col] != empty);

	do {
		applePosition.row = randomIntFromInterval(0, rowsNum - 1);
		applePosition.col = randomIntFromInterval(0, colsNum - 1);
	} while (gameMap[applePosition.row][applePosition.col] != empty);

	tailPosition.row = headPosition.row;
	tailPosition.col = headPosition.col;

	gameMap[headPosition.row][headPosition.col] = snake;
	gameMap[applePosition.row][applePosition.col] = apple;
}

var snakeContainer = document.getElementById('snake-container');
while (snakeContainer.firstChild) {
	snakeContainer.removeChild(snakeContainer.firstChild);
}


function drawGameMap() {
	var snakeContainer = document.getElementById('snake-container');
	while (snakeContainer.firstChild) {
		snakeContainer.removeChild(snakeContainer.firstChild);
	}

	for (var i = 0; i < gameMap.length; i++) {
		for (var j = 0; j < gameMap[i].length; j++) {
			var newElement = document.createElement('div');
			var breakElement = document.createElement('br');
			newElement.classList.add('gameBox');
			newElement.innerHTML = '&nbsp;';
			switch (gameMap[i][j]) {
				case wall:
					newElement.classList.add("wallBox");
					break;
				case apple:
					newElement.classList.add("appleBox");
					break;
				case snake:
				case changeDown:
				case changeLeft:
				case changeUp:
				case changeRight:
					newElement.classList.add("snakeBox");
					break;
			}
			snakeContainer.appendChild(newElement);
		}
		snakeContainer.appendChild(breakElement);
	}
}

function changeHeadDirection(event) {
	switch (event.key) {
		case "ArrowDown":
			if (currentHeadDirection != "Up") {
				gameMap[headPosition.row][headPosition.col] = changeDown;
				currentHeadDirection = "Down";
			}
			break;
		case "ArrowLeft":
			if (currentHeadDirection != "Right") {
				gameMap[headPosition.row][headPosition.col] = changeLeft;
				currentHeadDirection = "Left";
			}
			break;
		case "ArrowUp":
			if (currentHeadDirection != "Down") {
				gameMap[headPosition.row][headPosition.col] = changeUp;
				currentHeadDirection = "Up";
			}
			break;
		case "ArrowRight":
			if (currentHeadDirection != "Left") {
				gameMap[headPosition.row][headPosition.col] = changeRight;
				currentHeadDirection = "Right";
			}
			break;
	}
}

function checkNextMove() {
	var nextMoveRow;
	var nextMoveCol;
	switch (currentHeadDirection) {
		case "Left":
			nextMoveRow = headPosition.row;
			nextMoveCol = headPosition.col - 1;
			break;
		case "Right":
			nextMoveRow = headPosition.row;
			nextMoveCol = headPosition.col + 1;
			break;
		case "Down":
			nextMoveRow = headPosition.row + 1;
			nextMoveCol = headPosition.col;
			break;
		case "Up":
			nextMoveRow = headPosition.row - 1;
			nextMoveCol = headPosition.col;
			break;
	}

	if (nextMoveRow < 0 || nextMoveRow >= gameMap.length) {
		var event = new CustomEvent("snakeMove");
		event.nextMoveStatus = "outOfMap"
		snakeContainer.dispatchEvent(event);

	}
	if (nextMoveCol < 0 || nextMoveCol >= gameMap[0].length) {
		var event = new CustomEvent("snakeMove");
		event.nextMoveStatus = "outOfMap"
		snakeContainer.dispatchEvent(event);
	}

	switch (gameMap[nextMoveRow][nextMoveCol]) {
		case empty:
			var event = new CustomEvent("snakeMove");
			event.nextMoveStatus = "empty";
			snakeContainer.dispatchEvent(event);
			break;
		case wall:
			var event = new CustomEvent("snakeMove");
			event.nextMoveStatus = "wall";
			snakeContainer.dispatchEvent(event);
			break;
		case apple:
			var event = new CustomEvent("snakeMove");
			event.nextMoveStatus = "apple";
			snakeContainer.dispatchEvent(event);
			break;
		case snake:
			var event = new CustomEvent("snakeMove");
			event.nextMoveStatus = "snake";
			snakeContainer.dispatchEvent(event);
			break;
	}
}

function changeTailDirection(changeIndicator) {
	switch (changeIndicator) {
		case changeDown:
			currentTailDirection = "Down";
			break;
		case changeUp:
			currentTailDirection = "Up";
			break;
		case changeLeft:
			currentTailDirection = "Left";
			break;
		case changeRight:
			currentTailDirection = "Right";
			break;
	}
}

function moveTail() {
	switch (currentTailDirection) {
		case "Down":
			tailPosition.row++;
			break;
		case "Up":
			tailPosition.row--;
			break;
		case "Left":
			tailPosition.col--;
			break;
		case "Right":
			tailPosition.col++;
	}
}

function moveSnake() {
	debugger;
	switch (currentHeadDirection) {
		case "Down":
			if (snakeSize == 1) {
				headPosition.row++;
				gameMap[headPosition.row][headPosition.col] = snake;
				drawGameMap();
				snakeSize++;
				return;
			}

			headPosition.row++;
			if (gameMap[tailPosition.row][tailPosition.col] != snake) {
				changeTailDirection(gameMap[tailPosition.row][tailPosition.col]);
			}
			gameMap[headPosition.row][headPosition.col] = snake;
			gameMap[tailPosition.row][tailPosition.col] = empty;
			moveTail();
			drawGameMap();
			break;
		case "Up":
			if (snakeSize == 1) {
				headPosition.row--;
				gameMap[headPosition.row][headPosition.col] = snake;
				drawGameMap();
				snakeSize++;
				return;
			}

			headPosition.row--;
			if (gameMap[tailPosition.row][tailPosition.col] != snake) {
				changeTailDirection(gameMap[tailPosition.row][tailPosition.col]);
			}
			gameMap[headPosition.row][headPosition.col] = snake;
			gameMap[tailPosition.row][tailPosition.col] = empty;
			moveTail();
			drawGameMap();
			break;
		case "Left":
			if (snakeSize == 1) {
				headPosition.col--;
				gameMap[headPosition.row][headPosition.col] = snake;
				drawGameMap();
				snakeSize++;
				return;
			}

			headPosition.col--;
			if (gameMap[tailPosition.row][tailPosition.col] != snake) {
				changeTailDirection(gameMap[tailPosition.row][tailPosition.col]);
			}
			gameMap[headPosition.row][headPosition.col] = snake;
			gameMap[tailPosition.row][tailPosition.col] = empty;
			moveTail();
			drawGameMap();
			break;
		case "Right":
			if (snakeSize == 1) {
				headPosition.col++;
				gameMap[headPosition.row][headPosition.col] = snake;
				drawGameMap();
				snakeSize++;
				return;
			}

			headPosition.col++;
			if (gameMap[tailPosition.row][tailPosition.col] != snake) {
				changeTailDirection(gameMap[tailPosition.row][tailPosition.col]);
			}
			gameMap[headPosition.row][headPosition.col] = snake;
			gameMap[tailPosition.row][tailPosition.col] = empty;
			moveTail();
			drawGameMap();
			break;
	}
}

function changeApplePosition(rowsNum, colsNum) {
	do {
		applePosition.row = randomIntFromInterval(0, rowsNum - 1);
		applePosition.col = randomIntFromInterval(0, colsNum - 1);
	} while (gameMap[applePosition.row][applePosition.col] != empty);
	gameMap[applePosition.row][applePosition.col] = apple;
}
var pointsSection = document.getElementById("points");
//checks nextMove status and calls functions based on it
function snakeMoveDispatcher(event) {
	switch (event.nextMoveStatus) {
		case "empty":
			moveSnake();
			break;
		case "apple":
			headPosition.row = applePosition.row;
			headPosition.col = applePosition.col;
			gameMap[headPosition.row][headPosition.col] = snake;
			changeApplePosition(gameMap.length, gameMap[0].length);
			snakeSize++;
			drawGameMap();
			points++;
			pointsSection.innerHTML = points;

			break;
		case "wall":
		case "snake":
		case "outOfMap":
			clearInterval(checkNextMoveInterval);
			alert("Game over!");
			break;
	}
}

var checkNextMoveInterval;

function setDirectionAndStartGame(event) {
	changeHeadDirection(event);
	currentTailDirection = currentHeadDirection;
	checkNextMoveInterval = setInterval(checkNextMove, 400);
	window.removeEventListener("keydown", setDirectionAndStartGame);
	window.addEventListener("keydown", changeHeadDirection);
	snakeContainer.addEventListener("snakeMove", snakeMoveDispatcher) //checks nextMove status and calls functions based on it

}
window.addEventListener("DOMContentLoaded", function () { setInitialSnakeAndAppleCoords(gameMap.length, gameMap[0].length) });
window.addEventListener("load", drawGameMap);
window.addEventListener("keydown", setDirectionAndStartGame);