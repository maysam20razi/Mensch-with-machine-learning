
/*
===========================================
Constants
===========================================
*/
const
speedMovePawn = 1,
speedStartNewGame =1,
rewardDice = 6,
endGameTeam = 1,
teamColors = ["playerPawnLocationYellow","playerPawnLocationBlue","playerPawnLocationRed","playerPawnLocationGreen"],
castleColors = ["isYellowCastleFull","isBlueCastleFull","isRedCastleFull","isGreenCastleFull"];

/*
===========================================
Variables
===========================================
*/
var
totalPlayers = 4,
diceNumber = 1,
turnPlayerID = 0,
doesExistBaseGroupFullID = [false,false,false,false],
//LOCAL LOCATION! -1 for out , 0 for base , 1~36 for in game , 37~40 for castle;
playerPawnLocationYellow = [-1,-1,-1,-1],
playerPawnLocationRed = [-1,-1,-1,-1],
playerPawnLocationBlue = [-1,-1,-1,-1],
playerPawnLocationGreen = [-1,-1,-1,-1],

isYellowCastleFull = [false,false,false,false],
isBlueCastleFull = [false,false,false,false],
isRedCastleFull = [false,false,false,false],
isGreenCastleFull = [false,false,false,false],
outPawnChoose = false;
endGameCurrentRound = false;

/*
===========================================
Variables for board
===========================================
*/
var
inGameLocationX = [235,235,235,235,180,125,70,15,15,70,125,180,235,235,235,235,235,290,345,345,345,345,400,455,510,565,565,510,455,400,345,345,345,345,345,290],
inGameLocationY = [510,455,400,345,345,345,345,345,290,235,235,235,235,180,125,70,15,15,70,125,180,235,235,235,235,235,290,345,345,345,345,400,455,510,565,565],
baseLocationX = [235,345,15,565],
baseLocationY = [565,15,235,345],
castleLocationX = [290,290,290,290,290,290,290,290,70,125,180,235,510,455,400,345],
castleLocationY = [510,455,400,345,70,125,180,235,290,290,290,290,290,290,290,290],
outLoctionX = [70,15,70,15,510,565,510,565,70,15,70,15,510,565,510,565],
outLoctionY = [565,565,510,510,15,15,70,70,15,15,70,70,565,565,510,510];
//list of player group in board game WOLRD LOCATION
PGL = {'none':-1,'yellow':0,'blue':1,'red':2,'green':3},
homePlayersGroupID =[PGL.none,PGL.none,PGL.none,PGL.none,PGL.none,PGL.none,PGL.none,PGL.none,PGL.none,
										PGL.none,PGL.none,PGL.none,PGL.none,PGL.none,PGL.none,PGL.none,PGL.none,PGL.none,
										PGL.none,PGL.none,PGL.none,PGL.none,PGL.none,PGL.none,PGL.none,PGL.none,PGL.none,
										PGL.none,PGL.none,PGL.none,PGL.none,PGL.none,PGL.none,PGL.none,PGL.none,PGL.none],
playersEndGame = [false,false,false,false],
rankGroupsID =[0,0,0,0];

/*
===========================================
			 Begin play! ( setting game)
===========================================
*/

function setGame(numberOfPlayers,startID,doesSetPosition = false){
	resetPostionGame();
	//ai
	setFeatures();
	//another
	totalPlayers = Math.max(numberOfPlayers,2);
	turnPlayerID = (startID >=0 && startID <= totalPlayers-1 )? startID : 0;
	document.getElementById('players-turn').innerText = turnPlayerID;
	if(doesSetPosition)
		setPawnsPosistion();
	test();
}

