// JavaScript Documenvt
function changeLeftdiv (divname) {
  	document.getElementById("divDefaulLeft").style.display = "none";
	document.getElementById("divleftTeacher").style.display = "none";
	document.getElementById("divleftStudent").style.display = "none";
	document.getElementById("divlogin").style.display = "none";
	document.getElementById(divname).style.display = "";
}

function login () {
	changeLeftdiv("divlogin");
}

function leftDefaul() {//default left frame view
	mainDefual();
  	changeLeftdiv ("divDefaulLeft");
}

function leftTL(){//after teacher login,left frame view 
	//id = 1;
	mainDefual ();
	changeLeftdiv ("divleftTeacher");
}

function leftSL(){//after student login,left frame view
	//id = 0;
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
 	document.getElementById("helpcontext").innerHTML = ("<h1>Peer Grading System Help</h1>");
 	document.getElementById("helpcontext").innerHTML = ("<h1>Peer Grading System Help</h1><p>本系統利用了學生線上討論版中的互動內容，以及學生每週的成績為學生分配每週待評量的作業。本系統也會為學生提供教師範例作為同儕評量的參考，以增加學生的評量經驗和準確度。與此同時，為了使學生在同儕評量過程中可實現協助學習的活動。每位學生皆會評量到各個成績階層之學生的作業。通過觀看其他層級同學的作業，對自己掌握的知識進行查漏補缺。</p>");
}

function mainDefual () {//main welcome div
	changeMaindiv("divDefaulMain");
}

function mainSetR () {//teacher set rubric div
	changeMaindiv("divmainSetR");
}

