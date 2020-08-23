// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Game of Life
// Video: https://youtu.be/FWSR_7kZuYg

function make2DArray(cols, rows) {
	let arr = new Array(cols);
	for (let i = 0; i < arr.length; i++) {
	  arr[i] = new Array(rows);
	}
	return arr;
  }
  
  let grid;
  let cols;
  let rows;
  let resolution = 10;
  
  function setup() {
	createCanvas(600, 400);
	cols = width / resolution;
	rows = height / resolution;
  
	grid = make2DArray(cols, rows);
	for (let i = 0; i < cols; i++) {
	  for (let j = 0; j < rows; j++) {
		grid[i][j] = floor(random(3));
	  }
	}
  }
  
  function draw() {
	background(0);
  
	for (let i = 0; i < cols; i++) {
	  for (let j = 0; j < rows; j++) {
		let x = i * resolution;
		let y = j * resolution;
		if (grid[i][j] == 1) {
		  fill(255);
		  stroke(0);
		  rect(x, y, resolution - 1, resolution - 1);
		}
		if (grid[i][j] == 2) {
			fill("#FF0000");
			stroke(0);
			rect(x, y, resolution - 1, resolution - 1);
		}
		
	  }
	}
  
	let next = make2DArray(cols, rows);
  
	// Compute next based on grid
	for (let i = 0; i < cols; i++) {
	  for (let j = 0; j < rows; j++) {
		let state = grid[i][j];
		// Count live neighbors!
		let sum = 0;
		let neighbors1 = countNeighbors(grid, i, j,1);
		let neighbors2 = countNeighbors(grid, i, j, 2);
		let rand = floor(random(50))
		/*
		if(rand  == 2){
			state = 2;

		}
		else if(rand > 47){
			state = 1;
		}*/
		

		if (state == 0 && (neighbors1 == 3 || neighbors2 == 3)) {
			if(neighbors1 > neighbors2){
				
		  		next[i][j] = 1;
			}else if (neighbors1 < neighbors2){
				next[i][j] = 2;
			}else{
				next[i][j] = floor(random(3));
			}
			//White are good at attacking, red at invading and converting
		} else if (state == 1 && (neighbors1 < 2 || neighbors1 > 3||neighbors2 > 1)) {
			if((neighbors2 > 3)){
				next[i][j] = 2;
			}else{
				//Die stochastically
				next[i][j] = 0;
			}
		  
		}else if (state == 2 && (neighbors2 < 2 || neighbors2 > 3|| neighbors1 > 1)) {
			if((neighbors1 > 3)){
				next[i][j] = 1;
			}else{
				next[i][j] = 0;
			}
		}else {
		  next[i][j] = state;
		}

	  }
	}
  
	grid = next;
  }
  
  function countNeighbors(grid, x, y, type) {
	let sum = 0;
	for (let i = -1; i < 2; i++) {
	  for (let j = -1; j < 2; j++) {
		let col = (x + i + cols) % cols;
		let row = (y + j + rows) % rows;
		if(grid[col][row]==type){
			sum += grid[col][row]/type;
	 	}
	  }
	}
	if(grid[x][y] == type){
		sum -= grid[x][y]/type;
	}else{
		sum -grid[x][y];
	}
	return sum;
  }