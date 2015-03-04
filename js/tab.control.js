function TabControl(con){
  var tabCount = 0;
  var tabTemplate =
      "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>";
  var tabs = $(con).tabs();

  this.createTCTab = function(name){
    var content = createTab(name,tabCount++);
    var graph = new joint.dia.Graph;

var paper = new joint.dia.Paper({
    el: content,
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
    var content = createTab(name,tabCount++);
    var charts = new LogicCharts(content,[data1,data2,data3]);
  }

  function createTab(title,id){
    var label = title;
    var li =  $(tabTemplate.replace(/#\{href\}/g,"#" + id).replace(/#\{label\}/g,label));
    tabs.find(".ui-tabs-nav").append(li);
    var content = $("<div></div>").attr("id",id).addClass("tab_content").appendTo(tabs);
    tabs.tabs("refresh");
    return content;
  }
}