function mainSampleA () {//teacher sample assessment	
	if (classdata[round].rubric == "")
	{
		alert("請先設置本週評量Rubric！");
	}
	else
	{
		var s = document.getElementById("sample");
		for(var i=s.options.length-1; i>=0; i--)
		{
			s.options[i].remove();
		}
		s.add(new Option("未選中","未選中"));
		for (var i = 0; i < classdata[round].sample.length; i++) 
		{
			var temp = classdata[round].sample[i];
			s.add(new Option(temp, temp));			
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
		
		var cs = document.getElementById("studentlist");
		for(var i=cs.options.length-1; i>=0; i--)
		{
			cs.options[i].remove();
		}
		cs.add(new Option("未選中","未選中"));
		for (var i = 0; i < studentcount; i++) 
		{
			cs.add(new Option(studentdata[i].studentID, studentdata[i].studentID));	
		}
		
		document.getElementById("showSample").style.display="none";
		document.getElementById("rsample").innerText = (" 推薦本週評量範例為："+ classdata[round].sample);
		changeMaindiv("divmainSampleA");		
		
	}
	
}

function getSampleChange(){//select one sample,show the sample
	var selected = document.getElementById("sample");
	if (selected.value == "未選中")
	{document.getElementById("showSample").style.display = "none";}
	else
	{	document.getElementById("showSample").style.display = "";
		document.getElementById("s").innerText = ("第" + selected.value + "名學生的作業為：");
		
		var sa = document.getElementById("studentlist");
		for (var i = 0; i < sa.options.length; i++) 
		{	
			if (sa.options[i].value == "未選中")
				sa.options[i].selected=true;		
		}
		
		
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
	
	for (var k=0; k<classdata[round].sample.length; k++){
		if (id == classdata[round].sample[k])
		{	
			temp = k;
		}
	}
	
	classdata[round].samplescore[temp] = s;
		
	//studentdata[temp].assignment[round].result[1] = s;
	alert("提交成功！");
}

function ChangeSample () {
	
	var id = document.getElementById("sample").value;
	var newid = document.getElementById("studentlist").value;
	var temp;
	
	for (var k=0; k<classdata[round].sample.length; k++){
		if (id == classdata[round].sample[k])
		{	
			temp = k;
		}
	}
	
	classdata[round].sample[temp] = newid;
	classdata[round].samplescore[temp] = null;
	
	document.getElementById("s").innerText = ("第" + newid + "名學生的作業為：");
	document.getElementById("rsample").innerText = (" 推薦本週評量範例為："+ classdata[round].sample);
	
	var s = document.getElementById("sample");
	for(var i=s.options.length-1; i>=0; i--)
	{
		s.options[i].remove();
	}
	s.add(new Option("未選中","未選中"));
	for (var i = 0; i < classdata[round].sample.length; i++) 
	{
		var temp = classdata[round].sample[i];
		s.add(new Option(temp, temp));		
	}
	for (var i=0; i<classdata[round].sample.length+1; i++)
	{
		if (s.options[i].value == newid)
		s.options[i].selected=true;	
	}
	
	
	alert("修改評量範例成功！");
	//alert(classdata[round].sample);
}

/*function getscore () {
	var thisscore = document.getElementById("scorelist");
}*/

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
	
	temp = getstudenttemp(selected);
	
	if (selected == "未選中")
	{document.getElementById("showSG").style.display = "none";}
	else
	{	
		document.getElementById("showSG").style.display = "";
		var color = new Array("#0000CD", "#4B0082","#228B22","#000000");
		
		var c=document.getElementById("sg");
		var cxt=c.getContext("2d");
		cxt.clearRect(0,0,500,400);
		
		var ox0 = (c.width/2);
		var oy0 = 25; //圆心 		
		
		var x;
		var y = oy0 + 230;
			
		for (var i=studentdata[temp].socialgraph.length-1; i>=0; i--)
		{
			var count = studentdata[temp].socialgraph[i].length;
			var move = Math.floor(count/2);
			x = ox0 - move * 50 + 20;
		
			for (var j=0; j<studentdata[temp].socialgraph[i].length; j++)
			{//alert(studentdata[temp].socialgraph[i].length);
				
				var nowid = studentdata[temp].socialgraph[i][j];
				var pointtemp = getstudenttemp(nowid);
				var inf0;
				
				if (pointtemp > temp)
					inf0 = studentdata[temp].influence[pointtemp-1];
				else
					inf0 = studentdata[temp].influence[pointtemp];
					
				
				if (inf0 != 0)
				{
					cxt.beginPath();
					cxt.moveTo(ox0,oy0);
					cxt.lineTo(x,y);
					cxt.strokeStyle = color[i];
					cxt.stroke();	
				}

				
				cxt.beginPath();
				cxt.fillStyle=color[i];
				//cxt.beginPath();
				cxt.arc(x,y,10,0,Math.PI*2,true);
				cxt.closePath();
				cxt.fill();
				
				cxt.fillStyle = "#ffffff";
				cxt.font="12px Arial";
				var tt = studentdata[temp].socialgraph[i][j];
				cxt.fillText(tt,x-4,y+5);				
				
				x = x+50;
			}
			//x = 50;
			y = y - 50;
			
			cxt.fillStyle = color[i];  
	        cxt.fillRect(30, 30 + 20 * i, 15, 8);  
	        //ctx.moveTo(50, 30 + 20 * i);  
	        cxt.font = '10px';    //30像素  
	        cxt.fillStyle = "#000000";  
	        var percent = "社交距離為" + (i+2);  
	        cxt.fillText(percent, 50, 33 + 23 * i);
			
		}
		
		cxt.fillStyle="#B22222";
		cxt.beginPath();
		cxt.arc(ox0,oy0,15,0,Math.PI*2,true);
		cxt.closePath();
		cxt.fill();		
		
	}	
	
	
}

/*function getstudentChangeG () {
	var selected = document.getElementById("studentG").value;
	var temp;
	
	temp = getstudenttemp(selected);
	
	for(var i=table4.rows.length-1;i>=0;i--)
    {
        table4.deleteRow(i);
    }
	
	if (selected == "未選中")
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
        	document.getElementById("showSG").style.display = "none";
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
}*/

function mainResultG () {//teacher see all students result,student see themself

	showstudentresult();
	changeMaindiv("divmainResultG");
}

function showstudentresult () {

	for(var i=table1.rows.length-1;i>=0;i--)
    {
        table1.deleteRow(i);
    }
	

	if (round == 0)
	{
		document.getElementById("showStudentR").style.display = "none";
		alert("還未有學生成績！");
	}
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
		
		var table = document.getElementById("table1");
		table.setAttribute("border","1");
		table.setAttribute("width","60%");
		var tbody = document.createElement("tbody");
		table.appendChild(tbody);
		
		//创建第一行
		tbody.insertRow(0);
		tbody.rows[0].insertCell(0);
		tbody.rows[0].cells[0].appendChild( document.createTextNode("學號") );
		for (var i=1; i<round+1; i++)
		{
			tbody.rows[0].insertCell(i);
			tbody.rows[0].cells[i].appendChild( document.createTextNode("第"+i+"次") );
		}

	
		//创建第i行
		for (var i = 1; i <= studentcount; i++) {
			
			tbody.insertRow(i);
			tbody.rows[i].insertCell(0);
			var id = studentdata[i-1].studentID;
			tbody.rows[i].cells[0].appendChild( document.createTextNode(id) );
			
			for (var j=1; j<round+1; j++)
			{
				tbody.rows[i].insertCell(j);
				var s = studentdata[i-1].assignment[j-1].result;
				tbody.rows[i].cells[j].appendChild( document.createTextNode(s) );
			}
		}
		
		document.getElementById("showStudentR").appendChild(table);
			//alert("！");
	}
}


