



/*
===========================================
Variables and constants test or train
===========================================
*/
const gameNumbersTrain = 100-1;
var gameNumberPlayTotal = 2000,
myIndexGroup = 0,
winnerIndex = 0;

/*
===========================================
Interface file
===========================================
*/

function interfaceScriptAI(canMovePawns,countMoveLegal){
  let idPawnChosen = -1;
  var indexID =[],
  count=0;
  for (let i =0;i<4;i++)
      if(canMovePawns[i]){
        indexID[count] = i;
        count = count + 1;
      }
  chosenPlayerID = -1;
  if (countMoveLegal == 1){
      idPawnChosen = indexID[0];
  }

  else if(countMoveLegal > 1) {

    switch (turnPlayerID) {
      case 0:
      idPawnChosen =  (myIndexGroup == 0) ? prefab_V1(indexID) : randomSystem(indexID) ;
      if (myIndexGroup == 0) updateCountMoves(idPawnChosen);

      break;
      case 1:
      idPawnChosen =  (myIndexGroup == 1) ? MinimaxSearch(GetState(),1,indexID) : randomSystem(indexID) ;
      if (myIndexGroup == 1) updateCountMoves(idPawnChosen);
      break;
      case 2:
      idPawnChosen =  (myIndexGroup == 2) ? qLearnFeature(indexID) : randomSystem(indexID) ;
      if (myIndexGroup == 2) updateCountMoves(idPawnChosen);
      break;
      case 3:
      idPawnChosen =  (myIndexGroup == 3) ? qLearnFeature(indexID) : randomSystem(indexID) ;
      if (myIndexGroup == 3) updateCountMoves(idPawnChosen);
      break;
    }
  }

  return idPawnChosen;
}
/*
===========================================
Radom  chooser Pawn
===========================================
*/
function randomSystem(idPawnsCanMove){

  let count = idPawnsCanMove.length;
  let index = Math.floor(Math.random() * count);
  let chosenPawnID = idPawnsCanMove[index];
  return chosenPawnID;
}
/*
===========================================
prefab AI
===========================================
*/
function prefab_CanGrab(indexPawn){
  return homePlayersGroupID[localConvertToWorld(eval(teamColors[turnPlayerID])[indexPawn] + diceNumber,turnPlayerID)-1] != PGL.none;
}

function prefab_V1(canMovePawns){
  let gradeMove = [];
  for(let i =0;i<canMovePawns.length;i++){
    if(eval(teamColors[turnPlayerID])[canMovePawns[i]] == -1)
    gradeMove[i] = 100;
    else if(eval(teamColors[turnPlayerID])[canMovePawns[i]] + diceNumber > 36)
    gradeMove[i] = 110;
    else if(prefab_CanGrab(canMovePawns[i]))
    gradeMove[i] = eval(teamColors[turnPlayerID])[canMovePawns[i]] + 30;
    else if(eval(teamColors[turnPlayerID])[canMovePawns[i]]  > 36)
    gradeMove[i] =-1;//subversion = V1.01 in castle add
    else
    gradeMove[i] = eval(teamColors[turnPlayerID])[canMovePawns[i]];
  }
  let max = Math.max(...gradeMove);
  let indexMax = canMovePawns[gradeMove.indexOf(max)];
  return indexMax;
}

function prefab_V2(canMovePawns){
  // Coefficient of risk and attack power [Matrics]

  let myValue = 0;
  let enemiesValue =[0,0,0,0];
  for (let i = 0 ; i < totalPlayers ; i++)
     (i == turnPlayerID) ? myValue =calcHomeValue(i)  : enemiesValue[i] =calcHomeValue(i) ;
  cmdPrint(myValue);
  cmdPrint(enemiesValue);

  return -1;
}
function compactiveIndexBack(groupID , indexPawn){
  //dagerous
  let safety = 0 ;

  return safety ;
}
function compactiveIndexForward(groupID , indexPawn){
  //attack power
let power=0;

return power;
}
function showCalcValue(){
  let showValue = [0,0,0,0];
  for (let i = 0 ; i <4 ; i++)
    showValue[i]=calcHomeValue(i);
  cmdPrint(showValue)
}
function calcHomeValue(indexPlayer){
  let myPawnsIndexHome = eval(teamColors[indexPlayer]);
  let countOutPawns=0;
  let countCastlePawns = 0;
  let value = 0;
  for(let i=0;i<4;i++)
    if(myPawnsIndexHome[i]==-1)
      {countOutPawns = countOutPawns+1}
    else if(myPawnsIndexHome[i]>36)
      countCastlePawns = countCastlePawns +1;

  for(let i=0;i<4;i++)
    if(myPawnsIndexHome[i]==0)
      value = value + 10 - (3 * countOutPawns);
    else if(myPawnsIndexHome[i] >= 1 && myPawnsIndexHome[i] <=36)
      value = value + myPawnsIndexHome[i] ;
    return value + countCastlePawns * 50;
}
/*
===========================================
Min Max Graph
===========================================
*/
const depthMiniMax = 10;//depht to calculate value of leaves in the minimax nodes
let scoreNode;
function MinimaxSearch(currentState,indexPlayer,indexPawnCanMove) {

  console.log(currentState);//for test
  let r = randomSystem(indexPawnCanMove);


  return r;
}
function GetState(){
return [[diceNumber],playerPawnLocationYellow,playerPawnLocationBlue,playerPawnLocationRed,playerPawnLocationGreen];

}
function GradeNode(state){
  return 10;
}

