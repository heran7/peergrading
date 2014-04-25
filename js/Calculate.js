var rubric = "";
var studentcount = new Array("1","2","3","4","5","6","7","8","9","10");
var studentresult = new Array("9","8","10","8");
var historypa = new Array("第一次","第二次","第三次");
var studentHR = new Array("7","10","8","9")
var thispa = new Array("第一份","第二份","第三份");
var sample = new Array;
var scorelist = new Array("1","2","3","4","5","6","7","8","9","10");

function creatStudent () {
	
}

function getRubric () {
	if (document.getElementById("SetR").value=="")
	{	
		alert("內容不能為空！");}
	else
	{	rubric = document.getElementById("SetR").value;
		alert("提交成功！");}
}

function delRubric () {
	//document.getElementById("SetR").value='';
	if (confirm("確定要刪除Rubric嗎？"))
	{
		document.getElementById("SetR").value='';
	}
	else
	{}
}

function showRubric () {
	//var x = document.getElementById("showR");  // 找到元素
	if (rubric == "")
	{alert("老師忘記輸入答案了！");}
	else
    {document.getElementById("showR").innerText = rubric;}
    //x.innerText = rubric;
}

function setSample () {	
	var s = new Array;
	s[0]=Math.floor(Math.random()*3+1);  //產生1-3的隨機數
	s[1]=Math.floor(Math.random()*3+4);  //產生4-6的隨機數
	s[2]=Math.floor(Math.random()*3+7);

	sample = s;
}
