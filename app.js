const inputContainer = document.querySelector('#inputContainer')
const divGame = document.getElementById('game')
const scoreChart = document.querySelector('#scoreChart')
const scoreTable = document.getElementById('scoreTable')
const player1 = document.querySelector('input[name=player1]');
const player2 = document.querySelector('input[name=player2]');
const submitButton = document.querySelector('#sub');
const form = document.querySelector('form');
const section = document.querySelector('section');
const table = document.querySelector('table')

let dataBase = []
let activePlayer = []

const board = [
    [ null, null, null, null, null, null, null ],
    [ null, null, null, null, null, null, null ],
    [ null, null, null, null, null, null, null ],
    [ null, null, null, null, null, null, null ],
    [ null, null, null, null, null, null, null ],
    [ null, null, null, null, null, null, null ],
];



form.addEventListener('submit', function(e){
    e.preventDefault()

    let player1Name = player1.value;
    let player2Name = player2.value;
    if(player1Name.length === 0 ){
        player1Name = 'player1'
    }
    if(player2Name.length === 0 ){
        player2Name = 'player2'
    }
    createProfile([player1Name, player2Name])
    inputContainer.remove()
    createScoreBoard()
    activePlayer.push(dataBase[0])
    divGame.style.pointerEvents = 'auto'
})



function createProfile(arr){

    play1 = {}
    play1['Name'] = arr[0]
    play1['Wins'] = 0
    play1['Color'] = 'r'

    play2 = {}
    play2['Name'] = arr[1]
    play2['Wins'] = 0
    play2['Color'] = 'b'

    dataBase.push(play1, play2)
}


// Creates table for scoreboard.
function createScoreBoard(){
    
    let scoreArray = [
        [null, null],
        [null, null]
    ]
    let scoreTableRow = document.createElement('tr')
    
    scoreChart.appendChild(scoreTableRow)
    let scoreTableHeaderCell1 = document.createElement('th')
    let scoreTableHeaderCell2 = document.createElement('th')
    scoreTableRow.appendChild( scoreTableHeaderCell1)
    scoreTableRow.appendChild( scoreTableHeaderCell2)
    scoreTableRow.classList.add('scoreTableRow')
    scoreTableHeaderCell1.classList.add('scoreTableHeaderCell1')
    scoreTableHeaderCell2.classList.add('scoreTableHeaderCell2')
    scoreTableHeaderCell1.innerText = 'Player'
    scoreTableHeaderCell2.innerText = 'Wins'

    scoreCells = []
    scoreArray.map((row) => {
        let scoreRow = document.createElement('tr')
        scoreRow.classList.add('scoreRow')
        scoreChart.appendChild(scoreRow)
        row.map(cell => {
            let scoreColumn = document.createElement('td')
            scoreRow.appendChild(scoreColumn)
            scoreColumn.classList.add('scoreColumn');
            scoreCells.push(scoreColumn)  
        })
    })
    scoreCells[0].innerText = `${play1.Name}`
    scoreCells[2].innerText = `${play2.Name}`
    scoreCells[1].innerText = `${play1.Wins}`
    scoreCells[3].innerText = `${play2.Wins}`

    
}


// This function convers an array into a 2 dimensional array.
function tdArray2(arrs){

    let q = []
    for(let i = 0; i < arrs.length; i++){
        if(i%7 === 0){
            q.push(arrs.slice(i,i+7)) 
        }
    }
    return q
}


// This function creates board for game.
function createTableCells(){
//Creates header of board.
    trr = document.createElement('tr')
    table.appendChild(trr)
    let aa = [null, null, null, null, null, null, null]
    aa.map((a)=>{
        let th = document.createElement('th')
        th.classList.add('boardHeader')
        trr.append(th)
    })
//Creates body of board.
    tdArray = []
    for(let g of board){
        tr = document.createElement('tr')
        table.appendChild(tr)
        for(let el of g){
            td = document.createElement('td')
            tr.appendChild(td)
            tdArray.push(td)
        }
    }
    divGame.style.pointerEvents = 'none'
    return tdArray
}
    


