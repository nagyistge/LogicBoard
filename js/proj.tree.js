function ProjectTree(con,_proj){
  var cur_node_id = 100;
  var proj_data = _proj;
  if(proj_data == null) proj_data = {"tree":[{label:"new project",type:"project",id:1}],data:{}};
  var project_tree = create_proj_tree();

  $(con).on("click",".pulldown-menu li",function(evt){
                                        var command = evt.target.id;
                                        var node = $(evt.target).parent().data();
                                        node_func_tab[command](node);
                                    });
  function create_proj_tree(){
    var tree = $(con).tree(
                  {data:proj_data.tree,autoOpen:true,dragAndDrop:true,
                   onCreateLi:function(node,$li){
                                var $menu = $("<span></span>").addClass("tree-menu").append($("<div>Menu</div>").addClass("menu-bar"));
                                $menu.append(createContextMenu(node));
                                $li.find('.jqtree-element').append($menu);
                            },
                   }
               );
    return tree;
  }
  this.openProject = function(){
    mm.open_file_dlg(function(file){
      mm.read_json_file(file,function(obj){
            proj_data = obj;
            if(obj == null) return;
            project_tree.tree("loadData",proj_data.tree);
        });
    });
  }
   var node_func_tab = {
    "delete":delete_node,
    "create_sub_folder":create_sub_folder,
    "create_tc":create_tc,
    "create_seq":create_seq,
    "open":open_node,
     "save":save_project
   };

   function save_project(){
    proj_data.tree= project_tree.tree('getTree').getData();
    mm.save_file(proj_data.tree[0].name,proj_data);
   }

   function delete_node(node){
   }
   function create_sub_folder(node){
    var parent_node = project_tree.tree('getNodeById', node.id);
    project_tree.tree("selectNode",(null));
    project_tree.tree("appendNode",{label:"new folder",id:generateUUID(),type:"folder"},parent_node);

   }
   function create_tc(node){
    var parent_node = project_tree.tree('getNodeById', node.id);
    project_tree.tree("selectNode",(null));
    project_tree.tree("appendNode",{label:"new_tc",id:generateUUID(),type:"tc"},parent_node);
   }
   function create_seq(node){
    var parent_node = project_tree.tree('getNodeById', node.id);
    var id = generateUUID();
    project_tree.tree("selectNode",(null));
    project_tree.tree("appendNode",{label:"new_seq",id:id,type:"seq"},parent_node);
    proj_data.data[id] = default_seq();
   }
   function open_node(node){
    if(node.type == "tc"){
        win_manager.createTCTab(node.name,node);
    }
    if(node.type == "seq"){
      if (proj_data.data[node.id] == undefined){
        proj_data.data[node.id] = default_seq();
      }
      win_manager.createSeqTab(node.name,proj_data.data[node.id]);
    }
   }
   function createContextMenu(node){
       var $menu = $("<div></div>").addClass("pulldown-menu").data(node);
       if(node.type != "project")
            $menu.append("<li id='delete'>delete</li>");
       else
            $menu.append("<li id='save'>Save<li>");
       if(node.type == "folder" || node.type == "project"){
            $menu.append("<li id='create_sub_folder'>create sub folder</li>")
                 .append("<li id='create_tc'>create TC</li>")
                 .append("<li id='create_seq'>create sequence</li>");
       }
       if(node.type == "tc" || node.type == "seq"){
            $menu.append("<li id='open'>open</li>");
       }
       return $menu;
   }
  function default_seq(){
    return {
      data:[]
    };
  }
}

function generateUUID(){
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};
