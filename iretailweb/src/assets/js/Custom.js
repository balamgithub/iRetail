function convertDateTime(timeStamp) {
    var d = new Date(parseInt(timeStamp.replace('/Date(', '').replace(')/', '')));
    var dd, mm, yy;

    if (d.getDate() < 10)
        dd = '0' + d.getDate().toString();
    else
        dd = d.getDate().toString();

    if ((d.getMonth() + 1) < 10)
        mm = '0' + (d.getMonth() + 1).toString();
    else
        mm = (d.getMonth() + 1).toString();

    yy = d.getFullYear().toString();

    return mm + '/' + dd + '/' + yy;
}

function convertDateTimewithTime(timeStamp) {
    var d = new Date(parseInt(timeStamp.replace('/Date(', '').replace(')/', '')));
    var dd, mm, yy;

    if (d.getDate() < 10)
        dd = '0' + d.getDate().toString();
    else
        dd = d.getDate().toString();

    if ((d.getMonth() + 1) < 10)
        mm = '0' + (d.getMonth() + 1).toString();
    else
        mm = (d.getMonth() + 1).toString();

    yy = d.getFullYear().toString();

    return mm + '/' + dd + '/' + yy + ' ' + formatAMPM(d);

}

function convertDateTimewithTimeDataType(timeStamp) {
    var d = new Date(parseInt(timeStamp.replace('/Date(', '').replace(')/', '')));
    return d;
}
// function convertDateTimewithTimeGetDaysWithMins(timeStamp) {
//     
//     var d = new Date(parseInt(timeStamp.replace('/Date(', '').replace(')/', '')));
//     var dd, mm, yy;

//     if (d.getDate() < 10)
//         dd = '0' + d.getDate().toString();
//     else
//         dd = d.getDate().toString();

//     if ((d.getMonth() + 1) < 10)
//         mm = '0' + (d.getMonth() + 1).toString();
//     else
//         mm = (d.getMonth() + 1).toString();

//     yy = d.getFullYear().toString();

//     var from = new Date(mm + '/' + dd + '/' + yy + ' ' + formatAMPM(d));
//     var to = new Date();

//     return Date.GetDaysBetween(from, to)

// }
// Date.GetDaysBetween = function(date1, date2) {
//     //Get 1 day in milliseconds
//     var one_day = 1000 * 60 * 60 * 24;

//     // Convert both dates to milliseconds
//     var date1_ms = date1.getTime();
//     var date2_ms = date2.getTime();

//     // Calculate the difference in milliseconds
//     var difference_ms = date2_ms - date1_ms;
//     //take out milliseconds
//     difference_ms = difference_ms / 1000;
//     var seconds = Math.floor(difference_ms % 60);
//     difference_ms = difference_ms / 60;
//     var minutes = Math.floor(difference_ms % 60);
//     difference_ms = difference_ms / 60;
//     var hours = Math.floor(difference_ms % 24);
//     var days = Math.floor(difference_ms / 24);

//     return days + ' d ' + hours + ' h, ' + minutes + ' m ' + seconds + ' s';
// }
function convertParsedDateTimewithOnlyTime(timeStamp) {
    // 
    var d = new Date(parseInt(timeStamp.replace('/Date(', '').replace(')/', '')));
    var dd, mm, yy;

    if (d.getDate() < 10)
        dd = '0' + d.getDate().toString();
    else
        dd = d.getDate().toString();

    if ((d.getMonth() + 1) < 10)
        mm = '0' + (d.getMonth() + 1).toString();
    else
        mm = (d.getMonth() + 1).toString();

    yy = d.getFullYear().toString();

    return mm + '/' + dd + '/' + yy + ' ' + formatAMPM(d);

}

