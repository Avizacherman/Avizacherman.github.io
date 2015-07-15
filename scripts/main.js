var imageBank = {x: [], o: []};
var theGrid =[]
var turn = 'x'

function drawGrid(gridsize){
	for(i = 0; i < gridsize; i++){
		theGrid.push([]);
	}
	for (j = 0; j < gridsize; j++)
		for (i = 0; i<gridsize; i++){
			theGrid[i].push('s');
		}

	}

function clearTheGrid(){
	theGrid = [];
}

function checkRows(arr){
	var xCount = 0;
	var oCount = 0;
	for(var i = 0; i < arr.length; i++){
			xCount = 0;
			oCount = 0;
		for(var j = 0; j < arr[i].length; j++){
			if(arr[i][j]==='x'){
				xCount++
			}else if (arr[i][j]==='o'){
				oCount++
			}
		}
		if(xCount===3){
			return [true,'x'];
		} else if (oCount===3){
				return [true,'o'];
			}
	}
	return false;
}

function checkColumns(arr){
	var xCount = 0;
	var oCount = 0;
	for(var i = 0; i < arr.length; i++){
			xCount = 0;
			oCount = 0;
		for(var j = 0; j < arr[i].length; j++){
			if(arr[j][i]==='x'){
				xCount++
			}else if (arr[j][i]==='o'){
				oCount++
			}
		}
		if(xCount===3){
				return [true,'x'];
		} else if (oCount===3){
				return [true,'o'];
			}
	}
	return false;
}


function checkDiagonal(arr){
	var xCount = 0;
	var oCount = 0;
	for(var i = arr.length-1; i >= 0; i--){
			xCount = 0;
			oCount = 0;
		for(var j = 0; j < arr[i].length; j++){

			if(arr[Math.abs(i-j)][j]==='x'){
				xCount++
			}else if (arr[Math.abs(i-j)][j]==='o'){
				oCount++
				console.log(i + 'th iteration ' + Math.abs(i-j)+ ' '+j)
			}
		}
		if(xCount===3){
				return [true,'x'];
		} else if (oCount===3){
				return [true,'o'];
			}
	}
	return false;
}

function lightUp(arr){

}

function checkWinCondition(arr){

var win = checkRows(arr)

if(win[0]){
	console.log(win[1] + ' wins')
	return true
}

win = checkColumns(arr)

if(win[0]){
	console.log(win[1] + ' wins')
	return true
}

win = checkDiagonal(arr)

if(win[0]){
	console.log(win[1] + ' wins')
	return true

}


}

Game = function(gridsize){
	this.gridsize = gridsize;
	
	this.render = function(){
		drawGrid(gridsize)
		console.log(theGrid)
		theGrid.forEach(function(element, indexI){
			
			// $row = $('<div>');
			// $row.addClass('row');
			
			theGrid[indexI].forEach(function(element, indexJ, array){				
				indexI = parseInt(this);
				console.log(indexI)
				
				$div = $('<div>');
				$div.addClass('box')./*.addClass('three').addClass('columns').*/addClass('r'+indexI+'c'+indexJ);
							$('.container').append($div);

				if(indexJ ===0){
					// $div.addClass('offset-by-two')
				}

				// $row.append($div)
					if (indexI===0){
						$div.addClass('top');
					}	else if (indexI===gridsize-1){
						$div.addClass('bottom');
					} 

				if (indexJ===0){
						$div.addClass('left')
					} else if (indexJ===gridsize-1){
						$div.addClass('right')
					}
					
				$div.on('click', function(){
					$div = ($(this));
					if(turn === 'x'){
						$div.text('x')
						
						theGrid[indexI][indexJ] = 'x'
						turn ='o'
					} else if (turn === 'o'){
						$div.text('o')
						theGrid[indexI][indexJ] = 'o'
						turn = 'x'
					}
					if(checkWinCondition(theGrid)){
						alert('game over');
						return false;
					}
				})
			},indexI)
		})
	}
}
var size = 0;

var ticTacToe = new Game(3);