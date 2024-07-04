



// fetch the data from the json file
fetch("main.json")
    .then(function (resp) { return resp.json()})
    .then(data => javascriptData(data))

const javascriptData = (data) => {

    // create a guessed word
    let wordsList = data.words;
    let guessedWordNumber = Math.floor(Math.random() * wordsList.length);
    let guessedWordName = wordsList[guessedWordNumber];
    

    // select letter guess element
    let lettersGuessedContainer = document.getElementsByClassName("letters")
    
    // convert the guessed word into an array
    let lettersGuessedArray = Array.from(guessedWordName);

    //create an inputs depends on the words
    for (var i = 0; i < lettersGuessedContainer.length; i++) {
        lettersGuessedArray.forEach(letter => {
            let letterInput = document.createElement("input");
            lettersGuessedContainer[i].appendChild(letterInput)
            
            // add a class name to the input
            letterInput.classList.add("letter")
        })
    }

    // select the scattered letters
    let scatteredLettersContainer = document.querySelector(".scattered_letters")
    
    // scattering the letters
    function shuffleString(str) {
    
        for (let i = str.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [str[i], str[j]] = [str[j], str[i]];
        }
        return str.join('');
    }
    

    // return the shuffled letters into an Array
    let shuffledWrodArray = Array.from(shuffleString(lettersGuessedArray))
    

    shuffledWrodArray.forEach(shuffledLetter => {
        
        let shuffledLetterSpan = document.createElement("span");
        let letterText = document.createTextNode(shuffledLetter);
        shuffledLetterSpan.appendChild(letterText);
        shuffledLetterSpan.className = 'scattered_letter';
        scatteredLettersContainer.appendChild(shuffledLetterSpan);
    })

    // handle the inputs
    // select the check word button
    let checkWord = document.querySelector(".check_word");
    
    //select the all the tries
    let tries = document.getElementsByClassName("try")

    // set the attempts number
   
    var wrongAttempts = 0;
    
    var theWord = document.querySelector(".the_word");
    // loop on each try
    for (let i = 0; i < tries.length; i++) {
        // make an empty array to store the letters value
        var InputList = []
        // activate the try when we click on it
        tries[i].onclick = function () {
            
            tries[i].classList.add("try_active");

            // access the try name div and change its font color
            let tryName = tries[i].children[0];
            tryName.classList.add("try_name_active");
            
           

            //access the letters container for this try
            let lettersInput = tries[i].children[1]
            
            // access the letters input for this try 
            let letterINPUT = lettersInput.children;
            
            // select the chosen word and put it into an array
            let chosenWord = Array.from(guessedWordName.toLowerCase());
            
            // loop on each letter and index in the chosen word.
            chosenWord.forEach((wordLetter, wordIndex) => { });
           
            // select the letters input and put them into an array.
            let inputWord = Array.from(letterINPUT);

            // loop on each letter input and index in the letters input
            inputWord.forEach((inputLetter, inputIndex) => { 
                inputLetter.classList.add("opacity_1");
                // make a function to get letter we click on it
                inputLetter.onclick = function () {
                    
                    // make a function to get the data from the inout 
                    checkWord.onclick = function () {
                        const letterValue = inputLetter.value.toLowerCase();
                        
                        
                        // get the index of input letter
                        var indexOfInputLetter = inputWord.indexOf(inputLetter);
                        

                        // check if input letter exists in chosen word
                        var existsInChosenWord = chosenWord.includes(letterValue);
                       
                        
                        
                        // get the index of letter that matches the index of letter in chosen word
                        // first we check on repeated letter
                        var ifIxsitsInInputList = InputList.includes(letterValue);
                        
                    
                        if (ifIxsitsInInputList === true) {
                            // if we have a repeated letter, we grap the last index of it from the input list
                            var indexInList = InputList.lastIndexOf(letterValue);
                            
                            // and add 1 to it so we can serch on this letter in chosen word after this same letter
                            var indexpluss = indexInList + 1
                            var indexOfMatchingLetterInChosenWord = chosenWord.indexOf(letterValue, indexpluss);
                            
                            // if we don't have a repeated letter wo grap the index directlly 
                        } else {
                            var indexOfMatchingLetterInChosenWord = chosenWord.indexOf(letterValue);
                            
                       }                       
                        
                        
                        // check if input letter exists in chosen word 
                        if (existsInChosenWord === true ) {
                            // if true check if index matches
                            if (indexOfInputLetter === indexOfMatchingLetterInChosenWord) {
                                inputLetter.classList.add("ba_co_green");
                                document.getElementById("success").play();
                            } else  {
                                inputLetter.classList.add("ba_co_orang"); 
                                document.getElementById("error").play();
                            }
                        } else  {
                            inputLetter.classList.add("ba_co_red");
                            document.getElementById("error").play();
                        }
                        
                    }
                    inputLetter.onblur = function () {
                        checkWord.click();
                        const letterValue = inputLetter.value.toLowerCase();
                        InputList.push(letterValue);
                        
                        var strInputlist = InputList.join("");
                        
                        inputLetter.classList.add("unactive_letter")
                        if (strInputlist.length === guessedWordName.length) {
                            if (strInputlist.toLowerCase() === guessedWordName.toLowerCase()) {
                               
                                theWord.classList.add("try_unactive");
                                winGame();
                                
                                
                            } else if (strInputlist.toLowerCase() !== guessedWordName.toLowerCase()) {
                                if (wrongAttempts === 4) {
                                  
                                    lossGame();
                                    
                                    
                                } else {
                                    
                                    InputList.length = 0;
                                    wrongAttempts++;
                                   
                                    tryAgainF(); 
                                    
                                }
                                
                            }
                            
                        } 
                    }
                    
                   
                } 
               
            });
            
        }
    }

    // win game function
    function winGame() {
        setTimeout(function () {
            document.getElementById("correct").play(); 
            var win = document.createElement("div");
            winText = document.createTextNode(`congragolations, you wan. The word is [${guessedWordName}]`);
            win.appendChild(winText);
            win.className = 'end_game';
            document.body.appendChild(win);
            // reload Function
            function reload() {
                let relodButton = document.createElement("button");
                let relodText = document.createTextNode("play again");
                relodButton.appendChild(relodText);
                relodButton.classList = 'relod_Button';
                document.body.appendChild(relodButton);
                document.addEventListener("click", (y) => {
                    if (y.target.className === 'relod_Button') {
                        window.location.reload();
                    }
                });
            };
            reload();
        }, 1000);
  
        
    }
    // loss game function
    function lossGame() {
        setTimeout(function () {
            document.getElementById("fail").play();
            var loss = document.createElement("div");
            lossText = document.createTextNode(`Game over, you lost. The word is [${guessedWordName}]`);
            loss.appendChild(lossText);
            loss.className = 'end_game';
            document.body.appendChild(loss);
            // reload Function
            function reload() {
                let relodButton = document.createElement("button");
                let relodText = document.createTextNode("play again");
                relodButton.appendChild(relodText);
                relodButton.classList = 'relod_Button';
                document.body.appendChild(relodButton);
                document.addEventListener("click", (y) => {
                    if (y.target.className === 'relod_Button') {
                        window.location.reload();
                    }
                });
            };
            reload();
        }, 1000)
        
    }
    // loss game function
    function tryAgainF() {
        setTimeout(function () {
            document.getElementById("fail").play();
            var tryAgain = document.createElement("div");
            var tryAgainText = document.createTextNode("The word doesn't match, try again");
            tryAgain.appendChild(tryAgainText);
            tryAgain.className = 'end_game';
            document.body.appendChild(tryAgain);
            function ok() {
                let okButton = document.createElement("button");
                let okText = document.createTextNode("OK");
                okButton.appendChild(okText);
                okButton.classList = 'relod_Button';
                document.body.appendChild(okButton);
                document.addEventListener("click", (y) => {
                    if (y.target.className === 'relod_Button') {
                        tryAgain.classList.add("d_n");
                        okButton.classList.add("d_n");
                    }
                });
            };
            ok();
        }, 1000)
        
    }

    // game informaition function
    
    var info = document.querySelector(".hint");
    info.onclick = function () {
        
        var gameInfo = document.createElement("div");
        var gameInfoText = document.createTextNode('');
        gameInfo.appendChild(gameInfoText);
        gameInfo.className = 'game_info';

        var typingIntervel = null;
        function startTimer() {
            typingIntervel = setInterval(function () {
                var typing = document.getElementById("typing");
                typing.play();
            }, 10);
        }
        
        function stopTimer() {
            clearInterval(typingIntervel)
        }

        var exit = document.createElement("button");
        var exitText = document.createTextNode("X");
        exit.onclick = function () {
            gameInfo.classList.add("d_n");
            stopTimer();
            typing.pause()
        }
        
        
        exit.className = 'exit';
        exit.appendChild(exitText);
        gameInfo.appendChild(exit);
        document.body.appendChild(gameInfo);

        startTimer();

        var timePerLetter = 50;
        var newLineCharacter = '|';
        function printOut(str) {
            var i = 0;
            (function main() {
                var char = str[i++];
                gameInfoText.nodeValue += char == newLineCharacter ? '\n' : char;
                if (i < str.length)
                    setTimeout(main, timePerLetter);
                else if (i === str.length) {
                    stopTimer();
                    typing.pause()
                }
            })();
        }
        printOut(`Welcome to the Guess word game!|
             Game Information:| 
             When you start the game the computer will choose a word from a very long list and than scattrs the letters.|
            As you see in the page's head, there are scattred letters, and all you have to do is put these letters together so the shape the word that computer has chosen for you.|
            Game rulles:|
            - You have five tries to make the right word.|
            - Click on try 1 and than click on the first box to type the letter.|
            - You can write one letter in each box only.|
            - As soon as you leave the box, the letter will be saved and you can't go back even if you did't type the letter so make sure you type a letter before you leave to the next box.|
            - When you type a letter and move to the next box you will know if your choes was rigth or not by the bagkround color of the box. if the letter is right and in its place the box will turn into green, if the letter is right but not in its place the box will turn into orang, and if was a wrong letter the box will turn into red.|
            - When you fill all boxes in the try you will get a message if your letters shape the right word and then you win, but your letters don't shape the right word you will get a message to repeat the try.|
            - If you consumed all your attempts with wrong letters, you loss the game.`)  
    }
    
   
    
    
}
