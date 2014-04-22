var rubric;
var studentcount = new Array("1","2","3","4","5","6","7","8","9","10");
var sample = new Array;

function getRubric () {
	rubric = document.getElementById("SetR").value;
	//r = r.replace('\r\n','<br/>');
	//document.getElementById("SetR").value = r
	//rubric=r;
	//alert(rubric);
	alert("提交成功！");
}

function showRubric () {
	x = document.getElementById("showR");  // 找到元素
    x.innerHTML = rubric;
}

function setSample () {	
	var s = new Array;
	s[0]=Math.floor(Math.random()*3+1);  //產生1-3的隨機數
	s[1]=Math.floor(Math.random()*3+4);  //產生4-6的隨機數
	s[2]=Math.floor(Math.random()*3+7);

	sample = s;
}