function mainPeerA (studentid) {//student peer assessment
	var temp = getstudenttemp(studentid);
	
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
	if (classdata[round].rubric == "")
	{
		for(var i=t.options.length-1; i>=0; i--)
		{
			t.options[i].remove();
		}
		t.add(new Option("未選中","未選中"));
		alert("同儕評量尚未開始！");
		//changeMaindiv("divDefaulMain");	
		
	}
	else
	{
		for(var i=t.options.length-1; i>=0; i--)
		{
			t.options[i].remove();
		}
		t.add(new Option("未選中","未選中"));
		for (var i = 0; i < studentdata[temp].assignment[round].pastudent.length; i++) 
		{
			var pa = ("第" + (i+1) + "份");
			t.add(new Option(pa, pa));			
		}
		
		document.getElementById("showR").style.display="none";
		document.getElementById("sampletos").style.display="none";
		document.getElementById("showThisSample").style.display="none";
		document.getElementById("showThispa").style.display="none";
		changeMaindiv("divmainPeerA");		
			
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
	
}

function getThisSChange () {
	document.getElementById("sampletos").style.display = "";
	document.getElementById("showThisSample").style.display = "";
	var ts = document.getElementById("thissample").value;
	
	//studentdata.sort(function(a,b) { return a.studentID > b.studentID ? 1 : -1;} );  //ID升序排列
	if (ts == "第一份"){
		if (classdata[round].samplescore[0] == null)
		{
			sampletos.innerText = ("  教師尚未對本份範例進行評量");
			document.getElementById("showThisSample").style.display = "none";
		}
		else
		{
			sampletos.innerText = ("  第一份範例的成績為：" + classdata[round].samplescore[0]);
		}
	}
	else if (ts == "第二份") {
		if (classdata[round].samplescore[1] == null)
		{
			sampletos.innerText = ("  教師尚未對本份範例進行評量");
			document.getElementById("showThisSample").style.display = "none";
		}
		else
		{
			sampletos.innerText = ("  第二份範例的成績為：" + classdata[round].samplescore[1]);
		}	
	}
	else if (ts == "第三份") {
		if (classdata[round].samplescore[2] == null)
		{
			sampletos.innerText = ("  教師尚未對本份範例進行評量");
			document.getElementById("showThisSample").style.display = "none";
		}
		else
		{
			sampletos.innerText = ("  第三份範例的成績為：" + classdata[round].samplescore[2]);
		}
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
		document.getElementById("ss").innerText = (selected.value + "的作業為：");
		
		var button111 = document.getElementById("sscore"); //创建一个input对象（提示框按钮）
	    button111.setAttribute("type", "button");
	    button111.setAttribute("value", "提交成績");
		//button111.attachEvent("onclick",);        //为控件添加事件
		document.getElementById("ss").apppendChild(button111);  //添加控件到窗体中
	}
	
}


function mainQueryR (studentid) {//student see this week result
	getSH(studentid);
	changeMaindiv("divmainQueryR");
}

function getSH (studentid) {
	//document.getElementById("showSHR").style.display = "";
	var temp = getstudenttemp(studentid);

	for(var i=table2.rows.length-1;i>=0;i--)
    {
        table2.deleteRow(i);
    }

	if(table2.rows.length > 0){
        var nodes = table.childNodes[0].childNodes; 
        for(var i=nodes.length-1;nodes.length>0;i--) 
          { 
            table.childNodes[0].removeChild(nodes[i]); 
          }     
     }
    
	//alert(studentdata[temp].assignment[round].result[0]);
    if (studentdata[temp].assignment[round].result == 0) {
        alert("本週還未有成績！");
    }

	if (studentdata[temp].assignment[0].result != 0)
	{	
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
			if (studentdata[temp].assignment[i-1].result != 0)
			{
				tbody.insertRow(i);
				tbody.rows[i].insertCell(0);
				tbody.rows[i].cells[0].appendChild( document.createTextNode("第" + i + "次") );
				tbody.rows[i].insertCell(1);
				var s = studentdata[temp].assignment[i-1].result;
				tbody.rows[i].cells[1].appendChild( document.createTextNode(s) );				
			}
		}
		document.getElementById("showSHR").appendChild(table);	
	}
	else
	{
		alert("還未有歷史成績！");
		document.getElementById("showSHR").style.display="none";
	}
	
}

