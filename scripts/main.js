//remaing fixes: dynamic resize of container to shrink size of game
//remaining features:  score tally, AI difficulty modes
//Connect 4?
//NbyK?

var imageBank = {x: ['http://www.clipartbest.com/cliparts/ncX/By4/ncXBy4Kri.png', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/X_mark_18x18_02.svg/2000px-X_mark_18x18_02.svg.png', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/X_mark.svg/2000px-X_mark.svg.png', 'http://zidilifepullzone.5giants.netdna-cdn.com/wp-content/uploads/2014/09/x_spot_zidi.png', 'http://i.imgur.com/wirqMZa.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/OS_X-Logo.svg/2000px-OS_X-Logo.svg.png', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/X11.svg/275px-X11.svg.png', 'http://etc.usf.edu/presentations/extras/letters/theme_alphabets/26/34/x-400.png'], o: ['https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Opera_O.svg/512px-Opera_O.svg.png', 'http://etc.usf.edu/presentations/extras/letters/theme_alphabets/20/25/o-400.png', 'http://etc.usf.edu/presentations/extras/letters/fridge_magnets/red/25/o-300.png', 'https://www.westonsigns.com/images/P/WSCL1_O_INF.jpg', 'http://preschool.uen.org/curriculum/May_s/Letter_O.jpg', 'http://www.wpclipart.com/education/animal_alphabet/animal_alphabet_O.png', 'https://www.westonsigns.com/images/P/WSCL1_O_INFPINK.jpg', 'http://www.really-learn-english.com/image-files/long-o-sound.jpg']};


var computerNames = ['Brock Hardbody - AI', 'Rip Johnson - AI', 'Jones McMuscles - AI']

var theGrid =[]
var tieCounter=0;
var firstMove = true;

//creates grid array
function drawGrid(gridsize){
	for(i = 0; i < gridsize; i++){
		theGrid.push([]);
	}
	for (j = 0; j < gridsize; j++)
		for (i = 0; i<gridsize; i++){
			theGrid[i].push('s');
		}

	}
//random image generator
function randomImage(letter){
	var index = Math.floor(Math.random()*8);
	
		return imageBank[letter][index];
	
}



//resets base game functions
function clearTheGrid(){
	theGrid = [];
	turn = 'x'
	$('.container').remove();
}

//local save and load functions and constructor
Storage = function(arr, turn, players){
		this.arr = arr;
		this.turn = turn;
		this.players = players;
		
		this.saveGame = function(){
			for(i = 0; i<arr.length; i++){
				localStorage.setItem('row'+i, arr[i])
			}
				localStorage.setItem('player1', players[0])
				localStorage.setItem('player2', players[1])
				localStorage.setItem('size', arr.length);
				localStorage.setItem('tieCounter', tieCounter)
				localStorage.setItem('turn', turn)
		}

		this.loadGame = function(){
			size = localStorage.getItem('size');
			size = parseInt(size);
			players = [];
			var game = new Game(size)
			clearTheGrid();
			$div = $('<div>').addClass('container');
			$('body').append($div);
			for(i = 0; i<size; i++){
				theGrid.push([])
				var preArr = localStorage.getItem('row'+i) 
				for(j = 0; j<preArr.length; j++){
					if(preArr.charAt(j) != ','){
					theGrid[i].push(preArr.charAt(j));
					
				}
				}
			}
			players.push(localStorage.getItem('player1'))
			players.push(localStorage.getItem('player2'))
			tieCounter = parseInt(localStorage.getItem('tieCounter'))
			game = new Game(theGrid.length, players)
			game.render()
		}
}
//runs through rows and checks for win conditions
function checkRows(arr, toWin){
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
		if(xCount===arr.length){
			row = i;
			return [true,'x',row];
		} else if (oCount===arr.length){
				row = i;
				return [true,'o', row];
			}
	}
	return false;
}
//runs through columns and checks for win conditions
function checkColumns(arr, toWin){
	var xCount = 0;
	var oCount = 0;
	var column = 0;
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
		if(xCount===arr.length){
				column = i;
				return [true,'x', column];
		} else if (oCount===arr.length){
				column = i;
				
				return [true,'o', column];
			}
	}
	return false;
}
//runs through diagonals and checks win conditions
function checkDiagonal(arr, toWin){
	var xCount = 0;
	var oCount = 0;
	var angle = 0;
	for(var i = arr.length-1; i >= 0; i--){
			xCount = 0;
			oCount = 0;
		if(i===arr.length-1 || i === 0){
		for(var j = 0; j < arr[i].length; j++){
			if(arr[Math.abs(i-j)][j]==='x'){
				xCount++
			}else if (arr[Math.abs(i-j)][j]==='o'){
				oCount++
			}
		}
	}
			if(xCount===arr.length){
				angle = i;
				return [true,'x',angle];
			} else if (oCount===arr.length){
				angle = i;
				return [true,'o',angle];
			}
		angle++;
	}
	return false;
}


