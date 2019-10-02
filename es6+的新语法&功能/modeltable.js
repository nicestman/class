const data = `
	<!--医院名称-->
	<textarea id="titleName">
		<h3>医联体基层医院 —— $hospitalname$</h3>
	</textarea>
	<!--患者信息列表模块-->
	<textarea id="list">
		<tr>
			<td>$index$</td>
			<td>$conid$</td>
			<td>$patientname$</td>
			<td>$grouptype$</td>
			<td>$groupdate$</td>
			<td>$categoryhospital$$grouphospital$</td>
			<td>$statu$</td>
			<td><a href="$ahref$">$atext$</a></td>
		</tr>
	</textarea>
	<!--列表翻页模块-->
	<textarea id="page">
		共$currpage$/$totalpage$页
		<a class="$firstpage$" href="#page=1$condition$">首页</a>
		<a class="$firstpage$" href="#page=$pageup$$condition$">上一页</a>
		<a class="$lastpage$" href="#page=$pagedown$$condition$">下一页</a>
		<a class="$lastpage$" href="#page=$totalpage$$condition$">最后</a>
	</textarea>
	<!--患者信息管理列表模块-->
	<textarea id="illlist">
		<tr>
			<td>$index$</td>
			<td>$patientid$</td>
			<td>$patientname$</td>
			<td>$sex$</td>
			<td>$age$</td>
			<td>$phone$</td>
			<td><a href="$ahref$">$atext$</a></td>
		</tr>
	</textarea>
	<!--患者信息详情模块-->
	<textarea id="illinfo">
		<form id="formA">
			<table class="table public-table">
				<tr>
					<td>HIS id：</td>
					<td>患者编号：<input readonly="readonly" name="patientId" value="$patientid$" /></td>
					<td>患者手机号：<input readonly="readonly" name="phone" maxlength="11" value="$phone$" /></td>
				</tr>
				<tr>
					<td>患者姓名：<input readonly="readonly" name="patientName" value="$patientname$" /></td>
					<td>年龄：<input readonly="readonly" name="age" value="$age$" /></td>
					<td>性别：<input readonly="readonly" name="sex" value="$sex$" /></td>
				</tr>
				<tr>
					<td>婚姻状况：<input readonly="readonly" name="marriage" value="$marriage$" /></td>
					<td>职业：<input readonly="readonly" name="patientJob" value="$patientjob$" /></td>
					<td>家庭住址：<input readonly="readonly" name="family" value="$family$" /></td>
				</tr>
				<tr>
					<td>家庭电话：<input readonly="readonly" name="familyPhone" value="$familyphone$" /></td>
					<td>紧急联系人：<input readonly="readonly" name="urgency" value="$urgency$" /></td>
					<td>紧急联系人关系：<input readonly="readonly" name="relation" value="$relation$" /></td>
				</tr>
				<tr>
					<td>紧急联系人电话：<input readonly="readonly" name="urgencyPhone" value="$urgencyphone$" /></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td colspan="3">过敏史：<$textarea$ readonly="readonly" style="color: red;" name="allergy">$allergy$</$textarea$></td>
				</tr>
				<tr>
					<td colspan="3">主诉：<$textarea$ readonly="readonly" name="complain">$complain$</$textarea$></td>
				</tr>
				<tr>
					<td colspan="3">现病史：<$textarea$ readonly="readonly" name="present">$present$</$textarea$></td>
				</tr>
				<tr>
					<td colspan="3">既往史：<$textarea$ readonly="readonly" name="past">$past$</$textarea$></td>
				</tr>
				<tr>
					<td colspan="3">检查：<$textarea$ readonly="readonly" name="examine">$examine$</$textarea$></td>
				</tr>
				<tr>
					<td colspan="3">初步诊断：<$textarea$ readonly="readonly" name="initial">$initial$</$textarea$></td>
				</tr>
				<tr>
					<td colspan="3">治疗计划：<$textarea$ readonly="readonly" name="curePlan">$cureplan$</$textarea$></td>
				</tr>
			</table>
		</form>
	</textarea>
	<!--远程会诊申请补充资料模块-->
	<textarea id="conAdd">
		<form id="formB">
			<table class="supplement public-table">
				<tr>
					<td>会诊类型</td>
					<td>
						<select id="groupType" name="groupType" class="input-pub">
							<option value="">选择类型</option>
							<option value="普通会诊">普通会诊</option>
							<option value="紧急会诊">紧急会诊</option>
						</select>
					</td>
				</tr>
				<tr>
					<td>医生编号：</td>
					<td>
						<input type="number" readonly="readonly" id="doctorNo" name="doctorNo" class="input-pub">
						<button type="button" id="createDoctorNo" style="margin:0;" class="btn btn-info btn-large">生成</button>
					</td>
				</tr>
				<tr>
					<td>申请医生</td>
					<td><input type="text" id="doctorName" name="doctorName" value="" class="input-pub"></td>
				</tr>
				<tr>
					<td>申请专科</td>
					<td>
						<select id="juniorId" name="juniorId" class="input-pub">
							<option value="">选择专科</option>
							<option>儿科</option>
							<option>眼科</option>
							<option>口腔科</option>
							<option>皮肤性病科</option>
							<option>妇科</option>
							<option>产科</option>
							<option>内分泌科</option>
							<option>骨科</option>
							<option>肝胆外科</option>
							<option>泌尿外科</option>
							<option>耳鼻喉头颈外科</option>
							<option>心血管内科</option>
							<option>神经内科</option>
							<option>肛肠外科</option>
							<option>乳腺甲状腺外科</option>
							<option>整形、激光美容外科</option>
							<option>神经外科</option>
							<option>心胸外科</option>
							<option>消化内科</option>
							<option>呼吸内科</option>
							<option>中西医结合科</option>
							<option>血液肿瘤科</option>
							<option>肾内科</option>
						</select>
					</td>
				</tr>
				<tr>
					<td>会诊时间</td>
					<td><input type="date" id="groupDate" name="groupDate" value="" class="input-pub"></td>
				</tr>
				<tr>
					<td>会诊医院</td>
					<td>
						<input type="text" id="groupHospital" name="groupHospital" readonly="readonly" value="福州市第一医院" class="input-pub">
					</td>
				</tr>
			</table>
		</form>
	</textarea>
	<!--双向转诊申请补充资料模块-->
	<textarea id="refAdd">
		<form id="formC">
			<table class="supplement public-table">
				<tr>
	                <td>申请医生姓名</td>
	                <td><input type="text" name="applyName" id="applyName" class="input-pub" maxlength="10"></td>
				</tr>
				<tr>
					<td>专科</td>
					<td>
						<select id="chamber" class="input-pub" name="chamber">
							<option value="">选择专科</option>
							<option>儿科</option>
							<option>眼科</option>
							<option>口腔科</option>
							<option>皮肤性病科</option>
							<option>妇科</option>
							<option>产科</option>
							<option>内分泌科</option>
							<option>骨科</option>
							<option>肝胆外科</option>
							<option>泌尿外科</option>
							<option>耳鼻喉头颈外科</option>
							<option>心血管内科</option>
							<option>神经内科</option>
							<option>肛肠外科</option>
							<option>乳腺甲状腺外科</option>
							<option>整形、激光美容外科</option>
							<option>神经外科</option>
							<option>心胸外科</option>
							<option>消化内科</option>
							<option>呼吸内科</option>
							<option>中西医结合科</option>
							<option>血液肿瘤科</option>
							<option>肾内科</option>
	                	</select>
					</td>
				</tr>
				<tr>
	                <td>职称</td>
	                <td><input type="text" name="applyJob" id="applyJob" class="input-pub " maxlength="10"></td>
				</tr>
				<tr>
					<td>转诊专科</td>
					<td>
						<select id="planChamber" class="input-pub" name="planChamber">
							<option value="">选择专科</option>
							<option>儿科</option>
							<option>眼科</option>
							<option>口腔科</option>
							<option>皮肤性病科</option>
							<option>妇科</option>
							<option>产科</option>
							<option>内分泌科</option>
							<option>骨科</option>
							<option>肝胆外科</option>
							<option>泌尿外科</option>
							<option>耳鼻喉头颈外科</option>
							<option>心血管内科</option>
							<option>神经内科</option>
							<option>肛肠外科</option>
							<option>乳腺甲状腺外科</option>
							<option>整形、激光美容外科</option>
							<option>神经外科</option>
							<option>心胸外科</option>
							<option>消化内科</option>
							<option>呼吸内科</option>
							<option>中西医结合科</option>
							<option>血液肿瘤科</option>
							<option>肾内科</option>
	                	</select>
					</td>
				</tr>
				<tr>
					<td>转诊医院</td>
					<td><input type="text" name="planHospital" id="planHospital" value="福州市第一医院" class="input-pub"></td>
				</tr>
				<tr>
					<td>转诊时间</td>
					<td><input type="text" name="planTime" id="planTime" value="" class="input-pub"></td>
				</tr>
				<tr>
					<td>转诊缘由</td>
					<td><input type="text" name="changeReason" id="changeReason" class="input-pub" value="" maxlength="100"></td>
				</tr>
				<tr>
					<td>初诊/复诊</td>
	            	<td>
						<select id="diagnose" class="input-pub" name="diagnose">
							<option value="">选择类型</option>
							<option value="初诊">初诊</option>
							<option value="复诊">复诊</option>
	            	</td>
				</tr>
				<tr>
					<td>急病/慢病</td>
	            	<td>
						<select id="illness" class="input-pub" name="illness">
							<option value="">选择类型</option>
							<option value="慢病">慢病</option>
							<option value="急病">急病</option>
	                	</select>
	            	</td>
				</tr>
			</table>
		</form>
	</textarea>
	<!--患者信息修改模块-->
	<textarea id="consdetail">
		<table class="table public-table">
			<tr>
				<td>HIS id：</td>
				<td>患者编号：<input readonly="readonly" type="text" class="input-pub" value="$patientid$" /></td>
				<td>患者手机号：<input type="text" class="input-pub" id="phone" name="phone" value="$phone$" maxlength="11" /></td>
			</tr>
			<tr>
				<td>患者姓名：<input readonly="readonly" type="text" class="input-pub" value="$patientname$" /></td>
				<td>年龄：<input readonly="readonly" type="text" class="input-pub" value="$age$"></td>
				<td>性别：<input readonly="readonly" type="text" class="input-pub" value="$sex$"></td>
			</tr>
			<tr>
				<td colspan="3">过敏史：<br/><$textarea$ style="color: red;" class="inpu input-pub" name="allergy">$allergy$</$textarea$></td>
			</tr>
			<tr>
				<td colspan="3">主诉：<br/><$textarea$ class="inpu input-pub" name="complain" id="complain">$complain$</$textarea$></td>
			</tr>
			<tr>
				<td colspan="3">现病史：<br/><$textarea$ class="inpu input-pub" name="present" id="present">$present$</$textarea$></td>
			</tr>
			<tr>
				<td colspan="3"> 既往史：<br/><$textarea$ class="inpu input-pub" name="past" id="past">$past$</$textarea$></td>
			</tr>
			<tr>
				<td colspan="3">检查：<br/><$textarea$ class="inpu input-pub" name="examine" id="examine">$examine$</$textarea$></td>
			</tr>
			<tr>
				<td colspan="3">初步诊断：<br/><$textarea$ class="inpu input-pub" name="initial" id="initial">$initial$</$textarea$></td>
			</tr>
			<tr>
				<td colspan="3">治疗计划：<br/><$textarea$ class="inpu input-pub" name="curePlan" id="curePlan">$cureplan$</$textarea$></td>
			</tr>
		</table>
	</textarea>
	<!--会诊信息详情模块-->
	<textarea id="userinfohtml">
		<table class="table public-table">
			<tr>
				<td>申请编号：<input readonly="readonly" type="text" class="input-pub" value="$conid$" /></td>
				<td>HIS id：</td>
				<td>患者编号：<input readonly="readonly" type="text" class="input-pub" value="$patientid$" /></td>
				<td></td>
			</tr>
			<tr>
				<td>患者姓名：<input type="text" class="input-pub" name="patientName" id="patientName" value="$patientname$" /></td>
				<td>年龄：<input readonly="readonly" type="text" class="input-pub" value="$age$"></td>
				<td>性别：<input readonly="readonly" type="text" class="input-pub" value="$sex$"></td>
				<td></td>
			</tr>
			<tr>
				<td colspan="4">主诉：<br/><$textarea$ class="inpu input-pub" name="complain" id="complain">$complain$</$textarea$></td>
			</tr>
			<tr>
				<td colspan="4">现病史：<br/><$textarea$ class="inpu input-pub" name="present" id="present">$present$</$textarea$></td>
			</tr>
			<tr>
				<td colspan="4"> 既往史：<br/><$textarea$ class="inpu input-pub" name="past" id="past">$past$</$textarea$></td>
			</tr>
			<tr>
				<td colspan="4">检查：<br/><$textarea$ class="inpu input-pub" name="examine" id="examine">$examine$</$textarea$></td>
			</tr>
			<tr>
				<td colspan="4">初步诊断：<br/><$textarea$ class="inpu input-pub" name="initial" id="initial">$initial$</$textarea$></td>
			</tr>
			<tr>
				<td colspan="4">治疗计划：<br/><$textarea$ class="inpu input-pub" name="curePlan" id="curePlan">$cureplan$</$textarea$></td>
			</tr>
			<tr>
				<td>申请日期：<input readonly="readonly" type="date" class="input-pub" value="$applydate$" /></td>
				<td>会诊类型：<input readonly="readonly" type="text" class="input-pub" value="$grouptype$" /></td>
				<td>医生编号：<input readonly="readonly" type="text" class="inpu input-pub" value="$doctorno$" /></td>
				<td>医生姓名：<input readonly="readonly" type="text" class="input-pub" value="$doctorname$" /></td>
			</tr>
			<tr>
				<td>会诊日期：<input type="date" class="input-pub" name="groupDate" value="$groupdate$" /></td>
				<td>会诊医院：<input readonly="readonly" type="text" class="input-pub" value="$grouphospital$" /></td>
				<td>专家编号：<input readonly="readonly" type="text" class="input-pub" value="$specialistid$" /></td>
				<td>专家姓名：<input readonly="readonly" type="text" class="input-pub" value="$specialist$" /></td>
			</tr>
			<tr>
				<td>申请专科：<input readonly="readonly" type="text" class="input-pub" value="$juniorid$" /></td>
				<td></td>
				<td></td>
				<td></td>
			</tr>
		</table>
	</textarea>
	<!--病历资料-->
	<!-- <textarea id="historyurl">
		<li>
			<img width="100%;" src="$historyurl$"/><br/>
			<span>病历资料</span>
		</li>
	</textarea> -->
	<!--病历、检查资料-->
	<textarea id="examineurl">
		<div class="span3">
			<div class="selects">
				<select name="year" id="$idyear$" class="input-pub year">
					$yearlist$
				</select>
				<select name="month" id="$idmonth$" class="input-pub month">
					$monthlist$
				</select>
			</div>
			<div class="tabExam">
				<ul id="$idexaminetab$" class="tab_menu examineTab">
					$examinetab$
				</ul>
				<dl id="$idexamineimg$" class="examineImg">
					$examineimg$
				</dl>
			</div>
		</div>
		<div class="span9">
			<canvas id="$idimgload$" src="$examineimgload$">您的浏览器不支持canvas画布！</canvas>
		</div>
	</textarea>
	<!--B超资料-->
	<textarea id="bmode">
		<table class="table">
			<tr>
				<td colspan="4"><h2>超声检查报告单</h2></td>
			</tr>
			<tr>
				<td>患者姓名：$patientname$</td>
				<td>年龄：$age$</td>
				<td>性别：$sex$</td>
				<td>患者编号：$patientid$</td>
			</tr>
			<tr>
				<td>超声号：2018121536</td>
				<td>检查部位：肝脏</td>
				<td>医生姓名：$doctorname$</td>
				<td>医生编号：$doctorno$</td>
			</tr>
			<tr>
				<td>科室：$juniorid$</td>
				<td>检查日期：$groupdate$</td>
				<td>检查类别：常规检查</td>
				<td>机器型号：MEDISON-X6</td>
			</tr>
			<tr>
				<td colspan="4">
					<b>图像所见：</b><br/>
					<div id="bmodelImg">
						<dl>$bmodeurl$</dl>
					</div>
				</td>
			</tr>
			<tr>
				<td colspan="4"><b>超声所见：</b><br/>肝脏轮廓清晰，形态大小正常，肝实质回声均匀，肝内血管显示清，肝内胆管未见明显扩张，门静脉主干未见明显扩张。胆总管上段内径约8.5。</td>
			</tr>
			<tr>
				<td colspan="4"><b>超声提示：</b><br/>胆囊壁稍厚，胆总管上段内径稍宽，请结合临床。肝脏、胰腺、脾脏未见明显异常。</td>
			</tr>
		</table>
	</textarea>
	<!--X线资料-->
	<textarea id="xray">
		<table class="table">
			<tr>
				<td colspan="4"><h2>X光检查报告单</h2></td>
			</tr>
			<tr>
				<td>患者姓名：$patientname$</td>
				<td>年龄：$age$</td>
				<td>性别：$sex$</td>
				<td>患者编号：$patientid$</td>
			</tr>
			<tr>
				<td>检查日期：$groupdate$</td>
				<td>部位：胸部</td>
				<td>科室：$juniorid$</td>
				<td>X线号：10186523</td>
			</tr>
			<tr>
				<td colspan="4">
					<b>图像所见：</b><br/>
					<div id="xrayImg">
						<dl>$xrayurl$</dl>
					</div>
				</td>
			</tr>
			<tr>
				<td colspan="4"><b>影像表现：</b><br/>胸廓对称，气管居中；双肺纹理清晰，两肺纹理增强，双肺门增浓，其内可见少量斑点状模糊阴影，同侧肺门外上方可见少量片状阴影与肺门相连；右下肺心门后区亦可见少量密度增高、边缘模糊斑片状致密阴影；纵膈影不宽；心脏形态、大小均在正常范围内；两隔面光滑，肋膈角锐利。</td>
			</tr>
			<tr>
				<td colspan="4"><b>诊断意见：</b><br/>1.符合肺结核I型X线征。2.支气管肺炎。</td>
			</tr>
		</table>
	</textarea>
	<!--病理资料-->
	<textarea id="telepathology">
		<table class="table">
			<tr>
				<td colspan="4"><h2>病理检查报告单</h2></td>
			</tr>
			<tr>
				<td>患者姓名：$patientname$</td>
				<td>年龄：$age$</td>
				<td>性别：$sex$</td>
				<td>患者编号：$patientid$</td>
			</tr>
			<tr>
				<td>会诊医院：$grouphospital$</td>
				<td>会诊日期：$groupdate$</td>
				<td>切片数：2片</td>
				<td>病理号：2017080524513</td>
			</tr>
			<tr>
				<td colspan="4"><b>临床资料（病史、手术所见、影像学、相关检验等）：</b><br/>右下1 2左下1 2成人牙周炎（慢性牙周炎）。牙龈炎 牙龈炎有牙龈炎症，无牙周袋形成，无牙槽骨吸收，无牙齿松动等典型牙周炎临床表现。</td>
			</tr>
			<tr>
				<td colspan="4"><b>取材部位：</b><br/>口腔</td>
			</tr>
			<tr>
				<td colspan="4"><b>大体所见：</b><br/>右下1 2左下1 2排列不齐，牙石2度 ,牙龈红肿,轻探出血,牙周袋深约4-5mm,内有脓液,探之根面粗糙有牙石。松动1度。X线检查水平吸收达根长1/3左右。</td>
			</tr>
			<tr>
				<td colspan="4"><b>免疫组化 ：</b><br/>CK+ 34BE12+ p63+? E-cadherin+ ER+ PR+ C-erbB-2无意义 ki-67约10%+</td>
			</tr>
			<tr>
				<td colspan="4"><b>初步诊断：</b><br/>$initial$</td>
			</tr>
			<tr>
				<td colspan="4"><b>远程病理专家会诊意见 ：</b><br/>常规开髓，拔 髓、无痛、根管治疗、充填。三个月后，瘘道未消失，阴影未缩小，行囊肿除切除术及根尖切除术。三个月复诊。</td>
			</tr>
			<tr>
				<td colspan="4">
					<b>病理图像 ：</b><br/>
					<div id="selectImg">
						<dl>
							<dd class="input-pub"><img src="https://imuts.oss-cn-shenzhen.aliyuncs.com/image/1.jpeg"/></dd>
							<dd class="input-pub"><img src="https://imuts.oss-cn-shenzhen.aliyuncs.com/image2/2.jpeg"/></dd>
						</dl>
					</div>
				</td>
			</tr>
		</table>
	</textarea>
	<!--患者信息详情模块-->
	<textarea id="patientinfo">
		<table class="public-table">
			<tr>
				<td>申请编号：$conid$</td>
				<td>HIS id：</td>
				<td>患者编号：$patientid$</td>
				<td></td>
			</tr>
			<tr>
				<td>患者姓名：$patientname$</td>
				<td>年龄：$age$</td>
				<td>性别：$sex$</td>
				<td></td>
			</tr>
			<tr>
				<td colspan="4">主诉：$complain$</td>
			</tr>
			<tr>
				<td colspan="4">现病史：$present$</td>
			</tr>
			<tr>
				<td colspan="4">既往史：$past$</td>
			</tr>
			<tr>
				<td colspan="4">检查：$examine$</td>
			</tr>
			<tr>
				<td colspan="4">初步诊断：$initial$</td>
			</tr>
			<tr>
				<td colspan="4">治疗计划：$cureplan$</td>
			</tr>
			<tr>
				<td>申请日期：$applydate$</td>
				<td>会诊类型：$grouptype$</td>
				<td>医生编号：$doctorno$</td>
				<td>医生姓名：$doctorname$</td>
			</tr>
			<tr>
				<td>会诊日期：$groupdate$</td>
				<td>会诊时间：$gtime$</td>
				<td>专家编号：$specialistid$</td>
				<td>专家姓名：$specialist$</td>
				<!--<td>会诊医院：$grouphospital$</td>-->
			</tr>
			<tr>
				<td>所属医院：$categoryhospital$</td>
				<td>申请专科：$juniorid$</td>
				<td></td>
				<td></td>
			</tr>
		</table>
	</textarea>
	<!--视频诊疗患者信息模块-->
	<textarea id="videoInfo">
		<table class="public-table">
			<tr>
				<td>申请编号：$conid$</td>
				<td>HIS id：</td>
			</tr>
			<tr>
				<td>患者编号：$patientid$</td>
				<td>患者姓名：$patientname$</td>
			</tr>
			<tr>
				<td>年龄：$age$</td>
				<td>性别：$sex$</td>
			</tr>
			$idcardinfo$
			<tr>
				<td colspan="2">主诉：$complain$</td>
			</tr>
			<tr>
				<td colspan="2">现病史：$present$</td>
			</tr>
			<tr>
				<td colspan="2">既往史：$past$</td>
			</tr>
			<tr>
				<td colspan="2">检查：$examine$</td>
			</tr>
			<tr>
				<td colspan="2">初步诊断：$initial$</td>
			</tr>
			<tr>
				<td colspan="2">治疗计划：$cureplan$</td>
			</tr>
			<tr>
				<td>申请日期：$applydate$</td>
				<td>会诊类型：$grouptype$</td>
			</tr>
			<tr>
				<td>医生编号：$doctorno$</td>
				<td>医生姓名：$doctorname$</td>
			</tr>
			<tr>
				<td>会诊日期：$groupdate$</td>
				<td>会诊时间：$gtime$</td>
			</tr>
			<tr>
				<td>专家编号：$specialistid$</td>
				<td>专家姓名：$specialist$</td>
			</tr>
			<tr>
				<td>$member$$manage$：$grouphospital$$categoryhospital$</td>
				<td>申请专科：$juniorid$</td>
			</tr>
		</table>
	</textarea>
	<!--视频诊疗患者身份证信息模块-->
	<textarea id="idcardInfo">
		<table class="public-table">
			<tr>
				<th colspan="2"><center><h3>身份证认证信息</h3></center></th>
			</tr>
			<tr>
				<td>认证姓名：$idcardname$</td>
				<td>认证年龄：$idcardage$</td>
			</tr>
			<tr>
				<td>认证性别：$idcardsex$</td>
				<td></td>
			</tr>
		</table>
	</textarea>
	<!--转诊申请列表-->
	<textarea id="referrallist">
		<tr>
			<td>$id$</td>
			<td>$patientname$</td>
			<td>$illness$</td>
			<td>$applyname$</td>
			<td>$chamber$$planchamber$</td>
			<td>$applydate$</td>
			<td>$planhospital$$hospitalname$</td>
			<td>$statu$</td>
			<td><a href="$ahref$">$atext$</a></td>
		</tr>
	</textarea>
	<!--转诊申请详情-->
	<textarea id="referralform">
		<table class="table public-table">
			<tr>
				<td>HIS id：</td>
				<td>患者编号：$patientid$</td>
				<td>患者手机号：$phone$</td>
			</tr>
			<tr>
				<td>患者姓名：$patientname$</td>
				<td>年龄：$age$</td>
				<td>性别：$sex$</td>
			</tr>
			<tr>
				<td>婚姻状况：$marriage$</td>
				<td>职业：$patientjob$</td>
				<td>家庭住址：$family$</td>
			</tr>
			<tr>
				<td>家庭电话：$familyphone$</td>
				<td>紧急联系人：$urgency$</td>
				<td>紧急联系人关系：$relation$</td>
			</tr>
			<tr>
				<td>紧急联系人电话：$urgencyphone$</td>
				<td></td>
				<td></td>
			</tr>
			<tr>
				<td colspan="3">过敏史：$allergy$</td>
			</tr>
			<tr>
				<td colspan="3">主诉：$complain$</td>
			</tr>
			<tr>
				<td colspan="3">现病史：$present$</td>
			</tr>
			<tr>
				<td colspan="3">既往史：$past$</td>
			</tr>
			<tr>
				<td colspan="3">检查：$examine$</td>
			</tr>
			<tr>
				<td colspan="3">初步诊断：$initial$</td>
			</tr>
			<tr>
				<td colspan="3">治疗计划：$cureplan$</td>
			</tr>
			<tr>
	            <td>申请人姓名：$applyname$</td>
	            <td>专科：$chamber$</td>
	            <td>职称：$applyjob$</td>
			</tr>
			<tr>
				<td>转诊科室：$planchamber$</td>
				<td>转诊医院：$planhospital$</td>
				<td>转诊时间：$plantime$</td>
			</tr>
			<tr>
				<td>转诊缘由：$changereason$</td>
				<td>初诊/复诊：$diagnose$</td>
				<td>急病/慢病：$illness$</td>
			</tr>
			<tr>
				<td>专家编号：$specialistid$</td>
				<td>专家姓名：$specialist$</td>
				<td></td>
			</tr>
		</table>
	</textarea>
	<textarea id="">
		<h3 id="referral-copy"><a href="javascript:void(0)">双向转诊申请表</a></h3>
	    <table class="public-table">
	        <tr>
	            <th colspan="6">一、申请人信息</th>
	        </tr>
	        <tr>
	            <td>申请人姓名</td>
	            <td><input readonly="readonly" type="text" class="input-pub" value="$applyname$" style="width:81%;"/></td>
	            <td>科室/专科</td>
	            <td><input readonly="readonly" type="text" class="input-pub" value="$chamber$" style="width:81%;"/></td>
	            <td>职称</td>
	            <td><input readonly="readonly" type="text" class="input-pub" value="$applyjob$" style="width:81%;"/></td>
	        </tr>
	        <tr>
	            <td>转诊缘由</td>
	            <td colspan="5"><input readonly="readonly" type="text" class="input-pub" value="$changereason$" style="width: 95%;"/></td>
	        </tr>
	        <tr>
	            <td>拟转诊医院</td>
	            <td colspan="5"><input readonly="readonly" type="text" class="input-pub" value="$planhospital$" style="width: 95%;"/></td>
	        </tr>
	        <tr>
	            <td>拟转诊时间</td>
	            <td colspan="3"><input readonly="readonly" type="text" class="input-pub" value="$plantime$" style="width: 92%;"/></td>
	            <td>拟转诊科室</td>
	            <td><input readonly="readonly" type="text" class="input-pub" value="$planchamber$" style="width:81%;"/></td>
	        </tr>
	        <tr>
	            <th colspan="6">二、申请转诊病例详情</th>
	        </tr>
	        <tr>
	            <td>初诊/复诊</td>
	            <td><input readonly="readonly" type="text" class="input-pub" value="$diagnose$" style="width:81%;"/></td>
	            <td>急病/慢病</td>
	            <td><input readonly="readonly" type="text" class="input-pub" value="$illness$" style="width:81%;"/></td>
	            <td>其他</td>
	            <td><input readonly="readonly" type="text" class="input-pub" value="$rests$" style="width:81%;"/></td>
	        </tr>
	        <tr>
	            <td>患者姓名</td>
	            <td><input readonly="readonly" type="text" class="input-pub" value="$patientname$" style="width:81%;"/></td>
	            <td>性别</td>
	            <td><input readonly="readonly" type="text" class="input-pub" value="$sex$" style="width:81%;"/></td>
	            <td>年龄</td>
	            <td><input readonly="readonly" type="text" class="input-pub" value="$age$" style="width:81%;"/></td>
	        </tr>
	        <tr>
	            <td>出生日期</td>
	            <td><input readonly="readonly" type="text" class="input-pub" value="$birthdate$" style="width:81%;"/></td>
	            <td>婚姻状况</td>
	            <td><input readonly="readonly" type="text" class="input-pub" value="$marriage$" style="width:81%;"/></td>
	            <td>职业</td>
	            <td><input readonly="readonly" type="text" class="input-pub" value="$patientjob$" style="width:81%;"/></td>
	        </tr>
	        <tr>
	            <td>家庭住址</td>
	            <td colspan="3"><input readonly="readonly" type="text" class="input-pub" value="$family$" style="width: 92%;"/></td>
	            <td>联系电话</td>
	            <td><input readonly="readonly" type="text" class="input-pub" value="$familyphone$" style="width:81%;"/></td>
	        </tr>
	        <tr>
	            <td>紧急联系人</td>
	            <td><input readonly="readonly" type="text" class="input-pub" value="$urgency$" style="width:81%;"/></td>
	            <td>关系</td>
	            <td><input readonly="readonly" type="text" class="input-pub" value="$relation$" style="width:81%;"/></td>
	            <td>联系电话</td>
	            <td><input readonly="readonly" type="text" class="input-pub" value="$urgencyphone$" style="width:81%;"/></td>
	        </tr>
	        <tr>
	            <td>患者过敏史</td>
	            <td colspan="5"><input readonly="readonly" type="text" class="input-pub" value="$allergy$" style="width: 95%;"/></td>
	        </tr>
	        <tr>
	            <td>主诉</td>
	            <td colspan="5"><input readonly="readonly" type="text" class="input-pub" value="$complain$" style="width: 95%;"/></td>
	        </tr>
	        <tr>
	            <td>现病史</td>
	            <td colspan="5"><input readonly="readonly" type="text" class="input-pub" value="$cashddisease$" style="width: 95%;"/></td>
	        </tr>
	        <tr>
	            <td>既往史</td>
	            <td colspan="5"><input readonly="readonly" type="text" class="input-pub" value="$pastdisease$" style="width: 95%;"/></td>
	        </tr>
	        <tr>
	            <td>初步诊断</td>
	            <td colspan="5"><input readonly="readonly" type="text" class="input-pub" value="$initialdiagnose$" style="width: 95%;"/></td>
	        </tr>
	        <tr>
	            <td>初步治疗计划</td>
	            <td colspan="5"><input readonly="readonly" type="text" class="input-pub" value="$initialplan$" style="width: 95%;"/></td>
	        </tr>
	        <tr>
	            <td>医嘱</td>
	            <td colspan="5"><input readonly="readonly" type="text" class="input-pub" value="$enjoin$" style="width: 95%;"/></td>
	        </tr>
	        <tr>
	            <td>处方</td>
	            <td colspan="5"><input readonly="readonly" type="text" class="input-pub" value="$recipe$" style="width: 95%;"/></td>
	        </tr>
	    </table>
		<center>
	    	<button type="button" class="btn-info referral-btn show-btn">查看上级医院意见</button>
	    	<button type="button" class="btn-info" onclick="backNav()" style="color:#fff;">返回</button>
	    </center>
	    <div class="referral show-cont" style="margin-top: 10px;display: none;" id="optinion">
	        <p>同意贵院转诊申请。转诊安排如下：</p>
	        <table class="public-table">
	            <tr>
	                <th colspan="4" style="text-align: center;">转诊安排</th>
	            </tr>
	             <tr>
	                <td>转诊患者</td>
	                <td>$patientname$</td>
	                <td>初步诊断</td>
	                <td>$initialdiagnose$</td>
	            </tr>
	            <tr>
	                <td>受理医院</td>
	                <td>$planhospital$</td>
	                <td>受理时间</td>
	                <td>$finaldate$</td>
	            </tr>
	            <tr>
	                <td>受理医院联系电话</td>
	                <td>$nphon$</td>
	                <td>申请医院联系电话</td>
	                <td>$iphone$</td>
	            </tr>
	        </table>
	    </div>
	    <center id="cen1" style="display: none;">
	    	<button type="button" class="btn-info referral-btn show-btn1">向下转诊意见</button>
	    </center>
	     <div style="text-align:center;padding:10px;display:none;" id=pronation>
	    	<$textarea$ rows="4" style="width:98%;" class="input-pub">$pronation$</$textarea$>
	    </div>
	</textarea>
	<!--转诊申请审核表-->
	<textarea id="referralCheck">
		<div class="table1">
			<h3><a href="javascript:void(0);">转诊审核表</a></h3>
			<table class="referral-table odd public-table">
				<tr>
					<td colspan="4">一、申请转诊信息</td>
				</tr>
				<tr>
					<td>申请医院</td>
					<td>$hospitalname$</td>
					<td>申请医院电话</td>
					<td>$iphone$</td>
				</tr>
				<tr>
					<td>申请医生</td>
					<td>$applyname$</td>
					<td>转诊缘由</td>
					<td>$changereason$</td>
				</tr>
				<tr>
					<td>申请转诊时间</td>
					<td>$plantime$</td>
					<td>申请转诊科室</td>
					<td>$planchamber$</td>
				</tr>
			</table>
			<table class="referral-table odd public-table">
				<tr>
					<td colspan="4">二、转诊受理信息</td>
				</tr>
				<tr>
					<td>填报时间</td>
					<td>$applydate$</td>
					<td>申请医生</td>
					<td>$applyname$</td>
				</tr>
				<tr>
					<td>受理医院</td>
					<td>$planhospital$</td>
					<td>受理医院电话</td>
					<td>$nphone$</td>
				</tr>
				<tr>
					<td>受理时间</td>
					<td>$finaldate$</td>
					<td>拟受理科室</td>
					<td>$planchamber$</td>
				</tr>
				<tr>
					<td style="font-weight: bold; color: red;">确认转诊时间</td>
					<td colspan="3">
						<form id="form1">
							<input type="date" name="finalDate" id="finalDate" value="$finaldate$" style="width: 92%;">
						</form>
					</td>
				</tr>
			</table>
			<div class="footer-bottom">
				<button class="btn btn-modify hide">更改</button>
				<button class="btn btn-confirm hide" id="confirm">最终确认</button>
				<button class="btn btn-pub popupBtn " id="fenpei" >确认转诊时间</button>
				<button class="btn" onclick="backNav()" style="color:#fff;">返回</button>
			</div>
		</div>
		<div class="hide table2 print">
			<h3><a href="javascript:void(0);">双向转诊反馈表</a></h3>
			<table class="referral-table public-table">
				<tr>
					<td>申请转诊日期</td>
					<td>$applydate$</td>
					<td>最终确认转诊日期</td>
					<td>$finaldate$</td>
				</tr>
				<tr>
					<td>申请医院</td>
					<td>$hospitalname$</td>
					<td>转诊医院</td>
					<td>$planhospital$</td>
				</tr>
				<tr>
					<td>申请医生科室</td>
					<td>$chamber$</td>
					<td>转诊科室</td>
					<td>$planchamber$</td>
				</tr>
				<tr>
					<td>申请医生</td>
					<td>$applyname$</td>
					<td>受理医生</td>
					<td>待分配</td>
				</tr>
				<tr>
					<th colspan="4">转诊安排</th>
				</tr>
				<tr>
					<td>转诊患者</td>
					<td>$patientname$</td>
					<td>初步诊断</td>
					<td>$initialdiagnose$</td>
				</tr>
				<tr>
					<td>申请医院联系电话</td>
					<td>$iphone$</td>
					<td>管理医院联系电话</td>
					<td>$nphone$</td>
				</tr>
			</table>
		</div>
		<div class="footer-bottom qwe hide">
			<button class="btn btn-print" id="btn">打印</button>
			<button class="btn" id="btn2">向下转诊</button>
			<button class="btn" onclick="backNav()" style="color:#fff;">返回</button>
		</div>
		<div style="text-align: center; padding: 10px; display: none;" id="btn3">
			<$textarea$ rows="4" style="width: 98%;" id="pronation" name="pronation" class="input-pub">$pronation$</$textarea$>
			<button type="button" id="btn4" class="btn btn-info">提交</button>
		</div>
	</textarea>
	<!--基础信息-->
	<textarea id="base">
		<p>医院基本信息</p>
		<table class="table">
			<tr>
				<td class="table-td">医院名称</td>
				<td><input type="text" readOnly="readOnly" class="input-pub" style="" name="hospitalName" id="hospitalName" value="$hospitalname$" /></td>
				<td class="table-td">医院地址</td>
				<td colspan="3"><input type="text" readOnly="readOnly" class="input-pub" name="hospitalSite" id="hospitalSite" value="$hospitalsite$" /></td>
			</tr>
			<tr>
				<td class="table-td">成立时间</td>
				<td><input type="text" readOnly="readOnly" class="input-pub" name="setupTime" id="setupTime" value="$setuptime$" /></td>
				<td class="table-td">主要科室</td>
				<td id="office"><input type="text" readOnly="readOnly" class="input-pub" name="chamber" value="$chamber$" /></td>
				<td class="table-td">特色专科</td>
				<td><input type="text" readOnly="readOnly" class="input-pub" name="feature" value="$feature$" /></td>
			</tr>
			<tr>
				<td class="table-td">性质</td>
				<td>
					<input type="text" readOnly="readOnly" class="input-pub" name="nature" id="nature1" value="$nature$" />
				</td>
				<td class="table-td">等级</td>
				<td>
					<input type="text" readOnly="readOnly" class="input-pub" name="grade" id="grade1" value="$grade$" />
				</td>
				<td class="table-td">专科/综合</td>
				<td>
	                <input type="text" readOnly="readOnly" class="input-pub" name="synthesize" id="synthesize2" value="$synthesize$" />
				</td>
			</tr>
			<tr>
				<td class="table-td">在职人数</td>
				<td><input type="text" readOnly="readOnly" class="input-pub" name="beJobs" value="$bejobs$" /></td>
				<td class="table-td">高级职称</td>
				<td><input type="text" readOnly="readOnly" class="input-pub" name="advancedJob" value="$advancedjob$" /></td>
				<td class="table-td">中级职称</td>
				<td><input type="text" readOnly="readOnly" class="input-pub" name="middleJob" value="$middlejob$" /></td>
			</tr>
			<tr>
				<td class="table-td">院长姓名</td>
				<td><input type="text" readOnly="readOnly" class="input-pub" name="deanName" value="$deanname$" /></td>
				<td class="table-td">职称</td>
				<td><input type="text" readOnly="readOnly" class="input-pub" name="deanJob" value="$deanjob$" /></td>
				<td class="table-td">联系电话</td>
				<td><input type="text" readOnly="readOnly" class="input-pub" name="deanPhone" value="$deanphone$" /></td>
			</tr>
			<tr>
				<td class="table-td">科室负责人</td>
	            <td><input type="text" readOnly="readOnly" class="input-pub" name="chamberName" value="$chambername$" /></td>
				<td class="table-td">职称</td>
				<td><input type="text" readOnly="readOnly" class="input-pub" name="chamberJob" value="$chamberjob$" /></td>
	            <td class="table-td">联系电话</td>
	            <td><input type="text" readOnly="readOnly" class="input-pub" name="chamberPhone" value="$chamberphone$" /></td>
			</tr>
			<tr>
				<td class="table-td">财务负责人</td>
	            <td><input type="text" readOnly="readOnly" class="input-pub" name="financeName" value="$financename$" /></td>
				<td class="table-td">职称</td>
				<td><input type="text" readOnly="readOnly" class="input-pub" name="financeJob" value="$financejob$" /></td>
	            <td class="table-td">联系电话</td>
	            <td><input type="text" readOnly="readOnly" class="input-pub" name= "financePhone" value="$financephone$" /></td>
			</tr>
			<tr>
				<td class="table-td">开户银行</td>
	            <td><input type="text" readOnly="readOnly" class="input-pub" name="accBank" value="$accbank$" /></td>
	            <td class="table-td">开户账号</td>
	            <td><input type="text" readOnly="readOnly" class="input-pub" name="accnNmber" value="$accnnmber$" /></td>
	            <td class="table-td">开户名称</td>
	            <td><input type="text" readOnly="readOnly" class="input-pub" name="accName" value="$accname$" /></td>
			</tr>
		</table>
	</textarea>
	<!--基础信息审核详情-->
	<textarea id="baseReferral">
		<table class="table-border">
	        <caption><h3>基础信息 —— $hospitalname$</h3></caption>                          
	        <thead>
	            <tr>
	                <th style="text-align: left;" colspan="6">一、医院基本信息</th>                             
	            </tr>
	        </thead> 
	        <tbody>
	            <tr>
	                <td >医院名称</td>
	                <td colspan="3">$hospitalname$</td>
	                <td>性质</td>
	                <td>$nature$</td>
	            </tr>
	            <tr>
	                <td>医院地址</td>
	                <td colspan="3">$hospitalsite$</td>
	                <td>等级</td>
	                <td>$grade$</td>
	            </tr>
	            <tr>
	                <td>成立时间</td>
	                <td colspan="3">$setuptime$</td>
	                <td>专科/综合</td>
	                <td>$synthesize$</td>
	            </tr>
	            <tr>
	                <td>主要科室</td>
	                <td colspan="3">$chamber$ </td>
	                <td>特色专科</td>
	                <td>$feature$</td>
	            </tr>
	            <tr>
	                <td>在职人数</td>
	                <td>$bejobs$</td>
	                <td>高级职称</td>
	                <td>$advancedjob$</td>
	                <td>中级职称</td>
	                <td>$middlejob$</td>
	            </tr>
	            <tr>
	                <td>院长姓名</td>
	                <td>$deanname$</td>
	                <td>职称</td>
	                <td>$deanjob$</td>
	                <td>联系电话</td>
	                <td>$deanphone$</td>
	            </tr>
	            <tr>
	                <td>科室负责人</td>
	                <td>$chambername$</td>
	                <td>职称</td>
	                <td>$chamberjob$</td>
	                <td>联系电话</td>
	                <td>$chamberphone$</td>
	            </tr>
	            <tr>
	                <td>财务负责人</td>
	                <td>$financename$</td>
	                <td>职称</td>
	                <td>$financejob$</td>
	                <td>联系电话</td>
	                <td>$financephone$</td>
	            </tr>
	            <tr>
	                <td>开户银行</td>
	                <td>$accbank$</td>
	                <td>开户账号</td>
	                <td>$accnnmber$</td>
	                <td>开户名称</td>
	                <td>$accname$</td>
	            </tr>
	        </tbody>
	    </table>
	</textarea>
	<!--申请列表-->
	<textarea id="messagelist">
		<tr>
	    	<td>$applyId$</td>
	        <td>$hospitalname$$applyName$</td>
	        <td>$hospitalSite$</td>
	        <td>$nature$</td>
	        <td>$grade$</td>
	        <td>$synthesize$</td>
	        <td>$feature$$juniorId$</td>
	        <td><a href="$ahref$" id="infBtn1">$atext$</a></td>
	    </tr>
	</textarea>
	<!--建设申请审核详情-->
	<textarea id="applyReferral">
		<tr>
	        <th colspan="6">医联体会诊中心建设申请书</th>
	    </tr>
	    <tr>
	        <td>申请日期</td>
	        <td colspan="2">$applydate$</td>
	        <td>申请编号</td>
	        <td colspan="2">$applyid$</td>
	    </tr>
	    <tr>
	        <td>申请人</td>
	        <td colspan="5">$applyname$</td>
	    </tr>
	    <tr>
	        <td>申请专科</td>
	        <td colspan="5">
	            $juniorid$
	        </td>
	    </tr>
	    <tr>
	        <td>申请理由</td>
	        <td colspan="5" style="text-align: left;text-indent: 1em;">$applyreason$</td>
	    </tr>
	    <tr>
	        <td rowspan="$rowspan$">基础条件</td>
	        <td>专科医生数量</td>
	        <td>$doctors$</td>
	        <td colspan="2">该专科平均日门诊量</td>
	        <td>$averages$</td>
	    </tr>
	    <tr>
	        <td>高级职称人数</td>
	        <td>$technicals$</td>
	        <td colspan="2">该专科病床数</td>
	        <td>$beds$</td>
	    </tr>
	    <tr>
	        <td colspan="5">基础设备描述</td>
	    </tr>
	    <tr>
	        <td>设备名称</td>
	        <td>数量</td>
	        <td>型号</td>
	        <td>购置日期</td>
	        <td>备注</td>
	    </tr>
	    $equipmentMsg$
	</textarea>
	<!--建设申请审核意见-->
	<textarea id="applyReferralIdea">
		<tr>
			<td colspan="2">$hospitalname$审核意见</td>
		</tr>
		<tr>
			<td>$hospitalname$意见</td>
			<td><$textarea$ rows="7" id="idea" style="width: 96%;" name="manageIdea">同意贵院的医联体建设的申请。</$textarea$></td>
		</tr>
	</textarea>
	<!--医生列表-->
	<textarea id="doctor">
		<tr>
			<td>$docnum$$id$</td>
			<td>$docname$$name$</td>
			<td>$chamber$</td>
			<td>$phone$</td>
			<td>$times$</td>
			<td>$date$$lastdate$</td>
			<td>$status$$statu$</td>
			<td>$ahref$</td>
		</tr>
	</textarea>
	<!--医生信息修改-->
	<textarea id="doccheck">
		<table id="table" class="table public-table">
			<tr>
				<td>医生编号</td>
				<td><input type="text" class="input-pub" value="$docnum$$id$" style="width: 30%;" readonly="readonly"/></td>
			</tr>
			<tr>
				<td>医生姓名</td>
				<td><input type="text" class="input-pub" name="$names$" value="$docname$$name$" style="width: 30%;"/></td>
			</tr>
			<tr>
				<td>专科</td>
				<td><input type="text" class="input-pub" value="$chamber$" style="width: 30%;" readonly="readonly"/></td>
			</tr>
			<tr>
				<td>职称</td>
				<td><input type="text" class="input-pub" value="$job$" style="width: 30%;"/></td>
			</tr>
			<tr>
				<td>所属医院</td>
				<td><input type="text" class="input-pub" name="affiliatedhospital" value="$affiliatedhospital$" style="width: 30%;"/></td>
			</tr>
			<tr>
				<td>联系电话</td>
				<td><input type="text" class="input-pub" name="phone" value="$phone$" style="width: 30%;" maxlength="11" /></td>
			</tr>
			<tr>
				<td>登录次数</td>
				<td><input type="text" class="input-pub" value="$times$" style="width: 30%;" readonly="readonly"/></td>
			</tr>
			<tr>
				<td>最后登录日期</td>
				<td><input type="text" class="input-pub" value="$date$$lastdate$" style="width: 30%;" readonly="readonly"/></td>
			</tr>
			<tr>
				<td>状态</td>
				<td><input type="text" class="input-pub" value="$status$$statu$" style="width: 30%;" readonly="readonly"/></td>
			</tr>
		</table>
	</textarea>
	<!--专家资料修改-->
	<textarea id="account">
		<table id="table" class="table public-table">
			<tr>
				<td>医生姓名</td>
				<td><input type="text" class="input-pub" name="docname" value="$docname$" style="width: 30%;"/></td>
			</tr>
			<tr>
				<td>联系电话</td>
				<td><input type="text" class="input-pub" name="phone" value="$phone$" style="width: 30%;" maxlength="11" /></td>
			</tr>
			<tr>
				<td>所属医院</td>
				<td><input type="text" class="input-pub" name="affiliatedhospital" value="$affiliatedhospital$" style="width: 30%;"/></td>
			</tr>
		</table>
	</textarea>`;
export default data;//default输出不能在输出的同时声明变量