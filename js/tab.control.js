function TabControl(con){
  var tabCount = 0;
  var tabTemplate =
      "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>";
  var tabs = $(con).tabs();

  this.createTCTab = function(){

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