//incomplete function to light up squares on win
function lightUp(source, placement, arr){
	switch(source){
		case 'row':
			for(i=0; i< arr.length; i++ ){
				$('#r'+placement+'c'+i).css('border-width', '2px').css('border-color', 'red');
				
			}
			break;
		case 'column':
				for(i=0; i< arr.length; i++ ){
				$('#r'+i+'c'+placement).css('border-width', '2px').css('border-color', 'red');
				
			}
			break;
		case 'diagonal':
				for(i = 0; i<arr.length; i++){
					if(placement === 2){
						$('#r'+i+'c'+(placement-i)).css('border-width', '2px').css('border-color', 'red');
					} else {
						$('#r'+i+'c'+i).css('border-width', '2px').css('border-color', 'red');
					}
				}
	}
}


//runs through all win conditions
function checkWinCondition(arr, toWin){

var win = checkRows(arr)

if(win[0]){
	$('.save').remove();
	lightUp('row', win[2], theGrid)
	return [true, win[1]]
}

win = checkColumns(arr)

if(win[0]){
	$('.save').remove();
	lightUp('column', win[2], theGrid)
	return [true, win[1]]
}

win = checkDiagonal(arr)

if(win[0]){
	$('.save').remove();
	lightUp('diagonal', win[2], theGrid)
	return [true, win[1]]

}
return false;

}

//generates a random move
function randomComputerMove(arr){
	var row = Math.floor(Math.random()*arr.length)
	var col = Math.floor(Math.random()*arr.length)
	var exitThisLoop = false
	while(!exitThisLoop){
		if(arr[row][col]==='s'){
			arr[row][col]='o';
			exitThisLoop = true;
		} else {
		 row = Math.floor(Math.random()*arr.length)
		 col = Math.floor(Math.random()*arr.length)
		 
		}
	}
	return [row,col]

}


