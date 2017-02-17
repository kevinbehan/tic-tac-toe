+function(){
  //Find the board
  const board = document.getElementById("board")
  //Build the start screen element and add it to the board
  const startScreen = document.createElement("div")
  startScreen.classList.add("screen")
  startScreen.classList.add("screen-start")
  board.appendChild(startScreen)
  //Build the children of the start screen and insert them
  const startHeader = document.createElement("header")
  const startHeading = document.createElement("h1")
  const startBtn = document.createElement("a")
  startHeading.innerText = "Tic Tac Toe"
  startBtn.classList.add("button")
  startBtn.setAttribute("href", "#")
  startBtn.innerText = "Start game"
  //Add the elements above to the start screen
  startScreen.appendChild(startHeader)
  //Add the button and the heading to the header
  startHeader.appendChild(startHeading)
  startHeader.appendChild(startBtn)
  /*===
  removeStartScreen: eventObject -> void
  Removes the start screen that initially covers  covers the tic tac toe board
  ===*/
  function removeStartScreen(evt){
    evt.preventDefault()
    startScreen.remove()
  }
  //Attach event to startBtn
  startBtn.addEventListener("click", removeStartScreen)
}()