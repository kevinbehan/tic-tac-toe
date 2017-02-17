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
      evt.target.style.backgroundImage = "none"
    else
      evt.target.style.backgroundImage = "none"
  }
  function paintPlayer(evt){
    if(player1.className.includes("active")){
      if(hasO(evt.target) === false && hasX(evt.target) === false){
        evt.target.classList.add("box-filled-1")
        evt.target.removeEventListener("mouseenter", showPlayer)
        evt.target.removeEventListener("mouseleave", hidePlayer)
        switchPlayers()
        checkWin()
      }
  
    }
    else {
      if(hasO(evt.target) === false && hasX(evt.target) === false){
        evt.target.classList.add("box-filled-2")
        evt.target.removeEventListener("mouseenter", showPlayer)
        evt.target.removeEventListener("mouseleave", hidePlayer)
        switchPlayers()
        checkWin()
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
  function winOrTie(player){
    const winScreen = document.querySelector(".screen-win")
    const winMsg = document.querySelector(".message")
    winScreen.style.display = "block"
    if(player === 1){
      winScreen.classList.add("screen-win-one")
      winMsg.innerText = "Winner"
    }
    else if(player === 2){
      winScreen.classList.add("screen-win-two")
      winMsg.innerText = "Winner"
    }
    else if(player === 0){
      winScreen.classList.add("screen-win-tie")
      winMsg.innerText = "Tie"
    }
  }
  function allBoxesFilled(){
    let count = 0
    boxes.map( (box) => {
      if(hasO(box) || hasX(box)) count++
    })
    return count === 9
  }
  function checkWin(){
    if(hasO(boxes[0]) && hasO(boxes[1]) && hasO(boxes[2]))
      winOrTie(1)
    else if(hasO(boxes[3]) && hasO(boxes[4]) && hasO(boxes[5]))
      winOrTie(1)
    else if(hasO(boxes[6]) && hasO(boxes[7]) && hasO(boxes[8]))
      winOrTie(1)
    else if(hasO(boxes[0]) && hasO(boxes[3]) && hasO(boxes[6]))
      winOrTie(1)
    else if(hasO(boxes[2]) && hasO(boxes[5]) && hasO(boxes[8]))
      winOrTie(1)
    else if(hasO(boxes[1]) && hasO(boxes[4]) && hasO(boxes[7]))
      winOrTie(1)
    else if(hasO(boxes[0]) && hasO(boxes[4]) && hasO(boxes[8]))
      winOrTie(1)
    else if(hasO(boxes[2]) && hasO(boxes[4]) && hasO(boxes[6]))
      winOrTie(1)
    else if(hasX(boxes[0]) && hasX(boxes[1]) && hasX(boxes[2]))
      winOrTie(2)
    else if(hasX(boxes[3]) && hasX(boxes[4]) && hasX(boxes[5]))
      winOrTie(2)
    else if(hasX(boxes[6]) && hasX(boxes[7]) && hasX(boxes[8]))
      winOrTie(2)
    else if(hasX(boxes[0]) && hasX(boxes[3]) && hasX(boxes[6]))
      winOrTie(1)
    else if(hasX(boxes[2]) && hasX(boxes[5]) && hasX(boxes[8]))
      winOrTie(1)
    else if(hasX(boxes[1]) && hasX(boxes[4]) && hasX(boxes[7]))
      winOrTie(1)
    else if(hasX(boxes[0]) && hasX(boxes[4]) && hasX(boxes[8]))
      winOrTie(1)
    else if(hasX(boxes[2]) && hasX(boxes[4]) && hasX(boxes[6]))
      winOrTie(1)
    else if(allBoxesFilled()){
      winOrTie(0)
    }
  }
}()