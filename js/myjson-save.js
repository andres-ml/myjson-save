(function($, window) {
    
    'use strict';
    
    var config  = {
        data: {},
        binId: null,
        authorId: null,
        options: {
            autosave: 30,       // frequency of autosaving data, in seconds
            remote: true,       // set to false to disable saving in remote myjson bin
        },
    };

    /**
     * Initializes MJS
     * 
     * @returns {undefined}
     */
    MJS.init = function(data, userConfig) {
        $.extend(true, config.options, userConfig);
        
        config.data = data;
        
        MJS._initEvents();
        MJS._render();
        MJS._loadData();
    };
    

    /**
     * Initializes MJS
     * 
     * @returns {undefined}
     */
    MJS._initEvents = function() {
        $(window.document.body).on('ready.mjs', function(evt) {
            MJS._autosave();
        });
    };
    
    
    MJS._autosave = function() {
        var timeout = config.options.autosave;
        if (timeout) {
            setTimeout(function() {
                MJS.save();
                MJS._autosave();
            }, timeout * 1000);
        }
    };
    
    /**
     * Stores changes.
     * 
     * @returns {undefined}
     */
    MJS.save = function() {
        MJS._persist(); // save locally
        if (config.options.remote) {
            MJS._update(); // save in remote
        }
    };
    
    
    /**
     * Initializes MJS
     * 
     * @returns {undefined}
     */
    MJS._loadData = function() {
        var configJson = window.localStorage.getItem('MJS.config');
        
        if (configJson !== null) {
            var loadedConfig = JSON.parse(configJson);
            delete loadedConfig.options;
            $.extend(true, config, loadedConfig);
        }
        
        if (config.authorId === null) {
            MJS._generateAuthorId();
        }
        
        if (config.binId === null) {
            MJS._generateBin();
        }
        else {
            $(window.document.body).trigger('ready.mjs', config.data);
        }
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
                    <button id="mjs-lock-input" class="mjs-toolbar-item mjs-toolbar-button mjs-button"></button>
                    <button id="mjs-reset" class="mjs-toolbar-item mjs-toolbar-button mjs-button"></button>
                </div>
            </div>
        `);
        
        $mjs.find('input').val(config.binId);
        
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
            $mjs.trigger('toggle.mjs', [$mjs.hasClass('mjs-active')]);
        });
        
        $mjs.on('toggle.mjs', function(evt, active) {
            if (!active) {
                $mjs.trigger('lock.mjs');
            }
        });
        
        $mjs.on('lock.mjs', function(evt) {
            $mjs.find('input')
                .val(config.binId)
                .prop('readonly', true);
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
        MJS.progressBar();
        return $.ajax($.extend(true, requestData, config));
    };

    
    MJS.progressBar = function(step) {
        if (typeof step === 'undefined') {
            step = 0;
        }
        
        var $active = $('#mjs-wrapper.mjs-active #mjs-icon-close,#mjs-wrapper:not(.mjs-active) #mjs-icon-open');
        
        $active.addClass('mjs-loading');
        setTimeout(function() {
            $active.removeClass('mjs-loading');
        }, 2000);
    };
    
    /**
     * Stores MJS config locally
     * 
     * @returns {undefined}
     */
    MJS._persist = function() {
        window.localStorage.setItem('MJS.config', JSON.stringify(config));
    };
    
    function MJS() {}
    
    /**
     * Export
     */
    window.MJS = MJS;
    
    
})($, window);