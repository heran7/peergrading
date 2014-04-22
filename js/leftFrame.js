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
	document.getElementById("divmainResultG").style.display = "none";
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
	
	var s = document.getElementById("sample");
	
	for(var i=s.options.length-1; i>=0; i--)
	{
		s.options[i].remove();
	}
	s.add(new Option("未選中","未選中"));
	for (var i = 0; i < sample.length; i++) 
	{
		s.add(new Option(sample[i], sample[i]));			
	}
	
	changeMaindiv("divmainSampleA");
}

function mainReviewR () {
	changeMaindiv("divmainReviewR");
}

function mainResultG () {
	changeMaindiv("divmainResultG");
}

function mainPeerA () {
	changeMaindiv("divmainPeerA");
}

function mainQueryR () {
	changeMaindiv("divmainQueryR");
}

