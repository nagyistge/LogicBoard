function MultiPanelControl(con){
  var that = this;

  this.windows = {};

  //"use strict";

	// set some options as taskbar's defaults
	/*$.simone.taskbarSetup({
		languageSelect: true,
		languages: [ "en" ],
		orientation: "vertical",
		verticalStick: "bottom right",
		verticalHeight: "80%",
		beforeDroppableOver: function ( event, ui ) {
			// we have top bar on page, so let's dissalow dropping
			// taskbars on top edge
			if ( ui.edge === "top" ) {
				event.preventDefault();
			}
		}
	});*/


  /*$.simone.windowSetup({
		closable: false,
		group: "shared",
		width: 400
	});*/
  var taskbar = $("#taskbar",con).taskbar({
                    buttons:{
                        OpenProject:{}
                    },
                    buttonsOrder: [ "OpenProject" ],
                });
  $("#taskbar",con).taskbar("option","buttons.OpenProject")
                .$element.on("click",function(){
                                    $proj_manager.openProject();
                                    }
                            );
  var id = 0;
  this.windows = {};
  //var proj = new ProjectTree(createAWindow("proj"));
  function createAWindow(name) {
    "use strict";
    var $win = $("<div></div>")
              .appendTo(con)
              .attr("title",name).attr("id","win-" + id)
              .window({
                position:{
                  my:"right top",
                  at:"right top"
                },
                title:name,
                width:680,
                height:500
              })
              .append("<div class='content'></div>");
      that.windows[name] = $win;
      id ++;
      return $win;
  }

  function createWindow(name,cfg){
    var win =  $("<div></div>")
              .append("<div class='content'></div>")
              .appendTo(con)
              .window(cfg);
    that.windows[name] = win;
    return $(".content",win);
  }
  this.createWindow = function(name,cfg){
    return createWindow(name,cfg);
  }
  this.createTCTab = function(name){
    var $win = createAWindow(name);
    var $content = $(".content",$win);
    var chart = new FlowChart($content);
  };
  this.createSeqTab = function(name,data){
    var data1 = {
            sig_def:{
                name:"keyin",
                type:"input"
                },
            end_point:100,
            data:[[0,1],[10,0],[40,1],[60,0]]
        };
        var data2 = {
            sig_def:{
                name:"lowbeam",
                type:"input"
            },
            data:[[0,0],[12,1],[50,0],[60,1]]
        };
        var data3 = {
            sig_def:{
                name:"highbeam",
                type:"input"
            },
            data:[[0,1],[6,1],[50,0],[53,0],[60,0]]
        };
    var $win = createAWindow(name);
    if(data.data == []){
      data.data = [data1,data2,data3];
    }
    $(".content",$win).addClass("seq");
    var charts = new LogicCharts($(".content",$win),data);
    $win.window( "option", "beforeClose", function(){
        charts.close();
    } );
  }



}



