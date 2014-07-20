function changeMaindiv (divname) {
	document.getElementById("divDefaulMain").style.display = "none";
	document.getElementById("divmainPeerA").style.display = "none";
	document.getElementById("divmainQueryR").style.display = "none";
	document.getElementById("divmainPAHistory").style.display = "none";
	document.getElementById(divname).style.display = "";
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