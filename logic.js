// console.log("Hello FCB!");

// Declare all the variables need for our website
let board;
let score = 0;
let rows = 4;
let columns = 4;

// Create function to set the gameboard
function setGame(){
	board = [
		// Initialize the 4x4 game board with all tiles set to 0
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
	]

	for(let r = 0; r < rows; r++){
		for(let c = 0; c<columns; c++){


			let tile = document.createElement("div");

			// Set a unique id for each tile based on its coordinates
			tile.id = r.toString() + "-" + c.toString();

			let num = board[r][c];

			updateTile(tile, num);


			document.getElementById("board").append(tile);
		


		}
	}

	setTwo();
	setTwo();
}

// Invoke SetGame
// setGame();

function updateTile(tile, num){
	// clear the tile
	tile.innerText ="";

	// add or clear classList to avoid multiple classes
	tile.classList.value = "";

	tile.classList.add("tile");

	if(num>0){
		tile.innerText = num.toString();

		if(num <= 4096){
			tile.classList.add("x" + num.toString());
		}else{
			tile.classList.add("x8192");
		}

	}


}

// Event that triggers when the webpage finishes loading.
window.onload = function(){
	setGame();
}

// Function that will handle the user's keyboard when they press certain arrow keys
function handleSlide(e){
	// it monitors the key being clicked on the keyboard
	console.log(e.code);

	if(["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "KeyW", "KeyS", "KeyA", "KeyD"].includes(e.code)){
		if(e.code == "ArrowLeft" || e.code == "KeyA"){
			slideLeft();
			setTwo();
		}else if(e.code == "ArrowRight" || e.code == "KeyD"){
			slideRight();
			setTwo();
		}else if(e.code == "ArrowUp" || e.code == "KeyW"){
			slideUp();
			setTwo();
		}else if(e.code == "ArrowDown" || e.code == "KeyS"){
			slideDown();
			setTwo();
		}

			
			document.getElementById("score").innerText = score //update score;


	}
	checkWin();

	if(hasLost()){
			// Timeout
			setTimeout(()=>{
				alert("Game Over! You have lost the game. Game will restart.");
				restartGame();
				alert("Click any arrow key to restart!")
			}, 100);
		}

}

// when any key is pressed, the handle Slide function is invoke.
document.addEventListener("keydown", handleSlide);

function slideLeft(){
	// console.log("You slide to the left!");
	// This loop will iterate through each row
	for(let r=0; r < rows; r++){
		let row = board[r]; //[0,2,2,0] -> [4,0,0,0]

		// contain the current row into the variable originalRow
		let originalRow = row.slice();



		row = slide(row);

		board[r] = row;

		for(let c = 0; c < columns; c++){
			let tile = document.getElementById(r.toString() +"-"+c.toString());
			let num = board[r][c];
			updateTile(tile, num);

			// specifies the animation style and the duration of the animation
			if(originalRow[c] !== num && num !== 0) {
				tile.style.animation = "slide-from-right 0.3s";
				setTimeout(() => {
					tile.style.animation = "";
				}, 300);
			}

		}

	}

}

function slideRight(){
	// console.log("You slide to the right!");
	for(let r=0; r < rows; r++){
		let row = board[r]; //[0,2,2,0] -> [4,0,0,0]

		let originalRow = row.slice();



		// reverses the order of elements in the row, effectively making tile slide to the right as if the board was mirrored.
		
		row.reverse();

		row = slide(row);
		console.log(row);
		row.reverse();
		console.log(row);
		board[r] = row;


		for(let c = 0; c < columns; c++){
			let tile = document.getElementById(r.toString() + "-" + c.toString());
			let num = board[r][c];
			updateTile(tile, num);

			// line for animation
			if(originalRow[c] !== num && num !== 0) {
				tile.style.animation = "slide-from-left 0.3s";
				// to remove the animation from 300 milli seconds
				setTimeout(() => {
					tile.style.animation = "";
				}, 300);
			}

		}

	}
}
function slideUp(){
	// console.log("You slide upward!");
	for(let c = 0; c< columns; c++){
		// In two dimensional array, ther first number represents row, and second is column

		let row = [board[0][c], board[1][c], board[2][c], board[3][c]]

		let originalRow = row.slice();

		/*  1st iteration:
		           row = [board[0][0], board[1][0], board[2][0], board[3][0]] 
		           2nd iteration:
		           row = [board[0][1], board[1][1], board[2][1], board[3][1]]
		           3rd iteration:
		           row = [board[0][2], board[1][2], board[2][2], board[3][2]]
		           4th iteration:
		           row = [board[0][3], board[1][3], board[2][3], board[3][3]]
		       */

		row = slide(row)

		// check which tiles have change in this column
		// This will record the current position of tiles that have change
		let changedIndices = [];
		for(let r = 0; r < rows; r++){
			if(originalRow[r] !== row[r]){
				changedIndices.push(r);
			}
		}


		for(let r = 0 ; r < rows; r++){
			// sets the value of the board array back to the values of the modified row, essentially updating the column in the game board.
			board[r][c] = row[r]

			let tile = document.getElementById(r.toString() +"-"+ c.toString());
			let num = board[r][c];
			updateTile(tile, num)

			if(changedIndices.includes(r) && num !==0){
				tile.style.animation = "slide-from-bottom 0.3s";
				// to remove the animation from 300 milli seconds
				setTimeout(() => {
					tile.style.animation = "";
				}, 300);
			}
		}

	}

}


function slideDown(){
	// console.log("You slide downward!");
	for(let c = 0; c< columns; c++){
		// In two dimensional array, ther first number represents row, and second is column

		let row = [board[0][c], board[1][c], board[2][c], board[3][c]]

		let originalRow = row.slice();

		/*  1st iteration:
		           row = [board[0][0], board[1][0], board[2][0], board[3][0]] 
		           2nd iteration:
		           row = [board[0][1], board[1][1], board[2][1], board[3][1]]
		           3rd iteration:
		           row = [board[0][2], board[1][2], board[2][2], board[3][2]]
		           4th iteration:
		           row = [board[0][3], board[1][3], board[2][3], board[3][3]]
		       */
		row.reverse();
		row = slide(row)
		row.reverse();

		// Animation
		// check which tiles have change in this column
		// This will record the current position of tiles that have change
		let changedIndices = [];
		for(let r = 0; r < rows; r++){
			if(originalRow[r] !== row[r]){
				changedIndices.push(r);
			}
		}


		for(let r = 0 ; r < rows; r++){
			// sets the value of the board array back to the values of the modified row, essentially updating the column in the game board.
			board[r][c] = row[r]

			let tile = document.getElementById(r.toString() +"-"+ c.toString());
			let num = board[r][c];
			updateTile(tile, num)

			if(changedIndices.includes(r) && num !==0){
				tile.style.animation = "slide-from-top 0.3s";
				// to remove the animation from 300 milli seconds
				setTimeout(() => {
					tile.style.animation = "";
				}, 300);
			}
		}

	}



}

// This function will remove all the zeros first before sliding
function filterZero(row){
	return row.filter(num => num != 0);
}

function slide(row){
	row = filterZero(row);

	// Iterate through the row to check for adjacent equal numbers
	for(let i = 0; i < row.length-1 ; i++){
		// add another if statement that will add two adjacent number
		// [2,2,2] => [4, 0, 2]; [4,2]
		if(row[i] == row[i+1] ){
			row[i] *= 2;
			row[i+1] = 0;
			// merger/add the value of the tiles
			score += row[i];
		}

	}

	row = filterZero(row); //[4,2] => [4,2,0,0] 

	while(row.length < columns){
			row.push(0);
		}
	return row;
}

function hasEmptyTile(){
	// Iterate through the board
	for(let r= 0; r <rows ; r++){
		for(let c = 0; c< columns; c++){
			if(board[r][c] == 0){
				return true
			}
		}
	}

	return false;
}

function setTwo(){
	if(!hasEmptyTile()){
		return;
	}

	// declare found variable
	let found = false;

	while(!found){
		//board[r][c]??????
		let r = Math.floor(Math.random() * rows);
		let c = Math.floor(Math.random() * columns);
		console.log(r, c);
		if(board[r][c] == 0){
			found = true;

			board[r][c] = 2;

			let tile = document.getElementById(r.toString() +"-" + c.toString());
			tile.innerText = "2";
			tile.classList.add("x2");
		}


	}

}


let is2048Exist = false;
let is4096Exist = false;
let is8192Exist = false;

// This function will check if there are 2048, 4096 and 8192 tile being merge in the board
function checkWin(){
	for(let r=0; r< rows ; r++){
		for(let c = 0 ; c < columns ; c++){
			//check if current tile == 2048 and higher
			if(board[r][c] == 2048 && is2048Exist == false){
				alert('You win! You got a 2048 tile!');
				is2048Exist = true;
			}else if(board[r][c] ==4096 && is4096Exist == false){
				alert('You are unstoppable at 4096! You are awesome!')
				is4096Exist = true;
			}else if(board[r][c] == 8192 && is8192Exist == false){
				alert("Victory! You have reached 8192! You are incredibly awesome!");
				is8192Exist = true;
			}
		}
	}
}


// This function will verify whether the user lost the game

function hasLost(){
	for(let r = 0; r< rows; r++){
		for(let c = 0; c < columns; c++){
			//we checked whether there is an empty tile or none
			if(board[r][c] == 0){
				return false;
			}

			const currentTile = board[r][c];
			// If there adjacent cells/tile for possible merging
			if(r > 0 && board[r - 1][c] === currentTile ||
                r < rows - 1 && board[r + 1][c] === currentTile ||
                c > 0 && board[r][c - 1] === currentTile ||
                c < columns - 1 && board[r][c + 1] === currentTile){
				return false;
			}


		}
	}
	//No pssible moves left or empty tile, user has lost.	
	return true;
}

// restarting the game functionality
function restartGame(){
	board = [
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0],
		]

    score = 0;
	setTwo();

}



