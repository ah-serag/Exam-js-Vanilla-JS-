// select Element

let divSpans = document.querySelector(".spans");
let myCount = document.querySelector(".count span");
let myQuestition = document.querySelector(".questition h2");
let Allanswer = document.querySelector(".allAnswers");
let sumbitbtn = document.querySelector(".submit-button");
let myspanQuestition = document.querySelector(".questition span");
let answersALl = document.getElementsByName("quesition");
let resultDiv = document.querySelector(".result");
let resulNum = document.querySelector(".youtScore");
let numquestion = document.querySelector(".numquestion");
let resultbtn = document.querySelector(".btnResult");
// Randoum variablesnumquestion
let NumQustion = 0;
let myRightAnswer = 0;
let coutInterval;
//
//
// get question from json
function getQuestion() {

  let myRequest = new XMLHttpRequest();

  myRequest.onreadystatechange = function () {

    if (this.readyState === 4 && this.status === 200) {
      let questionObjectJson = JSON.parse(this.responseText);
      let countObject = questionObjectJson.length;
      //

      createBullets(countObject);
      // add question
      addQustion(questionObjectJson);
      // add answer
      addAnwer(questionObjectJson[NumQustion], countObject);
      // submit
      //timer
      timer(100, countObject);
      // submit button
      sumbitbtn.onclick = function () {
        checkAnswer(questionObjectJson[NumQustion], countObject);
        NumQustion++;
        if (NumQustion < countObject) {
          Allanswer.innerHTML = "";

          addAnwer(questionObjectJson[NumQustion]);
          addQustion(questionObjectJson);
          // handle bullets class
          handleBullets();
          //timer
          clearInterval(coutInterval);
          timer(100, countObject);
        }

        // show answer tru or false
      };
    }
  };

  myRequest.open("GET", "qusition.json", true);
  myRequest.send();
}

getQuestion();

// create bullets
function createBullets(countObject) {
  myCount.innerHTML = countObject;

  for (let i = 0; i < countObject; i++) {
    let mySPan = document.createElement("span");
    divSpans.append(mySPan);

    if (i === 0) {
      mySPan.className = "on";
    }
  }
}

// add question
function addQustion(myObject) {
  myQuestition.innerHTML = myObject[NumQustion].title;
  myspanQuestition.innerHTML = NumQustion + 1;
}

// add answer

function addAnwer(obj) {
  for (let i = 1; i <= 4; i++) {
    // div
    let divAnswer = document.createElement("div");
    divAnswer.className = "answer";
    Allanswer.appendChild(divAnswer);
    // input
    let inputAnswer = document.createElement("input");
    inputAnswer.type = "radio";
    inputAnswer.name = "quesition";
    inputAnswer.id = `answer_${i}`;
    inputAnswer.dataset.answer = obj[`answer_${i}`];
    divAnswer.appendChild(inputAnswer);
    // label
    let labelAnswer = document.createElement("label");
    labelAnswer.setAttribute("for", `answer_${i}`);
    let textAnswer = document.createTextNode(obj[`answer_${i}`]);
    labelAnswer.appendChild(textAnswer);
    divAnswer.appendChild(labelAnswer);

    if (i == 1) {
      inputAnswer.checked = true;
    }
  }
}

//check answer

function checkAnswer(obj, countQ) {
  let theRightanswer = obj.right_answer;
  let myAnswer;

  for (i = 0; i < 4; i++) {
    if (answersALl[i].checked) {
      myAnswer = answersALl[i].dataset.answer;
    }
  }

  if (myAnswer === theRightanswer) {
    myRightAnswer++;
  }
  // show result

  if (NumQustion == countQ - 1) {
    resultDiv.style.display = "flex";
    resulNum.innerHTML = `${myRightAnswer}`;
    numquestion.innerHTML = ` ${countQ}`
    resultbtn.onclick = () => {
      resultbtn.parentElement.remove();
      location.reload();
    };

    clearInterval(coutInterval);
  }

  // console.log(NumQustion);
}

//handleBullets
function handleBullets() {
  let allSpans = document.querySelectorAll(".spans span");

  let ArraySpans = Array.from(allSpans);

  ArraySpans.forEach((ele, index) => {
    if (index == NumQustion) {
      ele.className = "on";
    }
  });
}

// timer
function timer(duration, count) {
  
  if (NumQustion < count) {
    coutInterval = setInterval(function () {
      let minuts = Math.floor(duration / 60);
      let secound = Math.floor(duration % 60);

      let myCountdown = document.querySelector(".countdown");
      //
      minuts = minuts < 10 ? (minuts = `0${minuts}`) : minuts;
      secound = secound < 10 ? (secound = `0${secound}`) : secound;

      myCountdown.innerHTML = `${minuts} : ${secound}`;
      //
      if (--duration < 0) {
        clearInterval(coutInterval);
        sumbitbtn.click();
      }
      //
    }, 1000);
  }
}
