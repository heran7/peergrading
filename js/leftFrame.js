// JavaScript Documenvt
function changeLeftdiv (divname) {
  	document.getElementById("divDefaulLeft").style.display = "none";
	document.getElementById("divleftTeacher").style.display = "none";
	document.getElementById("divleftStudent").style.display = "none";
	document.getElementById(divname).style.display = "";
}


function leftDefaul() {//default left frame view
	mainDefual();
  	changeLeftdiv ("divDefaulLeft");
}

function leftTL(){//after teacher login,left frame view 
	changeLeftdiv ("divleftTeacher");
}

function leftSL(){//after student login,left frame view
	changeLeftdiv ("divleftStudent");
}


function changeMaindiv (divname) {
  	document.getElementById("divDefaulMain").style.display = "none";
	document.getElementById("divmainSetR").style.display = "none";
	document.getElementById("divmainSampleA").style.display = "none";
	document.getElementById("divmainReviewR").style.display = "none";
	document.getElementById("divmainPeerA").style.display = "none";
	document.getElementById("divmainQueryR").style.display = "none";
	document.getElementById("help").style.display = "none";
	//document.getElementById("divleftStudent").style.display = "none";
	document.getElementById(divname).style.display = "";
}

function help () {
 	changeMaindiv("help");
}

function mainDefual () {
	changeMaindiv("divDefaulMain");
}

function mainSetR () {
	changeMaindiv("divmainSetR");
}

function mainSampleA () {
	changeMaindiv("divmainSampleA");
}

function mainReviewR () {
	changeMaindiv("divmainReviewR");
}

function mainPeerA () {
	changeMaindiv("divmainPeerA");
}

function mainQueryR () {
	changeMaindiv("divmainQueryR");
}