/*
===========================================
Reinforcement  Learning
===========================================
*/
class ML_RL {
  constructor(){

  }

  #stateIndexHome = [[]];
  #stateStatePawn =[[]];
  /*
  state -> o = out , c = castle , s = first safe home , b = board ->
  */
  #movesAll = 0;
  #movesAllow = 0;
  #movesHaveChoices = 0;

  _inti_(){
    for(let i = 0 ;i<4 ;i++)
      for(let j = 0 ; j<4 ; j++){
        stateIndexHome[i][j] = -1;
        stateStatePawn[i][j] = "o";
      }
    movesAll = 0;
    movesAllow = 0;
    movesHaveChoices = 0;
  }

  takeReward(){
    let r = 0;
    return r;
  }

  selectPawnIndex(state){

  }
}

var ML = new ML_RL();


/*
===========================================
Reinforcement  Learning key features
===========================================
*/
let
alpha = 0.7;
beta = 2;
featureChange = {'goToBoardQty1':1.0 ,'goToBoardQty2':1.0,'goToBoardQty3':1.0,'goToCastle':1.0 ,'moveInBoard':1.0 ,'inCastle':1.0,'goToGame1':1.0,'goToGame2':1.0},
featureMoveOnBoard = {'doesGarb':1.0,'safety':1.0,'attackPower':0,};
function qLearnFeature(idPawnsCanMove){

  let count = idPawnsCanMove.length , gradeMove = [-100000000,-100000000,-100000000,-100000000];
  for(let i = 0;  i < count; i++)
  if(eval(teamColors[turnPlayerID])[idPawnsCanMove[i]] == -1)
  gradeMove[i] = calculateGradeOut();
  else if(eval(teamColors[turnPlayerID])[idPawnsCanMove[i]] > 36)
  gradeMove[i] = calculateGradeCastle();
  else
  gradeMove[i] = calculateGradeMoveBoard(eval(teamColors[turnPlayerID])[idPawnsCanMove[i]],idPawnsCanMove[i]);

  let max = Math.max(...gradeMove);
  let indexMax = idPawnsCanMove[gradeMove.indexOf(max)];
  return indexMax;
}
function calculateGradeCastle(){
    return featureChange.inCastle;
}

function calculateGradeMoveBoard(localIndex,indexPawn){
  let value = 0;
  value = (localIndex + diceNumber > 36) ? featureChange.goToCastle : calcMoveBoardNoCastle(localIndex,indexPawn);
  return value;
}
function calcMoveBoardNoCastle(localIndex,indexPawn){
  let
  qtyOutPawns = calculateQtyOutPawns();
  castleNearIndex = findInboardRank(indexPawn);
  value = 0;
  value = featureChange.moveInBoard * (localIndex + alpha )
        + prefab_CanGrab(indexPawn) * featureMoveOnBoard.doesGarb + ( qtyOutPawns == 1 && localIndex == 0) * featureChange.goToGame1
        + (qtyOutPawns == 2 && localIndex == 0) * featureChange.goToGame2 +  attackPowerCalculate(localIndex) *  featureMoveOnBoard.attackPower
        + safetyCalculate(localIndex) * featureMoveOnBoard.safety + featureMoveOnBoard.attackToStrongestEnemy * attackToStrongestEnemyCalculate() + featureMoveOnBoard.moveFirstCastle * (castleNearIndex == 1)
        + featureMoveOnBoard.moveSecondCastle *(castleNearIndex == 2) + featureMoveOnBoard.moveThirdCastle * (castleNearIndex == 3) + featureMoveOnBoard.moveForthCastle * (castleNearIndex == 3) ;//not zero effect

  return value;
}
function findInboardRank(indexPawn){
  let indexPlacePawn = [0,0,0,0],countPawnInBoard=0,myPlace = 0;

  for (let i = 0 ;i <4 ; i++){
    indexPlacePawn[i] =(eval(teamColors[turnPlayerID])[i] > 36 ) ? -10 :  eval(teamColors[turnPlayerID])[i];
    if(eval(teamColors[turnPlayerID])[i] < 36 && eval(teamColors[turnPlayerID])[i] !=-1)
      countPawnInBoard ++;
    }
  if(countPawnInBoard > 1){
    myPlace = 1;
    for (let i = 0 ; i<4 ; i++)
      if(indexPlacePawn[i] > eval(teamColors[turnPlayerID])[indexPawn]) myPlace++;
  }
  return myPlace;
}

