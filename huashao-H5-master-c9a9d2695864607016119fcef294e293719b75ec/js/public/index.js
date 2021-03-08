function GetQueryValue(queryName) { //获取url参数/
    var query = decodeURI(window.location.search.substring(1));
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == queryName) {
            return pair[1];
        }
    }
    return null;
}

function AndroidRouter(type, urlData, callback, setFun) { //安卓-IOS交互
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        window.webkit.messageHandlers[type].postMessage(urlData);
        if (callback !== undefined) {
            window[setFun] = callback
        }
    } else {
        window.WebViewJavascriptBridge.callHandler(
            type, urlData,
            function(res) {
                if (callback !== undefined) {
                    callback(res)
                }
            }
        )
    }
}
Vue.component('loadings', { //自定义loading组件
    template: "<div class='loadins' v-if='show'><img src='https://huashao.mx5918.com//huashao_h5/images/common/loading.gif'/></div>",
    data() {
        return {
            show: false
        }
    },
    methods: {
        openLoading() { //打开
            this.show = true
        },
        closedLoading() { //关闭
            this.show = false
        }
    }
});

function getTime(val) { //时间格式化
    var year = val.getFullYear()
    var month = val.getMonth() + 1
    var day = val.getDate()
    var hour = val.getHours()
    var minute = val.getMinutes()
    if (month >= 1 && month <= 9) {
        month = `0${month}`
    }
    if (day >= 1 && day <= 9) {
        day = `0${day}`
    }
    if (hour >= 0 && hour <= 9) {
        hour = `0${hour}`
    }
    if (minute >= 0 && minute <= 9) {
        minute = `0${minute}`
    }
    var dateTim = [year, month, day, hour, minute]
    return dateTim;
}

function formatters(type, value) { //格式化vant日期
    if (type === 'year') {
        return `${value}年`
    } else if (type === 'month') {
        return `${value}月`
    } else if (type === 'day') {
        return `${value}日`
    } else if (type === 'hour') {
        return `${value}时`
    } else if (type === 'minute') {
        return `${value}分`
    } else if (type === 'second') {
        return `${value}秒`
    }
    return value;
}

function unique(arr) { //数组去重
    var temp = []; //一个新的临时数组
    for (var i = 0; i < arr.length; i++) {
        if (temp.indexOf(arr[i]) == -1) {
            temp.push(arr[i]);
        }
    }
    return temp;
}

function arrObj(arr, keys) { //数组对象去重
    var result = [];
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
        if (!obj[arr[i][keys]]) {
            result.push(arr[i]);
            obj[arr[i][keys]] = true;
        }
    }
    return result;
}

function jump(myurl) { //唤起App
    var timeout = 1000,
        timer = null;
    if (GetMobelType().weixin) {
        vant.Dialog.alert({
            title: '中传花少下载',
            message: '请点击右上角在浏览器中打开',
        }).then(() => {
            // on close
        });
    } else {
        var startTime = Date.now();
        if (GetMobelType().android) {
            var ifr = document.createElement('iframe');
            ifr.src = myurl; //这里是唤起App的协议，有Android可爱的同事提供
            ifr.style.display = 'none';
            document.body.appendChild(ifr);
            timer = setTimeout(function() {
                var endTime = Date.now();
                if (!startTime || endTime - startTime < timeout + 300) {
                    document.body.removeChild(ifr);
                    // window.open("唤起失败跳转的链接");
                    window.location = "https://www.pgyer.com/Q6mH";
                }
            }, timeout);
        }
        if (GetMobelType().ios || GetMobelType().iPhone || GetMobelType().iPad) {
            if (GetMobelType().qq) { // ios的苹果浏览器
                vant.Dialog.alert({
                    title: '中传花少下载',
                    message: '请点击右上角在浏览器中打开',
                }).then(() => {
                    // on close
                });
            } else {
                window.location.href = myurl; //唤起协议，
                timer = setTimeout(function() {
                    window.location.href = "https://apps.apple.com/cn/app/%E7%AD%B9%E5%91%97/id1505688484?uo=4";
                }, timeout);
            };
        }
    }
}

function GetMobelType() { //兼容不同版本
    var browser = {
        versions: function() {
            var u = window.navigator.userAgent;
            return {
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                Alipay: u.indexOf('Alipay') > -1, //支付宝
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者安卓QQ浏览器
                //iPhone: u.match(/iphone|ipod|ipad/),//
                iPad: u.indexOf('iPad') > -1, //是否为iPad
                webApp: u.indexOf('Safari') == -1, //是否为web应用程序，没有头部与底部
                weixin: u.indexOf('MicroMessenger') > -1, //是否为微信浏览器
                qq: u.match(/\sQQ/i) !== null, //是否QQ
                Safari: u.indexOf('Safari') > -1,
                ///Safari浏览器,
            };
        }()
    };
    return browser.versions;
}

