function getstudentid (order) {
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
	studentdata[studentid-1].studentID = studentid;
	
}

//記錄教師設置的Rubric
function getRubric () {
	if (document.getElementById("SetR").value=="")
	{	
		alert("內容不能為空！");}
	else
	{	rubric = document.getElementById("SetR").value;
		alert("提交成功！");}
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
	
	if (rubric == "")
	{alert("老師忘記輸入答案了！");}
	else
    {document.getElementById("showR").innerText = rubric;}
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
	
	s[0]=sortea[temp[0]][0];
	s[1]=sortea[temp[1]][0];
	s[2]=sortea[temp[2]][0];
	
	sample = s;
}

//第一階段，選擇待評量作業
function firstassign(studentid) {
	var temp;
	var tpa;
	//studentdata.sort(function(a,b) { return a.exattitude < b.exattitude ? 1 : -1;} );  //ea降序排列
	
	for (var k=0; k<studentcount; k++){
		if (studentid == studentdata[k].studentID)
		{	
			temp = k;
			tpa = k+1;
			//alert(tpa);	
		}
	}
	
	for (var i=0; i<6; i++){
		if(tpa<=(studentcount-1))
		{
			studentdata[temp].assignment[0].pastudent[i] = studentdata[tpa].studentID;
			showtpa[i] = studentdata[tpa].studentID;
		}
		else 
		{
			tpa = tpa - studentcount;
			studentdata[temp].assignment[0].pastudent[i] = studentdata[tpa].studentID;
			showtpa[i] = studentdata[tpa].studentID;
		}
		tpa += Math.floor(studentcount/6);
	}
	//alert(showtpa);
}

//計算每位同學在討論版中的 互動信息
function dbinteraction (studentid) {
	var temp;
	var post;  //po文數量
	var follow = new Array;   //follow文章作者的id
	var vote = new Array;   //vote文章作者的id
	var reply = new Array;   //reply文章作者的id
	//var influence = new Array;
	
	for (var k=0; k<studentcount; k++){
		if (studentid == studentdata[k].studentID)
		{	
			temp = k;
		}
	}
	
	for (var i=0; i<post.length; i++)
	{
		for (var j=0; j<studentcount; j++)
		{
			//if()
			studentdata[j].influence[studentid] += 1;
		}
	}
	for (var i=0; i<follow.length; i++)
	{
		//studentdata[temp].influence[follow[i]的id] += 3;
	}
	for (var i=0; i<vote.length; i++)
	{
		//influence[studentid][vote[i]] += 1;
	}
	for (var i=0; i<reply.length; i++)
	{
		//influence[studentid][reply[i]] += 2;
		//influence[reply[i]][studentid] += 1;
	}
	
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
	  		oldDistance=-1

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
					newGroup=j;
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
}



//第二階段，選擇待評量作業
function secondassign (studentid) {
	var temp = studentid;
	var i=0;
	var j=0;
	var k=3;
	var highcount = 2;
	var middlecount = 2;
	var lowcount = 2;
	var p = Math.floor(studentcount/3);
	
	var selectedcount = 6;  //每份作業只能被評量6次
	
	while ( 1 )
	{	
		if ( j < sg[k].length )
		{
			if ( sg[k][j] <= p && highcount > 0 && selectedcount != 0)
			{
				thispa[i] = sg[k][j];
				highcount--;
				i++;
			}
			else if ( p < sg[k][j] && sg[k][j] <= (p*2) && middlecount > 0 && selectedcount != 0) 
			{
				thispa[i] = sg[k][j];
				middlecount--;
				i++;
				//alert("m" + sg[k][j] + " " + middlecount);
			}
			else if ( (p*2) < sg[k][j] && sg[k][j] <= studentcount.length && lowcount > 0 && selectedcount != 0) 
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
	
	for (var k=0; k<studentcount; k++){
		if (studentid == studentdata[k].studentID)
		{	
			temp = k;
		}
	}
	
	for (var i=0; i<studentdata[temp].assignment[round].pascore.length; i++)
	{
		sum += studentdata[temp].assignment[round].pascore[i];
	}
	maxscore = get_max_num(studentdata[temp].assignment[round].pascore);
	minscore = get_min_num(studentdata[temp].assignment[round].pascore);
	pascore = (sum - maxscore - minscore)/(studentdata[temp].assignment[round].pascore.length - 2);
	pascore.toFixed(2);  //保留小數點后兩位
	
	//alert(pascore);
	studentdata[temp].assignment[round].result[0] = pascore;
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
