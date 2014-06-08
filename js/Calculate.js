function getstudenttemp (order) {
	var temp;
	for (var k=0; k<studentcount; k++){
		if (order == studentdata[k].studentID)
		{	
			temp = k;//alert(k);
		}
	}
	return temp;	
}


//記錄教師設置的Rubric
function getRubric () {
	if (document.getElementById("SetR").value=="")
	{	
		alert("內容不能為空！");
	}
	else
	{	classdata[round].rubric = document.getElementById("SetR").value;
		alert("提交成功！");
		if (round == 0)
		{
			if (studentdata[0].assignment[round].pastudent == "")
				firstassign();
			if (classdata[round].sample == "")
				setSample();
		}
		else
		{
			if (studentdata[0].assignment[round].pastudent == "")
				secondassign();
			if (classdata[round].sample == "")
				setSample();
		}
	}
}

//刪除輸入的Rubric
function delRubric () {
	//document.getElementById("SetR").value='';
	if (confirm("確定要刪除Rubric嗎？"))
	{
		document.getElementById("SetR").value='';
	}
	else
	{}
}

//將教師輸入的Rubric提供學生查看
function showRubric () {
	//var x = document.getElementById("showR");  // 找到元素
	document.getElementById("showR").style.display = "";

	if (classdata[round].rubric == "")
	{alert("老師忘記輸入答案了！");}
	else
    {document.getElementById("showR").innerText = classdata[round].rubric;}
    //x.innerText = rubric;
}

//選擇評量範例
function setSample () {	
	var s = new Array;
	var temp = new Array;
	var sortea = new Array;
	var sortscore = new Array;
	var p=Math.floor(studentcount/3);
	var q=studentcount%3;

	if (round == 0)
	{
		for (var i=0; i < studentcount; i++) {
			sortea[i] = new Array;
			sortea[i][0] = studentdata[i].studentID;
		 	sortea[i][1] = studentdata[i].exattitude;
		}
		sortea.sort(function(x,y) { return y[1] - x[1] });//ea降序排列

		temp[0]=Math.floor(Math.random()*p);  //在高分群隨機選擇一份作業
		temp[1]=Math.floor(Math.random()*p+p);  //在中分群隨機選擇一份作業
		temp[2]=Math.floor(Math.random()*(p+q)+p*2);  //在低分群隨機選擇一份作業

		classdata[round].sample[0] = sortea[temp[0]][0];
		classdata[round].sample[1] = sortea[temp[1]][0];
		classdata[round].sample[2] = sortea[temp[2]][0];	
	}
	else
	{
		for (var i=0; i < studentcount; i++) {
			sortscore[i] = new Array;
			sortscore[i][0] = studentdata[i].studentID;
		 	sortscore[i][1] = studentdata[i].assignment[round-1].result;
		}
		sortscore.sort(function(x,y) { return y[1] - x[1] });//ea降序排列
		//alert(sortscore);	

		temp[0]=Math.floor(Math.random()*p);  //在高分群隨機選擇一份作業
		temp[1]=Math.floor(Math.random()*p+p);  //在中分群隨機選擇一份作業
		temp[2]=Math.floor(Math.random()*(p+q)+p*2);  //在低分群隨機選擇一份作業

		classdata[round].sample[0] = sortscore[temp[0]][0];
		classdata[round].sample[1] = sortscore[temp[1]][0];
		classdata[round].sample[2] = sortscore[temp[2]][0];				
	}

	//alert(classdata[round].sample);
}

//第一階段，選擇待評量作業
function firstassign() {
	var tpa;

	for (var k=0; k<studentcount; k++)
	{
		tpa = k + 1;
		for (var i=0; i<6; i++){
			if(tpa<=(studentcount-1))
			{
				studentdata[k].assignment[0].pastudent[i] = studentdata[tpa].studentID;
				//showtpa[i] = studentdata[tpa].studentID;
			}
			else 
			{
				tpa = tpa - studentcount;
				studentdata[k].assignment[0].pastudent[i] = studentdata[tpa].studentID;
				//showtpa[i] = studentdata[tpa].studentID;
			}
			tpa += Math.floor(studentcount/6);
		}
		//alert(studentdata[k].assignment[0].pastudent);
	}

	//alert(showtpa);
}