/*
===========================================
			Play Game
===========================================
*/
	function letPlay(){
		throwDice();
		movePlayerPawns();
		changeTurn();
	}
	function endGame(){
		if(gameNumberPlayTotal == gameNumbersTrain) {
				cmdPrint('END TRAIN');
				save();
			}
		else {
			gameNumberPlayTotal = gameNumberPlayTotal + 1;
			// start ai update
			/*
			if(gameNumberPlayTotal > 1 )
				updateValue(winnerIndex == myIndexGroup);
			oldChooseState =chooseState;
			oldResult =  winnerIndex == myIndexGroup;
			oldMoveCount = currentCountMove;
			// end ai update
			*/
			resetPostionGame();
			letPlay();
		}
	}
	function resetPostionGame(){
		resetFeatureNew();
		resetStatistics();
		homePlayersGroupID =[PGL.none,PGL.none,PGL.none,PGL.none,PGL.none,PGL.none,PGL.none,PGL.none,PGL.none,
												PGL.none,PGL.none,PGL.none,PGL.none,PGL.none,PGL.none,PGL.none,PGL.none,PGL.none,
												PGL.none,PGL.none,PGL.none,PGL.none,PGL.none,PGL.none,PGL.none,PGL.none,PGL.none,
												PGL.none,PGL.none,PGL.none,PGL.none,PGL.none,PGL.none,PGL.none,PGL.none,PGL.none];
		playersEndGame = [false,false,false,false];
		rankGroupsID =[0,0,0,0];
		playerPawnLocationYellow = [-1,-1,-1,-1];
		playerPawnLocationRed = [-1,-1,-1,-1];
		playerPawnLocationBlue = [-1,-1,-1,-1];
		playerPawnLocationGreen = [-1,-1,-1,-1];
		endGameCurrentRound = false;
		isYellowCastleFull = [false,false,false,false];
		isBlueCastleFull = [false,false,false,false];
		isRedCastleFull = [false,false,false,false];
		isGreenCastleFull = [false,false,false,false];
		turnPlayerID = 0;
		doesExistBaseGroupFullID = [false,false,false,false];
		for(let i = 0 ; i<4 ; i++)
			for(let j = 0 ; j<4 ; j++)
				outBoard(j,i);
	}
/*
===========================================
			Dice functions
===========================================
*/
	function throwDice(){
		playerBestRandom = 3;
		diceNumber = (document.getElementById('dice-force').selectedIndex  == 0) ? diceRandom(playerBestRandom==turnPlayerID) :  document.getElementById('dice-force').selectedIndex;
		document.getElementById('info-dice').innerText = diceNumber;
	}

	function diceRandom(isWieght){
		let diceNumbers=[1,2,3,4,5,6],wieght=[1,1,1,1,1,1];
		let dice =(isWieght)? diceNumbers[randomWeight(wieght)]: Math.floor(Math.random() * 6) + 1;
		return dice;
	}
/*
===========================================
			Turn functions
===========================================
*/
	function nextTurn(){
		if(rewardDice !== diceNumber)
			{
				if(turnPlayerID === 3)
					turnPlayerID = 0 ;
					else {
						turnPlayerID = turnPlayerID + 1;
					}
			}
	}

	function changeTurn(){
		//ادامه داده شود یا خیر
		checkMyTurn(turnPlayerID);
		if(!endGameCurrentRound){
			nextTurn();
			document.getElementById('players-turn').innerText = turnPlayerID;
		}
	}

