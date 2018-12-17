'use strict';        
if (typeof jQuery === "undefined") {
   var script = document.createElement('script');
   script.src = 'https://code.jquery.com/jquery-latest.min.js';
   script.type = 'text/javascript';
   document.getElementsByTagName('head')[0].appendChild(script);
}     
var _pushassist = {};

_pushassist.appkey		= "AIzaSyAExvLquLphb8ImrLNOz_jo_3F47n__LuQ";
_pushassist.vp_key		= 'BGNqHTsvqptW1HKT_LmdfUUYX-qClp5k_HKzzvXKoo1UqP7L4roL6-ZYHkeWiZfLw2zK1dFMQIZKpLjvt3Tpew0';
_pushassist.serverUrl	= "https://api2.pushassist.com";
_pushassist.safariServerUrl	= "https://pushassist.com/api";
_pushassist.Url			= "codingt.pushassist.com";
_pushassist.subdomain	= "codingt";
_pushassist.assetsURL	= "https://cdn.pushassist.com/account";
_pushassist.linkUrl		= "";
_pushassist.ipaddress	= "";
_pushassist.safariWebsitePushId = "web.com.pushassist.push";
_pushassist.brandingFlag = 0;
_pushassist.intervalTime = 5;

_pushassist.isEnabledUnsubscribedWidget = 0;
_pushassist.isEnabledUserInfo = 1;
_pushassist.widgetType = 0;    
_pushassist.widgetTitle = "Push Notification Preferences";

_pushassist.subscribeMessage    =   "Subscribe to Notification";
_pushassist.subscriberClick    =   "Subscribe";
_pushassist.subscriberSuccessMessage    =   "You will get notifications from us.";

_pushassist.unsubscribeMessage    =   "Opt out from Notification";
_pushassist.unsubscriberClick    =   "Unsubscribe";
_pushassist.unsubscriberSuccessMessage    =   "Successfully opted out from notification.";       
    
_pushassist.unsubscrubeButtonMessage = "Disable Automated Profiling";
_pushassist.subscrubeButtonMessage = "Enable Automated Profiling";    
    
_pushassist.confirmationWidget = "Are you sure?";
_pushassist.confirmationWidgetButtonYes = "Yes";
_pushassist.confirmationWidgetButtonNo = "No";
_pushassist.thankYouWidget = "Preference saved successfully";

var _pa;

function get_values() {

    var fontURL = "https://fonts.googleapis.com/css?family=Roboto:400,100,300",
    headfonts = document.getElementsByTagName("head")[0],
    fontlink = document.createElement("link");
    fontlink.rel = "stylesheet", fontlink.href = fontURL, headfonts.appendChild(fontlink);

    var cssUrl = "https://cdn1.pushassist.com/account/css/psa-notification.css",
    headcss = document.getElementsByTagName("head")[0],
    link = document.createElement("link");
    link.type = "text/css", link.rel = "stylesheet", link.href = cssUrl, headcss.appendChild(link);
    
    var parent = document.getElementsByTagName("script")[0];
    var manifest = document.createElement("link");
    manifest.rel = "manifest";
    manifest.href = "/manifest.json";

    var head = parent;
    head.parentNode.insertBefore(manifest,head);

    var script = document.createElement('script');
    script.src = 'https://api.ipify.org?format=jsonp&callback=getIP';
    script.type = 'application/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);
}

function push_assist_branding()
{
   if(Notification.permission === 'default') {

       jQuery("body").append(_pushassist.branding);

        if(is_mobile() === 0){				
       
            document.getElementById("psa_ssl_branding").addEventListener("click", function () {

               remove_psa_branding();
            });
       }
   }
}

function remove_psa_branding(){

    if(_pushassist.brandingFlag === 0){

       var n = document.getElementById("pushassist_notification_inner_wraper");
       n.remove();
   }
}

function getIP(json) {

    _pushassist.ipaddress = json.ip;
}

// mobile version
function is_mobile() {

    var nVer = navigator.appVersion;

    var mobile, is_mobile_user;

    mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);

    if (mobile === true) {

        is_mobile_user = 1;
    } else {

        is_mobile_user = 0;
    }

    return is_mobile_user;
}