//計算每位同學在討論版中的 互動信息
function dbinteraction () {
	var temp2;

	for (var k=0; k<studentcount; k++)
	{
		for (var i=0; i<studentcount; i++)
		{
			if (i != k)
			{
				if (i<k)
					studentdata[i].influence[k-1] += studentdata[k].dbinformation.post;
				else
					studentdata[i].influence[k] =+ studentdata[k].dbinformation.post;
			}
		}

		for (var i=0; i<studentdata[k].dbinformation.follow.length; i++)
		{
			temp2 = getstudenttemp(studentdata[k].dbinformation.follow[i]);
			if (temp2<k)
				studentdata[k].influence[temp2] = studentdata[k].influence[temp2] + 3;
			else
				studentdata[k].influence[temp2-1] = studentdata[k].influence[temp2-1] + 3;
		}

		for (var i=0; i<studentdata[k].dbinformation.vote.length; i++)
		{
			temp2 = getstudenttemp(studentdata[k].dbinformation.vote[i]);
			if (temp2<k)
				studentdata[k].influence[temp2] = studentdata[k].influence[temp2] + 1;
			else
				studentdata[k].influence[temp2-1] = studentdata[k].influence[temp2-1] + 1;
		}
		//alert(studentdata[0].influence);
		for (var i=0; i<studentdata[k].dbinformation.reply.length; i++)
		{
			temp2 = getstudenttemp(studentdata[k].dbinformation.reply[i]);
			if (temp2<k)
			{	
				studentdata[k].influence[temp2] = studentdata[k].influence[temp2] + 2;
				studentdata[temp2].influence[k-1] = studentdata[temp2].influence[k-1] + 1;
			}
			else
			{
				studentdata[k].influence[temp2-1] = studentdata[k].influence[temp2-1] + 2;
				studentdata[temp2].influence[k] = studentdata[temp2].influence[k] + 1;
			}
		}

	}
	/*for (var k=0; k<studentcount; k++)
	{
		alert(k + "+" + studentdata[k].influence);
	}*/

}

//分群，建立每位同學的Social Graph,kmeans
function kmeans( arrayToProcess, Clusters )
{
 	var Groups = new Array();
 	var Centroids = new Array();
  	var oldCentroids = new Array();
  	var changed = false;

  	// initialise group arrays
  	for( initGroups=0; initGroups < Clusters; initGroups++ )
  	{
    	Groups[initGroups] = new Array();
  	}  

 	 // pick initial centroids
  	initialCentroids=Math.round( arrayToProcess.length/(Clusters+1) );  

  	for( i=0; i < Clusters; i++ )
  	{
    	Centroids[i]=arrayToProcess[ (initialCentroids*(i+1)) ];
  	}

 	do{
    	for( j=0; j < Clusters; j++ )
		{
	 		Groups[j] = [];
		}
    	changed=false;
		for( i=0; i < arrayToProcess.length; i++ )
		{
	  		Distance=-1;
	  		oldDistance=-1;

	 	  	for( j=0; j < Clusters; j++ )
		  	{
	        	distance = Math.abs( Centroids[j]-arrayToProcess[i] );	

				if ( oldDistance==-1 )
				{
					oldDistance = distance;
					newGroup = j;
				}
				else if ( distance <= oldDistance )
				{
					newGroup = j;
					oldDistance = distance;
				}
		  	}	

		  	Groups[newGroup].push( arrayToProcess[i] );	  
		}

    	oldCentroids=Centroids;

	    for ( j=0; j < Clusters; j++ )
		{
	    	total=0;
		 	 newCentroid=0;

		 	 for( i=0; i < Groups[j].length; i++ )
		  	{
		    	total+=Groups[j][i];
		  	} 

		  	newCentroid=total/Groups[newGroup].length;  
		  	Centroids[j]=newCentroid;
		}

    	for( j=0; j < Clusters; j++ )
		{
	  		if ( Centroids[j]!=oldCentroids[j] )
	  		{
	    		changed=true;
	  		}
		}

  	}
  	while( changed==true );

  	return Groups;
  	//alert(Groups);
}