function attackToStrongestEnemyCalculate(){
  return false;
}
function attackPowerCalculate(localIndex){
    return 0 ;
}
function safetyCalculate(localIndex){
  return 0 ;
}

function positionValue(indexGroup){
    let valueEnemy = 0;
    for(let i = 0;i<4;i++)
      valueEnemy = valueEnemy + Math.pow(Math.min(eval(teamColors[indexGroup])[i],37) + beta , 2);
    return valueEnemy;
}
function calculateQtyOutPawns(){
  let qtyOutPawns = 0;
  for(let i = 0 ; i< 4;i++)
    qtyOutPawns = (eval(teamColors[turnPlayerID])[i]=== -1) ? qtyOutPawns + 1 : qtyOutPawns;
  return qtyOutPawns;
}

function calculateGradeOut(){
  let
  value = 0,
  qtyOutPawns = calculateQtyOutPawns() - 1;

	switch (qtyOutPawns) {
    case 3:
		value = 10;
		break;
    case 2:
		value = featureChange.goToBoardQty3  + featureMoveOnBoard.safety * safetyCalculate(-1) + featureMoveOnBoard.attackPower * attackPowerCalculate(-1) ;
		break;
    case 1:
		value = featureChange.goToBoardQty2 + featureMoveOnBoard.safety * safetyCalculate(-1) + featureMoveOnBoard.attackPower * attackPowerCalculate(-1) ;
		break;
    case 0:
		value = featureChange.goToBoardQty1 + featureMoveOnBoard.safety * safetyCalculate(-1) + featureMoveOnBoard.attackPower * attackPowerCalculate(-1) ;
		break;
  }

  return value;
}

/*
===========================================
save File key features
===========================================
*/
function save(){
  let data =
  "var alphaRL = "+ alpha +",betaRL = "+beta+", featureChangeRL=["+featureChange.goToBoardQty1 +","+ featureChange.goToBoardQty2+","
  + featureChange.goToBoardQty3+","+featureChange.goToCastle+","+featureChange.moveInBoard+"," + featureChange.inCastle
  + ","+ featureChange.goToGame1+","+featureChange.goToGame2 + "], featureMoveOnBoardRL = ["
  + featureMoveOnBoard.doesGarb+","+featureMoveOnBoard.safety+","+ featureMoveOnBoard.attackPower + ","+featureMoveOnBoard.moveFirstCastle
  + ","+featureMoveOnBoard.moveSecondCastle+ ","+featureMoveOnBoard.moveThirdCastle+ ","+featureMoveOnBoard.moveForthCastle + ","
  + featureMoveOnBoard.attackToStrongestEnemy + "], countPlayedGames = "+(gameNumberPlayTotal+1)+";";

	//download(data,"DataMenschFeatureLearn","js");
}
function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}
/*
===========================================
setting features ML - RL
===========================================
*/

