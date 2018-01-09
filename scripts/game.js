debugger;
const empty = "0";
const wall = "1";
const apple = "2";
const snake = "3";

var headPosition = { row: 0, col: 0 };
var applePosition = { row: 0, col: 0 };
var currentDirection;

var gameMap = [
	[empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
	[empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
	[empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
	[empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
	[empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
	[empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
	[empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, wall, wall, wall, wall, wall, wall, wall, wall, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
	[empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
	[empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
	[empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
	[empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
	[empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
	[empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
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

	gameMap[headPosition.row][headPosition.col] = snake;
	gameMap[applePosition.row][applePosition.col] = apple;
}

var snakeContainer = document.getElementById('snake-container');
while (snakeContainer.firstChild) {
	snakeContainer.removeChild(snakeContainer.firstChild);
}


function drawGameMap() {
	debugger;
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
					newElement.classList.add("snakeBox");
					break;
			}
			snakeContainer.appendChild(newElement);
		}
		snakeContainer.appendChild(breakElement);
	}
}

function changeDirection(event) {
	switch (event.key) {
		case "ArrowDown":
			currentDirection = "down";
			break;
		case "ArrowLeft":
			currentDirection = "left";
			break;
		case "ArrowUp":
			currentDirection = "Up";
			break;
		case "ArrowRight":
			currentDirection = "Right";
	}
}
function setDirectionAndStartGame(event) {
	changeDirection(event);
	setInterval(checkNextMove, 1000);
	
}
window.addEventListener("DOMContentLoaded", function () { setInitialSnakeAndAppleCoords(gameMap.length, gameMap[0].length) });
window.addEventListener("load", drawGameMap);
window.addEventListener("keydown", setDirectionAndStartGame);