(function($, window) {
    
    'use strict';
    
    var config  = {
        binId:      null,
        authorId:   null,
        data:       {},
    };

    function MJS() {}
    
    /**
     * Stores changes.
     * 
     * @returns {undefined}
     */
    MJS.save = function() {
        MJS._persist(); // save locally
        MJS._update();  // save in remote
    };
    
    /**
     * Debug
     * 
     * @returns {undefined}
     */
    MJS.debug = function() {
        console.log(config);
    };
    
    /**
     * Initializes MJS
     * 
     * @returns {undefined}
     */
    MJS._initialize = function() {
        var configJson = window.localStorage.getItem('MJS.config');
        
        if (configJson !== null) {
            $.extend(true, config, JSON.parse(configJson));
        }
        
        if (config.authorId === null) {
            MJS._generateAuthorId();
        }
        
        if (config.binId === null) {
            MJS._generateBin();
        }
        else {
            MJS._load();
        }
        
        MJS._render();
        
    };
    
    /**
     * 
     * @returns {undefined}
     */
    MJS._render = function() {
        var $mjs = $(`
            <style>
            #mjs-wrapper {
                cursor: pointer;
                position:fixed;
                bottom: 0;
                right: 0;
                margin: 35px;
                width: 60px;
                height: 60px;
                border-radius: 100%;
                background-color: #c5d796;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            #mjs-wrapper:hover {
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            }
            
            .mjs-icon {
                transition-duration: 0.3s!important;
                background-repeat: no-repeat;
                position: absolute;
                top: 0;
                bottom: 0;
                width: 100%;
                height: 100%;
                display: block;
                transition: opacity .08s linear,-webkit-transform .16s linear;
                transition: transform .16s linear,opacity .08s linear;
                transition: transform .16s linear,opacity .08s linear,-webkit-transform .16s linear;
            }
            
            #mjs-icon-close {
                background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOBAMAAADtZjDiAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAG1BMVEUAAAD///////////////////////////8AAADr8xjQAAAAB3RSTlMAM7cPx7jIAE21/gAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxIAAAsSAdLdfvwAAABESURBVAjXYxAyYGBgYFZkUHcG0ialDCYlBgzM7slA7MxgUgaUNCkzdgfJMbunlIDUMpiUg7hwGiYOVQfTBzMHZi7UHgCB3RAZ7HszogAAAABJRU5ErkJggg==);
                background-size: 14px 14px;
                background-position: 50%;
            }
            
            #mjs-icon-open {
                background-image: url(http://www.clker.com/cliparts/n/U/H/1/H/u/search-icon-white-one-hi.png);
                background-size: 20px 20px;
                background-position: center;
            }
            
            #mjs-wrapper:not(.mjs-active) #mjs-icon-close {
                transform: rotate(30deg) scale(0);
            }
            
            #mjs-wrapper.mjs-active #mjs-icon-open {
                transform: rotate(-30deg) scale(0);
            }
            
            </style>
    
            <div id="mjs-wrapper" style="">
                <div id="mjs-icon-close" class="mjs-icon"></div>
                <div id="mjs-icon-open" class="mjs-icon"></div>
            </div>
        `);
        
        $mjs.on('click', function(evt) {
            $(this).toggleClass('mjs-active');
        });
        
        $mjs.appendTo(window.document.body);
    };
    
    
    /**
     * Creates a new Myjson bin
     * 
     * @returns {undefined}
     */
    MJS._generateBin = function() {
        return MJS._request(null, {}, {
            type: "POST",
            success: function(result) {
                config.binId = result.uri.split('/').pop();
                MJS._persist();
                
                $(window.document.body).trigger('ready.mjs', config.data);
            }
        });
    };
    
    /**
     * Generates authorId string
     * 
     * @returns {undefined}
     */
    MJS._generateAuthorId = function() {
        config.authorId = MJS._randomString(3);
        MJS._persist();
    };
    
    /**
     * Creates a random string
     * 
     * @param {type} length
     * @returns {String}
     */
    MJS._randomString = function(length) {
        return Math.random().toString(36).substr(2, length);
    };
    
    /**
     * Loads data from Myjson bin
     * 
     * @returns {undefined}
     */
    MJS._load = function() {
        MJS._request(config.binId, null, {
            type: "GET",
            success: function(data) {
                config.data = data;
                $(window.document.body).trigger('ready.mjs', config.data);
            }
        });
    };
    
    /**
     * Updates Myjson bin
     * @returns {jqXHR}
     */
    MJS._update = function() {
        return MJS._request(config.binId, config.data, {type: "PUT"});
    };
    
    /**
     * Myjson request wrapper
     * 
     * @param {type} path   see http://myjson.com/api
     * @param {type} data   data to save. not necessary when reading
     * @param {type} config additional config
     * @returns {jqXHR}
     */
    MJS._request = function(path, data, config) {
        var url = "https://api.myjson.com/bins" + (path ? '/' + path : '');
        var requestData = {
            url: url,
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
        };
        return $.ajax($.extend(true, requestData, config));
    };

    
    /**
     * Stores MJS config locally
     * 
     * @returns {undefined}
     */
    MJS._persist = function() {
        window.localStorage.setItem('MJS.config', JSON.stringify(config));
    };
    
    /**
     * Auto initialize MJS
     */
    $(window.document).ready(function() {
        MJS._initialize();
    });
    
    
    /**
     * Export
     */
    window.MJS = MJS;
    
    
})($, window);