function setFeatures(){
//from data.js
alpha = alphaRL;
beta = betaRL;
gameNumberPlayTotal = countPlayedGames;
featureChange.goToBoardQty1 = featureChangeRL[0];
featureChange.goToBoardQty2 = featureChangeRL[1];
featureChange.goToBoardQty3 = featureChangeRL[2];
featureChange.goToCastle    = featureChangeRL[3];
featureChange.moveInBoard   = featureChangeRL[4];
featureChange.inCastle      = featureChangeRL[5];
featureChange.goToGame1     = featureChangeRL[6];
featureChange.goToGame2     = featureChangeRL[7];

featureMoveOnBoard.doesGarb         = featureMoveOnBoardRL[0];
featureMoveOnBoard.safety           = featureMoveOnBoardRL[1];
featureMoveOnBoard.attackPower      = featureMoveOnBoardRL[2];
featureMoveOnBoard.moveFirstCastle  = featureMoveOnBoardRL[3];
featureMoveOnBoard.moveSecondCastle = featureMoveOnBoardRL[4];
featureMoveOnBoard.moveThirdCastle  = featureMoveOnBoardRL[5];
featureMoveOnBoard.moveForthCastle  = featureMoveOnBoardRL[6];
featureMoveOnBoard.attackToStrongestEnemy  = featureMoveOnBoardRL[7];
}

/*
===========================================
Reinforcement  Learning system
===========================================
*/
var chooseState = {'goToBoardQty1':0 ,'goToBoardQty2':0,'goToBoardQty3':0,'goToCastle':0 ,'moveInBoard':0 ,'inCastle':0,
                   'goToGame1':0 ,'goToGame2':0,'doesGarb':0,'safety':0,'attackPower':0,
                   'moveFirstCastle':0 , 'moveSecondCastle':0 , 'moveThirdCastle':0 , 'moveForthCastle':0 ,
                   'attackToStrongestEnemy':0};
var oldChooseState = chooseState,oldResult ,currentCountMove = 0, oldMoveCount = 0;
function rewardSystemThenGameEnded(didWinGame){
  let reward = 0;
  if(didWinGame  && oldResult){
      reward = 40;
  }
  else if(!didWinGame  && !oldResult) {
    reward = -30;
  }
  else if(didWinGame && !oldResult){
    reward = 500;
  }
  else {
    reward = -500;
  }
  return reward;
}

function updateCountMoves(idPawn){
  currentCountMove++;
  console.log(currentCountMove);
  let countOut = calculateQtyOutPawns();
  if(eval(teamColors[turnPlayerID])[idPawn] == -1){
    switch (countOut) {
      case 0:
        chooseState.goToBoardQty1++ ;
        break;
      case 1:
        chooseState.goToBoardQty2++ ;
        break;
      case 2:
        chooseState.goToBoardQty3++ ;
        break;
        }
  }
  else if(eval(teamColors[turnPlayerID])[idPawn] >36){
    chooseState.inCastle++;
  }
  else if(eval(teamColors[turnPlayerID])[idPawn] + diceNumber > 36) {
    chooseState.goToCastle++;
  }
  else {

    let rank = findInboardRank(idPawn);
    if(rank == 0)
      chooseState.moveInBoard++;
    else {
      switch (rank) {
        case 1:
        chooseState.moveFirstCastle++;
        break;
        case 2:
        chooseState.moveSecondCastle++;
        break;
        case 3:
        chooseState.moveThirdCastle++;
        break;
        case 4:
        chooseState.moveForthCastle++;
        break;
      }
    }
    if(eval(teamColors[turnPlayerID])[idPawn] == 0){
      switch (countOut) {
        case 1:
          chooseState.goToGame1++;
        break;
        case 2:
          chooseState.goToGame2++;
        break;
        }
    }
    else {

    }
    if(prefab_CanGrab(idPawn)){
      chooseState.doesGarb++;
      //attack to attackToStrongestEnemy

      }
  }
}

