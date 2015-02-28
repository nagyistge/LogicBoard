
function LogicChart(id,con,cfg,signal,parent){
    var that = this;
    var width = $(con).width();
    var height = $(con).height();
    this.parent = parent;
    this.id = id;
    this.cfg = {
        hooks:{
            bindEvents:function(plot, eventHolder){
                eventHolder.click(function(evt){
                    that.click(evt);
                });
                eventHolder.mousemove(function(evt){
                    that.mousemove(evt);
                });
            }
       },
    };
    this.$note = $("<div></div>").addClass("note").attr("id",id).height(height);
    this.$chart = $("<div></div>").addClass("chart").attr("id",id).appendTo(con).height(height);
    this.$note.appendTo(con);
    this.$chart.appendTo(con);
    this.cfg = $.extend(true,this.cfg,cfg);
    this.signal = signal;
    init();
}

function init(){
    LogicChart.prototype.init_chart = function(){
        var render_data = conv_signal_to_plot_data(this.signal);
        var chart_con = "#" + this.id + ".chart";
        var parent = this.parent;
        var trigger_id = this.id;
        this.plot = $.plot(chart_con,[{data:render_data}],this.cfg);
		$(chart_con).bind("startpan", function (event, plot){
			var axes = plot.getAxes();
            var args = arguments[2];
            parent.pan(trigger_id,
                    {
                    left:args.left,
                    top:args.top
                    });
			$(".message").html("Panning to x: "  + axes.xaxis.min.toFixed(2) + "point " + (axes.xaxis.c2p(0) - axes.xaxis.c2p(axes.xaxis.min)) + "scale" + axes.xaxis.scale + "arg left " + args.left
			+ " &ndash; " + axes.xaxis.max.toFixed(2)
			+ " and y: " + axes.yaxis.min.toFixed(2)
			+ " &ndash; " + axes.yaxis.max.toFixed(2));
		});

		$(chart_con).bind("plotzoom", function (event, plot) {
			var axes = plot.getAxes();
			$(".message").html("Zooming to x: "  + axes.xaxis.min.toFixed(2)
			+ " &ndash; " + axes.xaxis.max.toFixed(2)
			+ " and y: " + axes.yaxis.min.toFixed(2)
			+ " &ndash; " + axes.yaxis.max.toFixed(2));
		});
        this.note_refresh();
    }
    LogicChart.prototype.refresh = function(){
    
    }
    LogicChart.prototype.note_refresh = function(){
        this.$note.empty();
        this.$note.append($("<div></div>").text(this.signal.sig_def.name));
    }

    LogicChart.prototype.mousemove = function(evt){
        var offset = this.plot.offset();
        var cor = this.plot.c2p({left:evt.pageX - offset.left,top:evt.pageY});
    //        $("#pop_info").css({left:evt.pageX,top:evt.pageY}).text("time:" + Math.round(cor.x));
    }
    LogicChart.prototype.click = function(evt){
        var offset = this.plot.offset();
        var cor = this.plot.c2p({left:evt.pageX - offset.left,top:evt.pageY});
        var click_point = Math.round(cor.x);
        var data = this.signal.data;
        var ins_point;
        if(data.length == 0){
            data.push([click_point,1]);
        }else{
            ins_point = data.length;
            for(var i = 0; i < data.length; i++){
                if(data[i][0] > click_point){
                    ins_point = i;
                    data[i][0] = click_point;
                    break;
                }
            }
            if(ins_point == data.length){
                data.push([click_point,1 != data[ins_point - 1][1]]);
            }
        }
        this.refresh();    
    }
    LogicChart.prototype.refresh = function(){
        var render_data = conv_signal_to_plot_data(this.signal);
        this.plot.setData([render_data]);
        this.plot.draw();
    }
    
    LogicChart.prototype.zoom = function(c){
        this.plot.zoom(c);
    }
    
    LogicChart.prototype.zoomOut = function(c){
        this.plot.zoomOut(c);
    }
    LogicChart.prototype.pan = function(triggered_id,c){
        console.log("trigggered by " + triggered_id + "executed in " + this.id + " go " + c.toString());
        if(triggered_id == this.id){
            return;
        }
        this.plot.pan(c);
    }
}
function conv_signal_to_plot_data(signal){
        var res = new Array();
        var raw_data = signal.data;
        var cursor = 0;
        if(raw_data.length == 0){
            res.push([0,0]);
            res.push([signal.end_point,0]);
            return res;
        }
        if(raw_data[0][0] == 0)
            res.push(raw_data[0]);
        else
            res.push([0,0]);
        cursor = 0;
        for(var i = 0;i < raw_data.length; i ++){
            if(res[cursor][1] == raw_data[i][1])
                continue;
            if(res[cursor][0] < raw_data[i][0]){
                res.push([raw_data[i][0],res[cursor][1]]);
                cursor ++;
            }
            res.push(raw_data[i]);
            cursor ++;
        }
        if(res[cursor][0] < signal.end_point){
            res.push([signal.end_point,res[cursor][1]]);
        }
        return res;
}