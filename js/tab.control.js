function MultiPanelControl(con){
  var that = this;
 
  this.windows = {};

  "use strict";

	// set some options as taskbar's defaults
	$.simone.taskbarSetup({
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
	});


  $.simone.windowSetup({
		closable: false,
		group: "shared",
		width: 400
	});
  var taskbar = $("#taskbar",con).taskbar();
  var id = 0;
  this.windows = {};
  //var proj = new ProjectTree(createAWindow("proj"));
  function createAWindow(name) {
    "use strict";
    var win = $("<div></div>")
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
      that.windows[name] = win;
      id ++;
      return $(".content",win);
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
    var $content = createAWindow(name);
    var graph = new joint.dia.Graph;

var paper = new joint.dia.Paper({
    el: $content,
    gridSize: 1,
    width: 800,
    height: 600,
    model: graph
});

var erd = joint.shapes.erd;

var element = function(elm, x, y, label) {
    var cell = new elm({ position: { x: x, y: y }, attrs: { text: { text: label }}});
    graph.addCell(cell);
    return cell;
};

var link = function(elm1, elm2) {
    var myLink = new erd.Line({ source: { id: elm1.id }, target: { id: elm2.id }});
    graph.addCell(myLink);
    return myLink;
};

var employee = element(erd.Entity, 100, 200, "Employee");
var salesman = element(erd.Entity, 100, 400, "Salesman");
var wage = element(erd.WeakEntity, 530, 200, "Wage");
var paid = element(erd.IdentifyingRelationship, 350, 190, "gets paid");
var isa = element(erd.ISA, 125, 300, "ISA");
var number = element(erd.Key, 0, 90, "number");
var nameEl = element(erd.Normal, 75, 30, "name");
var skills = element(erd.Multivalued, 150, 90, "skills");
var amount = element(erd.Derived, 440, 80, "amount");
var date = element(erd.Normal, 590, 80, "date");
var plate = element(erd.Key, 405, 500, "plate");
var car = element(erd.Entity, 430, 400, "Company car");
var uses = element(erd.Relationship, 300, 390, "uses");

link(employee, paid).cardinality('1');
link(employee, number);
link(employee, nameEl);
link(employee, skills);
link(employee, isa);
link(isa, salesman);
link(salesman, uses).cardinality('0..1');;
link(car, uses).cardinality('1..1');
link(car, plate);
link(wage, paid).cardinality('N');
link(wage, amount);
link(wage, date);
  };
  this.createSeqTab = function(name){
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
    var $content = createAWindow(name);
    var charts = new LogicCharts($content,[data1,data2,data3]);
  }


}