/*
===========================================
		move players and update state functions
===========================================
*/

	function movePlayerPawns(){
		let countMoveAllow = {'countMoves':0},
		// **???!!!! note call by reference
		playersMoves = findPlayerAllowMoving(countMoveAllow);
		chooseMovePawn(playersMoves,countMoveAllow.countMoves);
			// -> nextTurn
	}
	function findPlayerAllowMoving(countMoveAllow){

		let playerIndexMove = [false,false,false,false],
		moveCount = 0 ;
		outPawnChoose = false;
		for(let i = 0 ; i<4 ; i++){
			if(eval(teamColors[turnPlayerID])[i] == -1)
				{playerIndexMove[i] = (allowMoveIntoBoard()) ?  true : false ; moveCount = (allowMoveIntoBoard()) ? moveCount +1 : moveCount; if(allowMoveIntoBoard()) outPawnChoose = true;   }
			else if(eval(teamColors[turnPlayerID])[i] > 36)
				{playerIndexMove[i] = (allowMoveInCastle(i)) ?  true : false ; moveCount = (allowMoveInCastle(i)) ? moveCount +1 : moveCount ;}
			else
				{playerIndexMove[i] = (allowMoveAtBoard(i)) ?  true : false ; moveCount = (allowMoveAtBoard(i)) ? moveCount +1 : moveCount ;}
		}

		countMoveAllow.countMoves = moveCount;
		return playerIndexMove;
	}
	function allowMoveIntoBoard(){
		return (!doesExistBaseGroupFullID[turnPlayerID] && diceNumber == rewardDice && !outPawnChoose);
	}
	function allowMoveInCastle(indexPawn){
		return (diceNumber + eval(teamColors[turnPlayerID])[indexPawn] < 41 &&  !eval(castleColors[turnPlayerID])[diceNumber + (eval(teamColors[turnPlayerID])[indexPawn]) -37]);
	}
	function allowMoveAtBoard(indexPawn){
		let doesAllowMovePawn = false;
		let indexNextLocal = ((eval(teamColors[turnPlayerID])[indexPawn] + diceNumber));

		if(indexNextLocal < 37)
			doesAllowMovePawn = (homePlayersGroupID[localConvertToWorld(indexNextLocal,turnPlayerID)-1] != turnPlayerID);
		else if(indexNextLocal < 41)
			doesAllowMovePawn = !eval(castleColors[turnPlayerID])[diceNumber + (eval(teamColors[turnPlayerID])[indexPawn]) -37];
		return doesAllowMovePawn;
	}
	function chooseMovePawn(canMovePawns ,countMoveLegal){
		//AI script or human
		let pawnID = interfaceScriptAI(canMovePawns,countMoveLegal);
		if(pawnID !== -1 )
			movePawn(pawnID);

	}
	function movePawn(indexPawnChosen){
		changeLocalIndex(indexPawnChosen);
		movePawnAnim(indexPawnChosen,turnPlayerID);
	}
	function changeLocalIndex(indexPawnChosen){
		//pervious home

		if(eval(teamColors[turnPlayerID])[indexPawnChosen] == -1){
			eval(teamColors[turnPlayerID])[indexPawnChosen] = 0;
			doesExistBaseGroupFullID[turnPlayerID] = true;
		}
		else {
			updateWorldGroupID(indexPawnChosen);
			if(eval(teamColors[turnPlayerID])[indexPawnChosen] == 0)
				doesExistBaseGroupFullID[turnPlayerID] = false;
			else if (eval(teamColors[turnPlayerID])[indexPawnChosen] > 36)
				eval(castleColors[turnPlayerID])[eval(teamColors[turnPlayerID])[indexPawnChosen] - 37] = false;//empty home castle
			if (eval(teamColors[turnPlayerID])[indexPawnChosen] + diceNumber > 36)
				eval(castleColors[turnPlayerID])[eval(teamColors[turnPlayerID])[indexPawnChosen] + diceNumber - 37] = true;
			eval(teamColors[turnPlayerID])[indexPawnChosen] = eval(teamColors[turnPlayerID])[indexPawnChosen] + diceNumber;
		}
	}
	function outBoard(indexPawn,idGroup) {

		eval(teamColors[idGroup])[indexPawn] = -1;
		movePawnAnim(indexPawn,idGroup);
	}
	function updateWorldGroupID(indexPawnChosen){
		//empty current home

		if(eval(teamColors[turnPlayerID])[indexPawnChosen] <37 && eval(teamColors[turnPlayerID])[indexPawnChosen] > 0)
			homePlayersGroupID[localConvertToWorld(eval(teamColors[turnPlayerID])[indexPawnChosen],turnPlayerID)-1] = PGL.none;
		if(eval(teamColors[turnPlayerID])[indexPawnChosen] + diceNumber < 37 ){
			//check home
			let previousGroup  = homePlayersGroupID[localConvertToWorld(eval(teamColors[turnPlayerID])[indexPawnChosen] + diceNumber,turnPlayerID)-1];
			if(previousGroup != PGL.none)
				{
					let findIndexPawnopponent = pawnOutIndex(previousGroup,localConvertToWorld(eval(teamColors[turnPlayerID])[indexPawnChosen] + diceNumber,turnPlayerID)-1);
					outBoard(findIndexPawnopponent,previousGroup);
				}
			homePlayersGroupID[localConvertToWorld(eval(teamColors[turnPlayerID])[indexPawnChosen] + diceNumber,turnPlayerID)-1] = turnPlayerID;
		}
	}
	function pawnOutIndex(idGroup , worldIndex){
		let indexPawnOut = -1;
		for(let i = 0 ; i<4 ; i++)
			if(eval(teamColors[idGroup])[i] > 0 && eval(teamColors[idGroup])[i] <37 )
				if(localConvertToWorld(eval(teamColors[idGroup])[i] ,idGroup)-1 == worldIndex) {
					indexPawnOut = i;
					break;
				}
		return indexPawnOut;
	}
	function localConvertToWorld(localIndex,groupID){
		wIndex = 0;
		switch (groupID) {
			case 0:
				wIndex = localIndex;
				break;
			case 1:
				wIndex = (localIndex <= 18)? localIndex + 18 : localIndex - 18;
				break;
			case 2:
				wIndex = (localIndex <= 27)? localIndex + 9 : localIndex - 27;
				break;
			case 3:
				wIndex = (localIndex <= 9)? localIndex + 27 : localIndex - 9;
				break;
		}
		return wIndex;
	}
	function checkMyTurn(idGroup){
		let
		countPawnsInCastle = 0,
		totalInactivePlayer = 0;
		for(let i =0 ; i<4;i++)
			countPawnsInCastle = (eval(teamColors[idGroup])[i] >36)? countPawnsInCastle+1:countPawnsInCastle;

		for (let i = 0 ; i<4;i++)
			totalInactivePlayer = (playersEndGame[i])? totalInactivePlayer+1:totalInactivePlayer;
		if(countPawnsInCastle == 4){
				playersEndGame[idGroup] = true;
				rankGroupsID[idGroup] = totalInactivePlayer;
			}
		if(totalInactivePlayer === endGameTeam){
			endGameCurrentRound = true;
			cmdPrint('Game round No. '+ (gameNumberPlayTotal + 1) +' is ended ');
			//cmdPrint('Last pos = ' + 	GetState());
			//cmdPrint('ID = ' + idGroup);
			let name = ['Green','Yellow','Blue','Red'], groupWinner =[3,0,1,2];
			winnerIndex = groupWinner[idGroup];
			cmdPrint(name[idGroup] + ' wins');
			setTimeout(endGame ,speedStartNewGame);
		}
		else {
			setTimeout(letPlay ,speedMovePawn);
		}
	}

