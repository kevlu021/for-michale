import "../../homescreen.css";
import React from "react";
import { useParams } from "react-router-dom";
import { ColorContext } from "../../context/colorcontext";
import GameBackground from "./GameBackground";
import _2_of_clubs from "../assets/images/2_of_clubs.png";
import _2_of_diamonds from "../assets/images/2_of_diamonds.png";
import _2_of_hearts from "../assets/images/2_of_hearts.png";
import _2_of_spades from "../assets/images/2_of_spades.png";
import _3_of_clubs from "../assets/images/3_of_clubs.png";
import _3_of_diamonds from "../assets/images/3_of_diamonds.png";
import _3_of_hearts from "../assets/images/3_of_hearts.png";
import _3_of_spades from "../assets/images/3_of_spades.png";
import _4_of_clubs from "../assets/images/4_of_clubs.png";
import _4_of_diamonds from "../assets/images/4_of_diamonds.png";
import _4_of_hearts from "../assets/images/4_of_hearts.png";
import _4_of_spades from "../assets/images/4_of_spades.png";
import _5_of_clubs from "../assets/images/5_of_clubs.png";
import _5_of_diamonds from "../assets/images/5_of_diamonds.png";
import _5_of_hearts from "../assets/images/5_of_hearts.png";
import _5_of_spades from "../assets/images/5_of_spades.png";
import _6_of_clubs from "../assets/images/6_of_clubs.png";
import _6_of_diamonds from "../assets/images/6_of_diamonds.png";
import _6_of_hearts from "../assets/images/6_of_hearts.png";
import _6_of_spades from "../assets/images/6_of_spades.png";
import _7_of_clubs from "../assets/images/7_of_clubs.png";
import _7_of_diamonds from "../assets/images/7_of_diamonds.png";
import _7_of_hearts from "../assets/images/7_of_hearts.png";
import _7_of_spades from "../assets/images/7_of_spades.png";
import _8_of_clubs from "../assets/images/8_of_clubs.png";
import _8_of_diamonds from "../assets/images/8_of_diamonds.png";
import _8_of_hearts from "../assets/images/8_of_hearts.png";
import _8_of_spades from "../assets/images/8_of_spades.png";
import _9_of_clubs from "../assets/images/9_of_clubs.png";
import _9_of_diamonds from "../assets/images/9_of_diamonds.png";
import _9_of_hearts from "../assets/images/9_of_hearts.png";
import _9_of_spades from "../assets/images/9_of_spades.png";
import _10_of_clubs from "../assets/images/10_of_clubs.png";
import _10_of_diamonds from "../assets/images/10_of_diamonds.png";
import _10_of_hearts from "../assets/images/10_of_hearts.png";
import _10_of_spades from "../assets/images/10_of_spades.png";
import _jack_of_clubs from "../assets/images/jack_of_clubs.png";
import _jack_of_diamonds from "../assets/images/jack_of_diamonds.png";
import _jack_of_hearts from "../assets/images/jack_of_hearts.png";
import _jack_of_spades from "../assets/images/jack_of_spades.png";
import _queen_of_clubs from "../assets/images/queen_of_clubs.png";
import _queen_of_diamonds from "../assets/images/queen_of_diamonds.png";
import _queen_of_hearts from "../assets/images/queen_of_hearts.png";
import _queen_of_spades from "../assets/images/queen_of_spades.png";
import _king_of_clubs from "../assets/images/king_of_clubs.png";
import _king_of_diamonds from "../assets/images/king_of_diamonds.png";
import _king_of_hearts from "../assets/images/king_of_hearts.png";
import _king_of_spades from "../assets/images/king_of_spades.png";
import _ace_of_clubs from "../assets/images/ace_of_clubs.png";
import _ace_of_diamonds from "../assets/images/ace_of_diamonds.png";
import _ace_of_hearts from "../assets/images/ace_of_hearts.png";
import _ace_of_spades from "../assets/images/ace_of_spades.png";
import Strength0 from "../assets/images/0.png";
import Strength1 from "../assets/images/1.png";
import Strength2 from "../assets/images/2.png";
import Strength3 from "../assets/images/3.png";
import Strength4 from "../assets/images/4.png";
import Strength5 from "../assets/images/5.png";
import Strength6 from "../assets/images/6.png";
import Strength7 from "../assets/images/7.png";
import Strength8 from "../assets/images/8.png";
import Strength9 from "../assets/images/9.png";

