var rubric;
var studentcount = new Array("1","2","3","4","5","6","7","8","9","10");
var historypa = new Array("第一次","第二次","第三次");
var thispa = new Array("第一份","第二份","第三份");
var sample = new Array;

function getRubric () {
	r = document.getElementById("SetR").value;
	r = r.replace(/\r\n/g,'<br/>');
	//document.getElementById("SetR").value = r
	rubric=r;
	//alert(rubric);
	alert("提交成功！");
}

function showRubric () {
	x = document.getElementById("showR");  // 找到元素
	if (document.getElementById("showR").innerText == "")
	{alert("老師忘記輸入答案了！");}
	else
    {x.innerText = rubric;}
}

function setSample () {	
	var s = new Array;
	s[0]=Math.floor(Math.random()*3+1);  //產生1-3的隨機數
	s[1]=Math.floor(Math.random()*3+4);  //產生4-6的隨機數
	s[2]=Math.floor(Math.random()*3+7);

	sample = s;
}
