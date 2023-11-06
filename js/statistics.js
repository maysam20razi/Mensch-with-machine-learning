/*
===========================================
Variables and constants statistics
===========================================
*/

const
teamColorDice = ["countYellowDice","countBlueDice","countRedDice","countGreenDice"],
teamColorkickAnother=["kickAnotherYellow","kickAnotherBlue","kickAnotherRed","kickAnotherGreen"],
teamColorOutBoard=["outYellow","outBlue","outRed","outGreen"];

var
countDiceThrow=0,
yellowWinner=0, blueWinner = 0, redWinner = 0, greenWinner = 0,
aveYellowDice=0,aveBlueDice=0,aveRedDice =0,aveGreenDice=0,
outYellow = 0,outBlue = 0,outRed = 0,outGreen = 0,
kickAnotherYellow = 0,kickAnotherBlue = 0,kickAnotherRed = 0,kickAnotherGreen = 0,
multiMoveYellow=0,multiMoveBlue=0,multiMoveRed=0,multiMoveGreen=0,
countYellowDice=[0,0,0,0,0,0],countBlueDice=[0,0,0,0,0,0],countRedDice=[0,0,0,0,0,0],countGreenDice=[0,0,0,0,0,0],
countChoicePlayer = [0,0,0,0];
function updateStatisticsMove(){
  teamColorDice[turnPlayerID][diceNumber-1] = teamColorDice[turnPlayerID][diceNumber-1] + 1;
}
function updateStatisticsKickOut(idGroupAct,idGroupOuting){

}
function printCountChoice(countMoveLegal){
  countChoicePlayer[turnPlayerID] = countChoicePlayer[turnPlayerID]+1;
  cmdPrint('ID = '+turnPlayerID +' count = '+ countMoveLegal +' countCurrent = ' +countChoicePlayer[turnPlayerID]);

}
function countDiceThrowPrint(){
  countDiceThrow = countDiceThrow+1;

  cmdPrint('R = ' + (Math.floor(countDiceThrow /4)+1));
}
function showStatistics(){

}
function resetStatistics(){
  countDiceThrow = 0;
  yellowWinner=0;blueWinner = 0;redWinner = 0;greenWinner = 0;
  aveYellowDice=0;aveBlueDice=0;aveRedDice =0;aveGreenDice=0;
  outYellow = 0;outBlue = 0;outRed = 0;outGreen = 0;
  kickAnotherYellow = 0;kickAnotherBlue = 0;kickAnotherRed = 0;kickAnotherGreen = 0;
  multiMoveYellow=0;multiMoveBlue=0;multiMoveRed=0;multiMoveGreen=0;
  countGreenDice=[0,0,0,0,0,0];countBlueDice=[0,0,0,0,0,0];countRedDice=[0,0,0,0,0,0];countGreenDice=[0,0,0,0,0,0];
  countChoicePlayer = [0,0,0,0];
}
