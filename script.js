$(document).ready(function() {

    $('.box-item').draggable({
        cursor: 'move',
        helper: "clone",
        addClasses: true,
        refreshPositions: true,
        start: function (event, ui) {
            //ui.helper.appendTo('body');
            var container_id = $(this).parent().attr('id');
            var id = $("#"+container_id).data("id");
            var boxCount = $("#boxCount"+id).text();
            $("#boxCount"+id).text(parseInt(boxCount)-1);
        },
        drag: function( event, ui ) {
            console.log(event);
            console.log(ui);
        },
        stop: function (event, ui) {
            var container_id = $(this).parent().attr('id');
            var id = $("#"+container_id).data("id");
            var boxCount = $("#boxCount"+id).text();
            $("#boxCount"+id).text(parseInt(boxCount)+1);
        }
    });

    $("#container1").droppable({
        drop: function(event, ui) {
            var itemid = $(event.originalEvent.toElement).attr("itemid");
            $('.box-item').each(function() {
                if ($(this).attr("itemid") === itemid) {
                    $(this).appendTo("#container1");
                }
            });
        }
    });

    $("#container2").droppable({
        drop: function(event, ui) {
            var itemid = $(event.originalEvent.toElement).attr("itemid");
            $('.box-item').each(function() {
                if ($(this).attr("itemid") === itemid) {
                    $(this).appendTo("#container2");
                }
            });
        }
    });

    $("#container3").droppable({
        drop: function(event, ui) {
            var itemid = $(event.originalEvent.toElement).attr("itemid");
            $('.box-item').each(function() {
                if ($(this).attr("itemid") === itemid) {
                    $(this).appendTo("#container3");
                }
            });
        }
    });


    $('[id^="container"]').droppable({
        //accept: ".box-item",
        activate: function ( event, ui ) {
            console.log(event);
            console.log(ui);
        },
        drop: function(event, ui) {
            var container_id = $(this).attr("id");
            var id = $(this).data("id");
            var itemid = $(event.originalEvent.toElement).attr("itemid");
            $('.box-item').each(function(index) {

                //if ($('.box-item').length != index){}

                if ($(this).attr("itemid") === itemid) {
                    $(this).appendTo("#"+container_id);

                    //Ajax for update in database
                    $.ajax({
                        url: 'drop.php',
                        type: 'post',
                        //async: false,
                        //dataType: 'json',
                        data: {id: id, itemid: itemid},
                        success: function (data) {
                            console.log(data);
                        },
                        complete: function () {
                            // Schedule the next request when the current one has been completed
                            setTimeout(ajaxInterval, 4000);
                        }
                    });
                }
            });
        },
        out: function(event, ui){
            console.log(event);
            console.log(ui);
        }
    });


});