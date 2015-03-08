function ProjectTree(con){

  var project = [{label:"autotest",
                        id:1,
                        type:"project",
                        children:[
                            {
                                label:"Doors",
                                type:"group",
                                children:[
                                    {
                                        label:"normal_case",
                                        type:"TC",
                                        id:12
                                    },
                                    {
                                        label:"door and pwl",
                                        type:"sequence",
                                        id:13
                                    }
                                ]
                            }
                        ]
                       }];
  var project_tree = $(con).tree(
                  {data:project,autoOpen:true,dragAndDrop:true});
        project_tree.bind("tree.click",function(evt){
                        var node = evt.node;
                        if(node.type == "sequence") win_manager.createSeqTab(node.name);
                        if(node.type == "TC") win_manager.createTCTab(node.name);
                        });
}
