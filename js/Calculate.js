function getstudenttemp (order) {
	var temp;
	for (var k=0; k<studentcount; k++){
		if (order == studentdata[k].studentID)
		{	
			temp = k;
		}
	}
	return temp;	
}

//初始化學生信息
function initializestudent (studentid,name,ea,influence){
	
	
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
			firstassign();
		}
		else
		{
			secondassign();
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
	var p=Math.floor(studentcount/3);
	var q=studentcount%3;
	
	for (var i=0; i < studentcount; i++) {
		sortea[i] = new Array;
		sortea[i][0] = studentdata[i].studentID;
	 	sortea[i][1] = studentdata[i].exattitude;
	}
	sortea.sort(function(x,y) { return y[1] - x[1] });//ea降序排列
	//alert(sortea);
	 
	temp[0]=Math.floor(Math.random()*p);  //在高分群隨機選擇一份作業
	temp[1]=Math.floor(Math.random()*p+p);  //在中分群隨機選擇一份作業
	temp[2]=Math.floor(Math.random()*(p+q)+p*2);  //在低分群隨機選擇一份作業
	
	classdata[round].sample[0] = sortea[temp[0]][0];
	classdata[round].sample[1] = sortea[temp[1]][0];
	classdata[round].sample[2] = sortea[temp[2]][0];
	
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
				showtpa[i] = studentdata[tpa].studentID;
			}
			else 
			{
				tpa = tpa - studentcount;
				studentdata[k].assignment[0].pastudent[i] = studentdata[tpa].studentID;
				showtpa[i] = studentdata[tpa].studentID;
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
	var groupcount = 4;
	var nowl = 0;
	var itemp = new Array;
	var km = new Array;

	for (var i=0; i < studentcount; i++) {
		itemp = studentdata[i].influence;
		itemp.sort(function(x,y) { return y - x });
		km = kmeans(itemp,groupcount);
		
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
	}
}


//第二階段，選擇待評量作業
function secondassign () {
	dbinteraction();
	socialgraph();
	
	var temp;
	
	for (var i=0; i < studentcount; i++) {
		ordersg[i] = new Array;
		ordersg[i][0] = studentdata[i].studentID;
		ordersg[i][1] = studentdata[i].socialgraph[0].length;
	}
	ordersg.sort(function(x,y) { return y[1] - x[1] });  //距離為2的人數多少降序排列
	
	
	for (var k=0; k<studentcount; k++)
	{
		var id = ordersg[k][0];
		secondpa(id);
	}	
}

function secondpa (studentid) {
	var temp;
	var highcount = 2;
	var middlecount = 2;
	var lowcount = 2;
	var p = Math.floor(studentcount/3);
	
	for (var k=0; k<studentcount; k++){
		if (studentid == studentdata[k].studentID)
		{	
			temp = k;
		}
	}
	
	for (var i=0; i<studentcount; i++){
		orderscore[i] = new Array;
		orderscore[i][0] = studentdata[i].studentID;
		orderscore[i][1] = studentdata[i].assignment[round-1].result[0];
	}	
	orderscore.sort(function(x,y) { return y[1] - x[1] });  //按上週成績降序排列
	var p1 = orderscore[p][1];
	p = p * 2;
	var p2 = orderscore[p][1];
	
	
	var i=groupcount-1;
	var j=0;
	var temp2;
	var score;
	var nowl;
	while ( 1 )
	{	
		if ( j < studentdata[temp].socialgraph[i].length )
		{	
			//找出該id學生的成績處於高中低那一群
			for (var k=0; k<studentcount; k++){
				if (studentdata[temp].socialgraph[i][j] == studentdata[k].studentID)
				{	
					temp2 = k;
				}
				if (studentdata[temp].socialgraph[i][j] == orderscore[k][0])
				{
					score = orderscore[k][1];
				}
			}			
			
			//分配
			if ( score > p1 && highcount > 0 && studentdata[temp2].assignment[round].selectedcount != 0)
			{
				nowl = studentdata[temp].assignment[round].pastudent.length;
				studentdata[temp].assignment[round].pastudent[nowl] = studentdata[temp].socialgraph[i][j];
				studentdata[temp2].assignment[round].selectedcount--;
				highcount--;
			}
			else if ( p2 < score && score <= p1 && middlecount > 0 && studentdata[temp2].assignment[round].selectedcount != 0) 
			{
				nowl = studentdata[temp].assignment[round].pastudent.length;
				studentdata[temp].assignment[round].pastudent[nowl] = studentdata[temp].socialgraph[i][j];
				studentdata[temp2].assignment[round].selectedcount--;
				middlecount--;
				//alert("m" + sg[k][j] + " " + middlecount);
			}
			else if ( score <= p2 && lowcount > 0 && studentdata[temp2].assignment[round].selectedcount != 0) 
			{
				nowl = studentdata[temp].assignment[round].pastudent.length;
				studentdata[temp].assignment[round].pastudent[nowl] = studentdata[temp].socialgraph[i][j];
				studentdata[temp2].assignment[round].selectedcount--;				
				lowcount--;
				//alert("l " + sg[k][j] + " " + lowcount);
			}
			j++;
		}
		else
		{
			i--;
			j=0;
		}
		
		if ( highcount == 0 && middlecount == 0 && lowcount == 0 )
		break;
	}	
	
}

