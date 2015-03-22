var mm = {
  shapes:{
    flow:{}
  }

};

mm.shapes.flow.Scenario = joint.dia.Element.extend({

    markup: '<g class="rotatable"><g class="scalable"><polygon class="outer"/><polygon class="inner"/></g></g>',

    defaults: joint.util.deepSupplement({

        type: 'flow.Scenario',
        size: { width: 100, height: 20 },
        attrs: {
            '.outer': {
                fill: '#DDDDDD', stroke: '#27AE60', 'stroke-width': 2,
                points: '100,0 100,20 0,20 0,0'
            },
            '.inner': {
                fill: '#BBBBBB', stroke: '#27AE60', 'stroke-width': 2,
                points: '95,5 95,17 5,17 5,5',
                display: 'none'
            }
        }

    }, joint.dia.Element.prototype.defaults)
});
mm.shapes.flow.Check = joint.dia.Element.extend({

    markup: '<g class="rotatable"><g class="scalable"><polygon class="outer"/><polygon class="inner"/></g></g>',

    defaults: joint.util.deepSupplement({

        type: 'flow.Check',
        size: { width: 100, height: 20 },
        attrs: {
            '.outer': {
                fill: '#DDDDDD', stroke: '#27AE60', 'stroke-width': 2,
                points: '100,0 100,20 0,20 0,0'
            },
            '.inner': {
                fill: '#BBBBBB', stroke: '#27AE60', 'stroke-width': 2,
                points: '95,5 95,17 5,17 5,5',
                display: 'none'
            }
        }

    }, joint.dia.Element.prototype.defaults)
});
mm.shapes.flow.FuncSeq = joint.dia.Element.extend({

    markup: '<g class="rotatable"><g class="scalable"><polygon class="outer"/><polygon class="inner"/></g></g>',

    defaults: joint.util.deepSupplement({

        type: 'flow.FuncSeq',
        size: { width: 100, height: 20 },
        attrs: {
            '.outer': {
                fill: '#DDDDDD', stroke: '#27AE60', 'stroke-width': 2,
                points: '100,0 100,20 0,20 0,0'
            },
            '.inner': {
                fill: '#BBBBBB', stroke: '#27AE60', 'stroke-width': 2,
                points: '95,5 95,17 5,17 5,5',
                display: 'none'
            }
        }

    }, joint.dia.Element.prototype.defaults)
});