function check_browser_version() {

    var nAgt = navigator.userAgent;
    var verOffset, version, ix, nameOffset, majorVersion;

    // Opera
    if ((verOffset = nAgt.indexOf('Opera')) != -1) {

        version = nAgt.substring(verOffset + 6);
        if ((verOffset = nAgt.indexOf('Version')) != -1) {
            version = nAgt.substring(verOffset + 8);
        }
    }
    // Opera Next
    if ((verOffset = nAgt.indexOf('OPR')) != -1) {

        version = nAgt.substring(verOffset + 4);
    }
    // Edge
    else if ((verOffset = nAgt.indexOf('Edge')) != -1) {

        version = nAgt.substring(verOffset + 5);
    }
    // MSIE
    else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {

        version = nAgt.substring(verOffset + 5);
    }
    // Chrome
    else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {

        version = nAgt.substring(verOffset + 7);
    }
    // Safari
    else if ((verOffset = nAgt.indexOf('Safari')) != -1) {

        version = nAgt.substring(verOffset + 7);
        if ((verOffset = nAgt.indexOf('Version')) != -1) {
            version = nAgt.substring(verOffset + 8);
        }
    }
    // Firefox
    else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {

        version = nAgt.substring(verOffset + 8);
    }
    // MSIE 11+
    else if (nAgt.indexOf('Trident/') != -1) {

        version = nAgt.substring(nAgt.indexOf('rv:') + 3);
    }
    // Other browsers
    else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {

        version = nAgt.substring(verOffset + 1);
    }
    // trim the version string
    if ((ix = version.indexOf(';')) != -1) version = version.substring(0, ix);
    if ((ix = version.indexOf(' ')) != -1) version = version.substring(0, ix);
    if ((ix = version.indexOf(')')) != -1) version = version.substring(0, ix);

    majorVersion = parseInt('' + version, 10);

    if (isNaN(majorVersion)) {
        version = '' + parseFloat(navigator.appVersion);
        majorVersion = parseInt(navigator.appVersion, 10);
    }

    return majorVersion;	//browser version
}

function check_browser() {

    var nAgt = navigator.userAgent;
    var verOffset, nameOffset, browser;

    // Opera
    if ((verOffset = nAgt.indexOf('Opera')) != -1) {
        browser = 'Opera';
    }
    // Opera Next
    if ((verOffset = nAgt.indexOf('OPR')) != -1) {
        browser = 'Opera';
    }
    // Edge
    else if ((verOffset = nAgt.indexOf('Edge')) != -1) {
        browser = 'Edge';
    }
    // MSIE
    else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
        browser = 'Explorer';
    }
    // Samsung
    else if (nAgt.match(/(SamsungBrowser)\/?\s*/i)) {
        browser = 'Samsung';
    }
    // Chrome
    else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
        browser = 'Chrome';
    }
    // Safari
    else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
        browser = 'Safari';
    }
    // Firefox
    else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
        browser = 'Firefox';
    }
    // MSIE 11+
    else if (nAgt.indexOf('Trident/') != -1) {
        browser = 'Internet Explorer 11';
    }
    // Other browsers
    else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
        browser = nAgt.substring(nameOffset, verOffset);

        if (browser.toLowerCase() == browser.toUpperCase()) {
            browser = navigator.appName;
        }
    }

    return browser;
}

function browser_compatible() {

    if ("Chrome" === check_browser() || "Samsung" === check_browser()) {

        return "Notification" in window && "serviceWorker" in navigator && "showNotification" in ServiceWorkerRegistration.prototype && "PushManager" in window && check_browser_version() >= 42 ? !0 : !1;

    } else if ("Opera" === check_browser()) {

        return "Notification" in window && "serviceWorker" in navigator && "showNotification" in ServiceWorkerRegistration.prototype && "PushManager" in window && check_browser_version() >= 42 ? !0 : !1;

    } else if ("Firefox" === check_browser()) {

        return check_browser_version() > 43 ? !0 : !1;

    } else if ("Safari" === check_browser()) {

        return "safari" in window && "pushNotification" in window.safari ? !0 : !1;

    } else if ("Edge" === check_browser()) {

        return check_browser_version() > 13 ? !0 : !1;
    }
}

