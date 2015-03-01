
function LogicChart(con,cfg,signal,parent){
    var that = this;
    var width = $(con).width();
    var height = $(con).height();
    this.parent = parent;
    this.container = con;
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
    this.$note = $("<div></div>").addClass("note").height(height);
    this.$chart = $("<div></div>").addClass("chart").appendTo(con).height(height);
    this.$note.appendTo(con);
    this.$chart.appendTo(con);
    this.cfg = $.extend(true,this.cfg,cfg);
    this.signal = signal;
    init();
}

function init(){
    LogicChart.prototype.init_chart = function(){
        var render_data = conv_signal_to_plot_data(this.signal);
        var parent = this.parent;
        var that = this;
        this.plot = $.plot(this.$chart,[{data:render_data}],this.cfg);
		    this.$chart.bind("startpan", function (event, plot){
			  var axes = plot.getAxes();
            var args = arguments[2];
            parent.pan(that.get_name(),
                    {
                    left:args.left,
                    top:args.top
                    });
		    });

		    this.$chart.bind("plotzoom", function (event, plot) {
			      var args = arguments[2];
            args.preventEvent = true;
            parent.zoom(that.get_name(),args);
		    });

        /*$(note_con).bind("drag",function(event,dd){

            console.log("drag " + event.toString() + " dd " + dd.toString());
        });

        $(note_con).bind("dragend",function(event,dd){
             console.log("drag " + event.toString() + " dd " + dd.toString());

        });*/


        this.note_refresh();
    }
    LogicChart.prototype.get_name = function(){ return this.signal.sig_def.name;}
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

    LogicChart.prototype.zoom = function(triggered_id,c){
        if(triggered_id == this.get_name()) return;
        this.plot.zoom(c);
    }

    LogicChart.prototype.pan = function(triggered_id,c){
        if(triggered_id == this.get_name()){
            return;
        }
        this.plot.pan(c);
    }
    LogicChart.prototype.resize = function(size){
        $(this.container).height(size.height);
        this.$note.height(size.height);
        this.$chart.height(size.height);
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
