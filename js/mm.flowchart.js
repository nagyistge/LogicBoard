function FlowChart($container,data){
  var graph = new joint.dia.Graph;
  var $g_container = $("<div></div>").addClas("g_container").appendTo($container);
  var $g = $("<div></div>").addClass("graph").appendTo($g_container);
  var $p = $("<div></div>").addClass("panel").appendTo($g_container);
  
  var paper = new joint.dia.Paper({
    el: $g,
    gridSize: 1,
    width: 800,
    height: 600,
    model: graph
  });
  paper.on("blank:pointerclick",function(evt){
      var model = $flow_blocks.get_cur_model();
      if((model != null) && (model instanceof Function)){
        var new_el = new model({position:{x:evt.offsetX,y:evt.offsetY}});
        graph.addCell(new_el);
      }

    });
  paper.on("cell:pointerclick",function(elem,evt){
    var model = $flow_blocks.get_cur_model();
    if(model == "link"){
      var nlink = new joint.shapes.fsa.Arrow(
                  {
                    source:{id:elem.model.id},
                    target:{x:evt.offsetX - 20,y:evt.offsetY - 20},
                    //labels:[{attrs:{text:"yyy"}}]
                  });
      graph.addCell(nlink);
    }
  });
}
