function LogicCharts(con,data){
    var that = this;
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
    this.raw_data = data;
    this.container = con;
    this.charts = {};
    this.chart_height = 0;
    if(Array.isArray(data)){
        var gap_index = 0;
        chart_height = $(that.container).height() / data.length;
        chart_width = $(that.container).width();
        $("<div></div>").attr("id","pop_info").css({position:"absolute"}).appendTo(that.container);
        $.each(that.raw_data,function(index,signal){
            //var chart;
            //var $chart_con = $("<div></div>").attr("id",signal.sig_def.name).addClass("chart_container").height(chart_height).appendTo(that.container);
            //that.charts[signal.sig_def.name] = (chart);
            create_chart(signal);
            });
        /*$("#chart_containers .chart_container").draggable({
                         cursor: "move",
                         cursorAt: { top: 56, left: 56 },
                         //revert: "invalid",
                         containment: "#chart_containers",
                        });
        $("#chart_containers .chart_container").droppable({
          accept:".chart_container",
          tolerance:"pointer",
          hoverClass:"drop_active",
          drop:function(evt,ui){
            var src = ui.draggable;
            var dst = evt.target;
            $(dst).after(src);
            $(src).css("left",0).css("top",0);//({left:(0),top:(0)});
          },

        });*/

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


    function move_chart(src,dst){
      $(dst).after(src);
      $(src).css("left",0).css("top",0);//({left:(0),top:(0)});
    }

}