function socialgraph () {
	var nowl = 0;
	var itemp = new Array;
	var km = new Array;

	for (var i=0; i < studentcount; i++) {
		itemp = studentdata[i].influence;
		km = kmeans(itemp,groupcount);
		km.sort(function(x,y) { return y[0] - x[0] });

		//alert(km[0]+"+"+km[1]+"+"+km[2]+"+"+km[3]);
		for (var j=0; j<studentdata[i].influence.length; j++) 
		{
			for (var n=0; n<groupcount; n++) 
			{
				for (var m=0; m<km[n].length; m++) 
				{
					if (studentdata[i].influence[j] == km[n][m])
					{
						nowl = studentdata[i].socialgraph[n].length;
						if (i<=j)
							{
								studentdata[i].socialgraph[n][nowl] = studentdata[j+1].studentID;
								break;
							}
						else
							{
								studentdata[i].socialgraph[n][nowl] = studentdata[j].studentID;
								break;
							}
					}
				}
			}
		}
		//alert(studentdata[i].socialgraph[0]+"+"+studentdata[i].socialgraph[1]+"+"+studentdata[i].socialgraph[2]+"+"+studentdata[i].socialgraph[3]);
	}
}


//第二階段，選擇待評量作業
function secondassign () {
	dbinteraction();
	socialgraph();

	var temp;
	var said;

	for (var i=0; i < studentcount; i++) {
		ordersg[i] = new Array;
		ordersg[i][0] = studentdata[i].studentID;
		ordersg[i][1] = studentdata[i].socialgraph[0].length;
	}
	ordersg.sort(function(x,y) { return y[1] - x[1] });  //距離為2的人數多少降序排列


	for (var k=0; k<studentcount; k++)
	{
		said = ordersg[k][0];
		secondpa(said);

		//判斷是否第一輪結束，要將所有同學恢復可供選擇狀態
		/*temp = getstudenttemp(said);
		if (studentdata[temp].assignment[round].pastudent.length < 6)
		{
			studentdata[temp].assignment[round].pastudent.length = 0;
			for (var i=0; i<studentcount; i++)
			{
				if (studentdata[i].assignment[round].selectedcount == 0)
				studentdata[i].assignment[round].selectedcount = 1;
			}
			secondpa(said);		
		}*/
		//alert(k+"+"+studentdata[k].assignment[round].pastudent);
	}	
}

