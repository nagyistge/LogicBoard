function SignalPanel(con,signal_def,selected_list){
    $.each(signal_def,function(index,def){
        var item = $("<div></div>").addClass("signal").text(def.name).appendTo(con);
        if(selected_list.hasProperty(def.name)){
            item.addClass("selected");
        }
    });
}