//main AI game logic 
function computerTurn(arr){
			var gridsize=arr.length
			
			if(tieCounter===(gridsize*gridsize)){
										$('#winnerIs').text('ITS A TIE')
										$('.winner').toggle();
										return false;
										}

	//checks to see if the computer can make a winning move
		var xCount = 0;
		var oCount = 0; 
		for(var i = arr.length-1; i >= 0; i--){
			xCount = 0;
			oCount = 0;
		if(i===arr.length-1 || i === 0){
		for(var j = 0; j < arr.length; j++){
			if(arr[Math.abs(i-j)][j]==='o'){
				oCount++
				}
				if (oCount === arr.length-1){
					for(var k = arr.length-1; i >= 0; i--){
						if(i===arr.length-1 || i === 0){
							for(var l = 0; j < arr[k].length; j++){
									if(arr[Math.abs(k-l)][l]==='s'){
										arr[Math.abs(k-l)][l]='o'
										return [Math.abs(k-l),l];
										}
									} 
						}
					}
				}
			}
		}
	}
	for(var i = 0; i < arr.length; i++){
		xCount = 0;
		oCount = 0;
	for(var j = 0; j < arr.length; j++){
		if(arr[i][j]==='o'){
			oCount++
			if(oCount===arr.length-1){
				var oCountRow = i;
			}
			}
				if (oCount === arr.length-1){

					for(var l = 0; l < arr.length;  l++){
						if(arr[oCountRow][l]==='s'){
							arr[oCountRow][l]='o'
							return [oCountRow,l];
					}
				}	
			}
		}
	}
		for(var i = 0; i < arr.length; i++){
		xCount = 0;
		oCount = 0;
	for(var j = 0; j < arr.length; j++){
		if(arr[j][i]==='o'){
			oCount++
			if(oCount===arr.length-1){
			var	oCountColumn = i;
			}
			}
			if (oCount === arr.length-1){
				for(var l = 0; l < arr.length;  l++){
					if(arr[l][oCountColumn]==='s'){
						arr[l][oCountColumn]='o'
						return [l,oCountColumn];
					}
				}	
			}
		}
	}
	//checks to see if the player is about to make a winning move and blocks
		for(var i = arr.length-1; i >= 0; i--){
			xCount = 0;
			oCount = 0;
		if(i===arr.length-1 || i === 0){
		for(var j = 0; j < arr.length; j++){
			if(arr[Math.abs(i-j)][j]==='x'){
				xCount++

				}
				if (xCount === arr.length-1){
					for(var k = arr.length-1; i >= 0; i--){
						if(i===arr.length-1 || i === 0){
							for(var l = 0; j < arr[k].length; j++){
									if(arr[Math.abs(k-l)][l]==='s'){
										arr[Math.abs(k-l)][l]='o'
										return [Math.abs(k-l),l];
										}
									} 
						}
					}
				}
			}
		}
	}
	for(var i = 0; i < arr.length; i++){
		xCount = 0;
		oCount = 0;
	for(var j = 0; j < arr.length; j++){
		if(arr[i][j]==='x'){
			xCount++
			if(xCount===arr.length-1){
			var	xCountRow = i;
			}
			}
				if (xCount === arr.length-1){
					for(var l = 0; l < arr.length;  l++){
						if(arr[xCountRow][l]==='s'){
							arr[xCountRow][l]='o'
							return [xCountRow,l];
					}
				}	
			}
		}
	}
		for(var i = 0; i < arr.length; i++){
		xCount = 0;
		oCount = 0;
	for(var j = 0; j < arr.length; j++){
		if(arr[j][i]==='x'){
			xCount++
			if(xCount===arr.length-1){
			var	xCountColumn = i;
			}
			}
			if (xCount === arr.length-1){
				for(var l = 0; l < arr.length;  l++){
					if(arr[l][xCountColumn]==='s'){
						arr[l][xCountColumn]='o'
						return [l,xCountColumn];
					}
				}	
			}
		}
	}

	//moves first to be diagonally opposite of X if X is not in the middle, otherwise goes to an empty corner if possible

	for(var i = arr.length-1; i >= 0; i--){
		xCount = 0;
		oCount = 0;
	if(i===arr.length-1 || i === 0){
	for(var j = 0; j < arr.length; j++){
		if(arr[Math.abs(i-j)][j]==='x'){
			xCountRow=Math.abs(i-j);
			xCountColumn=j;

			if(arr[Math.abs(xCountRow-(arr.length-1))][Math.abs(xCountColumn-(arr.length-1))]==='s'){
				if(firstMove){	
				firstMove=false;	
				return [Math.abs(xCountRow-(arr.length-1)), Math.abs(xCountColumn-(arr.length-1))]
				}
			}
			for(var k = arr.length-1; k >= 0; k--){
				if(k===arr.length-1 || k === 0){
					
					for(var l = 0; l < arr[k].length; l++){
							if(arr[Math.abs(k-l)][l]==='s' && k != l){
								
								arr[Math.abs(k-l)][l]='o'
								return [Math.abs(k-l),l];
								}
							} 
					}
				}
			}
		}
	}
}

//if X has taken the middle moves to an empty corner, may be extra code but requires further testing to determine
// if(arr[arr.length-2][arr.length-2]==='x'){
// 	for(var k = arr.length-1; k >= 0; k--){
// 				if(k===arr.length-1 || k === 0){
					
// 					for(var l = 0; l < arr[k].length; l++){
// 							if(arr[Math.abs(k-l)][l]==='s' && k != l){
								
// 								arr[Math.abs(k-l)][l]='o'
// 								return [Math.abs(k-l),l];
// 							}
// 						} 
// 					}
// 				}
// 			}


	//if no corners are available and the middle still is, takes the middle
	if(arr[arr.length-2][arr.length-2]==='s')
	{
		arr[arr.length-2][arr.length-2]==='o'		
		return[arr.length-2,arr.length-2]
	}
//find only available (at Random)
	var rando = randomComputerMove(arr)

		return rando;
	


}