function os_name() {

    var unknown = '-';
    var nAgt = navigator.userAgent;
    var os = unknown;
    var clientStrings = [
        {s: 'Windows 10', r: /(Windows 10.0|Windows NT 10.0)/},
        {s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/},
        {s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/},
        {s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/},
        {s: 'Windows Vista', r: /Windows NT 6.0/},
        {s: 'Windows Server 2003', r: /Windows NT 5.2/},
        {s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/},
        {s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/},
        {s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/},
        {s: 'Windows 98', r: /(Windows 98|Win98)/},
        {s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/},
        {s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
        {s: 'Windows CE', r: /Windows CE/},
        {s: 'Windows 3.11', r: /Win16/},
        {s: 'Android', r: /Android/},
        {s: 'Open BSD', r: /OpenBSD/},
        {s: 'Sun OS', r: /SunOS/},
        {s: 'Linux', r: /(Linux|X11)/},
        {s: 'iOS', r: /(iPhone|iPad|iPod)/},
        {s: 'Mac OS X', r: /Mac OS X/},
        {s: 'Mac OS', r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
        {s: 'QNX', r: /QNX/},
        {s: 'UNIX', r: /UNIX/},
        {s: 'BeOS', r: /BeOS/},
        {s: 'OS/2', r: /OS\/2/},
        {s: 'Search Bot', r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
    ];
    for (var id in clientStrings) {
        var cs = clientStrings[id];
        if (cs.r.test(nAgt)) {
            os = cs.s;
            break;
        }
    }

    var osVersion = unknown;

    if (/Windows/.test(os)) {
        osVersion = /Windows (.*)/.exec(os)[1];
        os = 'Windows';
    }

    return os;
}

function os_version(){

    var nAgt = navigator.userAgent;
    var os = '-';
    var clientStrings = [
        {s: 'Windows 10', r: /(Windows 10.0|Windows NT 10.0)/},
        {s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/},
        {s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/},
        {s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/},
        {s: 'Windows Vista', r: /Windows NT 6.0/},
        {s: 'Windows Server 2003', r: /Windows NT 5.2/},
        {s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/},
        {s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/},
        {s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/},
        {s: 'Windows 98', r: /(Windows 98|Win98)/},
        {s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/},
        {s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
        {s: 'Windows CE', r: /Windows CE/},
        {s: 'Windows 3.11', r: /Win16/},
        {s: 'Android', r: /Android/},
        {s: 'Open BSD', r: /OpenBSD/},
        {s: 'Sun OS', r: /SunOS/},
        {s: 'Linux', r: /(Linux|X11)/},
        {s: 'iOS', r: /(iPhone|iPad|iPod)/},
        {s: 'Mac OS X', r: /Mac OS X/},
        {s: 'Mac OS', r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
        {s: 'QNX', r: /QNX/},
        {s: 'UNIX', r: /UNIX/},
        {s: 'BeOS', r: /BeOS/},
        {s: 'OS/2', r: /OS\/2/},
        {s: 'Search Bot', r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
    ];
    for (var id in clientStrings) {
        var cs = clientStrings[id];
        if (cs.r.test(nAgt)) {
            os = cs.s;
            break;
        }
    }

    var osVersion = '-';

    if (/Windows/.test(os)) {
        osVersion = /Windows (.*)/.exec(os)[1];
        os = 'Windows';
    }

    switch (os) {
        case 'Mac OS X':
            osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
            break;

        case 'Android':
            osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
            break;

        case 'iOS':
            osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
            osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
            break;
    }

    return osVersion;
}

function setCookie(name, value, exdays) {
    var n = new Date;
    n.setTime(n.getTime() + (exdays*24*60*60*1000));
    var a = "; expires=" + n.toUTCString();
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + a + "; path=/"
}

function getCookie(name){
    for (var i = name + "=", t = document.cookie.split(";"), n = 0; n < t.length; n++) {
        for (var a = t[n];
            " " == a.charAt(0);) a = a.substring(1);
        if (0 == a.indexOf(i)) return a.substring(i.length, a.length)
    }
    return ""
}
	
function unsubscribeWidget(){
    jQuery("body").append('<div class=\"pushassist_notification18 top_left\" id=\"pushassist_widget\"><span class=\"pushassist_unsub_widget\" id=\"pushassist_unsub_widget\">Opt out from Notification</span>');
    
    /*  Template Start */

    jQuery(document).on('click', '.pushassist_unsub_widget', function () {
        jQuery(this).remove();
        jQuery('#pushassist_widget').append('<div id="pushassist_confirm_widget"><span class="pushassist_confirm_widget">'+ _pushassist.confirmationWidget +'</span> <div class="pushassist_action_yes" id="pushassist_action_yes">' + _pushassist.confirmationWidgetButtonYes + '</div> <div class="pushassist_action_no" id="pushassist_action_no">'+ _pushassist.confirmationWidgetButtonNo +'</div></div>');
    });
    
    jQuery(document).on('click', '.pushassist_action_yes', function () {
        jQuery('#pushassist_confirm_widget').remove();
        
        if((getCookie('psa_unsubscribed') === '' && getCookie('psa_subscribe') === '') ||  getCookie('psa_unsubscribed') === ''){            
            setCookie('psa_unsubscribed', 1, 100);
            setCookie('psa_subscribe', '', 100);            
            jQuery('#pushassist_widget').append('<div class="pushassist_thank_you_widget">' + _pushassist.unsubscriberSuccessMessage + '</div>');
            _pa_subscribeUnsubscribed();                
        } else {
            setCookie('psa_subscribe', 0, 100);
            setCookie('psa_unsubscribed', '', 100);
            jQuery('#pushassist_widget').append('<div class="pushassist_thank_you_widget">' + _pushassist.subscriberSuccessMessage + '</div>');
            _pa_subscribeUnsubscribed();
        }
    });
    
    jQuery(document).on('click', '.pushassist_action_no', function () {
        jQuery('#pushassist_confirm_widget').remove();            
        if((getCookie('psa_unsubscribed') === '' && getCookie('psa_subscribe') === '') ||  getCookie('psa_unsubscribed') === ''){                
            jQuery('#pushassist_widget').append('<span class="pushassist_unsub_widget">' + _pushassist.unsubscribeMessage + '</span>');                
        } else {
            jQuery('#pushassist_widget').append('<span class="pushassist_unsub_widget">' + _pushassist.subscribeMessage + '</span>');
        }
    });	
        
    jQuery(document).on('click', '.pushassist_open_popup', function () {
        jQuery('#pushassist_bell_dailog_body').toggle();
        
        jQuery('#pushassist_bell_hover_message_box').hide();
        jQuery('#pushassist_bell_thank_you_message_box').hide();
    });
        
    jQuery(document).on('click', '.pushassist_personal_info_btn', function () {
        
        if(jQuery('#pushassist_personal_info_btn').text() === _pushassist.unsubscrubeButtonMessage){
            setCookie('psa_personal_info', 1, 100);
            jQuery('#pushassist_personal_info_btn').text(_pushassist.subscrubeButtonMessage);
            _pa_subscribeInfo();
        } else {				
            setCookie('psa_personal_info', 0, 100);
            jQuery('#pushassist_personal_info_btn').text(_pushassist.unsubscrubeButtonMessage);
            _pa_subscribeInfo();
        }
        
        jQuery('#pushassist_bell_dailog_body').hide();
        jQuery('#pushassist_bell_thank_you_message_text').text(_pushassist.thankYouWidget);
        jQuery('#pushassist_bell_thank_you_message_box').show();
    });
        
    jQuery(document).on('click', '.pushassist_unsub_btn', function () {
                
        jQuery('#pushassist_bell_dailog_body').hide();
        
        if(jQuery('#pushassist_unsub_btn').text() === _pushassist.unsubscriberClick){
            setCookie('psa_unsubscribed', 1, 100);
            setCookie('psa_subscribe', '', 100);
            jQuery('#pushassist_bell_thank_you_message_text').text(_pushassist.unsubscriberSuccessMessage);
            jQuery('#pushassist_unsub_btn').text(_pushassist.subscriberClick);
            jQuery('#pushassist_bell_thank_you_message_box').show();
            _pa_subscribeUnsubscribed();   
        } else {
            setCookie('psa_subscribe', 0, 100);
            setCookie('psa_unsubscribed', '', 100);
            jQuery('#pushassist_bell_thank_you_message_text').text(_pushassist.subscriberSuccessMessage);
            jQuery('#pushassist_unsub_btn').text(_pushassist.unsubscriberClick);
            jQuery('#pushassist_bell_thank_you_message_box').show();
            _pa_subscribeUnsubscribed();
        }				
    });
        
    jQuery(document).on('hover', '.pushassist_notification19', function () {
                            
        if(getCookie('psa_unsubscribed') === '1'){                
            jQuery('#pushassist_bell_hover_message_text').text(_pushassist.subscribeMessage);
        }
        
        if(getCookie('psa_subscribe') === '0'){
            jQuery('#pushassist_bell_hover_message_text').text(_pushassist.unsubscribeMessage);
        }				
        
        if(getCookie('psa_unsubscribed') === '' && getCookie('psa_subscribe') === ''){
            jQuery('#pushassist_bell_hover_message_text').text(_pushassist.unsubscribeMessage);
        }				
    });
    
    /*  Template End */
}  
    
function widget_preload() {
    
    if(_pushassist.widgetType === 0){
        
        if(getCookie('psa_unsubscribed') === '1'){            
            jQuery('#pushassist_unsub_widget').text(_pushassist.subscribeMessage);            
        } 
        
        if(getCookie('psa_subscribe') === '0'){
            jQuery('#pushassist_unsub_widget').text(_pushassist.unsubscribeMessage);
        } 
        
        if(getCookie('psa_unsubscribed') === '' && getCookie('psa_subscribe') === ''){
            jQuery('#pushassist_unsub_widget').text(_pushassist.unsubscribeMessage);
        }
        
    } else {       
    
        if(getCookie('psa_unsubscribed') === '1'){
            jQuery('#pushassist_bell_hover_message_text').text(_pushassist.subscribeMessage);
            
            jQuery('#pushassist_unsub_btn').text(_pushassist.subscriberClick);
            jQuery('#pushassist_bell_resubscribe_message_box').hide();
            jQuery('#pushassist_bell_thank_you_message_box').show();            
        }
        
        if(getCookie('psa_subscribe') === '0'){
            jQuery('#pushassist_bell_hover_message_text').text(_pushassist.unsubscribeMessage);
            
            jQuery('#pushassist_unsub_btn').text(_pushassist.unsubscriberClick);
            jQuery('#pushassist_bell_resubscribe_message_box').show();
            jQuery('#pushassist_bell_thank_you_message_box').hide();				
        }
        
        if(getCookie('psa_personal_info') === '1'){
            jQuery('#pushassist_personal_info_btn').text(_pushassist.subscrubeButtonMessage);
        } else {
            jQuery('#pushassist_personal_info_btn').text(_pushassist.unsubscrubeButtonMessage);
        }
    }		
}
        
function _pa_subscribeUnsubscribed() {

    var registration_id = getCookie("pushassist_key");
    
    if(registration_id !== '') {

        var json = {
            json: JSON.stringify({
                subscriber_token: registration_id,
                sub_domain: _pushassist.subdomain
            })
        };

        var clickDeliveryURL = _pushassist.serverUrl + "/receiver/subscribe-unsubscribe/";

        // send update to server
        return fetch(clickDeliveryURL, {
            method: 'post',
            body: json.json
        }).then(function (response) {

            // Examine the text in the response
            return response.json().then(function (data) {

                if (data.status === "Success") {
                    //console.log(data.message);
                }
            });
        });
    }
}

function _pa_subscribeInfo() {

    var registration_id = getCookie("pushassist_key");
    var ipAddress = getCookie("ip_address");

    if(registration_id !== '') {

        var json = {
            json: JSON.stringify({
                subscriber_token: registration_id,
                sub_domain: _pushassist.subdomain,
                ip_address: ipAddress
            })
        };

        var clickDeliveryURL = _pushassist.serverUrl + "/receiver/auto-personal-info/";

        // send update to server
        return fetch(clickDeliveryURL, {
            method: 'post',
            body: json.json
        }).then(function (response) {

            // Examine the text in the response
            return response.json().then(function (data) {

                if (data.status === "Success") {
                    //console.log(data.message);
                    
                    if(data.ip_address !== ''){
                        setCookie("ip_address", data.ip_address, 100);
                    }
                }
            });
        });
    }
}

function openFBpopup(url, elm) {
    var new_fbwindow = window.open(url, "", "width=800,height=600");
    new_fbwindow.onbeforeunload = function () {
        setCookie("psa_fb_status", "1", 14);
        jQuery(elm).hide();
    }
}
    
window.onload = function() {
    var is_cookie_set = getCookie("psa_fb_status");
    if(is_cookie_set !== ''){
        jQuery('.psa_fb_login').hide();
    }
}

function notify() {

    if (!("Notification" in window)) {

    }else if (Notification.permission !== "denied") {
        Notification.requestPermission(function (permission) {
            if (permission === "granted") {

                if(is_mobile() === 0){
                    remove_psa_branding();
                }

                if ("serviceWorker" in navigator) {
                    navigator.serviceWorker.register("/service-worker.js", {scope: "/"})
                        .then(initialiseState);
                    subscribe();
                }
            }

            if (permission === "denied") {

                setCookie("pushassist_notification_status", "block", 2);

                if(is_mobile() === 0){
                    remove_psa_branding();
                }
            }
        })
    }
}

function _pa_params() {

    var _pa_out = [], i;

    if (typeof _pa === 'undefined') {
        _pa = [];
    }

    var _length = _pa.length;

    if (_length > 0) {

        for (i=0 ; i<_length; ++i) {

         _pa_out.push(encodeURIComponent(_pa[i]));

        }

        return _pa_out;
    }
}

function safari_notify() {

    if ("safari" in window && "pushNotification" in window.safari) {
        var permissionData = window.safari.pushNotification.permission(_pushassist.safariWebsitePushId);
        checkRemotePermission(permissionData);
    }
}

function checkRemotePermission(permissionData) {

    var segment_string =  '';

    var segment_array =  _pa_params();  //get segment array

    if(segment_array !== undefined){

        segment_string =  segment_array.toString(); // convert array into string
    }
    
    if(_pushassist.isEnabledUserInfo === 0){
        _pushassist.ipaddress = '';
    }

    if (permissionData.permission === "default") {

        window.safari.pushNotification.requestPermission(
           _pushassist.safariServerUrl,
           _pushassist.safariWebsitePushId,
            {
                'subdomain': _pushassist.subdomain,
                'ipaddress': _pushassist.ipaddress,
                'segments': segment_string
            },
            checkRemotePermission
        );
    }
    else if (permissionData.permission === "denied") {

        setCookie("pushassist_notification_status", "block", 2);

        if(is_mobile() === 0){
            remove_psa_branding();
        }
    }
    else if (permissionData.permission === "granted") {

        setCookie("pushassist_notification_status", "subscribe", 730);

        if(is_mobile() === 0){
            remove_psa_branding();
        }
    }
}

function initialiseState() {

    // We need the service worker registration to check for a subscription
    navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
        serviceWorkerRegistration.pushManager.getSubscription()
        .then(function(subscription) {
            if (!subscription) {
                return ;
            }
        });
    });
}
    
function urlBase64ToUint8Array(base64String) {
   const padding = '='.repeat((4 - base64String.length % 4) % 4);
   const base64 = (base64String + padding)
       .replace(/\-/g, '+')
       .replace(/_/g, '/');

   const rawData = window.atob(base64);
   const outputArray = new Uint8Array(rawData.length);

   for (var i = 0; i < rawData.length; ++i) {
       outputArray[i] = rawData.charCodeAt(i);
   }
   return outputArray;
}

function subscribe() {
    navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
        serviceWorkerRegistration.pushManager.subscribe({userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(_pushassist.vp_key)})
        .then(function(subscription) {

            var keys = JSON.parse(JSON.stringify(subscription)).keys;

            var psa_key = keys.p256dh;

            var psa_authSecret = keys.auth;

            var endpointURL = subscription.endpoint;

            var registration_id = endpointURL.substr(endpointURL.lastIndexOf("/") + 1);

            var send_segment = _pa_params();
            
            if(_pushassist.isEnabledUserInfo === 0){
                _pushassist.ipaddress = '';
            }

            // send update to server
            var json = {
                json: JSON.stringify({
                    sub_domain: _pushassist.subdomain,
                    registration_id: registration_id,
                    browser: check_browser(),
                    ip_address: _pushassist.ipaddress,
                    segment: send_segment,
                    browser_endpoint: endpointURL,
                    public_key: psa_key,
                    auth_secret: psa_authSecret,
                    user_os: os_name(),
                    os_version: os_version(),
                    browser_version: check_browser_version(),
                    is_mobile: is_mobile(),
                    is_vapid: 1
                })
            };

            var clickDeliveryURL = _pushassist.serverUrl + "/receiver/";

            // send update to server
            return fetch(clickDeliveryURL, {
                method: 'post',
                body: json.json
            }).then(function(response) {

                // Examine the text in the response
                return response.json().then(function(data) {

                    if (data.status != "Success" || !data.notification) { }

                    setCookie("pushassist_notification_status", "subscribe", 730);
                    setCookie("pushassist_key", registration_id, 730);

                    return navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
                        var options = {
                            body: data.notification.message,
                            image: data.notification.image,
                            requireInteraction: data.notification.interaction,
                            vibrate: data.notification.vibrate,
                            notificationCloseEvent: data.notification.notificationCloseEvent,
                            tag: data.notification.tag,
                            icon: data.notification.icon + '?notificationURL=' + encodeURIComponent(data.notification.url),
                            url: data.notification.url,
                            actions: data.notification.actions,
                            data: data.notification.data
                        };

                        return serviceWorkerRegistration.showNotification(data.notification.title, options);
                    });
                });
            });
        });
    });
}

