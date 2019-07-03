//在页面显示聊天内容
function showMessage(str, type) {
    var ul = document.getElementById('chattor');
    var li = document.createElement("LI");
    li.innerHTML = str;
    if (type == "inform") {
        li.style.color = "red";
    }
    document.getElementById("chattor").appendChild(li);
    ul.scrollTop = ul.scrollHeight;
}

var username = ''
function choose_user(user) {
    username = user
    var div = document.getElementById('toname');
    div.innerHTML = user;
    console.log(username)
}


function connect() {
    //新建一个websocket
    var websocket = new WebSocket("ws://10.251.128.207:3000");
    //打开websocket连接
    websocket.onopen = function () {
        console.log('已经连上服务器----')
        document.getElementById("btnConnect").value = "成功";
        document.getElementById("btnConnect").disabled = true;
        document.getElementById("submitBtn").onclick = function () {
            var txt = document.getElementById("sendMsg").value;
            if (txt && username) {
                var message = {}
                message.type = "client"
                message.user = username
                message.data = txt
                showMessage(message.data, message.type)
                //向服务器发送数据
                websocket.send(JSON.stringify(message));
            }
        }
    }
    //关闭连接
    websocket.onclose = function () {
        console.log("websocket close");
    }
    //接收服务器返回的数据
    websocket.onmessage = function (e) {
        console.log(e.data)
        var mes = JSON.parse(e.data)
        console.log(mes)
        if (mes.type == 'name') {
            document.title = mes.data;
        }
        else{
            showMessage(mes.data, mes.type);
        }        
    }
}
