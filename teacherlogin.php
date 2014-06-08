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
	<script type="text/javascript" src="./js/teacherloginleft.js"></script>
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
			<div id="divleftTeacher" align="center" >
				<p align="center">教師管理系統</p>
				<input type="button" class="button white" id="SetRubric" value="設置Rubric" onclick="mainSetR();"><br/><br/>
				<input type="button" class="button white" id="SampleAssessment" value="範例評量" onclick="mainSampleA();"><br/><br/>
				<input type="button" class="button white" id="SocialGraph" value="Social Graph" onclick="mainSocialG();"><br/><br/>
				<input type="button" class="button white" id="ResultGraph" value="學生成績查看" onclick="mainResultG();"><br/><br/>				
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

			<div id="divmainSetR" align="center" style="display:none;">
				<h1>設置Rubric</h1>
				<pre><p align="center">請在文本框中輸入正確答案以及評量準則：</p></pre>
				<textarea id="SetR" cols="60" rows="10" style="resize: none;" wrap="virtual"></textarea><br/><br/>
				<input type="button" class="button medium white" value="Submit" onclick="getRubric();"/>
				<input type="button" class="button medium white" value="Delete" onclick="delRubric();"/>
			</div>

			<div id="divmainSampleA" align="center" style="display:none;">
				<h1>範例評量</h1>
				<pre><p align="left" id="rsample"> </p></pre>
				<pre><p align="left"> 請選擇評量範例：<select id="sample" onchange="getSampleChange();"> </select></p></pre>	
				<div id="showSample" style="display: none">
					<pre><p align="center"> 選擇一位同學替代本份評量範例：<select id="studentlist"> </select><input align="left" type="button" id="changesample" value="確認" onclick="ChangeSample();"/></p></pre>	
					<div id="s" class="double1">
					</div>
					<pre><p align="center"> 範例得分：<select id="scorelist" onchange="getscore();">分數</select></p></pre>
					<input id="score" class="button medium white" onclick="getSampleScore();"/>
				</div>		
			</div>

			<div id="divmainSocialG" align="center" style="display:none;">
				<h1>Social Graph</h1>
				<pre><p align="left"> 選擇查看對象：<select id="studentG" onchange="getstudentChangeG();" ></select></p></pre>
				<div id="showSG">
					<table id="table4"></table>
					<canvas id="sg" width="500" height="400" style="border:2px solid white;">
				</div>	
			</div>

			<div id="divmainResultG" align="center" style="display:none;">
				<h1>學生成績查看</h1>
				<div id="showStudentR">
					<table id="table1"></table>
				</div>
			</div>

　　　		</div>
　　	</div>

　　	<div id="Footer">
　　	</div>
</div>

</body>
</html>