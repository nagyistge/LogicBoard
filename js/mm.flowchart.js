
function FlowChart($container,data){
  var graph = new joint.dia.Graph;
  var $g_container = $("<div></div>").addClass("g_container").appendTo($container);
  var $g = $("<div></div>").addClass("graph").appendTo($g_container);
  var $p = $("<div></div>").addClass("panel").appendTo($g_container);

  var paper = new joint.dia.Paper({
    el: $g,
    gridSize: 1,
    width: "100%",
    height: "100%",
    model: graph
  });
  paper.on("blank:pointerclick",function(evt){
      var model = $flow_blocks.get_cur_model();
      if((model != null) && (model instanceof Function)){
        var new_el = new model({position:{x:evt.offsetX,y:evt.offsetY}});
        graph.addCell(new_el);
      }
      if(model == "Pointer"){

      }

    });
  paper.on("cell:pointerclick",function(elem,evt){
    var model = $flow_blocks.get_cur_model();
    if(model == "link"){
      var nlink = new joint.shapes.fsa.Arrow(
                  {
                    source:{id:elem.model.id},
                    target:{x:evt.offsetX - 20,y:evt.offsetY - 20},
                    labels: [{ position: .5, attrs: { text: { text: "test", 'font-weight': 'bold' } } }]
                  });
      graph.addCell(nlink);
    }
    render_entity_panel(elem,$p);
  });

  function render_entity_panel(elem,$con){
    if(entity_def[elem.model.attributes.type] != null){
      entity_def[elem.model.attributes.type].render_panel(elem,$con);
    }
  }
}

var entity_def = {
  "flow.FuncSeq":{
    render_panel:function(elem,$con){
      $("<div/>").text("Function Sequence File")
                    .append($("<input/>"))
                  .appendTo($con.empty());
      }
    },
  "flow.Check":{
    render_panel:function(elem,$con){
      $("<div/>").text("check result").appendTo($con.empty());
    }
  }

};