// Declare variables for the touch input
let startX =0;
let startY = 0;

// This will listen to when we touch as screen and assigns the xcoordanates of that
document.addEventListener("touchstart", (e) => {
	startX = e.touches[0].clientX;
	startY = e.touches[0].clientY;
	console.log(startX, startY);
})

// This will check for where you touc your screen and prevents scrolling if your touc input targets any element that includes the word tile in their class name.
document.addEventListener('touchmove', (e) =>{
	if(!e.target.className.includes("tile")){
		return;
	}

	e.preventDefault(); //This line disables scrollingg
}, {passive: false})

// Event Listener that will listen to the touch end

document.addEventListener('touchend', (e) =>{
	// check if the element that trigerred the event has a class name containing tile.
	if(!e.target.className.includes("tile")){
		return;
	}

	let diffX = startX - e.changedTouches[0].clientX;
	let diffY = startY - e.changedTouches[0].clientY;

	if (Math.abs(diffX) > Math.abs(diffY)) {
        // Horizontal swipe
        if (diffX > 0) {
            slideLeft(); // Call a function for sliding left
            setTwo(); // Call a function named "setTwo"
        } else {
            slideRight(); // Call a function for sliding right
            setTwo(); // Call a function named "setTwo"
        }
    } else {
        // Vertical swipe
        if (diffY > 0) {
            slideUp(); // Call a function for sliding up
            setTwo(); // Call a function named "setTwo"
        } else {
            slideDown(); // Call a function for sliding down
            setTwo(); // Call a function named "setTwo"
        }
    }

	document.getElementById("score").innerText = score;

	checkWin();

	if(hasLost()){
		// Timeout
		setTimeout(()=>{
			alert("Game Over! You have lost the game. Game will restart.");
			restartGame();
			alert("Click any arrow key to restart!")
		}, 100);
	}


})

