class SignalingClient{
    constructor(appid, appcertificate){
        this.signal = Signal(appid);
        this.channel = null;
        this.appid = appid;
        this.appcert = appcertificate;
        this.uid = null;
        this.localAccount = null;

        this.onMessageInstantReceive = null;
        this.onMessageChannelReceive = null;
    }

    login(account){
        let deferred = $.Deferred();
        let appid = this.appid;
        let appcert = this.appcert;
        Logger.log('Logging in ' + account);
        //starts login
        let session = this.signal.login(account, '_no_need_token');
        //if success
        session.onLoginSuccess = $.proxy(uid => {
            Logger.log('login success ' + uid);
            this.uid = uid;
            deferred.resolve();
        }, this);

        //if fail
        session.onLoginFailed = $.proxy(ecode => {
            Logger.log('login failed ' + ecode);
            this.session = null
            deferred.reject();
        }, this);

        session.onLogout = $.proxy(() => {
            window.location.href = 'index.html';
        })

        session.onMessageInstantReceive = $.proxy(this._onMessageInstantReceive, this);
        this.session = session;
        this.localAccount = account;

        return deferred.promise();
    }

    logout () {
        this.session.logout()
    }

    sendMessage(account, text){
        this.session.messageInstantSend(account, text);
    }

    broadcastMessage(text){
        this.channel && this.channel.messageChannelSend(text);
    }

    join(channelName){
        let deferred = $.Deferred()
        Logger.log(`Joining channel ${channelName}`);

        let channel = this.session.channelJoin(channelName);
        channel.onChannelJoined = _ => {
            Logger.log('channel.onChannelJoined');
            deferred.resolve();
        };
        
        channel.onChannelJoinFailed = ecode => {
            Logger.log(`channel.onChannelJoinFailed ${ecode}`);
            deferred.reject(ecode);
        };

        channel.onMessageChannelReceive = $.proxy(this._onMessageChannelReceive, this);
        this.channel = channel;

        return deferred.promise();
    }

    leave(){
        let deferred = $.Deferred();
        let channel = this.channel;

        if(channel === null){
            return deferred.resolve().promise();
        }

        channel.onChannelLeaved = $.proxy(ecode => {
            Logger.log('channel.onChannelLeaved');
            this.channel = null;
            deferred.resolve();
        }, this);
        channel.channelLeave();
        return deferred;
    }

    _onMessageInstantReceive(account, uid, msg){
        if(this.onMessageInstantReceive){
            this.onMessageInstantReceive(account, msg);
        }
    }

    _onMessageChannelReceive(account, uid, msg){
        if(this.onMessageChannelReceive && this.localAccount !== account){
            this.onMessageChannelReceive(this.channel.name, msg);
        }
    }
}