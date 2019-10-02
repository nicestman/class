$(function() {
	$('#btnLogin').on("click", function() {
		var b = $('#btnLogin')
		if(b.text() == 'Login') {
			b.text('Logout')
			do_login()
		} else {
			b.text('Login')
			do_logout()
		}
	})
	$('#btnCall').on("click", function() {
		var b = $('#btnCall')
		if(b.text() == 'Call') {
			b.text('End')
			do_call()
			check_join()
		} else {
			b.text('Call')
			do_end()
		}
	})
	var check_join = function(channelName) {
		if(!channelName) {
			channelName = $('#txtChannel').val()
		} else {
			$('#txtChannel').val(channelName)
		}

		var b = $('#btnJoin')
		if(b.text() == 'Join') {
			b.text('Leave')
			do_join(channelName)
		}
	}
	var check_leave = function() {
		var b = $('#btnJoin')
		if(b.text() != 'Join') {
			b.text('Join')
			do_leave()
		}
	}
	$('#btnJoin').on("click", function() {
		var b = $('#btnJoin')
		if(b.text() == 'Join') {
			b.text('Leave')
			do_join($('#txtChannel').val())
		} else {
			b.text('Join')
			do_leave()
		}
	})
	$('#btnSwitch').on("click", function() {
		var v1 = $('#txtAccount1').val()
		var v2 = $('#txtAccount2').val()
		$('#txtAccount1').val(v2)
		$('#txtAccount2').val(v1)
	})
	$('#btnInstMsg').on("click", function() {
		var peer = $('#txtAccount2').val()
		session.messageInstantSend(peer, 'hello world' + count++)
	})
	$('#btnMsg').on("click", function() {
		var peer = $('#txtAccount2').val()
		var msg = $('#txtMsg').val().trim()
		if(msg == '') {
			msg = 'hello world ' + count++
		}
		channel.messageChannelSend(msg)
	})
	//登录key
	var appId = 'E33D67E2B174495F8F7AB9E154713D5E'
	//构造信令基础类
	var signal = Signal(appId)
	//信令登录类
	var session
	//信令频道类
	var channel
	//信令呼叫类
	var call
	//用户的uid
	var g_uid
	var log = function(m) {
		console.log(m)
		$('#messages').append($('<li>').text(m))
		document.body.scrollTop = 1000 * 1000 * 1000
	}
	//session类
	var do_login = function() {
		//用户登录
		session = signal.login($('#txtAccount1').val(), '_no_need_token')
		//登录成功回调
		session.onLoginSuccess = function(uid) {
			log('login success ' + uid)
			g_uid = uid
		}
		//登录失败回调
		session.onLoginFailed = function(ecode) {
			log('login failed ' + ecode)
		}
		//用户登出回调
		session.onLogout = function(ecode) {
			log('logouted ' + ecode)
			$('#btnLogin').text('Login')
			$('#btnJoin').text('Join')
			$('#btnCall').text('Call')
			do_leave()
		}
		//收到消息的回调
		session.onMessageInstantReceive = function(account, uid, msg) {
			log('recv inst msg from ' + account + ' : ' + msg)
		}
		//收到呼叫邀请的回调
		session.onInviteReceived = function(call) {
			log('recv inst msg from ' + call.peer + ', ' + call.channelName + ', ' + call.extra)
			$('#btnCall').text('End')
			init_call(call)
			check_join(call.channelName)
		}
	}
	//用户登出
	var do_logout = function() {
		session.logout()
	}
	//call类
	var init_call = function(call) {
		//对方收到呼叫回调
		call.onInviteReceivedByPeer = function(extra) {
			log('call.onInviteReceivedByPeer ' + extra)
		}
		//对方接受呼叫回调
		call.onInviteAcceptedByPeer = function(extra) {
			log('call.onInviteAcceptedByPeer ' + extra)
		}
		//对方拒绝呼叫回调
		call.onInviteRefusedByPeer = function(extra) {
			log('call.onInviteRefusedByPeer ' + extra)
			clear_call()
		}
		//呼叫失败回调
		call.onInviteFailed = function(extra) {
			log('call.onInviteRefusedByPeer ' + extra)
			clear_call()
		}
		//对方结束呼叫回调
		call.onInviteEndByPeer = function(extra) {
			log('call.onInviteEndByPeer ' + extra)
			clear_call()
		}
		//本地结束呼叫回调
		call.onInviteEndByMyself = function(extra) {
			log('call.onInviteEndByMyself ' + extra)
			clear_call()
		}
		//本地收到消息回调
		call.onInviteMsg = function(extra) {
			log('call.onInviteMsg ' + extra)
		}
	}
	//呼叫断开离开频道
	var clear_call = function() {
		$('#btnCall').text('Call')
		check_leave()
	}
	//呼叫条件
	var do_call = function() {
		//频道名
		var channelName = $('#txtChannel').val()
		//被呼叫的用户
		var peer = $('#txtAccount2').val()
		log('call ' + peer + ' , channelName : ' + channelName + ', extra : ' + JSON.stringify({
			hi: 'from web'
		}))
		//邀请peer用户加入频道的方法
		call = session.channelInviteUser2(channelName, peer, JSON.stringify({
			hi: 'from web'
		}))
		init_call(call)
	}
	//结束通话
	var do_end = function() {
		log('End call')
		//call类结束通话的方法
		call.channelInviteEnd()
	}
	//channel类
	var do_join = function(name) {
		log('Joining channel ' + name)
		//加入频道
		channel = session.channelJoin(name)
		//加入频道成功回调
		channel.onChannelJoined = function() {
			log('channel.onChannelJoined')
		}
		//加入频道失败回调
		channel.onChannelJoinFailed = function(ecode) {
			log('channel.onChannelJoinFailed', ecode)
		}
		//离开频道回调
		channel.onChannelLeaved = function(ecode) {
			log('channel.onChannelLeaved')
		}
		//其他用户加入频道回调
		channel.onChannelUserJoined = function(account, uid) {
			log('channel.onChannelUserJoined ' + account + ' ' + uid)
		}
		//其他用户离开频道回调
		channel.onChannelUserLeaved = function(account, uid) {
			log('channel.onChannelUserLeaved ' + account + ' ' + uid)
		}
		//获取频道内用户列表回调
		channel.onChannelUserList = function(users) {
			log('channel.onChannelUserList ' + users)
		}
		//频道属性发生变化回调
		channel.onChannelAttrUpdated = function(type, k, v) {
			log('channel.onChannelAttrUpdated ' + type + ' ' + k + ' ' + v)
		}
		//收到频道消息回调
		channel.onMessageChannelReceive = function(account, uid, msg) {
			log('channel.onMessageChannelReceive ' + account + ' ' + uid + ' : ' + msg)
		}
		//调用视频通话函数
		do_join_media(appId, name, g_uid, true)
	}
	var do_leave = function() {
		if(channel) {
			//离开频道
			channel.channelLeave()
		}
		//离开视频通话
		do_leave_media()
	}
	var count = 0
	$('form').submit(function() {
		//发送频道消息
		channel.messageChannelSend($('#txtMsg').val())
		//设置频道属性
		channel.channelSetAttr('hello', count++)
		$('#txtMsg').val('')
		return false
	})
	// -------------- media part -----------------
	var agora_media, camera, microphone, localStream
	var do_join_media = function(appId, channelName, uid, ishost) {
		$('div#video').html('<div id="agora_local" class="video_view"></div>')
		var channelKey = null
		console.log("Init AgoraRTC client with vendor key: " + appId)
		agora_media = AgoraRTC.createClient({
			mode: 'interop'
		})
		// for dynamic key
		/*client.init(dynamic_key, function () {*/
		agora_media.init(appId, function() {
			console.log("AgoraRTC client initialized")
			agora_media.join(channelKey, channelName, uid, function(uid) {
				console.log("User " + uid + " join channel successfully")
				if(ishost) {
					//camera = videoSource.value
					//microphone = audioSource.value
					//localStream = AgoraRTC.createStream({streamID: uid, audio: true, cameraId: camera, microphoneId: microphone, video: document.getElementById("video").checked, screen: false})
					localStream = AgoraRTC.createStream({
						streamID: uid,
						audio: true,
						video: ishost,
						screen: false
					})
					if(ishost) {
						localStream.setVideoProfile('720p_3')
					}

					// The user has granted access to the camera and mic.
					localStream.on("accessAllowed", function() {
						console.log("accessAllowed")
					})

					// The user has denied access to the camera and mic.
					localStream.on("accessDenied", function() {
						console.log("accessDenied")
					})
					localStream.init(function() {
						console.log("getUserMedia successfully")
						localStream.play('agora_local')
						agora_media.publish(localStream, function(ecode) {
							console.log("Publish local stream error: " + ecode)
						})
						agora_media.on('stream-published', function(evt) {
							console.log("Publish local stream successfully")
						})
					}, function(ecode) {
						console.log("getUserMedia failed", ecode)
					})
				}
			}, function(ecode) {
				console.log("Join channel failed", ecode)
			})
		}, function(ecode) {
			console.log("AgoraRTC client init failed", ecode)
		})
		agora_media.on('stream-added', function(evt) {
			var stream = evt.stream
			console.log("New stream added: " + stream.getId())
			console.log("Subscribe ", stream)
			agora_media.subscribe(stream, function(ecode) {
				console.log("Subscribe stream failed", ecode)
			})
		})
		agora_media.on('stream-subscribed', function(evt) {
			var stream = evt.stream
			console.log("Subscribe remote stream successfully: " + stream.getId())
			if($('div#video #agora_remote' + stream.getId()).length === 0) {
				$('div#video').append('<div id="agora_remote' + stream.getId() + '" class="video_view"></div>')
			}
			stream.play('agora_remote' + stream.getId())
		})
		agora_media.on('stream-removed', function(evt) {
			var stream = evt.stream
			stream.stop()
			$('#agora_remote' + stream.getId()).remove()
			console.log("Remote stream is removed " + stream.getId())
		})
		agora_media.on('peer-leave', function(evt) {
			var stream = evt.stream
			stream.stop()
			$('#agora_remote' + stream.getId()).remove()
			console.log(evt.uid + " leaved from this channel")
		})
	}
	var do_leave_media = function() {
		agora_media.leave(function() {
			console.log("Leavel channel successfully")
			localStream.stop()
			localStream.close()
			$('div#video').html('<div id="agora_local" class="video_view"></div>')
		}, function(ecode) {
			console.log("Leave channel failed")
		})
	}
})