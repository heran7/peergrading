// JavaScript Documenvt
var id = 0;
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
	id = 1;
	changeLeftdiv ("divleftTeacher");
}

function leftSL(){//after student login,left frame view
	id = 0;
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

function mainDefual () {//main welcome div
	changeMaindiv("divDefaulMain");
}

function mainSetR () {//teacher set rubric div
	changeMaindiv("divmainSetR");
}

function mainSampleA () {//teacher sample assessment	
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

function getSampleChange(){//select one sample,show the sample
	var selected = document.getElementById("sample");
	if (selected.value == "未選中")
	{document.getElementById("showSample").style.display = "none";}
	else
	{	document.getElementById("showSample").style.display = "";
		document.getElementById("showSample").innerText = ("第" + selected.value + "名學生的作業為：");}

	var button = document.createElement("input"); //创建一个input对象（提示框按钮）  
    button.setAttribute("type", "button");
    button.setAttribute("value", "提交成績");
	//o.attachEvent("onclick",);        //为控件添加事件
	document.getElementById("showSample").apppendChild(button);             //添加控件到窗体中
}

function mainReviewR () {
	changeMaindiv("divmainReviewR");
}

function mainResultG () {//teacher see all students result,student see themself
	var s = document.getElementById("studentR");
	for(var i=s.options.length-1; i>=0; i--)
	{
		s.options[i].remove();
	}
	s.add(new Option("未選中","未選中"));
	for (var i = 0; i < studentcount.length; i++) 
	{
		s.add(new Option(studentcount[i], studentcount[i]));			
	}
	changeMaindiv("divmainResultG");
}

function getstudentChange () {
	
}

function mainPeerA () {//student peer assessment
	var s = document.getElementById("historypa");
	for(var i=s.options.length-1; i>=0; i--)
	{
		s.options[i].remove();
	}
	s.add(new Option("未選中","未選中"));
	for (var i = 0; i < historypa.length; i++) 
	{
		s.add(new Option(historypa[i], historypa[i]));			
	}
	
	var t = document.getElementById("thispa");
	for(var i=t.options.length-1; i>=0; i--)
	{
		t.options[i].remove();
	}
	t.add(new Option("未選中","未選中"));
	for (var i = 0; i < thispa.length; i++) 
	{
		t.add(new Option(thispa[i], thispa[i]));			
	}
	changeMaindiv("divmainPeerA");
}

function gethistoryChange(){//select one peer history,show the history
	var selected = document.getElementById("historypa");
	if (selected.value == "未選中")
	{document.getElementById("showHistory").style.display = "none";}
	else
	{	document.getElementById("showHistory").style.display = "";
		document.getElementById("showHistory").innerText = (selected.value + "評量的記錄為：");}
}

function getThispaChange(){//select this week peer assessment,show the assessment
	var selected = document.getElementById("thispa");
	if (selected.value == "未選中")
	{document.getElementById("showThispa").style.display = "none";}
	else
	{	document.getElementById("showThispa").style.display = "";
		document.getElementById("showThispa").innerText = (selected.value + "待評量的作業為：");}
}

function mainQueryR () {//student see this week result
	changeMaindiv("divmainQueryR");
}

