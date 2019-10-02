function f$(argument){
	document.onreadystatechange = function () {
		if (document.readyState == 'complete') {
			(typeof argument == 'function')&& argument();
		}
	}
}
f$(function (){
	var btn = document.getElementsByTagName('button');
	var form = document.getElementById('shenghua');
	var formTitle = form.getElementsByTagName('h2')[0];
	var itemCont = form.getElementsByTagName('input');
	form.onkeydown = function (ev) {
		var target = ev.target || ev.srcElement;
		if (target.nodeName.toLocaleLowerCase() == 'input') {
			var liCont = target.parentNode.innerHTML.trim();
			var startIndex = 0,startCont = '',endIndex = 0,endCont = '';
			if (liCont.indexOf('value="') != -1) {
				startIndex = liCont.indexOf('value="')+7;
				startCont = liCont.substr(0,startIndex);
				endIndex = liCont.indexOf('"',startIndex);
				endCont = liCont.substr(endIndex);
			} else if (liCont.indexOf('value') != -1) {
				startIndex = endIndex = liCont.indexOf('value')+5;
				startCont = liCont.substr(0,startIndex);
				endCont = liCont.substr(endIndex);
			} else{
				startCont = liCont.substr(0,liCont.length-1) + ' value="';
				endCont = '" /' + liCont.substr(liCont.length-1);//斜杠是浏览器默认去除的
			}
			target.onchange = function () {
				var endValue = target.value;
				changeHtml = startCont + endValue.trim() + endCont;
				if(changeHtml!=liCont){
					target.parentNode.innerHTML = changeHtml;
					console.log('change')
				}
			}
		}
	}
	btn[0].onclick = function () {
		var obj = form.innerHTML.trim();
		var title = formTitle.innerText;
		localStorage.setItem(title,obj);
		var html = localStorage.getItem(title);
	}
})
