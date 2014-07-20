function changeMaindiv (divname) {
  	document.getElementById("divDefaulMain").style.display = "none";
	document.getElementById("divmainSetR").style.display = "none";
	document.getElementById("divmainSampleA").style.display = "none";
	document.getElementById("divmainSocialG").style.display = "none";
	document.getElementById("divmainResultG").style.display = "none";
	document.getElementById(divname).style.display = "";
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
		var y = oy0 + 200;

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
