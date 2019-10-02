/**
 * HTML布局
 * 	<div class="fileOne">
 * 		<h2>病历资料上传</h2>
 * 		<div id="container1">
 * 			<a id="selectfiles1" href="javascript:void(0);" class='file-btn'><i class="icon-btn selfile-btn"></i>选择文件</a>
 * 			<a class="selectall file-btn" href="javascript:void(0);"><i class="icon-btn all-btn"></i>全选</a>
 * 			<a class="inverse file-btn" href="javascript:void(0);"><i class="icon-btn invert-btn"></i>反选</a>
 * 			<a class="uncheck file-btn" href="javascript:void(0);"><i class="icon-btn uncheck-btn"></i>不选</a>
 * 			<a class="delete file-btn" href="javascript:void(0);"><i class="icon-btn del-btn"></i>删除</a>
 * 		</div>
 * 		<div id="historyurl" class="pro-btn fixed">你的浏览器不支持flash,Silverlight或者HTML5！</div>
 * 	</div>
 */
$(function() {
	(function() {
		var onoffconsole = $.onoffconsole,
			ossfilestatu = new Object(),
			listurl = new Object(),
			onoffscroll = true,
			setUploadParam;

		/**
		 * @param {Object} option (传obj对象)：下面是对象的属性和方法
		 * @param {String} selectfiles (select file Id)
		 * @param {String} container (button containers Id)
		 * @param {String} ossfile (File containers Id)
		 * @param {String} maxfilesize (max file size)
		 * @param {String} dir (file path)
		 * @param {String} filename (文件命名方式。参数：local_name 本地文件名|random_name 随机文件名)
		 * @param {function} initCb (init callback) 函数返回值可用于判断是否上传;布尔值：true上传，false不上传;默认是上传的
		 * @param {function} FilesAddedCb (Files Added callback)
		 * @param {function} FilesRemovedCb (Files Removed callback)
		 * @param {function} BeforeUploadCb (Before Upload callback)
		 * @param {function} UploadProgressCb (Upload Progress callback)
		 * @param {function} FileUploadedCb (File Uploaded callback)
		 * @param {function} UploadCompleteCb (Upload Complete callback)
		 * @param {function} ErrorCb (Error callback)
		 */
		function upload(option) {
			ossfilestatu[option.ossfile + 'statu'] = 0;
			listurl[option.ossfile] = new Array();
			var accessid = 'LTAIFSHcWupSdU9C';
			var accesskey = 'HefnQDo4RGM9NXpWMACA62K9UAs1MR';
			var host = 'https://imuts.oss-cn-shenzhen.aliyuncs.com';

			var g_dirname = ''
			var g_object_name = ''
			var g_object_name_type = ''
			var now = timestamp = Date.parse(new Date()) / 1000;
			var policyText = {
				"expiration": "2020-01-01T12:00:00.000Z", //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
				"conditions": [
					["content-length-range", 0, 2048000000] // 设置上传文件的大小限制
				]
			};

			var policyBase64 = Base64.encode(JSON.stringify(policyText));
			var message = policyBase64;
			var bytes = Crypto.HMAC(Crypto.SHA1, message, accesskey, {
				asBytes: true
			});
			var signature = Crypto.util.bytesToBase64(bytes);

			var stopfiles = document.getElementById("stopfiles") || {};
			stopfiles.addEventListener && stopfiles.addEventListener('click', function() { //暂停上传队列文件
				uploader.stop();
			});

			var selectall = document.getElementById(option.container).getElementsByClassName("selectall")[0] || {};
			selectall.addEventListener && selectall.addEventListener('click', function() { //全选上传队列文件
				var ipts = document.getElementById(option.ossfile).getElementsByTagName('input');
				plupload.each(ipts, function(ipt) {
					ipt.checked = true;
				});
			});

			var inverse = document.getElementById(option.container).getElementsByClassName("inverse")[0] || {};
			inverse.addEventListener && inverse.addEventListener('click', function() { //反选上传队列文件
				var ipts = document.getElementById(option.ossfile).getElementsByTagName('input');
				plupload.each(ipts, function(ipt) {
					if(ipt.checked) {
						ipt.checked = false;
					} else {
						ipt.checked = true;
					}
				});
			});

			var uncheck = document.getElementById(option.container).getElementsByClassName("uncheck")[0] || {};
			uncheck.addEventListener && uncheck.addEventListener('click', function() { //不选上传队列文件
				var ipts = document.getElementById(option.ossfile).getElementsByTagName('input');
				plupload.each(ipts, function(ipt) {
					ipt.checked = false;
				});
			});

			var del = document.getElementById(option.container).getElementsByClassName("delete")[0] || {};
			del.addEventListener && del.addEventListener('click', function() { //删除上传队列文件
				var ipts = document.getElementById(option.ossfile).getElementsByTagName('input'),
					arrIpt = [];
				plupload.each(ipts, function(ipt) {
					arrIpt.push(ipt);
				});
				plupload.each(arrIpt, function(ipt) {
					var files = uploader.files;
					for(var i = 0; i < files.length; i++) {
						if(ipt.checked && files[i].id == ipt.value) {
							uploader.removeFile(files[i]);
							uploader.oldFiles.splice(i, 1);
							break;
						}
					}
				});
			});

			function check_object_radio() { //选择本地名上传还是随机名上传
				//local_name 本地文件名		random_name 随机文件名
				var filename = option.filename;
				g_object_name_type = filename;
			}

			function get_dirname() { //选择文件夹（存放路径）
				dir = option.dir;
				if(dir != '' && dir.indexOf('/') != dir.length - 1) {
					dir = dir + '/'
				}
				//alert(dir)
				g_dirname = dir
			}
			//随机命名函数
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
			//获取文件后缀
			function get_suffix(filename) {
				pos = filename.lastIndexOf('.');
				suffix = '';
				if(pos != -1) {
					suffix = filename.substring(pos);
				}
				return suffix;
			}

			function calculate_object_name(filename) {
				if(g_object_name_type == 'local_name') {
					g_object_name += "${filename}";
				} else if(g_object_name_type == 'random_name') {
					suffix = get_suffix(filename);
					g_object_name = g_dirname + random_string(10) + suffix;
				}
				return '';
			}

			function get_uploaded_object_name(filename) {
				if(g_object_name_type == 'local_name') {
					tmp_name = g_object_name;
					tmp_name = tmp_name.replace("${filename}", filename);
					return tmp_name;
				} else if(g_object_name_type == 'random_name') {
					return g_object_name;
				}
			}

			function set_upload_param(up, filename, ret) {
				g_object_name = g_dirname;
				if(filename != '') {
					suffix = get_suffix(filename);
					calculate_object_name(filename);
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

			function hasFile(files, file) {
				var endfor = false;
				var reg = new RegExp('(function)|(object)|(id)', 'g');
				for(var i = 0; i < files.length; i++) {
					for(attr in files[i]) {
						if(!reg.test(typeof files[i][attr]) && !reg.test(attr)) {
							if(files[i][attr] == file[attr]) {
								console.log(attr, files[i][attr] == file[attr], typeof files[i][attr]);
								continue;
							} else {
								endfor = true;
							}
						}
					}
					if(endfor) {
						break;
					}
					return true;
				}
				return false;
			}

			var maxfilesize = option.maxfilesize;
			var uploader = new plupload.Uploader({ //实例化对象
				runtimes: 'html5,flash,silverlight,html4',
				browse_button: option.selectfiles,//选择文件按钮
				multi_selection: true,//是否多选
				prevent_duplicates: true,//是否去重
				container: document.getElementById(option.container),
				flash_swf_url: 'Moxie.swf',
				silverlight_xap_url: 'Moxie.xap',
				url: 'http://imuts.oss-cn-shenzhen.aliyuncs.com',
				'filters': {
					max_file_size: maxfilesize
				},

				init: {
					PostInit: function(up) { //初始化页面
						var returnval = null;
						up.oldFiles = [];
						document.getElementById(option.ossfile).innerHTML = '';
						document.getElementById(option.selectfiles).addEventListener('click', function() {
							//判断是否有不符合要求的文件
							if(up.errfilename) {
								up.errfilename.splice(0, up.errfilename.length);
							};
						});
						setUploadParam = function(uploader) {
							set_upload_param(uploader, '', false);
						}
						typeof option.initCb === 'function' && (returnval = option.initCb(up));
						if(returnval != undefined && !returnval) {
							return false;
						}
						setUploadParam(uploader);
					},

					FilesAdded: function(up, files) { //添加上传文件
						var strName = '',
							arrfiles = [];
						plupload.each(files, function(file) {
							var upfiles = up.oldFiles;
							if(!hasFile(upfiles, file)) {
								if(file.name.length <= 20) {
									up.oldFiles.push(file);
									ossfileele = document.getElementById(option.ossfile);
									ossfileele.innerHTML += '<div id="' + file.id + '">' +
										'<input type="checkbox" name="checkbox" value=' + file.id + ' />' +
										'<p title="' + file.name + ' (' + plupload.formatSize(file.size) + ')">' +
										file.name + ' (' + plupload.formatSize(file.size) + ')' +
										'</p>' +
										'<b></b>' +
										'<div class="progress">' +
										'<div class="progress-bar" style="width: 0%"></div>' +
										'</div>' +
										'</div>';
								} else {
									arrfiles.push(file);
									strName += '<p>' + file.name + '、</p>';
								}
							} else {
								up.removeFile(file);
							}
						});
						var ossfileeles = document.getElementById(option.ossfile).children;
						if(ossfileeles) {
							plupload.each(ossfileeles, function(ele) {
								//点击选中或未选中
								ele.addEventListener('click', function(e) {
									var ipt = this.getElementsByTagName('input')[0];
									checked(ipt);
								});
								var ipt = ele.getElementsByTagName('input')[0];
								ipt.addEventListener('click', function(e) {
									checked(ipt);
								});
							});

							function checked(ipt) {
								if(ipt.checked) {
									ipt.checked = false;
								} else {
									ipt.checked = true;
								}
							}
						}
						if(strName) {
							plupload.each(arrfiles, function(file) {
								up.removeFile(file);
							});
							Showbo.Msg.alert('<p>以下文件名字超过20个字符:</p>' + strName);
						}
						typeof option.FilesAddedCb === 'function' && option.FilesAddedCb(up, files);
					},

					FilesRemoved: function(up, files) { //删除文件回调
						plupload.each(files, function(file) {
							var delEle = document.getElementById(file.id);
							delEle && delEle.parentNode.removeChild(delEle);
						});
						typeof option.FilesRemovedCb === 'function' && option.FilesRemovedCb(up, files);
					},

					BeforeUpload: function(up, file) { //上传之前获取文件信息回调
						check_object_radio();
						get_dirname();
						set_upload_param(up, file.name, false);
						typeof option.BeforeUploadCb === 'function' && option.BeforeUploadCb(up, file);
					},

					UploadProgress: function(up, file) { //上传进度回调
						var d = document.getElementById(file.id);
						if(d) {
							d.getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
							var prog = d.getElementsByTagName('div')[0];
							var progBar = prog.getElementsByTagName('div')[0];
							progBar.style.width = 2 * file.percent + 'px';
							progBar.setAttribute('aria-valuenow', file.percent);
						}
						typeof option.UploadProgressCb === 'function' && option.UploadProgressCb(up, file);
					},

					FileUploaded: function(up, file, info) { //返回成功和失败的信息回调
						if(info.status == 200) {
							listurl[option.ossfile].push(g_dirname + file.name);
						} else {
							document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response;
						}
						typeof option.FileUploadedCb === 'function' && option.FileUploadedCb(up, file, info);
					},

					UploadComplete: function(up, files) { //所有文件上传完成触发回调
						typeof option.UploadCompleteCb === 'function' && option.UploadCompleteCb(up, files);
					},

					Error: function(up, err) { //返回错误信息回调
						if(err.code == -600) {
							up.errfilename = up.errfilename ? up.errfilename : new Array();
							up.errfilename.push(err.file.name);
							Showbo.Msg.alert('<p>文件超过上传大小(' + maxfilesize + '):</p><p>' + up.errfilename.join('</p><p>') + '</p>');
						}
						if(err.code == -602) {
							up.errfilename = up.errfilename ? up.errfilename : new Array();
							up.errfilename.push(err.file.name);
							Showbo.Msg.alert('<p>文件重复:</p><p>' + up.errfilename.join('</p><p>') + '</p>');
						}
						typeof option.ErrorCb === 'function' && option.ErrorCb(up, err);
					}
				}
			});
			uploader.init();
		}
	})();
});