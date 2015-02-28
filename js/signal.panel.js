function SignalPanel(con,signal_def,selected_list,cbs){
    $.each(signal_def,function(index,def){
        var $item = $("<div></div>").addClass("signal").text(def.name).attr("id",index).appendTo(con);
        if(selected_list.hasOwnProperty(def.name)){
            item.addClass("selected");
        }
        $item.click(item_click);
    });
    
    function item_click(evt){
        var $item = $(evt.target);
        $item.toggleClass("selected");
        if(cbs.select_change_cb != undefined){
            var id = $item.attr("id");
            cbs.select_change_cb(signal_def[id],$item.hasClass("selected"));
        }
    }
}

