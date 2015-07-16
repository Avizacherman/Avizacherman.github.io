var imageBank = {x: ['http://www.clipartbest.com/cliparts/ncX/By4/ncXBy4Kri.png', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/X_mark_18x18_02.svg/2000px-X_mark_18x18_02.svg.png', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/X_mark.svg/2000px-X_mark.svg.png', 'http://zidilifepullzone.5giants.netdna-cdn.com/wp-content/uploads/2014/09/x_spot_zidi.png', 'http://i.imgur.com/wirqMZa.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/OS_X-Logo.svg/2000px-OS_X-Logo.svg.png', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/X11.svg/275px-X11.svg.png', 'http://etc.usf.edu/presentations/extras/letters/theme_alphabets/26/34/x-400.png'], o: ['https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Opera_O.svg/512px-Opera_O.svg.png', 'http://etc.usf.edu/presentations/extras/letters/theme_alphabets/20/25/o-400.png', 'http://etc.usf.edu/presentations/extras/letters/fridge_magnets/red/25/o-300.png', 'https://www.westonsigns.com/images/P/WSCL1_O_INF.jpg', 'http://preschool.uen.org/curriculum/May_s/Letter_O.jpg', 'http://www.wpclipart.com/education/animal_alphabet/animal_alphabet_O.png', 'https://www.westonsigns.com/images/P/WSCL1_O_INFPINK.jpg', 'https://pixabay.com/get/f122909fda6aeff498c9/1437014441/letter-146055_1280.png']};
var theGrid =[]
var turn = 'x'
var tieCounter=0;

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
	$('.container').remove();
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
		if(xCount===arr.length){
			return [true,'x'];
		} else if (oCount===arr.length){
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
		if(xCount===arr.length){
				return [true,'x'];
		} else if (oCount===arr.length){
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
				return [true,'x'];
		} else if (oCount===arr.length){
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
	$('.winnerIs').text(win[1] + ' wins')

	return true
}

win = checkColumns(arr)

if(win[0]){
	$('.winnerIs').text(win[1] + ' wins')
	return true
}

win = checkDiagonal(arr)

if(win[0]){
	$('.winnerIs').text(win[1] + ' wins')
	return true

}


}

Game = function(gridsize){
	this.gridsize = gridsize;
	


	this.render = function(){
		drawGrid(gridsize)
		


		theGrid.forEach(function(element, indexI){
			
			// $row = $('<div>');
			// $row.addClass('row');
			
			theGrid[indexI].forEach(function(element, indexJ, array){				
				indexI = parseInt(this);
				
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
					
					tieCounter++

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
					}
					if(checkWinCondition(theGrid)){
						clearTheGrid();
						$('.winner').toggle();
						return false;
					}
					if(tieCounter===(gridsize*gridsize)){
						$('.winnerIs').text('ITS A TIE')
						clearTheGrid();
						$('.winner').toggle();
					}
				})
			},indexI)
		})
	
	
	if(gridsize === 4){
	$('.box').height('24%').width('24%');
	}
	
	if(gridsize === 5){
	$('.box').height('18%').width('18%');
	}

	}
	
	this.resetButton = function(){
		$div = $('<div>')
		$div.addClass('container');
		$('body').append($div)
		$('.winner').toggle();
		$('.start').toggle();
		$('.sizer').toggle();
	}
}
var size = 0;

var Size = function(){
	this.set = function(){
			if($('#size_3').is(':checked')){
				$('.sizer').toggle();
				return 3;
			} else if($('#size_4').is(':checked')){
				$('.sizer').toggle();
				return 4;
			} else if($('#size_5').is(':checked')){
				$('.sizer').toggle();
				return 5;
			} else {
				$('.sizer').toggle();
				return 3;
			
			}
	}
}

var size = new Size();

$(document).ready(function(){
	$start = $('.start');
	$start.on('click', function(){
		$start.toggle();
		var ticTacToe = new Game(size.set());
		ticTacToe.render();
		})

	$('.reset').on('click', function(){
		var ticTacToe = new Game();
		ticTacToe.resetButton()
		
	})
})