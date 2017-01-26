/**
 * Completes an object with attributes from another object if it doesnt have them.
 * 
 * Passed object is modified, and a reference to it is returned.
 * 
 * @param {type} object
 * @param {type} additional
 * @returns {unresolved}
 */
$.complete = function(object, additional) {
    var original = $.extend({}, object);
    $.extend(true, object, additional);
    $.extend(true, object, original);
    return object;
};