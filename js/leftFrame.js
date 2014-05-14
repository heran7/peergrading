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
	mainDefual ();
	changeLeftdiv ("divleftTeacher");
}

function leftSL(){//after student login,left frame view
	id = 0;
	mainDefual ();
	changeLeftdiv ("divleftStudent");
}


function changeMaindiv (divname) {
  	document.getElementById("divDefaulMain").style.display = "none";
	document.getElementById("divmainSetR").style.display = "none";
	document.getElementById("divmainSampleA").style.display = "none";
	document.getElementById("divmainSocialG").style.display = "none";
	document.getElementById("divmainResultG").style.display = "none";
	document.getElementById("divmainPeerA").style.display = "none";
	document.getElementById("divmainQueryR").style.display = "none";
	document.getElementById("help").style.display = "none";
	document.getElementById("divmainPAHistory").style.display = "none";
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
	
	var sl = document.getElementById("scorelist");
	for(var i=sl.options.length-1; i>=0; i--)
	{
		sl.options[i].remove();
	}
	sl.add(new Option("未選中","未選中"));
	for (var i = 0; i < scorelist.length; i++) 
	{
		sl.add(new Option(scorelist[i], scorelist[i]));			
	}
	
	document.getElementById("showSample").style.display="none";
	changeMaindiv("divmainSampleA");
}

function getSampleChange(){//select one sample,show the sample
	var selected = document.getElementById("sample");
	if (selected.value == "未選中")
	{document.getElementById("showSample").style.display = "none";}
	else
	{	document.getElementById("showSample").style.display = "";
		document.getElementById("s").innerText = ("第" + selected.value + "名學生的作業為：");
		
		var button111 = document.getElementById("score"); //创建一个input对象（提示框按钮）
		//botton = document.createElement("input");  
	    button111.setAttribute("type", "button");
	    button111.setAttribute("value", "提交成績");
		document.getElementById("s").apppendChild(button111);  //添加控件到窗体中
	}
}

function getSampleScore () {
	var s = document.getElementById("scorelist").value;
	var id = document.getElementById("sample").value;
	var temp;
	
	for (var k=0; k<studentcount; k++){
		if (id == studentdata[k].studentID)
		{	
			temp = k;
		}
	}
		
	studentdata[temp].assignment[round].result[1] = s;
	alert("提交成功！");
	//alert(studentdata[id].assignment[round].result[1] + "," + studentdata[id].studentID);
}

function getscore () {
	var thisscore = document.getElementById("scorelist");
}

function mainSocialG () {
	var s = document.getElementById("studentG");
	for(var i=s.options.length-1; i>=0; i--)
	{
		s.options[i].remove();
	}
	s.add(new Option("未選中","未選中"));
	for (var i = 0; i < studentcount; i++) 
	{
		s.add(new Option(studentdata[i].studentID, studentdata[i].studentID));			
	}
	
	document.getElementById("showSG").style.display="none";	
	changeMaindiv("divmainSocialG");
}

function getstudentChangeG () {
	var selected = document.getElementById("studentG").value;
	var temp;
	
	for (var k=0; k<studentcount; k++){
		if (selected == studentdata[k].studentID)
		{	
			temp = k;
		}
	}
	
	for(var i=table4.rows.length-1;i>=0;i--)
    {
        table4.deleteRow(i);
    }
	
	if (selected.value == "未選中")
	{document.getElementById("showSG").style.display = "none";}
	else
	{	document.getElementById("showSG").style.display = "";
		
		if(table4.rows.length > 0){
	        var nodes = table.childNodes[0].childNodes; 
	        for(var i=nodes.length-1;nodes.length>0;i--) 
	          { 
	            table.childNodes[0].removeChild(nodes[i]); 
	          }     
         }		
		
        if (studentdata[temp].socialgraph == 0) {
            alert("該生還未有社交關係！");
        }
        else {
			var table = document.getElementById("table4");
			table.setAttribute("border","1");
			table.setAttribute("width","60%");
			var tbody = document.createElement("tbody");
			table.appendChild(tbody);
	
			//创建第一行
			tbody.insertRow(0);
			tbody.rows[0].insertCell(0);
			tbody.rows[0].cells[0].appendChild( document.createTextNode("距離") );
			tbody.rows[0].insertCell(1);
			tbody.rows[0].cells[1].appendChild( document.createTextNode("學生ID") );
	
			//创建第i行
			for (var i = 1; i <= studentdata[temp].socialgraph.length; i++) {
				tbody.insertRow(i);
				tbody.rows[i].insertCell(0);
				tbody.rows[i].cells[0].appendChild( document.createTextNode("距離為" + (i+1) + "的學生") );
				tbody.rows[i].insertCell(1);
				var s = studentdata[temp].socialgraph[i-1];
				tbody.rows[i].cells[1].appendChild( document.createTextNode(s) );
			}
			document.getElementById("showSG").appendChild(table);
		}		
	}
}

