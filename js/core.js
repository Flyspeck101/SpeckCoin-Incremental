// CORE FUNCTIONS
class Core {
  
  static notify(text) {
    const digitsHex = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];
    document.getElementById("notify").innerHTML = text;
    startFadeDec(255, 0, 0, 255, 255, 255, 256, "notify");
  }
  static hideById(id) {
    document.getElementById(id).style.display = "none";
  }
  static showById(id) {
    document.getElementById(id).style.display = "block";
  }
  static randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  static romanize(num) {
    var lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},roman = '',i;
    for ( i in lookup ) {
      while ( num >= lookup[i] ) {
        roman += i;
        num -= lookup[i];
      }
    }
    return roman;
  }

  static saveGame(data) {
    localStorage.setItem("local_game_saved",true);
    localStorage.setItem("coins1", data.game.coins.amounts);
    localStorage.setItem("coins2", data.game.coins.basePrices);
    localStorage.setItem("diamonds1", data.game.diamonds.amounts);
    localStorage.setItem("diamonds2", data.game.diamonds.basePrices);
    localStorage.setItem("protons1", data.game.protons.amounts);
    localStorage.setItem("protons2", data.game.protons.basePrices);
    localStorage.setItem("unlockedCoins", data.unlockedCoins);
    localStorage.setItem("unlockedDiamonds", data.unlockedDiamonds);
    localStorage.setItem("unlockedProtons", data.unlockedProtons);
  }

  static loadGameTo(data) {
    function parseBool(val) { return val === true || val === "true" }
    function stna(string) {
      var array = [];
      string.split(",").forEach(function(currentValue) {array.push(Number(currentValue));});
      return array;
    }
    function stba(string) {
      var array = [];
      string.split(",").forEach(function(currentValue) {parseBool(array.push(currentValue));});
      return array;
    }
    if (localStorage.getItem("local_game_saved") != "true") {
      console.log("No save was found, starting new game...");
      return false;
    }
    data.game.coins.amounts = stna(localStorage.getItem("coins1"));
    data.game.coins.basePrices = stna(localStorage.getItem("coins2"));
    data.game.diamonds.amounts = stna(localStorage.getItem("diamonds1"));
    data.game.diamonds.basePrices = stna(localStorage.getItem("diamonds2"));
    data.game.protons.amounts = stna(localStorage.getItem("protons1"));
    data.game.protons.basePrices = stna(localStorage.getItem("protons2"));
    data.unlockedCoins = stba(localStorage.getItem("unlockedCoins"));
    data.unlockedDiamonds = stba(localStorage.getItem("unlockedDiamonds"));
    data.unlockedProtons = stba(localStorage.getItem("unlockedProtons"));
    return true;
  }

}
var numSteps=0;
var startingRed=0;
var startingGreen=0;
var startingBlue=0;
var endingRed=0;
var endingGreen=0;
var endingBlue=0;
var deltaRed=0;
var deltaGreen=0;
var deltaBlue=0;
var currentRed=0;
var currentGreen=0;
var currentBlue=0;
var currentStep=0;
var timerID=0;

////////////////////////////////////////
// fade timer
////////////////////////////////////////
function startFadeDec(startR, startG, startB, 
   endR, endG, endB, nSteps, id)
{
//alert("sf");
	// need to parse, otherwise it thinks it's not a number
  	currentRed=startingRed=parseInt(startR, 10);
  	currentGreen=startingGreen=parseInt(startG, 10);
  	currentBlue=startingBlue=parseInt(startB, 10);
  	endingRed=parseInt(endR, 10);
  	endingGreen=parseInt(endG, 10);
  	endingBlue=parseInt(endB, 10);
  	numSteps=parseInt(nSteps, 10);
  	deltaRed=(endingRed-startingRed)/numSteps;
  	deltaGreen=(endingGreen-startingGreen)/numSteps;
	deltaBlue=(endingBlue-startingBlue)/numSteps;
	currentStep=0;
	
/*	alert("cr="+currentRed+" cg="+currentGreen+" cb="+currentBlue);
	alert("dr="+deltaRed+" dg="+deltaGreen+" db="+deltaBlue);
	alert("er="+endingRed+" eg="+endingGreen+" eb="+endingBlue);
*/	
  	fade(id);
}
  
////////////////////////////////////////
// fade timer
////////////////////////////////////////
function fade(id)
{
//	alert(color);
//  	alert(document.bgColor);
  	
  	currentStep++;
  	// if not done yet, change the backround
  	if (currentStep<=numSteps)
  	{
		// convert to hex	
		var hexRed=decToHex(currentRed);
		var hexGreen=decToHex(currentGreen);
		var hexBlue=decToHex(currentBlue);
	
		var color="#"+hexRed+""+hexGreen+""+hexBlue+"";
//	alert(color);
		
	  	document.getElementById("notify").style.backgroundColor=color;
//  	alert(document.bgColor);

		// increment color
		currentRed+=deltaRed;
		currentGreen+=deltaGreen;
		currentBlue+=deltaBlue;
//	alert("cr="+currentRed+" cg="+currentGreen+" cb="+currentBlue);
		
	  	timerID=setTimeout("fade()", 1); // sets timer so that this function will
                  		   		      // be called every 10 miliseconds
   }
}

////////////////////////////////////////
// convert decimal to hexadecimal number
////////////////////////////////////////
function decToHex(decNum)
{
//alert ("1");
	decNum=Math.floor(decNum);
	var decString=""+decNum;
	// make sure the number is valid
	for (var i=0; i<decString.length; i++)
	{
//alert ("2");
	
		if (decString.charAt(i)>='0' && decString.charAt(i)<='9')
		{
		}
		else
		{
			alert(decString+" is not a valid decimal number because it contains "+decString.charAt(i));
 			return decNum;
		}
	}
	var result=decNum;
	var remainder="";
	// use string because math operation won't work with hex alphabet
	var hexNum="";

	var hexAlphabet=new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F");
//	alert("converting "+decNum+" to "+hexNum);
	while (result>0)
	{
		result=Math.floor(decNum/16);
		remainder=decNum%16;
		decNum=result;

/*		if (remainder>=10)
		{
			// use double quotes because Netscape 3 will give error if using single quote
			if (remainder==10)
				remainder="A";
			if (remainder==11)
				remainder="B";
			if (remainder==12)
				remainder="C";
			if (remainder==13)
				remainder="D";
			if (remainder==14)
				remainder="E";
			if (remainder==15)
				remainder="F";
		}*/
		// just append the next remainder to the beginning of the string
		hexNum=""+hexAlphabet[remainder]+""+hexNum;
	};
//	alert("converting "+decNum+" to "+hexNum);
	// make sure to have at least 2 digits
	if (hexNum.length==1)
		hexNum="0"+hexNum;
	else if (hexNum.length==0)
		hexNum="00";
	return hexNum;
}   