function updateValue(didWinGame){
  let coefficientRepetition = 0.75 ,
  rewardObtain = rewardSystemThenGameEnded(didWinGame)*10;
  featureChange.goToBoardQty1 = featureChange.goToBoardQty1 + rewardObtain * (chooseState.goToBoardQty1 /currentCountMove - oldChooseState.goToBoardQty1/oldMoveCount )  * coefficientRepetition ;
  featureChange.goToBoardQty2 = featureChange.goToBoardQty2   + rewardObtain * (chooseState.goToBoardQty2 / currentCountMove- oldChooseState.goToBoardQty2/oldMoveCount )* coefficientRepetition ;
  featureChange.goToBoardQty3 = featureChange.goToBoardQty3   + rewardObtain * (chooseState.goToBoardQty3 / currentCountMove- oldChooseState.goToBoardQty3/oldMoveCount )* coefficientRepetition ;
  featureChange.goToCastle    = featureChange.goToCastle   + rewardObtain * (chooseState.goToCastle / currentCountMove- oldChooseState.goToCastle/oldMoveCount ) * coefficientRepetition ;
  featureChange.moveInBoard   = featureChange.moveInBoard   + rewardObtain * (chooseState.moveInBoard / currentCountMove - oldChooseState.moveInBoard/oldMoveCount )* coefficientRepetition ;
  featureChange.inCastle      = featureChange.inCastle   + rewardObtain * (chooseState.inCastle / currentCountMove - oldChooseState.inCastle/oldMoveCount )* coefficientRepetition ;
  featureChange.goToGame1     = featureChange.goToGame1   + rewardObtain * (chooseState.goToGame1 / currentCountMove - oldChooseState.goToGame1/oldMoveCount )* coefficientRepetition ;
  featureChange.goToGame2     = featureChange.goToGame2   + rewardObtain * (chooseState.goToGame2 / currentCountMove- oldChooseState.goToGame2/oldMoveCount ) * coefficientRepetition ;

  featureMoveOnBoard.doesGarb    = featureMoveOnBoard.doesGarb + rewardObtain * (chooseState.doesGarb / currentCountMove- oldChooseState.doesGarb/oldMoveCount ) * coefficientRepetition ;
  featureMoveOnBoard.safety      = featureMoveOnBoard.safety + rewardObtain * (chooseState.safety  / currentCountMove- oldChooseState.safety/oldMoveCount )* coefficientRepetition ;
  featureMoveOnBoard.attackPower    = featureMoveOnBoard.attackPower + rewardObtain * (chooseState.attackPower  / currentCountMove- oldChooseState.attackPower/oldMoveCount )* coefficientRepetition ;
  featureMoveOnBoard.moveFirstCastle        = featureMoveOnBoard.moveFirstCastle + rewardObtain * (chooseState.moveFirstCastle  / currentCountMove- oldChooseState.moveFirstCastle/oldMoveCount )* coefficientRepetition ;
  featureMoveOnBoard.moveSecondCastle       = featureMoveOnBoard.moveSecondCastle + rewardObtain * (chooseState.moveSecondCastle / currentCountMove- oldChooseState.moveSecondCastle /oldMoveCount) * coefficientRepetition ;
  featureMoveOnBoard.moveThirdCastle        = featureMoveOnBoard.moveThirdCastle + rewardObtain * (chooseState.moveThirdCastle / currentCountMove- oldChooseState.moveThirdCastle/oldMoveCount ) * coefficientRepetition ;
  featureMoveOnBoard.moveForthCastle        = featureMoveOnBoard.moveForthCastle + rewardObtain * (chooseState.moveForthCastle / currentCountMove - oldChooseState.moveForthCastle/oldMoveCount )* coefficientRepetition ;
  featureMoveOnBoard.attackToStrongestEnemy = featureMoveOnBoard.attackToStrongestEnemy + rewardObtain * (chooseState.attackToStrongestEnemy / currentCountMove- oldChooseState.attackToStrongestEnemy/oldMoveCount ) * coefficientRepetition ;
  //another update variables

  cmdPrint(' feature move = '+featureMoveOnBoard.doesGarb+","+featureMoveOnBoard.safety+","+featureMoveOnBoard.attackPower+","+featureMoveOnBoard.moveFirstCastle+","+featureMoveOnBoard.moveSecondCastle+","+featureMoveOnBoard.moveThirdCastle+","+featureMoveOnBoard.moveForthCastle+","+featureMoveOnBoard.attackToStrongestEnemy);
  cmdPrint(' feature change = '+featureChange.goToBoardQty1 + ","+featureChange.goToBoardQty2 + ","+featureChange.goToBoardQty3 + ","+featureChange.goToCastle + ","+featureChange.moveInBoard + ","+featureChange.inCastle + ","+featureChange.goToGame1 + ","+featureChange.goToGame2);
}

function resetFeatureNew(){
chooseState.goToBoardQty1=0 ;
chooseState.goToBoardQty2=0 ;
chooseState.goToBoardQty3=0 ;
chooseState.goToCastle=0 ;
chooseState.moveInBoard=0 ;
chooseState.inCastle =0 ;
chooseState.goToGame1=0 ;
chooseState.goToGame2=0 ;

chooseState.doesGarb=0 ;
chooseState.safety=0 ;
chooseState.attackPower=0;
chooseState.moveFirstCastle=0 ;
chooseState.moveSecondCastle=0 ;
chooseState.moveThirdCastle=0 ;
chooseState.moveForthCastle=0 ;
chooseState.attackToStrongestEnemy=0 ;
  //another update variables
}