const socket = require("../../connection/socket").socket;
var timerInterval = null;
var countercounter, strengthbar;
var Hand = require("pokersolver").Hand;
var done = false;
var tempcounter = 0,
  counter = 0;
var playerNames = [],
  playerNamesThatWillBeDeleted = [];
var myName;
var chronologicalPlayerNames = [],
  chronologicalFold = [];
var shuffledCardsThisRound = new Array();
var myCard1 = {},
  temp,
  tempy,
  anothertemp = 0;
var myCard2 = {};
var myCard3 = {};
var myCard4 = {};
var myCard5 = {};
var myCard6 = {};
var myCard7 = {};
var money = [],
  foldFinder,
  winnerTest,
  winnerPot,
  winnerPotTest;
var money1 = 1000;
var money2 = 1000;
var money3 = 1000;
var money4 = 1000,
  smallBlind = 5,
  bigBlind = 10;
var StrengthOne, StrengthTwo, StrengthThree, StrengthFour, StrengthZero;
var Strength = [null, null, null, null, null, null, null, null, null];
var cardsThisRound = [
  { name: "2s", image: _2_of_spades },
  { name: "3s", image: _3_of_spades },
  { name: "4s", image: _4_of_spades },
  { name: "5s", image: _5_of_spades },
  { name: "6s", image: _6_of_spades },
  { name: "7s", image: _7_of_spades },
  { name: "8s", image: _8_of_spades },
  { name: "9s", image: _9_of_spades },
  { name: "Ts", image: _10_of_spades },
  { name: "Js", image: _jack_of_spades },
  { name: "Qs", image: _queen_of_spades },
  { name: "Ks", image: _king_of_spades },
  { name: "As", image: _ace_of_spades },
  { name: "2d", image: _2_of_diamonds },
  { name: "3d", image: _3_of_diamonds },
  { name: "4d", image: _4_of_diamonds },
  { name: "5d", image: _5_of_diamonds },
  { name: "6d", image: _6_of_diamonds },
  { name: "7d", image: _7_of_diamonds },
  { name: "8d", image: _8_of_diamonds },
  { name: "9d", image: _9_of_diamonds },
  { name: "Td", image: _10_of_diamonds },
  { name: "Jd", image: _jack_of_diamonds },
  { name: "Qd", image: _queen_of_diamonds },
  { name: "Kd", image: _king_of_diamonds },
  { name: "Ad", image: _ace_of_diamonds },
  { name: "2c", image: _2_of_clubs },
  { name: "3c", image: _3_of_clubs },
  { name: "4c", image: _4_of_clubs },
  { name: "5c", image: _5_of_clubs },
  { name: "6c", image: _6_of_clubs },
  { name: "7c", image: _7_of_clubs },
  { name: "8c", image: _8_of_clubs },
  { name: "9c", image: _9_of_clubs },
  { name: "Tc", image: _10_of_clubs },
  { name: "Jc", image: _jack_of_clubs },
  { name: "Qc", image: _queen_of_clubs },
  { name: "Kc", image: _king_of_clubs },
  { name: "Ac", image: _ace_of_clubs },
  { name: "2h", image: _2_of_hearts },
  { name: "3h", image: _3_of_hearts },
  { name: "4h", image: _4_of_hearts },
  { name: "5h", image: _5_of_hearts },
  { name: "6h", image: _6_of_hearts },
  { name: "7h", image: _7_of_hearts },
  { name: "8h", image: _8_of_hearts },
  { name: "9h", image: _9_of_hearts },
  { name: "Th", image: _10_of_hearts },
  { name: "Jh", image: _jack_of_hearts },
  { name: "Qh", image: _queen_of_hearts },
  { name: "Kh", image: _king_of_hearts },
  { name: "Ah", image: _ace_of_hearts },
];
var fourthCardReady = false,
  fifthCardReady = false,
  winner;
