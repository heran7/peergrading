//初始化學生信息
function initializestudent (studentid,name,ea,interaction){
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
	if (rubric == "")
	{alert("老師忘記輸入答案了！");}
	else
    {document.getElementById("showR").innerText = rubric;}
    //x.innerText = rubric;
}

//選擇評量範例
function setSample () {	
	var s = new Array;
	studentdata.sort(function(a,b) { return a.exattitude < b.exattitude ? 1 : -1;} );  //降序排列
	var p=Math.floor(studentcount/3);
	var q=studentcount%3;
	 
	s[0]=Math.floor(Math.random()*p+1);  //在高分群隨機選擇一份作業
	s[1]=Math.floor(Math.random()*p+p+1);  //在中分群隨機選擇一份作業
	s[2]=Math.floor(Math.random()*(p+q)+p*2+1);  //在低分群隨機選擇一份作業
	
	sample = s;
}

//第一階段，選擇待評量作業
function firstassign(studentid) {
	var temp = studentid;
	//studnetcount = ea.sort(sortNumber);  //按照ea降序排列后進行分配
	
	for (var i=0; i<6; i++){
		if(temp <= studentcount.length)
		{
			thispa[i] = temp+1;
			//studentdata[temp].assignment[0].pastudent[i] = studentid;
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

//計算每位同學在討論版中的 互動信息
function dbinteraction (studentid) {
	var post;
	var follow = new Array;  //follow文章作者的id
	var vote = new Array;
	var reply = new Array;
	var influence = new Array;
	
	for (var i=0; i<post; i++)
	{
		for (var j=0; j<student.length; j++)
		{
			influence[studentid][j] += 1;
		}
	}
	for (var i=0; i<follow.length; i++)
	{
		influence[studentid][follow[i]] += 3;
	}
	for (var i=0; i<vote.length; i++)
	{
		influence[studentid][vote[i]] += 1;
	}
	for (var i=0; i<reply.length; i++)
	{
		influence[studentid][reply[i]] += 2;
		influence[reply[i]][studentid] += 1;
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
	var p = Math.floor(studentcount.length/3);
	
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

//計算每份作業的成績
function calculatescore (scorearr) {
	var s = scorearr;
	var sum = 0;
	var pascore = 0;
	var maxscore = 0;
	var minscore = 0;
	
	for (var i=0; i<s.length; i++)
	{
		sum += s[i];
	}
	maxscore = get_max_num(s);
	minscore = get_min_num(s);
	pascore = (sum - maxscore - minscore)/(s.length - 2);
	pascore.toFixed(2);  //保留小數點后兩位
	
	return pascore;
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


/*function groupbyinteractive (studentid) {

	var p = Math.floor(studentcount.length/3);
	interactive.sort(sortNumber);
	
}*/

//降序排列
function sortNumber (a,b) {
	return b - a;
	//function(x,y){return x[1]-y[1]};  按數組的第二個元素排序
}

/*参数定义：
    datas 要排序的数组，其中每个元素是一个JSON对象{}
    field 要排序的元素的字段名，将使用该字段进行排序
    type  排序类型，如果为"down"则为降序排序,否则升序
*/
function SortData(datas, field, type) {
    SortFun.field = field;
    datas.sort(SortFun);
    if (type == "down") {
        datas.reverse();
    }
}

function SortFun(data1, data2) {
    if (data1[SortFun.field] > data2[SortFun.field]) {
        return 1;
    }
    else if (data1[SortFun.field] < data2[SortFun.field]) {
        return -1;
    }
    return 0;
}

