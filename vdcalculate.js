var virtualstudent = 32;
var groupcount2 = 4;
var xxx=1;
var ttt=1;

function getstudentt (order) {
	var temp;
	for (var k=0; k<virtualstudent; k++){
		if (order == virtualdata[k].studentID)
		{	
			temp = k;
		}
	}
	return temp;	
}

function showdb () {
	
	for(var i=ta3.rows.length-1;i>=0;i--)
    {
        ta3.deleteRow(i);
    }
	
	if(ta3.rows.length > 0){
        var nodes = table.childNodes[0].childNodes; 
        for(var i=nodes.length-1;nodes.length>0;i--) 
          { 
            table.childNodes[0].removeChild(nodes[i]); 
          }     
     }		
		

	var table = document.getElementById("ta3");
	table.setAttribute("border","1");
	table.setAttribute("width","60%");
	var tbody = document.createElement("tbody");
	table.appendChild(tbody);

	//创建第一行
	tbody.insertRow(0);
	tbody.rows[0].insertCell(0);
	tbody.rows[0].cells[0].appendChild( document.createTextNode("學生ID") );
	tbody.rows[0].insertCell(1);
	tbody.rows[0].cells[1].appendChild( document.createTextNode("dbinformation") );


	//创建第i行
	for (var i = 1; i <= virtualstudent; i++) {
		tbody.insertRow(i);
		tbody.rows[i].insertCell(0);
		tbody.rows[i].cells[0].appendChild( document.createTextNode(virtualdata[i-1].studentID) );
		tbody.rows[i].insertCell(1);
		var s = virtualdata[i-1].influence;
		tbody.rows[i].cells[1].appendChild( document.createTextNode(s) );

	document.getElementById("dbin").appendChild(table);		
	}
}

function getSG () {
	
	for(var i=ta1.rows.length-1;i>=0;i--)
    {
        ta1.deleteRow(i);
    }
	
	if(ta1.rows.length > 0){
        var nodes = table.childNodes[0].childNodes; 
        for(var i=nodes.length-1;nodes.length>0;i--) 
          { 
            table.childNodes[0].removeChild(nodes[i]); 
          }     
     }		
		

	var table = document.getElementById("ta1");
	table.setAttribute("border","1");
	table.setAttribute("width","60%");
	var tbody = document.createElement("tbody");
	table.appendChild(tbody);

	//创建第一行
	tbody.insertRow(0);
	tbody.rows[0].insertCell(0);
	tbody.rows[0].cells[0].appendChild( document.createTextNode("學生ID") );
	tbody.rows[0].insertCell(1);
	tbody.rows[0].cells[1].appendChild( document.createTextNode("距離2") );
	tbody.rows[0].insertCell(2);
	tbody.rows[0].cells[2].appendChild( document.createTextNode("距離3") );
	tbody.rows[0].insertCell(3);
	tbody.rows[0].cells[3].appendChild( document.createTextNode("距離4") );
	tbody.rows[0].insertCell(4);
	tbody.rows[0].cells[4].appendChild( document.createTextNode("距離5") );

	//创建第i行
	for (var i = 1; i <= virtualstudent; i++) {
		tbody.insertRow(i);
		tbody.rows[i].insertCell(0);
		tbody.rows[i].cells[0].appendChild( document.createTextNode(virtualdata[i-1].studentID) );
		tbody.rows[i].insertCell(1);
		var s = virtualdata[i-1].socialgraph[0];
		tbody.rows[i].cells[1].appendChild( document.createTextNode(s) );
		tbody.rows[i].insertCell(2);
		var s = virtualdata[i-1].socialgraph[1];
		tbody.rows[i].cells[2].appendChild( document.createTextNode(s) );
		tbody.rows[i].insertCell(3);
		var s = virtualdata[i-1].socialgraph[2];
		tbody.rows[i].cells[3].appendChild( document.createTextNode(s) );
		tbody.rows[i].insertCell(4);
		var s = virtualdata[i-1].socialgraph[3];
		tbody.rows[i].cells[4].appendChild( document.createTextNode(s) );
	}
	document.getElementById("sogr").appendChild(table);
			
}

function showpas2 () {
	
	for(var i=ta2.rows.length-1;i>=0;i--)
    {
        ta2.deleteRow(i);
    }
	
	if(ta2.rows.length > 0){
        var nodes = table.childNodes[0].childNodes; 
        for(var i=nodes.length-1;nodes.length>0;i--) 
          { 
            table.childNodes[0].removeChild(nodes[i]); 
          }     
     }		
		

	var table = document.getElementById("ta2");
	table.setAttribute("border","1");
	table.setAttribute("width","60%");
	var tbody = document.createElement("tbody");
	table.appendChild(tbody);

	//创建第一行
	tbody.insertRow(0);
	tbody.rows[0].insertCell(0);
	tbody.rows[0].cells[0].appendChild( document.createTextNode("學生ID") );
	tbody.rows[0].insertCell(1);
	tbody.rows[0].cells[1].appendChild( document.createTextNode("分配pa") );


	//创建第i行
	for (var i = 1; i <= virtualstudent; i++) {
		tbody.insertRow(i);
		tbody.rows[i].insertCell(0);
		tbody.rows[i].cells[0].appendChild( document.createTextNode(virtualdata[i-1].studentID) );
		tbody.rows[i].insertCell(1);
		var s = virtualdata[i-1].assignment[1].pastudent;
		tbody.rows[i].cells[1].appendChild( document.createTextNode(s) );

	document.getElementById("peas").appendChild(table);
			
	}
	
}


