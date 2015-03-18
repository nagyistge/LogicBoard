var mm = {};
$(function(){
  mm.filedlg = $("#fileDialog");
});
mm.open_file_dlg = function(cb){
  mm.filedlg.change(function(evt){
    var str = mm.filedlg.val();
    mm.filedlg.val("");
    cb(str);
  });
  mm.filedlg.trigger("click");
}
mm.save_file = function(file,content){
    var fs = require("fs");
	var stream = fs.createWriteStream(file,{
							flags:"w",
							encoding:null,
							mode:0666
							});
	var str = JSON.stringify(content,null,4);
	stream.write(str,"ascii",function(){stream.end();});
}
mm.read_json_file = function(file,cb){
  var fs = require('fs');
	var text_string = "";
	var dbc_stream

	dbc_stream = fs.createReadStream(file,
			{flags:"r",
			 endcoding:"ascii",
			 autoClose:true
			});
	//var json_stream = fs.createWriteStream();
	dbc_stream.on('readable', function() {
			var chunk;
			while (null !== (chunk = dbc_stream.read())) {
				text_string += chunk.toString("ascii");
			}
	});
	dbc_stream.on('end',function(){
			cb(JSON.parse(text_string));
			});
	dbc_stream.on("error",function(){
			cb(null);
			});
}


function read_text_file(file,cb){
	var fs = require('fs');
	var text_string = "";
	var dbc_stream

	dbc_stream = fs.createReadStream(file,
			{flags:"r",
			 endcoding:"ascii",
			 autoClose:true
			});
	//var json_stream = fs.createWriteStream();
	dbc_stream.on('readable', function() {
			var chunk;
			while (null !== (chunk = dbc_stream.read())) {
				text_string += chunk.toString("ascii");
			}
	});
	dbc_stream.on('end',function(){
			cb(text_string);
			});
	dbc_stream.on("error",function(){
			cb(null);
			});
}
function get_folder_path(file){
	var pat = /^([^\x5c]*\x5c)*(.*)$/;
	var m = file.match(pat);
	var res = "";
	if(m != null){
		var pat1 = new RegExp(m[2] + "$","g");
		res = file.replace(pat1,"");
	}
	return res;
}
function get_file_name(file){
	var pat = /^([^\x5c]*\x5c)*(.*)$/;
	var m = file.match(pat);
	var res = "";
	if(m != null){
		res = m[2];
	}
	return res;
}
function copy_file(src,dst,cb){
	var fs=require("fs");
	var write_str = fs.createWriteStream(dst);
	var read_str = fs.createReadStream(src);
	read_str.pipe(write_str);
	read_str.on('end',function(){
		write_str.end();
		cb();
	});
}

function shell_open_file(file){
	var gui = require('nw.gui');
	gui.Shell.openItem(file);
	return;
}


function call_external_exec(cmd,param,cwd){
	var fs=require("fs");
	if(!fs.existsSync(cmd)){
		mm_log("error"," can not find the command " + cmd);
		return;
	}
	var cp = require("child_process");
	cp.execFile(cmd,param,{cwd:cwd,timeout:60000},function(err,out,stderr){
									if(err == null){
										mm_log("info",cmd + " executed successfully!");
									}else
                                        mm_log("error",err);
								}
				)
}


function remove_tag(_tags,target){
	var tags = _tags.split(" ");
	var result = "";
	for(var i = 0;i < tags.length;i ++){
		if(tags[i].trim() != target){
			result = result + " " + tags[i].trim();
		}
	}
	return result;
}
function add_tag(_tags,target){
	var result = remove_tag(_tags,target);
	return result + " " + target;
}

function has_tag(_tags,target){
	if(_tags.indexOf(target) < 0) return false;
	return true;
}



function init_log(_elem){
	log_elem = _elem;
}
function mm_log(type,description){
	$(log_elem + " tbody").append(
				$("<tr/>").addClass(type)
						  .append(
							$('<td/>').text(type)
						  )
						  .append(
							$('<td/>').text(description)
						  )
						  .append(
							$('<td/>').text(Date().toLocaleString())
						  )
				);
	var height = $(log_elem)[0].offsetHeight;
	var p_h = $(log_elem).parent()[0].offsetHeight;
	var top = height - p_h;
	$(log_elem).parent()[0].scrollTop = top > 0 ? top:0 ;
}



