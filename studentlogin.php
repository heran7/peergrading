<?php 
	session_start();
	//echo $_SESSION['id'];
	if($_SESSION['id'] == ''){
		echo "<script>alert('请登录后再尝试！');window.location.href='index.html';</script>";
	}
?>
<html>
<head>
	<meta charset="UTF-8">
	<link rel="stylesheet" href="./css/container.css">
	<link rel="stylesheet" href="./css/button.css">
	<script type="text/javascript" src="./js/studentdata.js"></script>
	<script type="text/javascript" src="./js/data.js"></script>
	<script type="text/javascript" src="./js/studentloginleft.js"></script>
	<script type="text/javascript" src="./js/Calculate.js"></script>
	<title>PeerGrading</title>
</head>

<body>
<div id="container">
　	<div id="Header">
		<h1 align="center" class="STYLE1">Peer Grading System</h1>
　　	</div>

　　	<div id="PageBody">
　　　　	<div id="Sidebar">
			
			<div id="divleftStudent" align="center">
				<p align="center">同儕評量系統</p>
				<input type="button"  class="button white" id="PeerAssessment" value="同儕評量" onclick="mainPeerA(loginid);"><br/><br/>
				<input type="button"  class="button white" id="QueryResult" value="成績查詢" onclick="mainQueryR(loginid);"><br/><br/>
				<input type="button"  class="button white" id="PeerAssessmentHistory" value="評量歷史" onclick="mainPeerAH();"><br/><br/>
				<form action="logout.php" method="post">
					<input type="submit" class="button white" id="logout" value="登出系統"> 
				</form>	
			</div>
　　　　	</div>

　　　　	<div id="MainBody">
	
			<div id="divDefaulMain" align = "center">
				<h1>Peer Grading System</h1>
				<p>歡迎進入同儕評量系統！</p>
			</div>
			
			<div id="divmainPeerA" align="center" style="display:none;">
			<br/>
				<input type="button" class="button white" value="查看評量準則及解答" onclick="showRubric();"/>
				<div id="showR"></div>
				<HR style="border:1 dashed #987cb9" width="98%" color=#ffffff SIZE=1>
				<pre><p align="left"> 本次範例作業為：<select id="thissample" onchange="getThisSChange();" ></select></p></pre>
				<pre><p id="sampletos" align="left"></p></pre>
				<div id="showThisSample" style="display: none;" class="double1"></div>
				<HR style="border:1 dashed #987cb9" width="98%" color=#ffffff SIZE=1>
				<pre><p id="paselect" align="left"> 本次待評量的作業為：<select id="thispa" onchange="getThispaChange();" ></select></p></pre>
				<div id="showThispa" style="display: none;">
					<div id="ss" class="double1">
					</div>
					<pre><p align="center"> 本份作業得分：<select id="scorelist2" onchange="getscore();">分數</select></p></pre>
					<input id="sscore" class="button medium white" onclick="setpascore(loginid);"/>
				</div>
			</div>
			
			<div id="divmainQueryR" align="center" style="display:none;">
				<h1>成績查詢</h1>
				<div id="showSHR">
					<table id="table2"></table>
				</div>				
			</div>
			
			<div id="divmainPAHistory" align="center" style="display:none;">
				<h1>評量歷史</h1>
				<pre id="sglist"><p align="left"> 選擇查看歷史：<select id="PAH" onchange="getPAHChange(loginid);"></select></p></pre>
				<p id="nosg" align="center" style="display:none;">尚無記錄</p>
				<div id="showPAH">
					<table id="table3"></table>
				</div>
				<div id="history" style="display: none;">
					<pre><p align="left"> 選擇查看對象：<select id="hselect" onchange="gethistoryChange(loginid);" ></select></p></pre>
					<div id="historya" class="double1" style="display: none;">
					</div>
				</div>					
			</div>

　　　		</div>
　　	</div>

　　	<div id="Footer">
　　	</div>
</div>

<script>
	//loginid = 10;
	loginid = <?php echo json_encode($_SESSION['id']); ?>;
	//loginid = '<%=session.getAttribute("id")%>';
	//alert(loginid);
</script>
</body>
</html>