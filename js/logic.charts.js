function LogicCharts(con,node){
    var that = this;
    var that_charts = this;
    var chart_hieght;
    var chart_width;
    var previousX,previousY;

    var flot_cfg = {
       series:{
              lines:{show:true},
              points:{show:false}
       },
       legend:{
              show:false
       },
       yaxis:{
              show:false,
              zoomRange:false,
              panRange:false

       },
       xaxis:{
              show:false,
              //zoomRange:60
       },
       zoom:{
            interactive:true,
       },
       pan:{
            interactive:true,
       }
    };

    this.end_point = 1000;
    this.raw_data = node.data;
    this.container = $("<div></div>").addClass("charts").appendTo(con);
    this.sigs_sel_con = $("<div></div>").addClass("sig_sel_con").appendTo(con);
    //this.cmd_con = $("<div></div>").addClass("cmd_con").appendTo(con);
    var sigs_panel = new SignalPanel(this.sigs_sel_con,bcm_signals);
    this.charts = {};
    this.chart_height = 0;
    if(Array.isArray(that.raw_data)){
        var gap_index = 0;
        chart_height = $(that.container).height() / that.raw_data.length;
        chart_width = $(that.container).width();
        $("<div></div>").attr("id","pop_info").css({position:"absolute"}).appendTo(that.container);
        $.each(that.raw_data,function(index,signal){
            create_chart(signal);
            });
    }
    function create_chart(signal){
        var $chart_con = $("<div></div>").attr("id",signal.sig_def.name)
                                        .addClass("chart_container")
                                        .appendTo(that.container)
                                        .draggable({
                                           cursor: "move",
                                           cursorAt: { top: 10, left: 20 },
                                           revert: "invalid",
                                           containment: that.container,
                                        })
                                        .droppable({
                                          accept:".chart_container",
                                          tolerance:"pointer",
                                          hoverClass:"drop_active",
                                          drop:function(evt,ui){
                                            move_chart(ui.draggable,evt.target);
                                          }});
        signal.end_point = 100;
        var chart = new LogicChart($chart_con,flot_cfg,signal,that);
        chart.init_chart();
        that.charts[signal.sig_def.name] = chart;


    }
    this.pan = function(triggered_id,c){
        $.each(that.charts,function(index,chart){
            chart.pan(triggered_id,c);
        });
    }
    this.zoom = function(triggered_id,c){
        $.each(that.charts,function(index,chart){
            chart.zoom(triggered_id,c);
        });
    }
    this.del_signal = function(signal_def){
      var chart = this.charts[signal_def.name];
      if(chart != undefined){
        $("#" + signal_def.name + ".chart_container").remove();
        delete this.charts[signal_def.name];
      }
    }
    this.add_signal = function(signal_def){
        var found = false;
        var that = this;
        var signal = {sig_def:signal_def,data:[]};

        if(this.charts[signal_def.name] != undefined) return;
        for(i = 0;i < this.raw_data.length; i ++){
            if(this.raw_data[i].sig_def.name == signal_def.name){
                signal = this.raw_data[i];
                found = true;
                break;
            }
        }
        if(!found) this.raw_data.push(signal);
        create_chart(signal);
    }
    this.close = function(){
      console.log(this.node);
    }


    function move_chart(src,dst){
      $(dst).after(src);
      $(src).css("left",0).css("top",0);//({left:(0),top:(0)});
    }

    function get_signals_list(){
      var signal_list = {};
      $.each(that.raw_data,function(index,item){
                              signal_list[item.sig_def.name] = item.sig_def;
                            });
      return signal_list;
    }

    function SignalPanel(con,signal_def){
    var selected_list = get_signals_list();
    $.each(signal_def,function(index,def){
        var $item = $("<div></div>").addClass("signal").text(def.name).attr("id",index).appendTo(con);
        if(selected_list.hasOwnProperty(def.name)){
            $item.addClass("selected");
        }else{
            $item.removeClass("selected");
        }
        $item.click(item_click);
    });
    function item_click(evt){
        var $item = $(evt.target);
        $item.toggleClass("selected");
        var id = $item.attr("id");
        if($item.hasClass("selected") == true){
            that_charts.del_signal(signal_def[id]);
        }else{
            that_charts.add_signal(signal_def[id]);
        }
    }
    }

}