//main game constructor

Game = function(gridsize, players, fresh){
	this.gridsize = gridsize; 		//sets size of grid
	
	//determines if the start game or load game function was pressed
	if(!fresh){
	turn = localStorage.getItem('turn')
	}
	else {
		turn = 'x'
	}

	//sets players, as long as the function wasn't called by the load process
	if(typeof(players) !='undefined'){
	var player1 = players[0];
	var player2 = players[1];	
	}
	

	//main game build and play function
	this.render = function(){

		//only creates a new grid if the grid doesn't already exist (namely through loading a saved game)
		if(theGrid.length === 0 ){
		drawGrid(gridsize)
		}

		//builds the save button
		$save = $('<button>').text('Save').addClass('save').on('click', function(){
			loader = new Storage(theGrid, turn, players, tieCounter);
			loader.saveGame();
			clearTheGrid();
			firstMove = true;
			$div = $('<div>')
			$div.addClass('container');
			$('body').append($div)
			$('.buttons').toggle();
			$('.sizer').toggle();
			$('.player1').toggle();
			$('.player2').toggle();
			$('.playernames').toggle();
			$('#player1').val('');
			$('#player2').val('');
			$('.save').remove();
		})
		$('body').prepend($save)
		
		//nested forEach function to create each div
		theGrid.forEach(function(element, indexI){
			
			theGrid[indexI].forEach(function(element, indexJ, array){				
				//takes the index position from the previous forEach and passes it as an integer
				indexI = parseInt(this);
				//creates each div and gives it an id corresponding to it's row and column
				$div = $('<div>');
				$div.addClass('box').attr('id','r'+indexI+'c'+indexJ);
							$('.container').append($div);

				//fills in pre-existing Xs and Os (usually only if the Grid was reloaded)
				if(theGrid[indexI][indexJ]==='x'){
					$div.css('background-image', "url("+randomImage('x')+")")
				} else if(theGrid[indexI][indexJ] === 'o'){
					$div.css('background-image', "url("+randomImage('o')+")")
				}

				
				//modifies borders to look like a tic-tac-toe board
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
					//main gameplay function, on click event sets random images and updates the array
				$div.on('click', function(){
					$div = ($(this));
					

					 if(theGrid[indexI][indexJ]==='s'){
						
						if(turn === 'x'){
							$div.css('background-image', "url("+randomImage('x')+")")
							
							theGrid[indexI][indexJ] = 'x'
								turn ='o'
							
						} else if (turn === 'o'){
							$div.css('background-image', "url("+randomImage('o')+")")
							theGrid[indexI][indexJ] = 'o'
							turn = 'x'

						}
							tieCounter++

					} 

					//computer gameplay function
					 if(player2==='AI' && turn === 'o'){
								whereToPlace = computerTurn(theGrid)
								if(!whereToPlace){return false}
								$compDiv = $('#r'+whereToPlace[0]+'c'+whereToPlace[1])
								theGrid[whereToPlace[0]][whereToPlace[1]] = 'o';
								$compDiv.css('background-image', "url("+randomImage('o')+")")	
								turn = 'x'
								tieCounter++

							}
					endGame = checkWinCondition(theGrid)
					//checks for end condition, spits out the winner in the winner modal and generates a random name for the computer
					if(endGame[0]){
						switch(endGame[1]){
							case 'x':
							$('#winnerIs').text(player1 + ' wins')
							break
							case 'o':
								if(player2 === 'AI'){
							$('#winnerIs').text(computerNames[Math.floor(Math.random()*3)] + ' wins')
							} else {
								$('#winnerIs').text(player2 + ' wins')
							}
						}

						$('.winner').toggle();
						return false;
					}
					//determines if there is a tie condition
					if(tieCounter===(gridsize*gridsize)){
						$('#winnerIs').text('ITS A TIE')
						$('.winner').toggle();
						return false;
					}
				})
			},indexI)
		})
	
	//rescales divs for higher sized boards
	switch(gridsize){
		case 4:
			$('.box').height('24%').width('24%');
			break;
		case 5:	
			$('.box').height('18%').width('18%');
			break;
		case 6:
			$('.box').height('14%').width('14%');
			break;
		case 7: 
			$('.box').height('13%').width('13%');
			
			break;
		case 8:
			$('.box').height('12%').width('12%');
			break;
		case 9:
			$('.box').height('10%').width('10%');
			break;
		case 10:
			$('.box').height('9%').width('9%');
			break;
		default: 
			$('.box').height('30%').width('30%');

		}


	}
	//reset button fucntion to set everything back to square one
	this.resetButton = function(){
		clearTheGrid();
		window.localStorage.clear();
		tieCounter = 0;
		firstMove = true;
		$div = $('<div>')
		$div.addClass('container');
		$('body').append($div)
		$('.winner').toggle();
		$('.buttons').toggle();
		$('.sizer').toggle();
		$('.player1').toggle();
		$('.player2').toggle();
		$('.playernames').toggle();
		$('#player1').val('');
		$('#player2').val('');
	}

	//clears local storage
	this.clearData = function(){
		window.localStorage.clear();
	}

}
var size = 0;

