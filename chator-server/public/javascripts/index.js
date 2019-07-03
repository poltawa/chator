var group = ''
var username = ''

//新建一个websocket
var websocket = new WebSocket("ws://localhost:3000");
console.log(websocket)
//打开websocket连接
websocket.onopen = function () {
    console.log('已经连上服务器----')
    document.getElementById("submitBtn").onclick = function () {
        var txt = document.getElementById("sendMsg").value;
        var message = {}
        message.user = username
        message.data = txt
        if (username == '') {
            message.type = "group"
            var tmp="群发："+username+txt
            showMessage(tmp)
        }
        else {
            message.type = "single"
            var tmp="to "+username+"："+txt
            showMessage(tmp)
        }       
        //向服务器发送数据
        websocket.send(JSON.stringify(message));
    }
}

//关闭连接
websocket.onclose = function () {
    console.log("websocket close");
}
//接收服务器返回的数据
websocket.onmessage = function (e) {
    console.log(e.data)
    showMessage(e.data)
    // var mes = e.data
    // if(mes!='admin'){
    //     showMessage(mes);
    // }    
}

function showMessage(str) {
    var ul = document.getElementById('chattor');
    var li = document.createElement("LI");
    li.innerHTML = str;
    document.getElementById("chattor").appendChild(li);
    ul.scrollTop = ul.scrollHeight;
}

function choose_user(user) {
    var div = document.getElementById('toname');
    if (user == 'group') {
        div.innerHTML = '群发助手';
        group = 'group'
    }
    else {
        div.innerHTML = user;
        username = user
    }
}




