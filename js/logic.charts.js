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
    if(Array.isArray(data)){
        chart_height = $(that.container).height() / data.length;
        chart_width = $(that.container).width();
        $("<div></div>").attr("id","pop_info").css({position:"absolute"}).appendTo(that.container);
        $.each(that.raw_data,function(index,signal){
            var chart_note = chart_width * 0.2;
            var chart_data = new Array();
            var chart;
            
            var $chart_con = $("<div></div>").attr("id","chart" + index).addClass("chart_container").appendTo(that.container).height(chart_height).width(chart_width - chart_note);
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
    function onDragStart(evt){
        if((evt.which != 1) || $(evt.srcElement).hasClass("note")){
            previousX = -1;
            previousY = -1;
            return;
        }
        previousX = evt.pageX;
        previousY = evt.pageY
    }
    function onDrag(){
    }
    function onDragEnd(evt){
        if(previousX == -1) return;
        $.each(that.charts,function(index,chart){
            chart.pan({left:previousX - evt.pageX,top:0});
        });
    }
}


