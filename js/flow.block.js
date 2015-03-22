function FlowBlock($content){
  var graph = new joint.dia.Graph;
  var select_model = null;

  this.get_cur_model = function(){return select_model;};
  var paper = new joint.dia.Paper({
    el: $content,
    gridSize: 1,
    interactive:false,
    width: 200,
    height: 600,
    model: graph
  });

  var pointer = new joint.shapes.erd.Entity({
      attrs:{
        text:{
          text:"Pointer"
        }
      }
  });
  pointer.ref_model = null;

  var func_seq = new joint.shapes.erd.Entity({
      attrs:{
        text:{
          text:"FuncSeq"
        }
      }
  });
  func_seq.ref_model = mm.shapes.flow.FuncSeq;

  var scenario = new joint.shapes.erd.Entity({
      attrs:{
        text:{
          text:"Scenario-Branch"
        }
      }
  });
  scenario.ref_model = mm.shapes.flow.Scenario;


  var check = new joint.shapes.erd.Entity({
      attrs:{
        text:{
          text:"Check"
        }
      }
  });
  check.ref_model = mm.shapes.flow.Check;

  var start_point = new joint.shapes.uml.StartState();
  start_point.ref_model = joint.shapes.uml.StartState;


  var end_point = new joint.shapes.uml.EndState();
  end_point.ref_model = joint.shapes.uml.EndState;

  var blocks = [start_point,end_point,func_seq,scenario,check];

  graph.addCells(tool_box_layout(blocks));

    paper.on("cell:pointerclick",function(elem,evt){
      select_model = elem.model.ref_model;
    });


    function tool_box_layout(blocks){
    var s_point = {x:0,y:0};
    var b_size = {width:90,height:90};
    var offset = {x:100,y:100};
    var col = 2;

    $.each(blocks,function(index,block){
          var cur_col = index % col;
          var cur_row = parseInt(index / col);
          var pos = {
            x:s_point.x + cur_col * offset.x,
            y:s_point.y + cur_row * offset.y
          };
          block.resize(b_size.width,b_size.height);
          block.position(pos.x,pos.y);
      });
    return blocks
    }
}