/* JS API Start */

function _pa_subscriberID() {

   var registration_id = decodeURIComponent(getCookie("pushassist_key"));
   var browser = check_browser();
   var json = JSON.stringify({
       subscriber_id: '',
       browser: browser
   });

   if(registration_id !== '') {

       registration_id = registration_id.replace('%3A', ':');

       json = JSON.stringify({
           subscriber_id: registration_id,
           browser: browser
       });
   }

   return json;
}

function _pa_isSubscribed() {

   var registration_id = getCookie("pushassist_key");

   var result = JSON.stringify({
       subscribed: false
   });

   if(registration_id !== '') {

       var json = {
           json: JSON.stringify({
               subscriber_key: registration_id,
               sub_domain: _pushassist.subdomain
           })
       };

       var clickDeliveryURL = _pushassist.serverUrl + "/js-api/is-subscriber";

       // send update to server
       return fetch(clickDeliveryURL, {
           method: 'post',
           body: json.json
       }).then(function (response) {

           // Examine the text in the response
           return response.json().then(function (data) {

               if (data.status === "Success") {

                   result = JSON.stringify({
                       subscribed: true
                   });
               }
               return result;
           });
       });
   }
   return result;
}

function _pa_addToSegment(segment) {

   var registration_id = getCookie("pushassist_key");

   var result = false;

   if(registration_id !== '') {

       var json = {
           json: JSON.stringify({
               subscriber_key: registration_id,
               sub_domain: _pushassist.subdomain,
               segment: segment
           })
       };

       var clickDeliveryURL = _pushassist.serverUrl + "/js-api/add-subscriber-segment";

       // send update to server
       return fetch(clickDeliveryURL, {
           method: 'post',
           body: json.json
       }).then(function (response) {

           // Examine the text in the response
           return response.json().then(function (data) {

               if (data.status === "Success") {
                   result = true;
               }
               return result;
           });
       });
   }

   return result;
}