let xArr = createTableCells()
// convertedArray contains 2 dimensionl array of each 'td'/column that was created, to insert colored dot in. 
let convertedArray = tdArray2(xArr)


// Waits for DOM to be loaded before assigning click events to header celss to play game.
document.addEventListener('DOMContentLoaded', function(e){
    const h = document.querySelectorAll('th');
    let headerList = Array.from(h)

    for(let hdr of headerList){
        hdr.addEventListener('click', function(e){
            e.preventDefault();
            // e.target.cellIndex will be used to identify which column was selected.
            createPosition(e.target.cellIndex)
            checkForWin()
            switchPlayer()  
        })   
    }
})


// This function finds the position in the array that was in the column that was clicked 
// and then replaces null with the color of the active player.
function createPosition(cIdx){
    // i is for rows and k is for columns of the gameboard.
    for(let i = board.length -1; i >= 0; i--){
        for(let k = 0; k < board[i].length; k++){
            if(k == cIdx){
                if(board[i][k] == null){
                    board[i].splice(k,1,activePlayer[0].Color);
                    createDot([i,k])
                    return
                }   
            }
        }
    }
}


function switchPlayer(){

    if(activePlayer[0] === dataBase[0] ){
        activePlayer.splice(0,1,dataBase[1])
    }else if(activePlayer[0] === dataBase[1] ){
        activePlayer.splice(0,1,dataBase[0])
    }
}


function createDot(point){

    let y = point[0]
    let x = point[1]
    let location = convertedArray[y][x]
    if(activePlayer[0].Color == 'r'){
        circ = document.createElement('span')
        circ.classList.add('red')
        location.appendChild(circ)
    }else if(activePlayer[0].Color == 'b'){
        circ = document.createElement('span')
        circ.classList.add('blue')
        location.appendChild(circ)
    }
}




function checkForWin(){

    HEIGHT = board.length
    WIDTH = board[0].length;

    function win(cells) {
        
        return cells.every(
            ([y, x]) =>
              y >= 0 &&
              y < HEIGHT &&
              x >= 0 &&
              x < WIDTH &&
              board[y][x] == activePlayer[0].Color
          );
    }

    for(var y = 0; y < HEIGHT; y++) {
        for (var x = 0; x < WIDTH; x++) {
            //Coordinates to check for win.
            var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
            var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
            var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
            var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
            
            
            if (win(horiz) || win(vert) || win(diagDR) || win(diagDL)) {
                gameOver()
            }
        }   
    }

    function gameOver(){
        divGame.style.pointerEvents = 'none'
        alert(`game over ${activePlayer[0].Name} WON`);
        // Updates database & score chart.
        activePlayer[0].Wins ++
        if(activePlayer[0].Name == play1.Name ){
            scoreCells[1].innerText = `${play1.Wins}`
        }
        if(activePlayer[0].Name == play2.Name ){
            scoreCells[3].innerText = `${play2.Wins}`
        }
        // Creates reset button
        let resetButton = document.createElement('input')
        resetButton.classList.add('resetButton')
        resetButton.type = 'submit'
        resetButton.value = 'RESET'
        scoreTable.appendChild(resetButton)

        resetButton.addEventListener('click', function(e){
            e.preventDefault()
            // Resets array elements to begin new game.
            board.forEach( row => {
                row.forEach(function(part, index, theArray) {
                    theArray[index] = null;
                })
            })
            
            // Collects all created dots and removes it to begin new game.
            let dotsFromOldGame = Array.from(document.querySelectorAll(" td > span"))
            for(let dot of dotsFromOldGame){
                dot.remove()
            }

            resetButton.remove()
            divGame.style.pointerEvents = 'auto'
            
        })
    }
}