function secondpa (studentid) {
	var temp;
	var sum = 0;
	var highcount = 2;
	var middlecount = 2;
	var lowcount = 2;	

	temp = getstudenttemp(studentid);
	//按上週成績降序排列
	for (var i=0; i<studentcount; i++){
		orderscore[i] = new Array;
		orderscore[i][0] = studentdata[i].studentID;
		orderscore[i][1] = studentdata[i].assignment[round-1].result;
	}	
	orderscore.sort(function(x,y) { return y[1] - x[1] });

	var p = Math.floor(studentcount/3);
	var p1 = orderscore[p][1];
	p = p * 2;
	var p2 = orderscore[p][1];

	/*var myscore = studentdata[temp].assignment[round-1].result;
	
	if (myscore>p1)
		highcount = 1;
	else if (myscore>p2 && myscore<=p1)
		middlecount = 1;
	else
		lowcount = 1;*/


	var i=checki=groupcount-1;
	var j=0;
	var temp2;
	var score;
	var nowl;

	var thisid;
	var sg = new Array;

	while ( 1 )
	{	
		if (checki == i)
		{
			sg = [];
			//將Social Graph的每一層倒出，并按照selectedcount降序排列
			for (var m=0; m<studentdata[temp].socialgraph[i].length; m++)
			{
				sg[m] = [];
				sg[m][0] = studentdata[temp].socialgraph[i][m];
				thisid = getstudenttemp(sg[m][0]);
				sg[m][1] = studentdata[thisid].assignment[round].selectedcount;
			}
			sg.sort(function(x,y) { return y[1] - x[1] });
			checki--;
			//alert(sg);
		}
		//alert(sg.length);
		if ( j < sg.length )
		{
			//找出該id學生的成績處於高中低那一群
			for (var k=0; k<studentcount; k++){
				if (sg[j][0] == studentdata[k].studentID)
				{	
					temp2 = k;
				}
				if (sg[j][0] == orderscore[k][0])
				{
					score = orderscore[k][1];
				}
			}			
			//alert(temp2 +"+"+ score);
			//分配
			if ( score > p1 && highcount > 0 && studentdata[temp2].assignment[round].selectedcount != 0)
			{
				nowl = studentdata[temp].assignment[round].pastudent.length;
				studentdata[temp].assignment[round].pastudent[nowl] = studentdata[temp].socialgraph[i][j];
				studentdata[temp2].assignment[round].selectedcount--;
				highcount--;
				//alert("h" + highcount);
			}
			else if ( p2 < score && score <= p1 && middlecount > 0 && studentdata[temp2].assignment[round].selectedcount != 0) 
			{
				nowl = studentdata[temp].assignment[round].pastudent.length;
				studentdata[temp].assignment[round].pastudent[nowl] = studentdata[temp].socialgraph[i][j];
				studentdata[temp2].assignment[round].selectedcount--;
				middlecount--;
				//alert("m" + middlecount);
			}
			else if ( score <= p2 && lowcount > 0 && studentdata[temp2].assignment[round].selectedcount != 0) 
			{
				nowl = studentdata[temp].assignment[round].pastudent.length;
				studentdata[temp].assignment[round].pastudent[nowl] = studentdata[temp].socialgraph[i][j];
				studentdata[temp2].assignment[round].selectedcount--;				
				lowcount--;
				//alert("l" + lowcount);
			}
			j++;
			//alert(j);
		}
		else
		{
			i--;
			j=0;
		}

		if ( highcount == 0 && middlecount == 0 && lowcount == 0 || i < 0)
		break;
	}

	/*var test = new Array;
	for (var i=0; i<studentcount; i++)
	{
		test[i] = studentdata[i].assignment[round].selectedcount;
	}
	alert(temp+"+"+test);*/
}

