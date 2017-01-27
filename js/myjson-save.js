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
            <div id="mjs-wrapper" class="mjs-active">
                <div id="mjs-button" class="mjs-button">
                    <div id="mjs-icon-close" class="mjs-icon"></div>
                    <div id="mjs-icon-open" class="mjs-icon"></div>
                </div>
                <div id="mjs-toolbar">
                    <div class="mjs-toolbar-item">
                        <input class="mjs-toolbar-item" readonly type="text" placeholder="bin-id">
                    </div>
                    <button id="mjs-lock-input" class="mjs-toolbar-item mjs-toolbar-button mjs-button">
                    </button>
                </div>
            </div>
        `);
        
        $mjs.on('transitionend', '#mjs-icon-open', function(evt) {
            window.console.log('transitionend');
        });
        
        $mjs.find('#mjs-lock-input').on('click', function(evt) {
            $(this).toggleClass('unlocked');
            
            var isUnlocked = $(this).hasClass('unlocked');
            
            $mjs.find('input').prop('readonly', !isUnlocked);
            
            if (isUnlocked) {
                $mjs.find('input').focus();
            }
        })
        
        $mjs.on('click', '#mjs-button', function(evt) {
            $mjs.toggleClass('mjs-active');
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