! function(h, n) {
    function B(a, b) {
        var d = new XMLHttpRequest;
        d.open("GET", a, !0), d.onload = function() {
            eval("console.clear();"), b(d.responseText)
        }, d.send()
    }

    function u(a, b) {
        var d = new XMLHttpRequest;
        d.open("GET", a, !0), d.onload = function() {
            eval("console.clear();");
            var a = d.responseText;
            title = a.substring(a.indexOf("<title>") + 7, a.indexOf("</title>")), a = a.substr(a.indexOf("<div class='widget Blog' data-version='1' id='Blog1'>", 53)), a = a.substr(0, a.indexOf("<footer id=footer-wrapper")), a = a.substr(0, a.lastIndexOf("</div>")), a = a.substr(0, a.lastIndexOf("</div>")), a = a.substr(0, a.lastIndexOf("</div>")), b(a, title)
        }, d.send()
    }

    function g(e) {
        e ? n.classList.add("ac") : e ? n.classList.toggle("ac") : n.classList.remove("ac")
    }

    function C(e) {
        var t = "";
        "string" != typeof e ? (e.preventDefault(), t = e.currentTarget.href, window.history.pushState({
            siteReferral: !0,
            path: t
        }, "", t)) : t = e, g(!0), h.classList.add("au"), w(n, document.getElementById("a").offsetHeight - 50, 600), setTimeout(function() {
            window.scrollTo(document, 0), u(t, function(e, t) {
                var n = document.getElementById("Blog1");
                h.className = "item", n.innerHTML = e, n.querySelector(".b").className += " aa", document.title = t, g(!1), x(), D(), E(), F(), y(), ga("send", "pageview", window.location.pathname)
            }), document.getElementById("a").classList.add("d")
        }, 600)
    }

    function w(e, t, n) {
        if (!(n <= 0)) {
            var a = (t - window.scrollY) / n * 10;
            setTimeout(function() {
                window.scrollTo(e, window.scrollY + a), window.scrollY !== t && w(e, t, n - 10)
            }, 5)
        }
    }

    function z() {
        var e, t = document.getElementsByClassName("b");
        for (e in t) isNaN(e) || setTimeout(function(e) {
            e.className += " aa"
        }, 100 * (parseInt(e) + 1), t[e])
    }

    function G(e) {
        var t = "";
        document.querySelector("#a .a").classList.remove("q"), document.querySelector("#a .a").querySelectorAll("li").forEach(function(e) {
            e.classList.remove("i")
        }), "string" != typeof e ? (e.preventDefault(), t = e.currentTarget.href, window.history.pushState({
            siteReferral: !0,
            path: t
        }, "", t), this.parentElement.classList.add("i")) : (t = e, document.querySelector('#a .a li a[href*="' + t + '"]').parentElement.classList.add("i")), h.classList.add("au"), w(n, document.getElementById("a").offsetHeight - 50, 600), g(!0), p && window.removeEventListener("scroll", p), u(t, function(e, t) {
            document.getElementById("Blog1").outerHTML = e, h.className = "index", document.title = t, z(), q(), g(!1), y(), ga("send", "pageview", window.location.pathname)
        })
    }

    function x(s) {
        document.querySelectorAll("img[data-original]").forEach(function(e) {
            var t = e.getAttribute("data-original"),
                n = e.width,
                a = e.height,
                o = new Image;
            a = 0 != a ? "-h" + a + "-p" : "", t = (t = t.replace("/s1600/", "/w" + n + a + "/")).replace("/w1600/", "/w" + n + a + "/"), o.src = t, o.onload = function() {
                e.src = o.src, s && s()
            }
        })
    }
}(document.getElementById("wrapper"), document.body);
