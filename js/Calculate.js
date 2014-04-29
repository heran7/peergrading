
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
	
	/*s[0]=Math.floor(Math.random()*3+1);  //產生1-3的隨機數
	s[1]=Math.floor(Math.random()*3+4);  //產生4-6的隨機數
	s[2]=Math.floor(Math.random()*3+7);*/

	var p=Math.floor(studentcount.length/3);
	var q=studentcount.length%3;
	//alert(p);
	s[0]=Math.floor(Math.random()*p+1);  //產生1-3的隨機數
	s[1]=Math.floor(Math.random()*p+p+1);  //產生4-6的隨機數
	s[2]=Math.floor(Math.random()*(p+q)+p*2+1);
	
	sample = s;
}

function firstassign(studentid) {
	var temp = studentid;
	//studnetcount[studentid-1] = new Array; 
	
	for (var i=0; i<6; i++){
		if(temp <= studentcount.length)
		{
			thispa[i] = temp+1;
			//studentcount[studentid-1][i] = temp+1;
		}
		else 
		{
			temp = temp-studentcount.length;
			thispa[i] = temp+1;
			//studentcount[studentid-1][i] = temp+1;
		}
		temp += Math.floor(studentcount.length/6);
		//thispa[i] = studentcount[studentid-1][i];
	}
}

function secondassign (studentid) {
	var temp = studentid;
	var i=0;
	var j=0;
	var k=3;
	var highcount = 2;
	var middlecount = 2;
	var lowcount = 2;
	var p = Math.floor(studentcount.length/3);
	var q = p*2;
	//alert(q);
	
	while ( 1 )
	{	
		if ( j < sg[k].length )
		{
			//if ( q < sg[k][j] && sg[k][j]<= studentcount.length) alert(sg[k][j]);
			if ( sg[k][j] <= p && highcount > 0)
			{
				thispa[i] = sg[k][j];
				highcount--;
				i++;
			}
			else if ( p < sg[k][j] && sg[k][j] <= q && middlecount > 0 ) 
			{
				thispa[i] = sg[k][j];
				middlecount--;
				i++;
				//alert("m" + sg[k][j] + " " + middlecount);
			}
			else if ( q < sg[k][j] && sg[k][j] <= studentcount.length && lowcount > 0 ) 
			{
				thispa[i] = sg[k][j];
				lowcount--;
				i++;
				//alert("l " + sg[k][j] + " " + lowcount);
			}
			j++;
		}
		else
		{
			k--;
			j=0;
		}
		if ( highcount == 0 && middlecount == 0 && lowcount == 0 )
		break;
	}
}