//將評量成績存入數據庫中
function setpascore () {
	var ps = document.getElementById("scorelist2").value;
	var ts = document.getElementById("thispa").value;
	var nowlength = 0;
	//alert(ts + "," + temp);
	
	if (ts == "第一份"){
		var pa1 = showtpa[0];
		nowlength = studentdata[pa1].assignment[round].pascore.length;
		studentdata[pa1].assignment[round].pascore[nowlength] = ps;
	}
	else if (ts == "第二份") {
		var pa2 = showtpa[1];
		nowlength = studentdata[pa2].assignment[round].pascore.length;
		studentdata[pa2].assignment[round].pascore[nowlength] = ps;
	}
	else if (ts == "第三份") {
		var pa3 = showtpa[2];
		nowlength = studentdata[pa3].assignment[round].pascore.length;
		studentdata[pa3].assignment[round].pascore[nowlength] = ps;
	}
	else if (ts == "第四份"){
		var pa4 = showtpa[3];
		nowlength = studentdata[pa4].assignment[round].pascore.length;
		studentdata[pa4].assignment[round].pascore[nowlength] = ps;
	}
	else if (ts == "第五份") {
		var pa5 = showtpa[4];
		nowlength = studentdata[pa5].assignment[round].pascore.length;
		studentdata[pa5].assignment[round].pascore[nowlength] = ps;
	}
	else if (ts == "第六份") {
		var pa6 = showtpa[5];
		nowlength = studentdata[pa6].assignment[round].pascore.length;
		studentdata[pa6].assignment[round].pascore[nowlength] = ps;
	}
	else if (ts == "第七份") {
		var pa1 = showtpa[6];
		nowlength = studentdata[pa7].assignment[round].pascore.length;
		studentdata[pa7].assignment[round].pascore[nowlength] = ps;
	}
	else{
		document.getElementById("showThispa").style.display="none";
	}
	alert("提交成功！");	
}

//計算每份作業的成績
function calculatescore (studentid) {
	var temp;
	var sum = 0;
	var pascore = 0;
	var maxscore = 0;
	var minscore = 0;
	var paover = new Boolean();
	paover = true;

	temp = getstudenttemp(studentid);
	
	for (var i=0; i<studentdata[temp].assignment[round].pascore.length; i++)
	{
		if (studentdata[temp].assignment[round].pascore[i] == null)
		{
			//alert("尚未收到全部評量成績！");
			paover = false;
			break;
		}
		else 
		{
			sum += studentdata[temp].assignment[round].pascore[i];
		}
	}
	
	if (paover) 
	{
		maxscore = get_max_num(studentdata[temp].assignment[round].pascore);
		minscore = get_min_num(studentdata[temp].assignment[round].pascore);
		pascore = (sum - maxscore - minscore)/(studentdata[temp].assignment[round].pascore.length - 2);
		pascore.toFixed(2);  //保留小數點后兩位
		
		//alert(pascore);
		studentdata[temp].assignment[round].result[0] = pascore;
	}
	else
	{
		
	}
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
