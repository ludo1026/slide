$('#main').html("Hello !!");

var state = {
  main: {
      type: 'V',
      divs: {
          'header': {
              size: '15px'
          },
          'middle': {
              type: 'H',
              divs: {
                  left: {
                      size: '150px'
                  },
                  center: {},
                  right: {}
              }
          },
          'footer': {
              size: '23px'
          }
      }
  }
};

function createDivs(divId, divInfo) {
    var slideWidth = 8;

    if(divInfo == null) {
        return '';
    }
    var divSubs = divInfo.divs;
    if(divSubs == null) {
        return '';
    }
    var nbDivSub = Object.keys(divSubs).length;
    if(nbDivSub == 0) {
        return '';
    }
    var type = divInfo.type;

    var html = '';
    var isFirst = true;
    var num = 0;
    var totalFixedSize = 0;
    var nbAutoSize = 0;
    var nbPourcentSize = 0;
    var nbFixedSize = 0;
    var totalPourcentSize = 0;
    for(var divSubId in divSubs) {
        var divSub = divSubs[divSubId];
        if(divSub.size) {
            if(divSub.size.indexOf('px') != -1) {
                nbFixedSize ++;
                totalFixedSize += parseInt(divSub.size.substring(0,divSub.size.indexOf('px')));
            } else {
                nbPourcentSize ++;
                totalPourcentSize += parseInt(divSub.size);
            }
        } else {
            nbAutoSize++;
        }
    }

    var slideWidthTotal = slideWidth * (num - 1);
    for(var divSubId in divSubs) {
        var divSub = divSubs[divSubId];
        num++;
        var stylePanel = '';
        var styleSlide = '';
        var panelWidth = '';

        if(!divSub.size) {
            // Auto size
            var panelWidth = '100%';
            if(totalPourcentSize != 0) {
                panelWidth += ' - '+totalPourcentSize+'%';
            }
            if(totalFixedSize != 0) {
                panelWidth += ' - '+totalFixedSize+'px';
            }
            if(nbAutoSize > 1) {
                panelWidth = '(('+panelWidth+')/'+nbAutoSize + ')';
            }
            if(!isFirst) {
                panelWidth += ' - '+slideWidth + 'px';
            }
            panelWidth = 'calc('+panelWidth+')';
        } else if(divSub.size.indexOf('px') != -1) {
            // Fixed size
            if(isFirst) {
                panelWidth = divSub.size;
            } else {
                panelWidth = (divSub.size.substring(0,divSub.size.indexOf('px')) - slideWidth) + 'px';
            }
        } else {
            // Pourcent size
            if(isFirst) {
                panelWidth = divSub.size + '%';
            } else {
                panelWidth = 'calc('+divSub.size+'% - ' + slideWidth + 'px)';
            }
        }

        if(type == 'H') {
            stylePanel = 'height:100%;width:'+panelWidth+';display:inline-block;';
            styleSlide = 'height:100%;width:'+slideWidth+'px;display:inline-block;cursor:col-resize';
        } else {
            stylePanel = 'height:'+panelWidth+';width:100%;display:block;';
            styleSlide = 'height:'+slideWidth+'px;width:100%;display:block;cursor:row-resize';
        }
        if(!isFirst) {
            html += '<div id="'+divId+'_slide_'+num+'" style="'+styleSlide+'"></div>';
        }
        html += '<div id="'+divSubId+'" style="'+stylePanel+'">';
        html += createDivs(divSubId, divSub);
        html += '</div>';
        if(isFirst) {
            isFirst = false;
        }
    }
    return html;
}

function init() {
    var html = createDivs('main', state.main);
    $('#main').html(html);
}

init();