function _pa_removeSubscriberFromSegment() {

   var registration_id = getCookie("pushassist_key");

   var result = false;

   if(registration_id !== '') {

       var json = {
           json: JSON.stringify({
               subscriber_key: registration_id,
               sub_domain: _pushassist.subdomain,
               segment: segment
           })
       };

       var clickDeliveryURL = _pushassist.serverUrl + "/js-api/remove-segment-subscriber";

       // send update to server
       return fetch(clickDeliveryURL, {
           method: 'post',
           body: json.json
       }).then(function (response) {

           // Examine the text in the response
           return response.json().then(function (data) {

               if (data.status === "Success") {
                   result = true;
               }

               return result;
           });
       });
   }

   return result;
}

function _pa_changeSegment(current_segment, change_segment, yes_no) {

   var registration_id = getCookie("pushassist_key");

   var result = false;

   if(registration_id !== '') {

       var json = {
           json: JSON.stringify({
               subscriber_key: registration_id,
               old_segment: current_segment,
               new_segment: change_segment,
               remove_from_existing: yes_no
           })
       };

       var clickDeliveryURL = _pushassist.serverUrl + "/js-api/change-segment";

       // send update to server
       return fetch(clickDeliveryURL, {
           method: 'post',
           body: json.json
       }).then(function (response) {

           // Examine the text in the response
           return response.json().then(function (data) {

               if (data.status === "Success") {
                   result = true;
               }

               return result;
           });
       });
   }

   return result;
}