function mainResultG () {//teacher see all students result,student see themself
	var s = document.getElementById("studentR");
	for(var i=s.options.length-1; i>=0; i--)
	{
		s.options[i].remove();
	}
	s.add(new Option("未選中","未選中"));
	for (var i = 0; i < studentcount; i++) 
	{
		s.add(new Option(studentdata[i].studentID, studentdata[i].studentID));			
	}
	
	document.getElementById("showStudentR").style.display="none";
	changeMaindiv("divmainResultG");
}

function getstudentChange () {
	var selected = document.getElementById("studentR").value;
	var temp;
	
	for (var k=0; k<studentcount; k++){
		if (selected == studentdata[k].studentID)
		{	
			temp = k;
			//alert(temp);
		}
	}
	
	for(var i=table1.rows.length-1;i>=0;i--)
    {
        table1.deleteRow(i);
    }
	
	calculatescore (1);
	
	if (selected.value == "未選中")
	{document.getElementById("showStudentR").style.display = "none";}
	else
	{	document.getElementById("showStudentR").style.display = "";
		//document.getElementById('DIV1').innerHTML="";
		
		if(table1.rows.length > 0){
	        var nodes = table.childNodes[0].childNodes; 
	        for(var i=nodes.length-1;nodes.length>0;i--) 
	          { 
	            table.childNodes[0].removeChild(nodes[i]); 
	          }     
         }		
		
		//document.getElementById("showStudentR").innerHTML = ("第" + selected.value + "名學生的歷史成績為：");
		//var table = document.createElement("table1");
        if (studentdata[temp].assignment[0].result[0] == null) {
            alert("該生還未有成績！");
        }
        else {
			var table = document.getElementById("table1");
			table.setAttribute("border","1");
			table.setAttribute("width","60%");
			var tbody = document.createElement("tbody");
			table.appendChild(tbody);
	
			//创建第一行
			tbody.insertRow(0);
			tbody.rows[0].insertCell(0);
			tbody.rows[0].cells[0].appendChild( document.createTextNode("時間") );
			tbody.rows[0].insertCell(1);
			tbody.rows[0].cells[1].appendChild( document.createTextNode("成績") );
	
			//创建第i行
			for (var i = 1; i <= studentdata[temp].assignment.length; i++) {
				tbody.insertRow(i);
				tbody.rows[i].insertCell(0);
				tbody.rows[i].cells[0].appendChild( document.createTextNode("第" + i + "次") );
				tbody.rows[i].insertCell(1);
				var s = studentdata[temp].assignment[i-1].result[0];
				tbody.rows[i].cells[1].appendChild( document.createTextNode(s) );
			}
			document.getElementById("showStudentR").appendChild(table);
		}		
	}
}


