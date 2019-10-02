$(function() {
			var uploader = Qiniu.uploader({
				runtimes: 'html5,flash,html4',
				browse_button: 'pickfiles',
				drop_element: 'container',
				chunk_size: '4 mb',
				unique_names: true, // 默认 false，key为文件名。若开启该选项，SDK会为每个文件自动生成key（文件名） 
				save_key: true, // 默认 false。若在服务端生成uptoken的上传策略中指定了 sava_key，则开启，SDK在前端将不对key进行任何处理 
				uptoken_url: '.. / .. / service / upload / getQiNiuUoken',
				domain: 'http: //7q5e43.com2.z0.glb.qiniun.com', 
					container: 'container', //上传区域DOM ID，默认是browser_button的父元素， 
				max_file_size: '15 mb', //最大文件体积限制 
				flash_swf_url: 'qiniujs / plupload / Moxie.swf', //引入flash,相对路径 
				max_retries: 3, //上传失败最大重试次数 
				dragdrop: true, //开启可拖曳上传 
				auto_start: true, //选择文件后自动上传，若关闭需要自己绑定事件触发上传 
				init: {'
					FilesAdded': function(up, files) {
						plupload.each(files, function(file) {
							// 文件添加进队列后,处理相关的事情 
							var progress = new FileProgress(file, 'fsUploadProgress');
							progress.setStatus('等待…');
							progress.bindUploadCancel(up);
						});
					},
					'BeforeUpload': function(up, file) {
						// 每个文件上传前,处理相关的事情 
					},
					'UploadProgress': function(up, file) {
						// 每个文件上传时,处理相关的事情 
					},
					'UploadComplete': function() {
						//队列文件处理完毕后,处理相关的事情 
						$.messager.alert('提示', '上传成功！');
					},
					'FileUploaded': function(up, file, info) {
						// 每个文件上传成功后,处理相关的事情 
						// 其中 info 是文件上传成功后，服务端返回的json，形式如 
						//{ hash='Ft976dxPRnGHeDrKaMfOmOTfIXLQ', key='Ft976dxPRnGHeDrKaMfOmOTfIXLQ'} 
						var res = JSON.parse(info);
						var sourceLink = 'http: //7q5e43.com2.z0.glb.qiniucdn.com/' + res.key; //获取上传成功后的文件的Url 
							var onePic = ('#onePic').val();
						var twoPic = ('#twoPic').val();
						var threePic = ('#threePic').val();
						var fourPic = ('#fourPic').val();
						var fivePic = ('#fivePic').val();
						if(onePic == null || onePic == ') {
							('#picCount').val(1);
							('#onePic').val(sourceLink);
							('#img1').html('');
						} else if(twoPic == null || twoPic == ') {
							('#picCount').val(2);
							('#twoPic').val(sourceLink);
							$('#img2').html('');
						} else if(threePic == null || threePic == ') {
							('#picCount').val(3);
							('#threePic').val(sourceLink);
							$('#img3').html('');
						} else if(fourPic == null || fourPic == ') {
							('#picCount').val(4);
							('#fourPic').val(sourceLink);
							$('#img4').html('');
						} else if(fivePic == null || fivePic == ') {
							('#picCount').val(5);
							('#fivePic').val(sourceLink);
							$('#img5').html('');
						}
					},
					'Error': function(up, err, errTip) {
						alert(err);
					},
					'Key': function(up, file) {
						// 若想在前端对每个文件的key进行个性化处理，可以配置该函数 
						// 该配置必须要在 unique_names: false , save_key: false 时才生效 
						var key = '';
						// do something with key here 
						return key;
					}
				}
			});