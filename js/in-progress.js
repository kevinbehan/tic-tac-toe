+function(){
  //Find the two players
  const player1 = document.getElementById("player1")
  const player2 = document.getElementById("player2")
  //Find the boxes
  const boxes = Array.from(document.querySelectorAll(".box")) 
  //Make player1 active aka start the game
  player1.classList.add("active")
  //Find the board
  const board = document.getElementById("board")
  //Build the win screen element and add it to the board
  const winScreen = document.createElement("div")
  winScreen.classList.add("screen")
  winScreen.classList.add("screen-win")
  winScreen.style.display = "none"
  board.appendChild(winScreen)
  //Build the children of the win screen and insert them
  const winHeader = document.createElement("header")
  const winHeading = document.createElement("h1")
  const winMsg = document.createElement("p")
  const newGame = document.createElement("a")
  winHeading.innerText = "Tic Tac Toe"
  winMsg.classList.add("message")
  newGame.classList.add("button")
  newGame.setAttribute("href", "#")
  newGame.innerText = "New game"
  //Add the elements above to the win screen
  winScreen.appendChild(winHeader)
  //Add the button and the heading to the header
  winHeader.appendChild(winHeading)
  winHeader.appendChild(winMsg)
  winHeader.appendChild(newGame)
  
  /*===
  removewinScreen: eventObject -> void
  Removes the win screen that initially covers  covers the tic tac toe board
  ===*/
  
  function startNewGame(evt){
    evt.preventDefault()
    boxes.map( (box) => {
        box.className = "box"
        box.style.backgroundImage = "none"
    })
    player2.classList.remove("active")
    player1.classList.add("active")
    attachPlayerDisplayToggle()
    winScreen.style.display = "none"
    winScreen.className = "screen screen-win"
  }
  //Attach event to newGame
  newGame.addEventListener("click", startNewGame)

  /*====
  Correct player image appears on mouseenter and disappears on mouseleave
  ====*/
  function attachPlayerDisplayToggle(){
    boxes.map((box) => {
      box.addEventListener("mouseenter", showPlayer)
      box.addEventListener("mouseleave", hidePlayer)
      box.addEventListener("click", paintPlayer)
    })
  }
  
  function showPlayer(evt){
    if(player1.className.includes("active"))
      evt.target.style.backgroundImage = 'url("img/o.svg")'
    else
      evt.target.style.backgroundImage = 'url("img/x.svg")'
  }
  function hidePlayer(evt){
    if(player1.className.includes("active"))
      evt.target.style.backgroundImage = null
    else
      evt.target.style.backgroundImage = null
  }
  function paintPlayer(evt){
    if(player1.className.includes("active")){
      if(hasO(evt.target) === false && hasX(evt.target) === false){
        evt.target.classList.add("box-filled-1")
        evt.target.removeEventListener("mouseenter", showPlayer)
        evt.target.removeEventListener("mouseleave", hidePlayer)
        switchPlayers()
        checkWin(evt)
      }
  
    }
    else {
      if(hasO(evt.target) === false && hasX(evt.target) === false){
        evt.target.classList.add("box-filled-2")
        evt.target.removeEventListener("mouseenter", showPlayer)
        evt.target.removeEventListener("mouseleave", hidePlayer)
        switchPlayers()
        checkWin(evt)
      }
    }
  }
  attachPlayerDisplayToggle()
  /*====
  Switch players and determine if X or O has been painted
  ====*/
  function hasO(box){
   return box.classList.contains("box-filled-1")
  }
  function hasX(box){
    return box.classList.contains("box-filled-2")
  }
  function switchPlayers(){
    if(player1.classList.contains("active")){
      player1.classList.remove("active")
      player2.classList.add("active")
    }
    else {
      player2.classList.remove("active")
      player1.classList.add("active")    
    }
  }
  
  /*===
  Handling win conditions
  ===*/
  
  /*==
    updateNumericBoard: array -> twoDArray
    Takes in a two dimensional array, the array of boxes, and converts each cell into a 
    numeric value: 0 (empty), 1(O), and 2(X).
  ==*/
  const twoDBoxes = [
      boxes.slice(0, 3),
      boxes.slice(3, 6),
      boxes.slice(6)    
    ]
  const numericBoard = [
      boxes.slice(0, 3),
      boxes.slice(3, 6),
      boxes.slice(6)    
    ]
  function updateNumericBoard(){
    twoDBoxes.map( (row, j) => {
      row.map( (cell, k) => {
        if(cell.classList.contains("box-filled-1")) 
          numericBoard[j][k] = 1
        else if(cell.classList.contains("box-filled-2")) 
          numericBoard[j][k] = 2
        else 
          numericBoard[j][k] = 0
      })
    })
  }
  updateNumericBoard()
  console.log(numericBoard)
  
  function threeInRow(){
    numericBoard.map( (row) => {
      if(row.join("") === "111")
        oWins()
      else if(row.join("") === "222")  
        xWins()
    })
  }
  
  function threeInCol(rowIndex){
    let col = numericBoard.reduce( (accum, curr) => accum + curr[rowIndex], "")
    if(col === "111") oWins()
    else if(col === "222") xWins()
  }
  function threeAcross(){
    let firstCross = [numericBoard[0][0], numericBoard[1][1], numericBoard[2][2]] //gross code
    let secondCross = [numericBoard[0][2], numericBoard[1][1], numericBoard[2][0]] //gross code
    if(firstCross.join("") === "111" || secondCross.join("") === "111")
      oWins()
    else if(firstCross.join("") === "222" || secondCross.join("") === "222")
      xWins()
  }
  function checkTie(){
    let count = 0
    boxes.map( (box) => {
      if(hasO(box) || hasX(box)) count++
    })
    if(count === 9) tie()
  }
  
  function checkWin(evt){
    let rowIndex = Array.from(evt.target.parentNode.children).indexOf(evt.target) % 3
    updateNumericBoard()
    threeInRow()
    threeInCol(rowIndex)
    threeAcross()
    if(winScreen.style.display === "none") checkTie()
  }
  function oWins(){
    winScreen.style.display = "block"
    winScreen.classList.add("screen-win-one")
    winMsg.innerText = "Winner"
  }  
  function xWins(){
    winScreen.style.display = "block"
    winScreen.classList.add("screen-win-two")
    winMsg.innerText = "Winner"
  }  
  function tie(){
    winScreen.style.display = "block"
    winScreen.classList.add("screen-win-tie")
    winMsg.innerText = "Tie"
  }  
}()