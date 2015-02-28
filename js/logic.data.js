function LogicSignal(){
    var label,style,min_val,max_val;
    this.label = label;
    this.style = style;
    this.val_range = {
                min:min_val,
                max:max_val
            };
    this.type = type;
}
LogicSignal.prototype.setData = function(data){
    this.data = data;
}

var bcm_signals = [
    {
        nama:"KL15",
        type:"input",
        values:[0,1],
        func:"SetDIO"
    },
    {
        name:"ACC",
        type:"input",
        values:[0,1],
        func:"SetDIO"
    },
    {
        name:"LowBeamSwitch",
        type:"input",
        values:[0,1],
        func:"SetDIO"
    },
    {
        name:"LowBeam",
        type:"output",
        values:[0,1],
        func:"SetDIO"
    },
    
];