//將評量成績存入數據庫中
function setpascore (studentid) {
	var ps = document.getElementById("scorelist2").value;
	var ts = document.getElementById("thispa").value;
	var nowlength = 0;
	var temp = getstudenttemp(studentid);
	//alert(studentdata[temp].assignment[round].pastudent);

	if (ts == "第1份"){
		var pa1 = studentdata[temp].assignment[round].pastudent[0];
		var temp2 = getstudenttemp(pa1);
		nowlength = studentdata[temp2].assignment[round].receivescore.length;
		studentdata[temp2].assignment[round].receivescore[nowlength] = ps;
		studentdata[temp].assignment[round].pascore[0] = ps;
		//alert(temp2+"+"+studentdata[temp2].assignment[round].receivescore);
	}
	else if (ts == "第2份") {
		var pa2 = studentdata[temp].assignment[round].pastudent[1];
		var temp2 = getstudenttemp(pa2);
		nowlength = studentdata[temp2].assignment[round].receivescore.length;
		studentdata[temp2].assignment[round].receivescore[nowlength] = ps;
		studentdata[temp].assignment[round].pascore[1] = ps;
		//alert(temp2);
	}
	else if (ts == "第3份") {
		var pa3 = studentdata[temp].assignment[round].pastudent[2];
		var temp2 = getstudenttemp(pa3);
		nowlength = studentdata[temp2].assignment[round].receivescore.length;
		studentdata[temp2].assignment[round].receivescore[nowlength] = ps;
		studentdata[temp].assignment[round].pascore[2] = ps;
	}
	else if (ts == "第4份"){
		var pa4 = studentdata[temp].assignment[round].pastudent[3];
		var temp2 = getstudenttemp(pa4);
		nowlength = studentdata[temp2].assignment[round].receivescore.length;
		studentdata[temp2].assignment[round].receivescore[nowlength] = ps;
		studentdata[temp].assignment[round].pascore[3] = ps;
	}
	else if (ts == "第5份") {
		var pa5 = studentdata[temp].assignment[round].pastudent[4];
		var temp2 = getstudenttemp(pa5);
		nowlength = studentdata[temp2].assignment[round].receivescore.length;
		studentdata[temp2].assignment[round].receivescore[nowlength] = ps;
		studentdata[temp].assignment[round].pascore[4] = ps;
	}
	else if (ts == "第6份") {
		var pa6 = studentdata[temp].assignment[round].pastudent[5];
		var temp2 = getstudenttemp(pa6);
		nowlength = studentdata[temp2].assignment[round].receivescore.length;
		studentdata[temp2].assignment[round].receivescore[nowlength] = ps;
		studentdata[temp].assignment[round].pascore[5] = ps;
	}
	else if (ts == "第7份") {
		var pa7 = studentdata[temp].assignment[round].pastudent[6];
		var temp2 = getstudenttemp(pa7);
		nowlength = studentdata[temp2].assignment[round].receivescore.length;
		studentdata[temp2].assignment[round].receivescore[nowlength] = ps;
		studentdata[temp].assignment[round].pascore[6] = ps;
	}
	else{
		document.getElementById("showThispa").style.display="none";
	}
	alert("提交成功！");

	//如果全部評量結束，開始計算成績，可顯示成績，開啟下一輪
	var next = new Boolean();
	next = true;

	for (var i=0; i<studentcount; i++)
	{
		for (var j=0; j<studentdata[i].assignment[round].pastudent.length; j++)
		{
			if (studentdata[i].assignment[round].pascore[j] == null)
			{
				next = false;
				break;
			}
		}
	}

	var sid;
	if (next)
	{
		//計算每個學生本輪的成績
		for (var i=0; i<studentcount; i++)
		{
			sid = studentdata[i].studentID;
			calculatescore(sid);
		}

		round = round + 1;
		for (var i=0; i<studentcount; i++)
		{
			studentdata[i].assignment[round] = new Array;
			studentdata[i].assignment[round].assignmentID = round+1;
			studentdata[i].assignment[round].selectedcount = 6;
		}

		classdata[round] = new Array;
		classdata[round].assignmentID = round + 1;

	}
	//alert(round);

}

//計算每份作業的成績
function calculatescore (studentid) {
	var temp;
	var sum = 0;
	var pascore = 0;
	var maxscore = 0;
	var minscore = 0;

	temp = getstudenttemp(studentid);

	for (var i=0; i<studentdata[temp].assignment[round].receivescore.length; i++)
	{
		sum += studentdata[temp].assignment[round].receivescore[i];
	}

	maxscore = get_max_num(studentdata[temp].assignment[round].receivescore);
	minscore = get_min_num(studentdata[temp].assignment[round].receivescore);
	if ((studentdata[temp].assignment[round].receivescore.length - 2) > 0)
	{
		pascore = sum/studentdata[temp].assignment[round].receivescore.length;
	}
	else
	{
		pascore = (sum - maxscore - minscore)/(studentdata[temp].assignment[round].receivescore.length - 2);
	}
	pascore.toFixed(2);  //保留小數點后兩位

	//alert(pascore);
	studentdata[temp].assignment[round].result = pascore;

}


//获取数组最大值
function get_max_num(arrs){
    for(var i=0; i<arrs.length; i++){
        var m = arrs[0];
        if(m<arrs[i]){
            m=arrs[i]
        }
    }
    return m;
}

//获取数组最小值
function get_min_num(arrs){
    for(var i=0; i<arrs.length; i++){
        var n = arrs[0];
        if(n>arrs[i]){
            n=arrs[i];
        }
    }
    return n;
}


//降序排列
function sortNumber (a,b) {
	return b - a;
	//function(x,y){return x[1]-y[1]};  按數組的第二個元素排序
}