var rubric = "";
var scorelist = new Array("1","2","3","4","5","6","7","8","9","10");
var round = 1;  //表示現在處於第幾周，從0開始
var ordersg = new Array;  //保存第二階段分配評量的順序
var orderscore = new Array;
var groupcount = 4;


var studentcount = 10;  //學生總人數
var three = new Array("第一份","第二份","第三份");


var classdata = [
	{
	  "assignmentID":1,
	  "rubric":"",
	  "sample":[],
	  "samplescore":[]
	},
	{
	  "assignmentID":2,
	  "rubric":"",
	  "sample":[],
	  "samplescore":[]
	},
];