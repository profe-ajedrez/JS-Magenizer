var Magenizer = (function(window, document, undefined) {

    var _w = window, _d = document;
    
    function _getToken(o, tokenKey) {
        var token = o.tokens[tokenKey];
        var flags = "";

        flags += (o.everything ? "g" : "");
        flags += (o.ungreedy ? "u" : "");
        flags += (o.multiline ? "m" : "");
        flags += (o.caseInsensitive ? "i" : "");
        debugger;
        var rx = new RegExp("(" + token.from + ").+(" + token.to + ")", flags);
        var matches = rx.exec(o.text);
        if (Object.prototype.toString.call(matches) === '[object Array]') {
            if (typeof matches[0] == "string") {
                var res = matches[0].replace(new RegExp(token.from, flags), "");
                rx = new RegExp("(" + token.to + ")", flags);
                matches = rx.exec(res);
                var pos = matches.index;
                res = res.substring(0, pos);
                return res;
            }
        }
        return "";
    }
    

    var _process = function(text, o) {
        if (typeof o != "object") {
            throw new Error("options expected");
        }
        if (typeof o.tokens != "object") {
            throw new Error("tokens expected");
        }

        this.tokens = o.tokens;
    
        if (typeof text != "string") {
            throw new Error("text parameter expected");
        }
        this.text = text;
        this.reverse    = (typeof o.reverse != "boolean" ? false : o.reverse);        
        this.multiline  = (typeof o.multiline != "boolean" ? true : o.multiline);
        this.caseInsensitive = (typeof o.caseInsensitive != "boolean" ? false : o.caseInsensitive);
        this.ungreedy   = (typeof o.ungreedy != "boolean" ? true : o.ungreedy);
        this.everything = (typeof o.everything != "boolean" ? true : o.everything);
        this.keys       = Object.keys(this.tokens);
        this.currentPos = (this.reverse ? this.keys.length : 0);
        
    }

    _process.prototype.rewind = function() {
        this.currentPos = (this.reverse ? this.keys.length : 0);
    };

    _process.prototype.current = function() {
        var tokenKey = this.keys[ this.currentPos ];
        return _getToken(this, tokenKey);
    };

    _process.prototype.next = function() {
        this.currentPos += (this.reverse ? -1 : 1);
    }

    _process.prototype.prev = function() {
        this.currentPos += (this.reverse ? 1 : -1);
    }

    _process.prototype.valid = function() {
        return this.currentPos >= 0 && this.current.pos < this.keys.length;
    }


    return function (text, options) {
        return new _process(text, options);
    };


})(window, document);