function iosReload() { //ios返回刷新
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        window.onpageshow = function(e) {
            if (e.persisted || (window.performance && window.performance.navigation.type == 2)) {
                window.location.reload()
            }
        }
    }
}








// var apiUrl = 'https://app.cuchuashao.com/index.php/'; //正式
// var pageUrl = "https://app.cuchuashao.com/" //正式
var apiUrl = 'https://huashao.mx5918.com/index.php/'; //测试
var pageUrl = "https://huashao.mx5918.com/" //测试

// let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0ZWFjaGVyX2lkIjoxMjcsImlzcyI6Imh0dHA6XC9cL2hhb2h1bHUubXg1OTE4LmNvbSIsImF1ZCI6Imh0dHA6XC9cL2hhb2h1bHUubXg1OTE4LmNvbSIsImlhdCI6MTYwMDA2NjA4NCwibmJmIjoxNjAwMDY2MDg0LCJleHAiOjE2MDA2NzA4ODR9.0aHvGtA-DPmp5p-LLGYfwiDgYEYClQFbL2FYYxWui3M';
function requests(api, type, data, callback) {
    $.ajax({
        url: apiUrl + api,
        type: type,
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            'key': localStorage.getItem("token")
        },
        dataType: "json",
        data: JSON.stringify(data),
        success: function(res) {
            var isjson = typeof(res) == "object" && Object.prototype.toString.call(res).toLowerCase() == "[object object]" &&
                !res.length;
            var resdata = ""
            if (isjson) {
                resdata = res
            } else {
                resdata = JSON.parse(res)
            }
            callback(resdata) //测试
            if (resdata.code == 21000) {
                vant.Toast("请登录")
                setTimeout(function() {
                    // localStorage.removeItem('token')
                    // AndroidRouter("loginOut", '')
                }, 1000)
            }
        },
        error: function(err) {

        }
    })
}

function ajax(api, type, data, callback) {
    var tokens = localStorage.getItem("token")
    if (tokens == null || tokens == '' || tokens == undefined) {
        AndroidRouter('getUserInfo', "", function setUserInfo(tok) {
            localStorage.setItem("token", tok)
        }, "setUserInfo")
        setTimeout(function() {
            requests(api, type, data, callback)
        }, 200)
    } else {
        requests(api, type, data, callback)
    }
};

// 上传图片
function ajaxUpload(api, type, data, callback) {
    $.ajax({
        url: api,
        type: type,
        data: data,
        headers: {
            'key': localStorage.getItem("token") == null ? '' : localStorage.getItem("token")
        },
        cache: false,
        processData: false,
        contentType: false,
        success: function(res) {
            var isjson = typeof(res) == "object" && Object.prototype.toString.call(res).toLowerCase() == "[object object]" && !res.length;
            var resdata = ""
            if (isjson) {
                resdata = res
            } else {
                resdata = JSON.parse(res)
            }
            callback(resdata) //测试

        },
        error: function(err) {
            vant.Toast("请求出错22")
        }
    })
};
//H5请求
function webajax(api, type, data, callback) {
    $.ajax({
        url: apiUrl + api,
        type: type,
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            'key': localStorage.getItem("token") == null ? '' : localStorage.getItem("token")
        },
        dataType: "json",
        data: JSON.stringify(data),
        success: function(res) {
            var isjson = typeof(res) == "object" && Object.prototype.toString.call(res).toLowerCase() == "[object object]" && !res.length;
            var resdata = ""
            if (isjson) {
                resdata = res
            } else {
                resdata = JSON.parse(res)
            }
            if (resdata.code == 21000) {
                // location.href = "../../student/shareLogin.html?type=2"
                setTimeout(function() {
                    location.href = pageUrl + "huashao_h5/pages/student/shareLogin.html?type=2"
                }, 500)
            }
            callback(resdata) //测试
        },
        error: function(err) {
            vant.Toast("请求出错33")
        }
    })
};

//同步请求
function ajaxs(api, type, data, callback) {
    var token = localStorage.getItem("token") == null ? '' : localStorage.getItem("token")
    $.ajax({
        url: apiUrl + api,
        type: type,
        async: false,
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            'key': token
        },
        dataType: "json",
        data: JSON.stringify(data),
        success: function(res) {
            var isjson = typeof(res) == "object" && Object.prototype.toString.call(res).toLowerCase() == "[object object]" && !res.length;
            var resdata = ""
            if (isjson) {
                resdata = res
            } else {
                resdata = JSON.parse(res)
            }
            if (resdata.code == 21000) {
                vant.Toast("请登录")
                setTimeout(function() {
                    localStorage.removeItem('token')
                    AndroidRouter("loginOut", '')
                }, 1000)
            }
            callback(resdata) //测试
        },
        error: function(err) {
            vant.Toast("请求出错44")
        }
    })
};