(function($, window) {
    
    'use strict';
    
    var config  = {
        data: {},
        binId: null,
        authorId: null,
        options: {
            autosave: 30,       // frequency of autosaving data, in seconds
            remote: true,       // set to false to disable saving in remote myjson bin
            ui: true,           // set to false to hide ui
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
        
        MJS._init();
        MJS._initEvents();
        MJS._render();
        MJS._loadData();
    };
    

    /**
     * Initializes MJS
     * 
     * @returns {undefined}
     */
    MJS._init = function() {
        if (!config.options.remote) {
            config.options.ui = false;
        }
    };

    /**
     * Initializes MJS events
     * 
     * @returns {undefined}
     */
    MJS._initEvents = function() {
        $(window.document.body).one('load.mjs', function(evt) {
            MJS._autosave();
        });
    };
    
    /**
     * 
     * @returns {undefined}
     */
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
        else if (config.options.remote) {
            MJS._load();
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
        
        if (!config.options.ui) {
            return;
        }
        
        var $mjs = $(`
            <div id="mjs-wrapper">
                <div id="mjs-button" class="mjs-button">
                    <div id="mjs-icon-close" class="mjs-icon"></div>
                    <div id="mjs-icon-open" class="mjs-icon"></div>
                </div>
                <div id="mjs-toolbar">
                    <div id="mjs-toolbar-input" class="input-wrap">
                        <input id="bin-id" type="text" placeholder="binId">
                    </div>
                    <div id="mjs-apply" class="mjs-toolbar-item mjs-button">
                        <div id="mjs-icon-apply" class="mjs-icon"></div>
                    </div>
                    <div id="mjs-toolbar-help" data-toggled-by="#mjs-help" class="mjs-toolbar-item mjs-toolbar-item-extension input-wrap">
                        <input type="text" value="Copy and share with a friend, or paste a friend's bin, or delete to reset" readonly placeholder="binId">
                    </div>
                    <div id="mjs-help" class="mjs-toolbar-item mjs-button">
                        <div id="mjs-icon-help" class="mjs-icon"></div>
                    </div>
                </div>
            </div>
        `);
        
        $mjs.find('#bin-id').val(config.binId);
        
        $mjs.on('click', '#mjs-button', function(evt) {
            $mjs.toggleClass('mjs-active');
            $mjs.trigger('toggle.mjs', [$mjs.hasClass('mjs-active')]);
        });
        
        $mjs.find('.mjs-toolbar-item-extension').each(function() {
            var $extension = $(this);
            
            var trigger = $(this).data('toggled-by');
            if (trigger) {
                $mjs.find(trigger).on('click', function(evt) {
                    $extension.toggleClass('mjs-active');
                });
                // close timeout?
            }
        });
        
        $mjs.on('click', '#mjs-apply', function(evt) {
            var request = MJS._updateBin($mjs.find('#bin-id').val());
            MJS._bindProgress(request, '#mjs-icon-apply');
        });
        
        var fillBinIdInput = function(event) {
            $mjs.find('#bin-id').val(config.binId);
        };
        $(window.document.body).on('toggle.mjs', fillBinIdInput);
        $(window.document.body).on('load.mjs', fillBinIdInput);
        
        $mjs.appendTo(window.document.body);
    };
    
    MJS._updateBin = function(newBinId) {
        if (newBinId === "") {
            return MJS._generateBin();
        }
        
        config.binId = newBinId;
        var request = MJS._load();
        request.done(function(result) {
            MJS._persist();
        });
        return request;
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
                
                $(window.document.body).trigger('load.mjs', config.data);
            }
        });
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
                
                $(window.document.body).trigger('load.mjs', config.data);
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
        return MJS._request(config.binId, null, {
            type: "GET",
            success: function(data) {
                $.extend(true, config.data, data);
                $(window.document.body).trigger('load.mjs', config.data);
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
        var request = $.ajax($.extend(true, requestData, config));
        MJS._bindProgress(request, '#mjs-icon-apply');
        return request;
    };

    
    MJS._bindProgress = function(request, element) {
        var $element = $(element);
        $element.addClass('mjs-loading').prop('disabled', true);
        
        var minimumDuration = 100;
        var disableSpin = function() {
            $element.removeClass('mjs-loading').prop('disabled', false);
        };
        
        var start = new Date();
        request.done(function() {
            var elapsed     = new Date() - start;
            var remaining   = Math.max(0, minimumDuration - elapsed);
            setTimeout(disableSpin, remaining);
        });
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