/*
===========================================
		set position functions for debug
===========================================
*/

	function setPawnsPosistion(state){
		cmdPrint("I'm OK");
	}

	function reloadPosition() {
		document.location.reload();
	}
/*
===========================================
			Move Pawn
===========================================
*/
function movePawnAnim(indexPawn,idGroup){
// after that set index location index;
	let id="p"+idGroup+"-"+indexPawn,
	locX = 0,
	locY = 0,
	indexHome=eval(teamColors[idGroup])[indexPawn];

	if(indexHome == -1){
		locX = outLoctionX[idGroup*4 + indexPawn];
		locY = outLoctionY[idGroup*4 + indexPawn];
	}
	else if (indexHome == 0) {
		locX = baseLocationX[idGroup];
		locY = baseLocationY[idGroup];
	}
	else if (indexHome <= 36 && indexHome >= 1) {
		locX = inGameLocationX[localConvertToWorld(indexHome-1,idGroup)];
		locY = inGameLocationY[localConvertToWorld(indexHome-1,idGroup)];
	}
	else if (indexHome > 36) {
		locX = castleLocationX[idGroup*4 + (eval(teamColors[idGroup])[indexPawn]-37)];
		locY = castleLocationY[idGroup*4 + (eval(teamColors[idGroup])[indexPawn]-37)];
	}
	document.getElementById(id).style.left = locX +'px';
	document.getElementById(id).style.top = locY +'px';
	//cmdPrint('index Home = '+indexHome+' wolrd convert = '+localConvertToWorld(indexHome-1,idGroup) +' loc X='+ locX + ' , loc Y = '+locY );
}