var findMyName = playerNames.indexOf(myName);
var myTurn = [];
var teeeeemp = 0;
// Start with an initial value of 15 seconds
const TIME_LIMIT = 15;
// Initially, no time has passed, but this will count up
// and subtract from the TIME_LIMIT
let timePassed = 0;
let timeLeft = TIME_LIMIT;

export function PokerGame() {
  const [moneySorted, setMoneySorted] = React.useState([
    { name: "hi", money: 1000 },
    { name: "hi", money: 1000 },
    { name: "hi", money: 1000 },
    { name: "hi", money: 1000 },
    { name: "hi", money: 1000 },
  ]);
  const [alreadyBet, setAlreadyBet] = React.useState(false);
  const [cardsInPlay, setCardsInPlay] = React.useState([
    { name: "hi", image: _2_of_hearts},
    { name: "hi", image: _2_of_hearts},
    { name: "hi", image: _2_of_hearts},
    { name: "hi", image: _2_of_hearts},
    { name: "hi", image: _2_of_hearts},
    { name: "hi", image: _2_of_hearts},
    { name: "hi", image: _2_of_hearts},
  ]);
  const [flop, setFlop] = React.useState(false);
  const [turn, setTurn] = React.useState(false);
  const [river, setRiver] = React.useState(false);
  const [turns, setTurns] = React.useState([
    { name: "hi", turn: false },
    { name: "hi", turn: false },
    { name: "hi", turn: false },
    { name: "hi", turn: false },
    { name: "hi", turn: false },
  ]);
  const [rounddd, setRounddd] = React.useState(false)
  const [pot, setPot] = React.useState(0);
  // startTimer();
  findMyName = playerNames.indexOf(myName);
  React.useEffect(() => {
    console.log(`${findMyName} is findmyname`);
    for (var y = 0; y < playerNames.length; y++) {
      money[y] = { name: playerNames[y], money: 1000 };
      myTurn[y] = { name: playerNames[y], turn: false };
    }
    if (playerNames.length < 5){
      for (var y = playerNames.length; y < 5; y++){
        money[y] = {name: "hi", money: 1000}
      }
    }
    // setMoneySorted( moneySorted.map((item) =>
    // item.name === playerNamesThatWillBeDeleted[findMyName]
    //   ? { name: item.name, turn: false }
    //   : item);
    setTurns(myTurn);
    setMoneySorted(money);
    beginRound(playerNamesThatWillBeDeleted.length);
  }, []);
  function fold() {
    // console.log(cardsInPlay[0], cardsInPlay[1]);
    var playerCounter = 0;
    console.log(playerNamesThatWillBeDeleted.length);
    console.log(
      playerNamesThatWillBeDeleted[0],
      playerNamesThatWillBeDeleted[1],
      playerNamesThatWillBeDeleted[2]
    );
    setTurns(
      myTurn.map((item) =>
        item.name === playerNamesThatWillBeDeleted[findMyName]
          ? { name: item.name, turn: false }
          : item
      )
    );
    chronologicalFold[findMyName] = true;
    for (var dfgjkl = 0; dfgjkl < chronologicalPlayerNames.length; dfgjkl++) {
      if (chronologicalFold[dfgjkl] == true) {
        playerCounter++;
        //delete playernames
      }
    }
    if (playerCounter == playerNamesThatWillBeDeleted.length - 1) {
      anothertemp = 0;
      winnerTest = chronologicalFold.findIndex((element) => element == false)
      winner = chronologicalPlayerNames[winnerTest];
      console.log(`${winner} wins!`)
      // socket.emit('roundOver', {flop: flop, turn: turn, river: river})
      socket.emit("nextRound", winner);
    } else {
      foldFinder = chronologicalPlayerNames.findIndex(
        (element) => element == playerNames[findMyName]
      );
      console.log("ROUND NOT OVER YET", foldFinder, findMyName);
      socket.emit("fold", { fold: foldFinder, num: findMyName });
    }
  }
  function check() {
    setTurns(
      myTurn.map((item) =>
        item.name === playerNamesThatWillBeDeleted[findMyName]
          ? { name: item.name, turn: false }
          : item
      )
    );
    if (
      playerNamesThatWillBeDeleted[findMyName + 1] == undefined &&
      playerNamesThatWillBeDeleted[findMyName + 2] == undefined
    ) {
      socket.emit("roundOver", { flop: flop, turn: turn, river: river });
      console.log("ROUND OVER");
    } else {
      socket.emit("check", findMyName + 1);
    }
  }
  socket.on("flopTime", (data) => {
    setFlop(true);
    // beginRound(playerNamesThatWillBeDeleted.length)
  });
  socket.once("nextRoundIndeed", data2 => {
    if (anothertemp == 0) {
      socket.emit("anothertempzero", 0);
      socket.on("anothertemp", (data) => {
        anothertemp = data;
      });
      winnerPotTest = playerNamesThatWillBeDeleted.findIndex(element => element == winner)
      var p0t = pot;
      setMoneySorted(
        money.map((item) => {
          return item.name == playerNamesThatWillBeDeleted[winnerPotTest]
            ? { name: item.name, money: (money[winnerPotTest].money + p0t)}
            : item
        }
        )
      );
      console.log(`winner now has ${money[winnerPotTest].money} and pot is ${p0t}`)
      setPot(0);
      if (rounddd == true){
        setRounddd(false);
      }
      else {
        setRounddd(true);
      }
      beginRound(playerNamesThatWillBeDeleted.length);
      // console.log(playerNamesThatWillBeDeleted[winnerPotTest]);

    }
    anothertemp++;
    // console.log(cardsInPlay[0],cardsInPlay[1],cardsInPlay[2],cardsInPlay[3])
  });
  socket.on("folded", (data) => {
    chronologicalFold[data.num] = true;
    if (playerNamesThatWillBeDeleted[data.num + 1] != undefined) {
      setTurns(
        myTurn.map((item) =>
          item.name === playerNamesThatWillBeDeleted[data.num + 1]
            ? { name: item.name, turn: true }
            : item.name === playerNamesThatWillBeDeleted[data.num]
            ? { name: item.name, turn: false }
            : item
        )
      );
    } else {
      setTurns(
        myTurn.map((item) =>
          item.name === playerNamesThatWillBeDeleted[0]
            ? { name: item.name, turn: true }
            : item.name === playerNamesThatWillBeDeleted[data.num]
            ? { name: item.name, turn: false }
            : item
        )
      );
    }
  });
  socket.on("checked", (data) => {
    setTurns(
      myTurn.map((item) =>
        item.name === playerNamesThatWillBeDeleted[data]
          ? { name: item.name, turn: true }
          : item
      )
    );
  });
  function formatTime(time) {
    // The largest round integer less than or equal to the result of time divided being by 60.
    const minutes = Math.floor(time / 60);

    // Seconds are the remainder of the time divided by 60 (modulus operator)
    let seconds = time % 60;

    // If the value of seconds is less than 10, then display seconds with a leading zero
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    // The output in MM:SS format
    return `${minutes}:${seconds}`;
  }
  function startTimer() {
    timerInterval = setInterval(() => {
      // The amount of time passed increments by one
      timePassed = timePassed += 1;
      timeLeft = TIME_LIMIT - timePassed;

      // The time left label is updated
      // document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft);
    }, 1000);
  }
  function beginRound(num) {
    socket.emit("shuffle", cardsThisRound);
  }
  React.useEffect(()=>{
    socket.once("shuffled", (data) => {
      console.log("socketbegun");
      shuffledCardsThisRound = [];
      for (var b = 0; b < 52; b++) {
        shuffledCardsThisRound[b] = data[b];
        // console.log(shuffledCardsThisRound[b]);
      }
    findMyName = playerNamesThatWillBeDeleted.indexOf(myName);
    myCard1 = shuffledCardsThisRound[findMyName];
    myCard2 = shuffledCardsThisRound[findMyName + 6];
    myCard3 = shuffledCardsThisRound[47];
    myCard4 = shuffledCardsThisRound[48];
    myCard5 = shuffledCardsThisRound[49];
    myCard6 = shuffledCardsThisRound[50];
    myCard7 = shuffledCardsThisRound[51];
    console.log("cards changed", myCard1, myCard2);
    tempy = [myCard1, myCard2, myCard3, myCard4, myCard5, myCard6, myCard7];
    // console.log(tempy)
    setCardsInPlay(tempy);
    // console.log(shuffledCardsThisRound[0])
    Strength[findMyName] = Hand.solve([myCard1.name, myCard2.name]).rank;
    if (Strength[findMyName] === 0) {
      strengthbar = Strength0;
    }
    if (Strength[findMyName] === 1) {
      strengthbar = Strength1;
    }
    if (Strength[findMyName] === 2) {
      strengthbar = Strength2;
    }
    if (Strength[findMyName] === 3) {
      strengthbar = Strength3;
    }
    if (Strength[findMyName] === 4) {
      strengthbar = Strength4;
    }
    if (Strength[findMyName] === 5) {
      strengthbar = Strength5;
    }
    if (Strength[findMyName] === 6) {
      strengthbar = Strength6;
    }
    if (Strength[findMyName] === 7) {
      strengthbar = Strength7;
    }
    if (Strength[findMyName] === 8) {
      strengthbar = Strength8;
    }
    if (Strength[findMyName] === 9) {
      strengthbar = Strength9;
    }
    socket.emit("blindsCame", counter % playerNamesThatWillBeDeleted.length);
    socket.once("blindsCameIndeed", (data) => {
      if (data + 1 >= playerNamesThatWillBeDeleted.length) {
        temp = 0;
        console.log("temp = 0");
      } else {
        temp = data + 1;
      }
      // console.log(money[data], money[data+1], playerNamesThatWillBeDeleted[data], playerNamesThatWillBeDeleted[data+1])
        setMoneySorted(
          money.map((item) => {
            return item.name == playerNamesThatWillBeDeleted[temp]
              ? { name: item.name, money: (money[temp].money - bigBlind) }
              : item.name == playerNamesThatWillBeDeleted[data]
              ? { name: item.name, money: (money[data].money - smallBlind) }
              : item
          }
          )
        );
      setPot(bigBlind + smallBlind)
      counter++;
    });
    if (playerNamesThatWillBeDeleted.length == 2) {
      socket.emit("waitingOnPlayer", 0);
      socket.on("playerNoLongerWaiting", (data) => {
        setTurns(
          myTurn.map((item) =>
            item.name === playerNamesThatWillBeDeleted[0]
              ? { name: item.name, turn: true }
              : item
          )
        );
      });
    } else {
      socket.emit("waitingOnPlayer", 2);
      socket.on("playerNoLongerWaiting", (data) => {
        setTurns(
          myTurn.map((item) =>
            item.name === playerNamesThatWillBeDeleted[2]
              ? { name: item.name, turn: true }
              : item
          )
        );
      });
    }
    })
  }, cardsInPlay)

React.useEffect(()=>{
  console.log(moneySorted[0], moneySorted[1])
  console.log(moneySorted.length)
}, moneySorted)

  return (
    <>
      <div className="bottom-middle">
        {<img className="imageSmall" src={cardsInPlay[0].image} />}
        <img className="imageSmall" src={cardsInPlay[1].image} />
          {moneySorted.map(item => (
            item.name == chronologicalPlayerNames[0] ? <h1>Money: {item.money}</h1> : <></>
          ))
           }
      </div>
      <div className="left-side">
        <h1>{chronologicalPlayerNames[1]}</h1>
        {moneySorted.map(item => (
            item.name == chronologicalPlayerNames[1] ? <h1>Money: {item.money}</h1> : <></>
          ))
           }
      </div>
      <div className="top-left">
        {chronologicalPlayerNames[2] !== undefined ? (
          <>
            <h1>{chronologicalPlayerNames[2]}</h1>
            {moneySorted.map(item => (
            item.name == chronologicalPlayerNames[2] ? <h1>Money: {item.money}</h1> : <></>
          ))
           }
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="top-right">
        {chronologicalPlayerNames[3] !== undefined ? (
          <>
            <h1>{chronologicalPlayerNames[3]}</h1>
            {moneySorted.map(item => (
            item.name == chronologicalPlayerNames[3] ? <h1>Money: {item.money}</h1> : <></>
          ))
           }
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="right-side">
        {chronologicalPlayerNames[4] !== undefined ? (
          <>
            <h1>{chronologicalPlayerNames[4]}</h1>
            {moneySorted.map(item => (
            item.name == chronologicalPlayerNames[4] ? <h1>Money: {item.money}</h1> : <></>
          ))
           }
          </>
        ) : (
          <></>
        )}
      </div>

      <div className="dealersdiv">
        <p>{pot}</p>
        {flop ? (
          <>
            <img className="imageSmall" src={cardsInPlay[2].image} />
            <img className="imageSmall" src={cardsInPlay[3].image} />
            <img className="imageSmall" src={cardsInPlay[4].image} />
          </>
        ) : (
          <></>
        )}
        {fourthCardReady ? (
          <img className="imageSmall" src={cardsInPlay[5].image} />
        ) : (
          <></>
        )}
        {fifthCardReady ? (
          <img className="imageSmall" src={cardsInPlay[6].image} />
        ) : (
          <></>
        )}
      </div>

      {alreadyBet ? (
        <div
          className={turns[findMyName].turn ? "bottom-right" : "bottom-right"}
        >
          <img src={strengthbar} />
          <button
            className={turns[findMyName].turn === true ? "" : "disabled"}
            onClick={fold}
          >
            Fold
          </button>
          <button
            className={turns[findMyName].turn === true ? "" : "disabled"}
            onClick="call"
          >
            Call
          </button>
          <button
            className={turns[findMyName].turn === true ? "" : "disabled"}
            onClick="raise"
          >
            Raise
          </button>
          {/* {myTurn[findMyName] ?
        <div className = "base-timer">
          <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <g class="base-timer__circle">
          <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45" />
          </g>
          </svg>
          <span id="base-timer-label" class="base-timer__label">
            ${formatTime(timeLeft)}
          </span>
        </div>
        : <></>} */}
        </div>
      ) : (
        <div className="bottom-right">
          <img className="imageKindaSmall" src={strengthbar} />
          <button
            onClick={check}
            className={turns[findMyName].turn === true ? "" : "disabled"}
          >
            Check
          </button>
          <button className={turns[findMyName].turn === true ? "" : "disabled"}>
            Bet
          </button>
          <button
            onClick={fold}
            className={turns[findMyName].turn === true ? "" : "disabled"}
          >
            Fold
          </button>
          {/* {myTurn[findMyName] ?
      <div className = "base-timer">
        <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g class="base-timer__circle">
        <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45" />
        </g>
        </svg>
        <span id="base-timer-label" class="base-timer__label">
          {formatTime(timeLeft)}
        </span>
      </div>
      : <></>} */}
        </div>
      )}
    </>
  );
}

const ChessGameWrapper = (props) => {
  /**
   * player 1
   *      - socketId 1
   *      - socketId 2 ???
   * player 2
   *      - socketId 2
   *      - socketId 1
   */

  // get the gameId from the URL here and pass it to the chessGame component as a prop.
  const domainName = "http://localhost:3000";
  const color = React.useContext(ColorContext);
  const { gameid } = useParams();
  // const [play] = useSound(chessMove);
  const [SocketId, setSocketId] = React.useState([]);
  const [opponentDidJoinTheGame, didJoinGame] = React.useState(false);
  const [OpponentUserName, setUserName] = React.useState([]);
  const [gameSessionDoesNotExist, doesntExist] = React.useState(false);
  const [enoughPlayersForGame, setEnoughPlayersForGame] = React.useState(false);

  React.useEffect(() => {
    socket.on("status", (statusUpdate) => {
      console.log(statusUpdate);
      //alert(statusUpdate)
      if (
        statusUpdate === "This game session does not exist." ||
        statusUpdate === "There are too many people playing in this room."
      ) {
        doesntExist(true);
      }
    });

    socket.once("starteddagame", (data) => {
      console.log("START!");
      playerNames = [];
      countercounter = data.length;
      for (var k = 0; k < countercounter; k++) {
        if (data[k].username !== undefined) {
          playerNames.push(data[k].username);
        }
        if (data[k].username !== undefined) {
          playerNamesThatWillBeDeleted.push(data[k].username);
        }
        console.log(`${data[k].gameid} but gameid is ${gameid}`);
        if (data[k].gameid !== gameid && data[k].gameid !== undefined) {
          console.log(`${data[k].gameid} removed`);
          socket.emit("removedisbitch", data[k]);
          playerNames.splice(k, 1);
        }
      }
      findMyName = playerNames.indexOf(myName);
      for (let i = findMyName; i < playerNames.length; i++) {
        chronologicalPlayerNames[tempcounter] = playerNames[i];
        chronologicalFold[tempcounter] = false;
        tempcounter++;
      }
      if (findMyName !== 0) {
        for (let l = 0; l < findMyName; l++) {
          chronologicalPlayerNames[tempcounter] = playerNames[l];
          chronologicalFold[tempcounter] = false;
          tempcounter++;
        }
      }
      setSocketId(playerNames);
      didJoinGame(true);
    });

    socket.once("startbutton", () => {
      console.log("startbutton called");
      setEnoughPlayersForGame(true);
    });

    socket.on("give userName", (socketId) => {
      if (socket.id !== socketId) {
        console.log("give userName stage: " + props.myUserName);
        socket.emit("recieved userName", {
          userName: props.myUserName,
          gameId: gameid,
        });
      }
    });

    socket.on("get Opponent UserName", (data) => {
      if (socket.id !== data.socketId) {
        setUserName(data.userName);
        console.log("data.socketId: data.socketId");
        // setOpponentSocketId(data.socketId)
        didJoinGame(true);
      }
    });
  }, []);
  React.useEffect(() => {
    myName = props.myUserName;
    socket.emit("shuffle", cardsThisRound);
    socket.once("shuffled", (data) => {
      console.log("socketbegun");
      shuffledCardsThisRound = [];
      for (var b = 0; b < 52; b++) {
        shuffledCardsThisRound[b] = data[b];
        // console.log(shuffledCardsThisRound[b]);
      }
      done = true;
      console.log(shuffledCardsThisRound.length);
    });
  }, []);
  function startingGame() {
    socket.emit("startdagame", "hi");
    console.log("done");
  }

  socket.once("playerJoinedRoom", (statusUpdate) => {
    console.log(
      "A new player has joined the room! Username: " +
        statusUpdate.userName +
        ", Game id: " +
        statusUpdate.gameId +
        " Socket id: " +
        statusUpdate.mySocketId
    );
    socket.emit("addSockets", {
      socketid: statusUpdate.mySocketId,
      username: statusUpdate.userName,
      gameid: statusUpdate.gameId,
    });
    //console.log(`${statusUpdate.userName} sent out`)
  });

  return (
    <React.Fragment>
      {<GameBackground />}
      {opponentDidJoinTheGame ? (
        <>
          <PokerGame cards={shuffledCardsThisRound} names={playerNames} />
          {/* {
           SocketId.map(SocketId=>(<div className = 'container'>{SocketId}</div>))
            } */}
        </>
      ) : gameSessionDoesNotExist ? (
        <div>
          <h1 style={{ textAlign: "center", marginTop: "200px" }}>
            {" "}
            error bro{" "}
          </h1>
        </div>
      ) : (
        <div className="container">
          <div className="menu">
            <h1 className="f0nt">
              <strong>{props.myUserName}</strong>, copy and paste the URL below
              to send to your friend:
            </h1>
            <textarea
              className="f0nt"
              style={{ textAlign: "center", width: "50%" }}
              onFocus={(event) => {
                console.log("sd");
                event.target.select();
              }}
              value={domainName + "/game/" + gameid}
              type="text"
              id="copy"
            ></textarea>
            <h1 style={{ textAlign: "center" }}>
              {" "}
              Waiting for other opponent to join the game...{" "}
            </h1>
            {enoughPlayersForGame ? (
              <button onClick={startingGame}>Start Game</button>
            ) : (
              <button className="butt0n" className="disabled">
                Can't Start Game Yet
              </button>
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default ChessGameWrapper;
