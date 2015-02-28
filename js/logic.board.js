function LogicBoard(con,signal_def,signal_data){
    var s_panel_con = $("<div></div>");
    var signal_panel = new SignalPanel(signal_def,get_selected_signal(signal_data));

}