function mainPeerA () {//student peer assessment
	firstassign(7);
	//secondassign(1);
	
	var ts = document.getElementById("thissample");
	for(var i=ts.options.length-1; i>=0; i--)
	{
		ts.options[i].remove();
	}
	ts.add(new Option("未選中","未選中"));
	for (var i = 0; i < three.length; i++) 
	{
		ts.add(new Option(three[i], three[i]));			
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
	
	var sl = document.getElementById("scorelist2");
	for(var i=sl.options.length-1; i>=0; i--)
	{
		sl.options[i].remove();
	}
	sl.add(new Option("未選中","未選中"));
	for (var i = 0; i < scorelist.length; i++) 
	{
		sl.add(new Option(scorelist[i], scorelist[i]));			
	}
	
	document.getElementById("showR").style.display="none";
	document.getElementById("sampletos").style.display="none";
	document.getElementById("showThisSample").style.display="none";
	document.getElementById("showThispa").style.display="none";
	changeMaindiv("divmainPeerA");
}

function getThisSChange () {
	document.getElementById("sampletos").style.display = "";
	document.getElementById("showThisSample").style.display = "";
	var ts = document.getElementById("thissample").value;
	
	studentdata.sort(function(a,b) { return a.studentID > b.studentID ? 1 : -1;} );  //ID升序排列
	if (ts == "第一份"){
		var s1 = sample[0] - 1;
		sampletos.innerText = ("第一份範例的成績為：" + studentdata[s1].assignment[round].result[1]);
	}
	else if (ts == "第二份") {
		var s2 = sample[1] - 1;
		sampletos.innerText = ("第二份範例的成績為：" + studentdata[s2].assignment[round].result[1]);
	}
	else if (ts == "第三份") {
		var s3 = sample[2] - 1;
		sampletos.innerText = ("第三份範例的成績為：" + studentdata[s3].assignment[round].result[1]);
	}
	else {
		document.getElementById("sampletos").style.display="none";
		document.getElementById("showThisSample").style.display="none";
	}
	//studentdata[id].assignment[round].result[1]
}

function getThispaChange (){//select this week peer assessment,show the assessment
	
	var selected = document.getElementById("thispa");
	if (selected.value == "未選中")
	{document.getElementById("showThispa").style.display = "none";}
	else
	{	document.getElementById("showThispa").style.display = "";
		document.getElementById("ss").innerText = (selected.value + "的作業得分為：");
		
		var button111 = document.getElementById("sscore"); //创建一个input对象（提示框按钮）
		//botton = document.createElement("input");  
	    button111.setAttribute("type", "button");
	    button111.setAttribute("value", "提交成績");
		//button111.attachEvent("onclick",);        //为控件添加事件
		document.getElementById("ss").apppendChild(button111);  //添加控件到窗体中
	}
	
}


function mainQueryR () {//student see this week result
	getSH();
	changeMaindiv("divmainQueryR");
}

function getSH () {
	//document.getElementById("showSHR").style.display = "";
	var id = 1;
	var temp;

	for (var k=0; k<studentcount; k++){
		if (id == studentdata[k].studentID)
		{	
			temp = k;
		}
	}

	for(var i=table2.rows.length-1;i>=0;i--)
    {
        table2.deleteRow(i);
    }

	calculatescore (id);

	if(table2.rows.length > 0){
        var nodes = table.childNodes[0].childNodes; 
        for(var i=nodes.length-1;nodes.length>0;i--) 
          { 
            table.childNodes[0].removeChild(nodes[i]); 
          }     
     }
    
	//alert(studentdata[temp].assignment[round].result[0]);
    if (studentdata[temp].assignment[round].result[0] == null) {
        alert("還未有成績！");
    }
    else {
		var table = document.getElementById("table2");
		table.setAttribute("border","1");
		table.setAttribute("width","60%");
		var tbody = document.createElement("tbody");
		table.appendChild(tbody);

		//创建第一行
		tbody.insertRow(0);
		tbody.rows[0].insertCell(0);
		tbody.rows[0].cells[0].appendChild( document.createTextNode("時間") );
		tbody.rows[0].insertCell(1);
		tbody.rows[0].cells[1].appendChild( document.createTextNode("成績") );

		//创建第i行
		for (var i = 1; i <= studentdata[temp].assignment.length; i++) {
			tbody.insertRow(i);
			tbody.rows[i].insertCell(0);
			tbody.rows[i].cells[0].appendChild( document.createTextNode("第" + i + "次") );
			tbody.rows[i].insertCell(1);
			var s = studentdata[temp].assignment[i-1].result[0];
			tbody.rows[i].cells[1].appendChild( document.createTextNode(s) );
		}
		document.getElementById("showSHR").appendChild(table);
	}		
	
}

function mainPeerAH () {
	round =2;
	if (round == 0)
	{
		document.getElementById("sglist").style.display="none";
		document.getElementById("nosg").style.display="";
	}
	else
	{
		var s = document.getElementById("PAH");
		for(var i=s.options.length-1; i>=0; i--)
		{
			s.options[i].remove();
		}
		s.add(new Option("未選中","未選中"));
		for (var i = 0; i < round; i++) 
		{
			var history = ("第" + (i+1) + "次");
			s.add(new Option(history, history));			
		}		
	}
	
	document.getElementById("showPAH").style.display="none";
	changeMaindiv("divmainPAHistory");
}

function getPAHChange() {
	var selected = document.getElementById("PAH");
	var temp = 0;

	if (selected.value == "未選中")
	{document.getElementById("showPAH").style.display = "none";}
	else
	{	
		document.getElementById("showPAH").style.display = "";
		//document.getElementById("showPAH").innerText = (selected.value + "評量的記錄為：");
		
		var length = selected.options.length - 1;
		for (var i=0; i<length; i++)
		{
			var hist = ("第" + (i+1) + "次");
			if (selected.value == hist)
			{
				for(var k=table3.rows.length-1;k>=0;k--)
			    {
			        table3.deleteRow(k);
			    }

				if(table3.rows.length > 0){
			        var nodes = table.childNodes[0].childNodes; 
			        for(var i=nodes.length-1;nodes.length>0;i--) 
			          { 
			            table.childNodes[0].removeChild(nodes[i]); 
			          }     
			    }
			    
				var table = document.getElementById("table3");
				table.setAttribute("border","1");
				table.setAttribute("width","60%");
				var tbody = document.createElement("tbody");
				table.appendChild(tbody);
		
				//创建第一行
				tbody.insertRow(0);
				tbody.rows[0].insertCell(0);
				tbody.rows[0].cells[0].appendChild( document.createTextNode("時間") );
				tbody.rows[0].insertCell(1);
				tbody.rows[0].cells[1].appendChild( document.createTextNode("所有得分") );
				tbody.rows[0].insertCell(2);
				tbody.rows[0].cells[2].appendChild( document.createTextNode("最終成績") );
		
				//创建第i行
				for (var i = 1; i <= studentdata[temp].assignment.length; i++) {
					tbody.insertRow(i);
					tbody.rows[i].insertCell(0);
					tbody.rows[i].cells[0].appendChild( document.createTextNode("第" + i + "次") );
					tbody.rows[i].insertCell(1);
					var s1 = studentdata[temp].assignment[i-1].pascore;
					tbody.rows[i].cells[1].appendChild( document.createTextNode(s1) );
					tbody.rows[i].insertCell(2);
					var s2 = studentdata[temp].assignment[i-1].result[0];
					tbody.rows[i].cells[2].appendChild( document.createTextNode(s2) );
				}
				document.getElementById("showPAH").appendChild(table);
			    
			}
		}
	}
}

