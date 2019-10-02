accessid = 'LTAIFSHcWupSdU9C';
accesskey = 'HefnQDo4RGM9NXpWMACA62K9UAs1MR';
host = 'https://imuts.oss-cn-shenzhen.aliyuncs.com';

g_dirname = ''
g_object_name = ''
g_object_name_type = ''
now = timestamp = Date.parse(new Date()) / 1000;
var del = document.getElementById("delete");
var policyText = {
	"expiration": "2020-01-01T12:00:00.000Z", //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
	"conditions": [
		["content-length-range", 0, 2000] // 设置上传文件的大小限制
	]
};

var policyBase64 = Base64.encode(JSON.stringify(policyText))
message = policyBase64
var bytes = Crypto.HMAC(Crypto.SHA1, message, accesskey, {
	asBytes: true
});
var signature = Crypto.util.bytesToBase64(bytes);

function check_object_radio() { //选择本地名上传还是随机名上传
	var tt = document.getElementsByName('myradio');
	for(var i = 0; i < tt.length; i++) {
		if(tt[i].checked) {
			g_object_name_type = tt[i].value;
			break;
		}
	}
}

function get_dirname() {//选择文件夹
	dir = document.getElementById("dirname").value;
	if(dir != '' && dir.indexOf('/') != dir.length - 1) {
		dir = dir + '/'
	}
	//alert(dir)
	g_dirname = dir
}

function random_string(len) {　　
	len = len || 32;　　
	var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';　　
	var maxPos = chars.length;
	var pwd = '';　　
	for(i = 0; i < len; i++) {　　
		pwd += chars.charAt(Math.floor(Math.random() * maxPos));
	}
	return pwd;
}

function get_suffix(filename) {
	pos = filename.lastIndexOf('.')
	suffix = ''
	if(pos != -1) {
		suffix = filename.substring(pos)
	}
	return suffix;
}

function calculate_object_name(filename) {
	if(g_object_name_type == 'local_name') {
		g_object_name += "${filename}"
	} else if(g_object_name_type == 'random_name') {
		suffix = get_suffix(filename)
		g_object_name = g_dirname + random_string(10) + suffix
	}
	return ''
}

function get_uploaded_object_name(filename) {
	if(g_object_name_type == 'local_name') {
		tmp_name = g_object_name
		tmp_name = tmp_name.replace("${filename}", filename);
		return tmp_name
	} else if(g_object_name_type == 'random_name') {
		return g_object_name
	}
}

function set_upload_param(up, filename, ret) {
	g_object_name = g_dirname;
	if(filename != '') {
		suffix = get_suffix(filename)
		calculate_object_name(filename)
	}
	new_multipart_params = {
		'key': g_object_name,
		'policy': policyBase64,
		'OSSAccessKeyId': accessid,
		'success_action_status': '200', //让服务端返回200,不然，默认会返回204
		'signature': signature,
	};

	up.setOption({
		'url': host,
		'multipart_params': new_multipart_params
	});

	up.start();
}

function hasFile(files,file) {
	for (var i=0;i<files.length;i++) {
		if (files[i]==file) {
			return true;
		}
	}
	return false;
}

var uploader = new plupload.Uploader({
	runtimes: 'html5,flash,silverlight,html4',
	browse_button: 'selectfiles',
//	multi_selection: false,
	container: document.getElementById('container'),
	flash_swf_url: 'lib/plupload-2.1.2/js/Moxie.swf',
	silverlight_xap_url: 'lib/plupload-2.1.2/js/Moxie.xap',
	url: 'http://imuts.oss-cn-shenzhen.aliyuncs.com',

	init: {
		PostInit: function(up) {//初始化页面
			up.oldFiles = [];
			console.log(up)
			document.getElementById('ossfile').innerHTML = '';
			document.getElementById('postfiles').onclick = function() {
				set_upload_param(uploader, '', false);
				return false;
			};
		},

		FilesAdded: function(up, files) {//添加上传文件
			plupload.each(files, function(file) {
				var upfiles = up.oldFiles;
				if (!hasFile(upfiles,file)) {
					up.oldFiles.push(file);
					document.getElementById('ossfile').innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ')<b></b>' +
						'<div class="progress"><div class="progress-bar" style="width: 0%"></div></div>' +
						'<input type="checkbox" name="checkbox" value='+JSON.stringify(file)+' />' +
						'</div>';
				}
			});
			del.onclick = function () {
				var ipts = document.getElementsByName('checkbox');
				plupload.each(ipts, function (ipt) {
					if (ipt.checked) {
						up.removeFile(JSON.parse(ipt.value))
					}
				})
			}
		},
		
		FilesRemoved: function (up, files) {
			console.log(files);
			console.log(up);
		},

		BeforeUpload: function(up, file) {//上传之前获取文件信息
			check_object_radio();
			get_dirname();
			set_upload_param(up, file.name, false);
		},

		UploadProgress: function(up, file) {//上传进度
			var d = document.getElementById(file.id);
			d.getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
			var prog = d.getElementsByTagName('div')[0];
			var progBar = prog.getElementsByTagName('div')[0]
			progBar.style.width = 2 * file.percent + 'px';
			progBar.setAttribute('aria-valuenow', file.percent);
		},

		FileUploaded: function(up, file, info) {//返回成功和失败的信息
			console.log(info.response);
			if(info.status == 200) {
			console.log(info.response);
				document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = 'upload to oss success, object name:' + get_uploaded_object_name(file.name);
			} else {
				document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response;
			}
		},

		Error: function(up, err) {//返回错误信息
			console.log(err.response);
			document.getElementById('console').appendChild(document.createTextNode("\nError xml:" + err.response));
		}
	}
});

uploader.init();