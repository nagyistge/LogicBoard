function ProjectTree(con){

  var project = [{label:"autotest",
                        id:1,
                        type:"project",
                        children:[
                            {
                                label:"Doors",
                                type:"folder",
                                children:[
                                    {
                                        label:"normal_case",
                                        type:"tc",
                                        id:12
                                    },
                                    {
                                        label:"door and pwl",
                                        type:"seq",
                                        id:13
                                    }
                                ]
                            }
                        ]
                       }];
  var project_tree = $(con).tree(
                  {data:project,autoOpen:true,dragAndDrop:true,
                   onCreateLi:function(node,$li){
                                var $menu = $("<span></span>").addClass("tree-menu").append($("<div>Menu</div>").addClass("menu-bar"));
                                $menu.append(createContextMenu(node));
                                $li.find('.jqtree-element').append($menu);
                            },
                   }
                   );
  $(con).on("click",".pulldown-menu li",function(evt){
                                        var command = evt.target.id;
                                        var node = $(evt.target).parent().data();
                                        node_func_tab[command](node);
                                    });
   var node_func_tab = {
    "delete":delete_node,
    "create_sub_folder":create_sub_folder,
    "create_tc":create_tc,
    "create_seq":create_seq,
    "open":open_node
   };
   function delete_node(node){
   }
   function create_sub_folder(node){
    var parent_node = project_tree.tree('getNodeById', node.id);
    project_tree.tree("appendNode",{label:"new folder",id:34534,type:"folder"},parent_node);
   }
   function create_tc(node){
   }
   function create_seq(node){
   
   }
   function open_node(node){
    if(node.type == "tc"){
        win_manager.createTCTab(node.name);
    }
    if(node.type == "seq"){
        win_manager.createSeqTab(node.name);
    }
   }
   function createContextMenu(node){
       var $menu = $("<div></div>").addClass("pulldown-menu").data(node);
       if(node.type != "project")
            $menu.append("<li id='delete'>delete</li>");
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
}
