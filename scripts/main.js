//remaing fixes: dynamic resize of container to shrink size of game
//remaining features: Save/Load State, score tally, AI difficulty modes
//Connect 4?
//NbyK?

var imageBank = {x: ['http://www.clipartbest.com/cliparts/ncX/By4/ncXBy4Kri.png', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/X_mark_18x18_02.svg/2000px-X_mark_18x18_02.svg.png', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/X_mark.svg/2000px-X_mark.svg.png', 'http://zidilifepullzone.5giants.netdna-cdn.com/wp-content/uploads/2014/09/x_spot_zidi.png', 'http://i.imgur.com/wirqMZa.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/OS_X-Logo.svg/2000px-OS_X-Logo.svg.png', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/X11.svg/275px-X11.svg.png', 'http://etc.usf.edu/presentations/extras/letters/theme_alphabets/26/34/x-400.png'], o: ['https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Opera_O.svg/512px-Opera_O.svg.png', 'http://etc.usf.edu/presentations/extras/letters/theme_alphabets/20/25/o-400.png', 'http://etc.usf.edu/presentations/extras/letters/fridge_magnets/red/25/o-300.png', 'https://www.westonsigns.com/images/P/WSCL1_O_INF.jpg', 'http://preschool.uen.org/curriculum/May_s/Letter_O.jpg', 'http://www.wpclipart.com/education/animal_alphabet/animal_alphabet_O.png', 'https://www.westonsigns.com/images/P/WSCL1_O_INFPINK.jpg', 'http://www.really-learn-english.com/image-files/long-o-sound.jpg']};


var computerNames = ['Brock Hardbody - AI', 'Rip Johnson - AI', 'Jones McMuscles - AI']

var theGrid =[]
var turn = 'x'
var tieCounter=0;
var firstMove = true;

function drawGrid(gridsize){
	for(i = 0; i < gridsize; i++){
		theGrid.push([]);
	}
	for (j = 0; j < gridsize; j++)
		for (i = 0; i<gridsize; i++){
			theGrid[i].push('s');
		}

	}

function randomImage(letter){
	var index = Math.floor(Math.random()*8);
	
		return imageBank[letter][index];
	
}


function clearTheGrid(){
	theGrid = [];
	turn = 'x'
	$('.container').remove();
}


Storage = function(arr, turn, players){
		this.arr = arr;
		
		if (typeof(arr) != 'undefined'){
			this.size = arr.length;
		}
		this.turn = turn;
		this.players = players;
		this.saveGame = function(){
			for(i = 0; i<arr.length; i++){
				localStorage.setItem('row'+i, arr[i])
				localStorage.setItem('turn', turn)
			}
				localStorage.setItem('player1', players[0])
				localStorage.setItem('player2', players[1])
				localStorage.setItem('size', size);
		}

		this.loadGame = function(){
			size = localStorage.getItem('size');
			var game = new Game(size)
			clearTheGrid();
			$div = $('<div>').addClass('container');
			$('body').append($div);
			for(i = 0; i<size; i++){
				theGrid.push([])
				var preArr = localStorage.getItem('row'+i) 
				for(j = 0; j<size; j++){
					if(preArr.charAt(j) != ','){
					theGrid[i].push(preArr.charAt(j));
				}
				}
			}
			debugger
			players.push(localStorage.getItem(player1))
			players.push(localStorage.getItem(player2))
			game = new Game(theGrid.length, players)
			game.render()
			turn = localStorage.getItem('turn')
		}
}

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

function lightUp(source, placement, arr){
	switch(source){
		case 'row':
			for(i=0; i< arr.length; i++ ){
				$('#r'+placement+'c'+i).css('border-width', '2px').css('border-color', 'red');
				break;
			}
		case 'column':
				for(i=0; i< arr.length; i++ ){
				$('#r'+i+'c'+placement).css('border-width', '2px').css('border-color', 'red');
			}
	}
}

function checkWinCondition(arr, toWin){

var win = checkRows(arr)

if(win[0]){
	return [true, win[1]]
}

win = checkColumns(arr)

if(win[0]){
	return [true, win[1]]
}

win = checkDiagonal(arr)

if(win[0]){
	return [true, win[1]]

}
return false;

}

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

function computerTurn(arr, toWin){
			var gridsize=arr.length
			
			if(tieCounter===(gridsize*gridsize)){
										$('.winnerIs').text('ITS A TIE')
										$('.winner').toggle();
										return false;
										}

	//wins
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
	//block
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

	//first move diagonal doesn't factor in with X is middle
	//corner

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

//x is middle go for corner
if(arr[arr.length-2][arr.length-2]==='x'){
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


	//middle 
	if(arr[arr.length-2][arr.length-2]==='s')
	{
		arr[arr.length-2][arr.length-2]==='o'		
		return[arr.length-2,arr.length-2]
	}
//find only available (at Random)
	var rando = randomComputerMove(arr)

		return rando;
	


}

Game = function(gridsize, players, toWin){
	this.gridsize = gridsize;



	if(typeof(players) !='undefined'){
	var player1 = players[0];
	var player2 = players[1];	
	}
	
	this.render = function(){
		if(theGrid.length === 0 ){
		drawGrid(gridsize)
		}


		theGrid.forEach(function(element, indexI){
			
			theGrid[indexI].forEach(function(element, indexJ, array){				
				indexI = parseInt(this);
				
				$div = $('<div>');
				$div.addClass('box').attr('id','r'+indexI+'c'+indexJ);
							$('.container').append($div);

			
				if(theGrid[indexI][indexJ]==='x'){
					$div.css('background-image', "url("+randomImage('x')+")")
				} else if(theGrid[indexI][indexJ] === 'o'){
					$div.css('background-image', "url("+randomImage('o')+")")

				}

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

					if(endGame[0]){
						switch(endGame[1]){
							case 'x':
							$('.winnerIs').text(player1 + ' wins')
							break
							case 'o':
								if(player2 === 'AI'){
							$('.winnerIs').text(computerNames[Math.floor(Math.random()*3)] + ' wins')
							} else {
								$('.winnerIs').text(player2 + ' wins')
							}
						}

						$('.winner').toggle();
						return false;
					}
					if(tieCounter===(gridsize*gridsize)){
						$('.winnerIs').text('ITS A TIE')
						$('.winner').toggle();
						return false;
					}
				})
			},indexI)
		})
	
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
	
	this.resetButton = function(){
		clearTheGrid();
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
	}
}
var size = 0;

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



var PlayerNames = function(){
	
this.setPlayers = function(){
	var opponent1 = $('#player1').val();
	var opponent2 = $('#player2').val();
	
	
	if(opponent2 === ''){

		opponent2 = 'AI';
	}	
	
	$('#player1').val('');
	$('#player2').val('');

	$('.player1').toggle();
	$('.player2').toggle();
	$('.playernames').toggle();

	return [opponent1, opponent2];
}

}

var size = new Size();
var gamers = new PlayerNames(); 

$(document).ready(function(){
	$start = $('.start');
	$load = $('.load');
	$start.on('click', function(){
		$('.buttons').toggle();
		
		var ticTacToe = new Game(size.set(), gamers.setPlayers());

		ticTacToe.render();
		})
	$load.on('click', function(){
		var ticTacToe = new Storage()
		ticTacToe.loadGame();
	})

	$('.reset').on('click', function(){
		var ticTacToe = new Game();
		ticTacToe.resetButton()
		
	})
})