function mainPeerAH () {
	//round = 1;
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
	document.getElementById("history").style.display="none";
	changeMaindiv("divmainPAHistory");
}

function getPAHChange(studentid) {
	var selected = document.getElementById("PAH");
	var temp = getstudenttemp(studentid);	

	if (selected.value == "未選中")
	{
		document.getElementById("showPAH").style.display = "none";
		document.getElementById("history").style.display = "none";
	}
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
				for (var k=table3.rows.length-1; k>=0; k--)
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
				tbody.rows[0].cells[0].appendChild( document.createTextNode("--") );
				tbody.rows[0].insertCell(1);
				tbody.rows[0].cells[1].appendChild( document.createTextNode("我的評分") );
				tbody.rows[0].insertCell(2);
				tbody.rows[0].cells[2].appendChild( document.createTextNode("最終成績") );
				
				//创建第i行
				for (var k=1; k<=studentdata[temp].assignment[i].pastudent.length; k++) {
					
					tbody.insertRow(k);
					tbody.rows[k].insertCell(0);
					tbody.rows[k].cells[0].appendChild( document.createTextNode(k) );
					tbody.rows[k].insertCell(1);
					var s1 = studentdata[temp].assignment[i].pascore[k-1];
					tbody.rows[k].cells[1].appendChild( document.createTextNode(s1) );
					tbody.rows[k].insertCell(2);
					var temp2 = getstudenttemp(studentdata[temp].assignment[i].pastudent[k-1]);
					var s2 = studentdata[temp2].assignment[i].result;
					tbody.rows[k].cells[2].appendChild( document.createTextNode(s2) );
				}			    
			}
			document.getElementById("showPAH").appendChild(table);
			
			
			document.getElementById("history").style.display = "";
			var h = document.getElementById("hselect");
			for(var p=h.options.length-1; p>=0; p--)
			{
				h.options[p].remove();
			}
			h.add(new Option("未選中","未選中"));
			for (var p = 0; p < studentdata[temp].assignment[i].pastudent.length; p++) 
			{
				var history = (p+1);
				h.add(new Option(history, history));			
			}
		}		
	}	
	
}

function gethistoryChange (studentid)
{
	var temp = getstudenttemp(studentid);
	var time = document.getElementById("PAH");
	var selectedpa = document.getElementById("hselect").value;
	
	if (selectedpa == "未選中")
		document.getElementById("historya").style.display = "none";
	else
	{
		document.getElementById("historya").style.display = "";
		document.getElementById("historya").innerText = "第" + selectedpa + "份作業為：";
		
		/*var length = time.options.length - 1;
		for (var i=0; i<length; i++)
		{
			if (selectedpa == (i+1))
			{
				document.getElementById("historya").style.display = "";
				document.getElementById("historya").innerText = "第" + selectedpa + "份作業為：";
			}
		}*/		
	}
}
