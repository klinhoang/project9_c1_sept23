(function(){
    document.body.innerHTML += '<pre style="position: absolute; left: 0px; top:0px; bottom: 0; right: 0; background: #000; color: #fff; z-index: 1000; padding: 10px; overflow: auto; font: 12px/15px Monospace; margin: 0;"><div id="preConsole"></div> <span style="position:absolute; bottom:20px; right:20px; display:block; color:#"</pre>';
    var pre = document.getElementById("preConsole");
    var orig_log = window.console.log;
     window.console.log = function() {
        var a=[], iCount=arguments.length;
        for (var i=0; i<iCount; i++) {
          a.push(typeof arguments[i] === "object" ? JSON.stringify(arguments[i]) : arguments[i].toString());
        }
        pre.innerHTML += a.join(', ') + '\n';
 
 
        orig_log.apply(console, arguments);
    };
    window.onerror = function() { window.console.log("ERROR:", arguments); };
 }());
 