// datetime filter done by nithya - start
function CommonDateTimeConvertor(timeStamp) {
    var d = new Date(parseInt(timeStamp.replace('/Date(', '').replace(')/', '')));
    var dd, mm, yy;

    if (d.getDate() < 10)
        dd = '0' + d.getDate().toString();
    else
        dd = d.getDate().toString();

    if ((d.getMonth() + 1) < 10)
        mm = '0' + (d.getMonth() + 1).toString();
    else
        mm = (d.getMonth() + 1).toString();

    yy = d.getFullYear().toString();

    return yy + mm + dd + TimeFormatSorting(d);

}

function TimeFormatSorting(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    hours = hours < 10 ? '0' + hours.toString() : hours.toString();
    minutes = minutes < 10 ? '0' + minutes.toString() : minutes.toString();
    var strTime = hours + minutes;
    return strTime;
}
// datetime filter done by nithya - end

function convertDateTimewithOnlyTime(timeStamp) {
    var d = new Date(parseInt(timeStamp));
    var dd, mm, yy;

    if (d.getDate() < 10)
        dd = '0' + d.getDate().toString();
    else
        dd = d.getDate().toString();

    if ((d.getMonth() + 1) < 10)
        mm = '0' + (d.getMonth() + 1).toString();
    else
        mm = (d.getMonth() + 1).toString();

    yy = d.getFullYear().toString();

    return mm + '/' + dd + '/' + yy + ' ' + formatAMPM(d);

}

Array.prototype.multiIndexOf = function (el) { 
    var idxs = [];
    for (var i = this.length - 1; i >= 0; i--) {
        if (this[i] === el) {
            idxs.unshift(i);
        }
    }
    return idxs;
};
Array.prototype.RemoveMultiIndexElt = function(elt) {
    
     for (var i = this.length - 1; i >= 0; i--) {
         elt.splice(this[i],1)
     }
    return elt
    
    }
function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}


//DataTable Datetime Sorting
// jQuery.extend(jQuery.fn.dataTableExt.oSort, {
//     "de_datetime-asc": function(a, b) {
//         var x, y;
//         if (jQuery.trim(a) !== '') {
//             var deDatea = jQuery.trim(a).split(' ');
//             var deTimea = deDatea[1].split(':');
//             var deDatea2 = deDatea[0].split('/');
//             if (typeof deTimea[2] != 'undefined') {
//                 x = (deDatea2[2] + deDatea2[1] + deDatea2[0] + deTimea[0] + deTimea[1] + deTimea[2]) * 1;
//             } else {
//                 x = (deDatea2[2] + deDatea2[1] + deDatea2[0] + deTimea[0] + deTimea[1]) * 1;
//             }
//         } else {
//             x = -Infinity; // = l'an 1000 ...
//         }

//         if (jQuery.trim(b) !== '') {
//             var deDateb = jQuery.trim(b).split(' ');
//             var deTimeb = deDateb[1].split(':');
//             deDateb = deDateb[0].split('/');
//             if (typeof deTimeb[2] != 'undefined') {
//                 y = (deDateb[2] + deDateb[1] + deDateb[0] + deTimeb[0] + deTimeb[1] + deTimeb[2]) * 1;
//             } else {
//                 y = (deDateb[2] + deDateb[1] + deDateb[0] + deTimeb[0] + deTimeb[1]) * 1;
//             }
//         } else {
//             y = -Infinity;
//         }
//         var z = ((x < y) ? -1 : ((x > y) ? 1 : 0));
//         return z;
//     },

//     "de_datetime-desc": function(a, b) {
//         var x, y;
//         if (jQuery.trim(a) !== '') {
//             var deDatea = jQuery.trim(a).split(' ');
//             var deTimea = deDatea[1].split(':');
//             var deDatea2 = deDatea[0].split('/');
//             if (typeof deTimea[2] != 'undefined') {
//                 x = (deDatea2[2] + deDatea2[1] + deDatea2[0] + deTimea[0] + deTimea[1] + deTimea[2]) * 1;
//             } else {
//                 x = (deDatea2[2] + deDatea2[1] + deDatea2[0] + deTimea[0] + deTimea[1]) * 1;
//             }
//         } else {
//             x = Infinity;
//         }

