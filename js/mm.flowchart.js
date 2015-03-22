function FlowChart($content,data){
  var graph = new joint.dia.Graph;

  var paper = new joint.dia.Paper({
    el: $content,
    gridSize: 1,
    width: 800,
    height: 600,
    model: graph
  });
  paper.on("blank:pointerclick",function(evt){
      var model = $flow_blocks.get_cur_model();
      if(model != null){
        var new_el = new model({position:{x:evt.offsetX,y:evt.offsetY}});
        graph.addCell(new_el);
      }

    });
}