/*
===========================================
		Set Board
===========================================
*/
	function setupBoard() {

		let htmlCircle = "";
		//generate base
		htmlCircle = htmlCircle+'<a class="homeCircle color-base-g1 r_0 c_4"></a>';
		htmlCircle = htmlCircle+'<a class="homeCircle color-base-g2 r_6 c_0"></a>';
		htmlCircle = htmlCircle+'<a class="homeCircle color-base-g3 r_10 c_6"></a>';
		htmlCircle = htmlCircle+'<a class="homeCircle color-base-g4 r_4 c_10"></a>';
		//cross
		for(let i=0 ;i<4 ;i++){
			for (let j=0;j<4;j++)
			{
				htmlCircle = (i==0)? htmlCircle + '<a class="homeCircle color-g'+(i+1)+' r_'+(j+1)+' c_5"></a>':htmlCircle;
				htmlCircle = (i==2)? htmlCircle + '<a class="homeCircle color-g'+(i+1)+' c_'+(j+1)+' r_5"></a>':htmlCircle;
				htmlCircle = (i==1)? htmlCircle + '<a class="homeCircle color-g'+(i+1)+' r_'+(j+6)+' c_5"></a>':htmlCircle;
				htmlCircle = (i==3)? htmlCircle + '<a class="homeCircle color-g'+(i+1)+' c_'+(j+6)+' r_5"></a>':htmlCircle;
			}

		}
		//for HomeBase
		htmlCircle = htmlCircle + '<a class="homeCircle color-g1 r_0 c_1"></a>';
		htmlCircle = htmlCircle + '<a class="homeCircle color-g1 r_0 c_0"></a>';
		htmlCircle = htmlCircle + '<a class="homeCircle color-g1 r_1 c_1"></a>';
		htmlCircle = htmlCircle + '<a class="homeCircle color-g1 r_1 c_0"></a>';

		htmlCircle = htmlCircle + '<a id="p0-0" class="pawn-image pawns-filter-yellow r_0 c_1"></a>';
		htmlCircle = htmlCircle + '<a id="p0-1" class="pawn-image pawns-filter-yellow r_0 c_0"></a>';
		htmlCircle = htmlCircle + '<a id="p0-2" class="pawn-image pawns-filter-yellow r_1 c_1"></a>';
		htmlCircle = htmlCircle + '<a id="p0-3" class="pawn-image pawns-filter-yellow r_1 c_0"></a>';

		htmlCircle = htmlCircle + '<a class="homeCircle color-g2 r_10 c_9"></a>';
		htmlCircle = htmlCircle + '<a class="homeCircle color-g2 r_10 c_10"></a>';
		htmlCircle = htmlCircle + '<a class="homeCircle color-g2 r_9 c_9"></a>';
		htmlCircle = htmlCircle + '<a class="homeCircle color-g2 r_9 c_10"></a>';

		htmlCircle = htmlCircle + '<a id="p1-0" class="pawn-image pawns-filter-blue r_10 c_9"></a>';
		htmlCircle = htmlCircle + '<a id="p1-1" class="pawn-image pawns-filter-blue r_10 c_10"></a>';
		htmlCircle = htmlCircle + '<a id="p1-2" class="pawn-image pawns-filter-blue r_9 c_9"></a>';
		htmlCircle = htmlCircle + '<a id="p1-3" class="pawn-image pawns-filter-blue r_9 c_10"></a>';

		htmlCircle = htmlCircle + '<a class="homeCircle color-g3 r_10 c_0"></a>';
		htmlCircle = htmlCircle + '<a class="homeCircle color-g3 r_9 c_0"></a>';
		htmlCircle = htmlCircle + '<a class="homeCircle color-g3 r_9 c_1"></a>';
		htmlCircle = htmlCircle + '<a class="homeCircle color-g3 r_10 c_1"></a>';

		htmlCircle = htmlCircle + '<a id="p2-0" class="pawn-image pawns-filter-red r_9 c_0"></a>';
		htmlCircle = htmlCircle + '<a id="p2-1" class="pawn-image pawns-filter-red r_10 c_0"></a>';
		htmlCircle = htmlCircle + '<a id="p2-2" class="pawn-image pawns-filter-red r_9 c_1"></a>';
		htmlCircle = htmlCircle + '<a id="p2-3" class="pawn-image pawns-filter-red r_10 c_1"></a>';

		htmlCircle = htmlCircle + '<a class="homeCircle color-g4 r_1 c_10"></a>';
		htmlCircle = htmlCircle + '<a class="homeCircle color-g4 r_0 c_10"></a>';
		htmlCircle = htmlCircle + '<a class="homeCircle color-g4 r_1 c_9"></a>';
		htmlCircle = htmlCircle + '<a class="homeCircle color-g4 r_0 c_9"></a>';

		htmlCircle = htmlCircle + '<a id="p3-0" class="pawn-image pawns-filter-green r_1 c_10"></a>';
		htmlCircle = htmlCircle + '<a id="p3-1" class="pawn-image pawns-filter-green r_0 c_10"></a>';
		htmlCircle = htmlCircle + '<a id="p3-2" class="pawn-image pawns-filter-green r_1 c_9"></a>';
		htmlCircle = htmlCircle + '<a id="p3-3" class="pawn-image pawns-filter-green r_0 c_9"></a>';
		//for white
		for (let i = 1 ;i<11; i++){
			if(i===1){
				htmlCircle = htmlCircle+ '<a class="homeCircle color-white r_0 c_5"></a>';
				htmlCircle = htmlCircle+ '<a class="homeCircle color-white r_5 c_0"></a>';
				htmlCircle = htmlCircle+ '<a class="homeCircle color-white r_10 c_5"></a>';
				htmlCircle = htmlCircle+ '<a class="homeCircle color-white r_5 c_10"></a>';
			}
			if (i === 5) { continue; }
			htmlCircle = htmlCircle+ '<a class="homeCircle color-white r_'+i+' c_4"></a>';
			htmlCircle = htmlCircle+ '<a class="homeCircle color-white r_'+(11-i-1)+' c_6"></a>';
			if (i >= 4 && i <= 6 ) { continue;}
			htmlCircle = htmlCircle+ '<a class="homeCircle color-white r_4 c_'+(11-i-1)+'"></a>';
			htmlCircle = htmlCircle+ '<a class="homeCircle color-white r_6 c_'+(i)+'"></a>';
		}

		htmlCircle = htmlCircle + '<a class="line-v w-140px margin-t-20px r_0 c_4"></a>';
		htmlCircle = htmlCircle + '<a class="line-v w-140px margin-t-20px r_10 c_4"></a>';
		htmlCircle = htmlCircle + '<a class="line-v w-260px margin-t-20px r_4 c_0"></a>';
		htmlCircle = htmlCircle + '<a class="line-v w-260px margin-t-20px r_4 c_6"></a>';
		htmlCircle = htmlCircle + '<a class="line-v w-260px margin-t-20px r_6 c_0"></a>';
		htmlCircle = htmlCircle + '<a class="line-v w-260px margin-t-20px r_6 c_6"></a>';
		htmlCircle = htmlCircle + '<a class="line-h h-140px margin-l-20px  r_6 c_0"></a>';
		htmlCircle = htmlCircle + '<a class="line-h h-140px margin-l-20px  r_6 c_10"></a>';
		htmlCircle = htmlCircle + '<a class="line-h h-260px margin-l-20px  r_4 c_4"></a>';
		htmlCircle = htmlCircle + '<a class="line-h h-260px margin-l-20px  r_4 c_6"></a>';
		htmlCircle = htmlCircle + '<a class="line-h h-260px margin-l-20px  r_10 c_4"></a>';
		htmlCircle = htmlCircle + '<a class="line-h h-260px margin-l-20px  r_10 c_6"></a>';
		document.getElementById('board').innerHTML=htmlCircle;
	}
/*
===========================================
					debug command box
===========================================
*/
	function test(){

	}
	function cmdPrint(newLine) {
		document.getElementById('gs-debug').innerHTML +=  "<a>-> " + newLine + "</a><br>";
	}
	function showCommandHelp(){
		let docShow = document.getElementsByClassName('graphSearch')[0];
		(docShow.style.display === "none") ? docShow.style.display = "block" : docShow.style.display = "none";
	}