function _pa_subscriberSegments() {

   var registration_id = getCookie("pushassist_key");

   var result = JSON.stringify({
       segments: null
   });

   if(registration_id !== '') {

       var json = {
           json: JSON.stringify({
               subscriber_key: registration_id,
               sub_domain: _pushassist.subdomain
           })
       };

       var clickDeliveryURL = _pushassist.serverUrl + "/js-api/subscriber-segment";

       // send update to server
       return fetch(clickDeliveryURL, {
           method: 'post',
           body: json.json
       }).then(function (response) {

           // Examine the text in the response
           return response.json().then(function (data) {
               if (data.status === "Success") {
                   result = JSON.stringify({
                       segments: data.segments
                   });
               }
               return result;
           });
       });
   }
   return result;
}

/* JS API End */

self.addEventListener("load", function() {
    
    if(_pushassist.isEnabledUnsubscribedWidget === 1){
        
        if("subscribe" === getCookie("pushassist_notification_status") && "" !== getCookie("pushassist_key")){ unsubscribeWidget(); widget_preload(); }
    }
    
    get_values();

    if(_pushassist.brandingFlag === 0 && is_mobile() === 0){

        push_assist_branding();
    }

    var pushassist_prompt = document.getElementsByClassName('psa_show_notification_opt_in');

    if (pushassist_prompt.length === 0) {

        if(!0 === browser_compatible()){

        "subscribe" === getCookie("pushassist_notification_status") || "block" === getCookie("pushassist_notification_status") ? void 0 : "Safari" !== check_browser() ? setTimeout( function() { notify() }, _pushassist.intervalTime * 1000) : setTimeout( function() { safari_notify() }, _pushassist.intervalTime * 1000);

        }
    } else {

         for (var i = 0; i < pushassist_prompt.length; i++) {

             pushassist_prompt[i].addEventListener('click', function () {

                if(!0 === browser_compatible()){

                   "subscribe" === getCookie("pushassist_notification_status") || "block" === getCookie("pushassist_notification_status") ? void 0 : "Safari" !== check_browser() ? notify() : safari_notify();
                }
             });
         }
    }

});