//sets grid size
var Size = function(){
	this.set = function(){
			if($('#size_3').is(':checked')){
				$('#size_3').attr('checked', false);
				$('.sizer').toggle();
				return 3;
			} else if($('#size_4').is(':checked')){
				$('.sizer').toggle();
				return 4;
			} else if($('#size_5').is(':checked')){
				$('.sizer').toggle();
				return 5;
			} else if($('#size_6').is(':checked')){
				$('.sizer').toggle();
				return 6; 
			} else if($('#size_7').is(':checked')){
				$('.sizer').toggle();
				return 7; 
			} else if($('#size_8').is(':checked')){
				$('.sizer').toggle();
				return 8; 
			} else if($('#size_9').is(':checked')){
				$('.sizer').toggle();
				return 9; 
			} else if($('#size_10').is(':checked')){
				$('.sizer').toggle();
				return 10; 
			} else {
				$('.sizer').toggle();
				return 3;
			
			}
	}
}


//determins player names constructor
var PlayerNames = function(){
	
this.setPlayers = function(){
	 opponent1 = $('#player1').val();
	 opponent2 = $('#player2').val();
	
	
	if(opponent2 === ''){

		opponent2 = 'AI';
	}	

	$('.player1').toggle();
	$('.player2').toggle();
	$('.playernames').toggle();

	return [opponent1, opponent2];
}

}


$(document).ready(function(){

	//keeps track of mouse coordinates
	$(document).mousemove( function(e){
		mouseX = e.pageX;
		mouseY = e.pageY;
	});

	//grabs buttons
	$start = $('.start');
	$load = $('.load');

	//starts a new game
	$start.on('click', function(){
		$('.buttons').toggle();
		
		var size = new Size();
		var gamers = new PlayerNames(); 
		var ticTacToe = new Game(size.set(), gamers.setPlayers(), true);

		ticTacToe.render();
		})

	//reloads saved game
	$load.on('click', function(){
			if(!localStorage.getItem('row0')){
				alert("No save data")
				return false; }

		$('.buttons').toggle();
		$('.sizer').toggle();
		$('.player1').toggle();	
		$('.player2').toggle();
		$('.playernames').toggle();
		var ticTacToe = new Storage()
		ticTacToe.loadGame();
	})


	$('.clear').on('click', function(){
		var ticTacToe = new Game();
		ticTacToe.clearData();
	});
	//reset button
	$('.reset').on('click', function(){
		var ticTacToe = new Game();
		ticTacToe.resetButton()

	})

//info box on player 2
$('#q1').on('mouseenter', function(){
		$('.infobox').css('top', mouseY).css('left', mouseX).fadeIn('fast', function(){
			$('#infoText').text("Leave blank for computer opponent")
		})
	})
	$('#q1').on('mouseleave', function(){
		$('.infobox').fadeOut('fast');
	})

})