function dbinteraction2 () {
	var temp2;

	for (var k=0; k<virtualstudent; k++)
	{
		for (var i=0; i<virtualstudent; i++)
		{
			if (i != k)
			{
				if (i<k)
					virtualdata[i].influence[k-1] += virtualdata[k].dbinformation.post;
				else
					virtualdata[i].influence[k] =+ virtualdata[k].dbinformation.post;
			}
		}
		
		for (var i=0; i<virtualdata[k].dbinformation.follow.length; i++)
		{
			temp2 = getstudentt(virtualdata[k].dbinformation.follow[i]);
			if (temp2<k)
				virtualdata[k].influence[temp2] = virtualdata[k].influence[temp2] + 3;
			else
				virtualdata[k].influence[temp2-1] = virtualdata[k].influence[temp2-1] + 3;
		}
		
		for (var i=0; i<virtualdata[k].dbinformation.vote.length; i++)
		{
			temp2 = getstudentt(virtualdata[k].dbinformation.vote[i]);
			if (temp2<k)
				virtualdata[k].influence[temp2] = virtualdata[k].influence[temp2] + 1;
			else
				virtualdata[k].influence[temp2-1] = virtualdata[k].influence[temp2-1] + 1;
		}
		//alert(virtualdata[0].influence);
		for (var i=0; i<virtualdata[k].dbinformation.reply.length; i++)
		{
			temp2 = getstudentt(virtualdata[k].dbinformation.reply[i]);
			if (temp2<k)
			{	
				virtualdata[k].influence[temp2] = virtualdata[k].influence[temp2] + 2;
				virtualdata[temp2].influence[k-1] = virtualdata[temp2].influence[k-1] + 1;
			}
			else
			{
				virtualdata[k].influence[temp2-1] = virtualdata[k].influence[temp2-1] + 2;
				virtualdata[temp2].influence[k] = virtualdata[temp2].influence[k] + 1;
			}
		}
				
	}
	/*for (var k=0; k<virtualstudent; k++)
	{
		alert(k + "+" + virtualdata[k].influence);
	}*/
	
}

//分群，建立每位同學的Social Graph,kmeans
function kmeans2( arrayToProcess, Clusters )
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

function socialgraph2 () {
	var nowl = 0;
	var itemp = new Array;
	var km = new Array;
	var ttt=0;

	for (var i=0; i < virtualstudent; i++) {
		
		for (var j=0; j<virtualstudent; j++){
			if (virtualdata[i].influence[j] == 0){
				ttt=1;
				break;
			}
		}
		
		if (ttt){
			//把influence中為0的，設為sg[4]
			for (var j=0; j<virtualstudent; j++){
				if (virtualdata[i].influence[j] == 0){
					nowl = virtualdata[i].socialgraph[3].length;
					if (i<=j)
					{
						//virtualdata[i].socialgraph[3][nowl] = virtualdata[j+1].studentID;
					}
					else
					{
						//virtualdata[i].socialgraph[3][nowl] = virtualdata[j].studentID;
					}
				}
			}
		}else{
			//剩下的部分分為三群
			
		}
		
		
		/*itemp = virtualdata[i].influence;
		km = kmeans2(itemp,groupcount2);
		km.sort(function(x,y) { return y[0] - x[0] });
		
		//alert(km[0]+"+"+km[1]+"+"+km[2]+"+"+km[3]);
		for (var j=0; j<virtualdata[i].influence.length; j++) 
		{
			for (var n=0; n<groupcount2; n++) 
			{
				for (var m=0; m<km[n].length; m++) 
				{
					if (virtualdata[i].influence[j] == km[n][m])
					{
						nowl = virtualdata[i].socialgraph[n].length;
						if (i<=j)
							{
								virtualdata[i].socialgraph[n][nowl] = virtualdata[j+1].studentID;
								break;
							}
						else
							{
								virtualdata[i].socialgraph[n][nowl] = virtualdata[j].studentID;
								break;
							}
					}
				}
			}
		}*/
		//alert(virtualdata[i].socialgraph[0]+"+"+virtualdata[i].socialgraph[1]+"+"+virtualdata[i].socialgraph[2]+"+"+virtualdata[i].socialgraph[3]);
	}
}


