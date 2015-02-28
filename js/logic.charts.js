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
              zoomRange:false
       },
       xaxis:{
              show:false,
              zoomRange:60
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
    this.charts = new Array();
    this.chart_height = 0;
    if(Array.isArray(data)){
        chart_height = $(that.container).height() / data.length;
        chart_width = $(that.container).width();
        $("<div></div>").attr("id","pop_info").css({position:"absolute"}).appendTo(that.container);
        $.each(that.raw_data,function(index,signal){
            var chart_note = chart_width * 0.2;
            var chart_data = new Array();
            var chart;
            
            var $chart_con = $("<div></div>").attr("id","chart" + index).addClass("chart_container").height(chart_height).appendTo(that.container);
            signal.end_point = 100;
            chart = new LogicChart(index,$chart_con,flot_cfg,signal,that);
            chart.init_chart();
            //plot = $.plot(that.container + " #chart" + index, [{data:render_data}],flot_cfg);
            //plot.zoom({ center: { left: 30, top: 10 } });
            //plot.getIndex = function(){return index;};
            that.charts.push(chart);
        });
        /*$(that.container).mousewheel(function(evt){
            var zoomOut = evt.deltaY < 0;
            var zoomF;
            if(zoomOut)
                zoomF = function(chart){
                        var c = {left:evt.deltaX,top:10};
                        chart.zoomOut(c);
                    };
            else
                zoomF = function(chart){
                        var c = {left:evt.deltaX,top:10};
                        chart.zoom(c);
                    };
            $.each(that.charts,function(index,chart){
                zoomF(chart);
            });
            console.log(evt.deltaY + " , " + evt.deltaX);
        });*/
        //$(that.container).bind("dragstart",{distance:10},onDragStart);
        //$(that.container).bind("drag",onDrag);
        //$(that.container).bind("dragend",onDragEnd);
    }
    this.pan = function(triggered_id,c){
        $.each(that.charts,function(index,chart){
            chart.pan(triggered_id,c);
        });
    }
    this.add_signal = function(signal_def){
        var found = false;
        var that = this;
        for(i = 0;i < this.raw_data.length; i ++){
            if(this.raw_data[i].sig_def.name == signal_def.name){
                found = true;
                break;
            }
        }
        if(found == false){
            var signal = {sig_def:signal_def,data:[]};
            var id = this.raw_data.length;
            this.raw_data.push(signal);
            this.chart_height = $(this.container).height() / this.raw_data.length;
            $.each(this.charts,function(index,chart){
                    chart.resize({width:$(that.container).width(),height:that.chart_height});
                });
            var $chart_con = $("<div></div>").attr("id","chart" + id).addClass("chart_container").height(that.chart_height).appendTo(that.container);
            signal.end_point = 100;
            var chart = new LogicChart(this.raw_data.length - 1,$chart_con,flot_cfg,signal,that);
            chart.init_chart();
            this.charts.push(chart);
        }
    }
}