//         if (jQuery.trim(b) !== '') {
//             var deDateb = jQuery.trim(b).split(' ');
//             var deTimeb = deDateb[1].split(':');
//             deDateb = deDateb[0].split('/');
//             if (typeof deTimeb[2] != 'undefined') {
//                 y = (deDateb[2] + deDateb[1] + deDateb[0] + deTimeb[0] + deTimeb[1] + deTimeb[2]) * 1;
//             } else {
//                 y = (deDateb[2] + deDateb[1] + deDateb[0] + deTimeb[0] + deTimeb[1]) * 1;
//             }
//         } else {
//             y = -Infinity;
//         }
//         var z = ((x < y) ? 1 : ((x > y) ? -1 : 0));
//         return z;
//     },

//     "de_date-asc": function(a, b) {
//         var x, y;
//         if (jQuery.trim(a) !== '') {
//             var deDatea = jQuery.trim(a).split('/');
//             x = (deDatea[2] + deDatea[1] + deDatea[0]) * 1;
//         } else {
//             x = Infinity; // = l'an 1000 ...
//         }

//         if (jQuery.trim(b) !== '') {
//             var deDateb = jQuery.trim(b).split('/');
//             y = (deDateb[2] + deDateb[1] + deDateb[0]) * 1;
//         } else {
//             y = -Infinity;
//         }
//         var z = ((x < y) ? -1 : ((x > y) ? 1 : 0));
//         return z;
//     },

//     "de_date-desc": function(a, b) {
//         var x, y;
//         if (jQuery.trim(a) !== '') {
//             var deDatea = jQuery.trim(a).split('/');
//             x = (deDatea[2] + deDatea[1] + deDatea[0]) * 1;
//         } else {
//             x = -Infinity;
//         }

//         if (jQuery.trim(b) !== '') {
//             var deDateb = jQuery.trim(b).split('/');
//             y = (deDateb[2] + deDateb[1] + deDateb[0]) * 1;
//         } else {
//             y = Infinity;
//         }
//         var z = ((x < y) ? 1 : ((x > y) ? -1 : 0));
//         return z;
//     }
// });
//DataTable Datetime Sorting
// $.fn.dataTable.moment('MM/DD/YYYY hh:mm A');

// $.fn.dataTable.moment = function(format, locale) {
//     
//     var types = $.fn.dataTable.ext.type;

//     // Add type detection
//     types.detect.unshift(function(d) {
//         return moment(d, format, locale, true).isValid() ?
//             'moment-' + format :
//             null;
//     });

//     // Add sorting method - use an integer for the sorting
//     types.order['moment-' + format + '-pre'] = function(d) {
//         return moment(d, format, locale, true).unix();
//     };
// };

// jQuery.fn.dataTableExt.oSort['uk_date-pre'] = function(a) {
//     
//     a = a.slice(0, -2) + ' ' + a.slice(-2);
//     var date = Date.parse(a);
//     return typeof date === 'number' ? date : -1;
// }
// jQuery.fn.dataTableExt.oSort['uk_date-asc'] = function(a, b) {
//     
//     return ((a < b) ? -1 : ((a > b) ? 1 : 0));
// }
// jQuery.fn.dataTableExt.oSort['uk_date-desc'] = function(a, b) {
//     
//     return ((a < b) ? 1 : ((a > b) ? -1 : 0));
// }


Waves.init();
$(document).ready(function() {
    // $(".slimScrollCustom").mCustomScrollbar({
    //           theme: "minimal-dark"
    //         });

    // $('#newbtn').on('click', function() {

    //     if ($('#list-rule').is(':visible')) {
    //         $('#list-rule').fadeOut(function() {
    //             $('#new-rule').fadeIn(500);
    //         });
    //     }
    // });

    // $('#cancelbtn, #savebtn').on('click', function() {

    //     if ($('#new-rule').is(':visible')) {
    //         $('#new-rule').fadeOut(function() {
    //             $('#list-rule').fadeIn(500);
    //         });
    //     }
    // });

});