//第二階段，選擇待評量作業
function secondassign2 () {
	dbinteraction2();	
	socialgraph2();
	
	var temp;
	var said;
	var ordersg = new Array;
	var round = 1;
	
	for (var i=0; i < virtualstudent; i++) {
		ordersg[i] = new Array;
		ordersg[i][0] = virtualdata[i].studentID;
		ordersg[i][1] = virtualdata[i].socialgraph[0].length;
	}
	ordersg.sort(function(x,y) { return y[1] - x[1] });  //距離為2的人數多少降序排列
	
	
	for (var k=0; k<virtualstudent; k++)
	{
		said = ordersg[k][0];
		secondpa2(said);
	
		//判斷是否第一輪結束，要將所有同學恢復可供選擇狀態
		temp = getstudentt(said);
		/*if (virtualdata[temp].assignment[round].pastudent.length < 6)
		{
			virtualdata[temp].assignment[round].pastudent.length = 0;
			for (var i=0; i<virtualstudent; i++)
			{
				if (virtualdata[i].assignment[round].selectedcount == 0)
				virtualdata[i].assignment[round].selectedcount = 1;
			}
			secondpa2(said);		
		}*/
		//alert(k+"+"+virtualdata[k].assignment[round].pastudent);
	}	
}

function secondpa2 (studentid) {
	var temp;
	var sum = 0;
	var highcount = 2;
	var middlecount = 2;
	var lowcount = 2;	
	var orderscore = new Array;
	var round = 1;
	
	temp = getstudentt(studentid);
	//按上週成績降序排列
	for (var i=0; i<virtualstudent; i++){
		orderscore[i] = new Array;
		orderscore[i][0] = virtualdata[i].studentID;
		orderscore[i][1] = virtualdata[i].assignment[round-1].result;
	}	
	orderscore.sort(function(x,y) { return y[1] - x[1] });
	
	
	while(xxx){
		for (var i=0; i<virtualstudent; i++){
			document.write(orderscore[i][0] + " ");
			if (i==9 || i==19){
				document.write(",");
			}
		}
		xxx=0;
	}

	
	var p = Math.floor(virtualstudent/3);
	var p1 = orderscore[p][1];
	p = p * 2;
	var p2 = orderscore[p][1];

	/*var myscore = virtualdata[temp].assignment[round-1].result;
	
	if (myscore>p1)
		highcount = 1;
	else if (myscore>p2 && myscore<=p1)
		middlecount = 1;
	else
		lowcount = 1;*/
	
	
	var i=checki=groupcount2-1;
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
			for (var m=0; m<virtualdata[temp].socialgraph[i].length; m++)
			{
				sg[m] = [];
				sg[m][0] = virtualdata[temp].socialgraph[i][m];
				thisid = getstudentt(sg[m][0]);
				sg[m][1] = virtualdata[thisid].assignment[round].selectedcount;
				//sg[m].sort(function(x,y) { return y - x });			
			}
			sg.sort(function(x,y) { return y[1] - x[1] });
			checki--;
			//alert(sg);
		}
		//alert(sg.length);
		
		if ( j < sg.length )
		{
			//找出該id學生的成績處於高中低那一群
			for (var k=0; k<virtualstudent; k++){
				if (sg[j][0] == virtualdata[k].studentID)
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
			if ( score > p1 && highcount > 0 && virtualdata[temp2].assignment[round].selectedcount != 0)
			{
				nowl = virtualdata[temp].assignment[round].pastudent.length;
				virtualdata[temp].assignment[round].pastudent[nowl] = virtualdata[temp].socialgraph[i][j];
				virtualdata[temp2].assignment[round].selectedcount--;
				highcount--;
				//alert("h" + highcount);
			}
			else if ( p2 < score && score <= p1 && middlecount > 0 && virtualdata[temp2].assignment[round].selectedcount != 0) 
			{
				nowl = virtualdata[temp].assignment[round].pastudent.length;
				virtualdata[temp].assignment[round].pastudent[nowl] = virtualdata[temp].socialgraph[i][j];
				virtualdata[temp2].assignment[round].selectedcount--;
				middlecount--;
				//alert("m" + middlecount);
			}
			else if ( score <= p2 && lowcount > 0 && virtualdata[temp2].assignment[round].selectedcount != 0) 
			{
				nowl = virtualdata[temp].assignment[round].pastudent.length;
				virtualdata[temp].assignment[round].pastudent[nowl] = virtualdata[temp].socialgraph[i][j];
				virtualdata[temp2].assignment[round].selectedcount--;				
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
		
		if ( (highcount == 0 && middlecount == 0 && lowcount == 0) || i < 0)
		break;
	}
	//alert(virtualdata[0].assignment[round].selectedcount);
	/*var test = new Array;
	for (var i=0; i<virtualstudent; i++)
	{
		test[i] = virtualdata[i].assignment[round].selectedcount;
	}
	alert(temp+"+"+test);*/
}