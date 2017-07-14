/*
alert.js
依赖semantic
*/
!function($, window){
  var xy = window.xy?window.xy:{}
  xy.alert = (text = "",callback,title = "提示",buttons = ["确定"])=>{
    var html = $(`<div class="ui small modal">
                    <div class="header">${title}</div>
                    <div class="content">
                      <p>${text}</p>
                    </div>
                    <div class="actions">
                      <div class="ui approve positive button">${buttons[0]}</div>
                    </div>
                  </div>`)
    html.appendTo('body').modal({
      closable  : false,
      onApprove() {
        callback(0)
      },
      onHidden(){
        destory(html)
      }
    }).modal('show')
  }
  xy.confirm = (text = "",callback,title = "提示",buttons = ["取消","确定"])=>{
    var html = $(`<div class="ui small modal">
                    <div class="header">${title}</div>
                    <div class="content">
                      <p>${text}</p>
                    </div>
                    <div class="actions">
                      <div class="ui cancel button">${buttons[0]}</div>
                      <div class="ui approve positive button">${buttons[1]}</div>
                    </div>
                  </div>`)
    html.appendTo('body').modal({
      closable  : false,
      onDeny(){
        callback(0)
      },
      onApprove() {
        callback(1)
      },
      onHidden(){
        destory(html)
      }
    }).modal('show')
  }
  xy.toast = (text = "",red = 'info',autoFade = true,displayTime = 3000,title = "")=>{
    var html = $(`<div class="ui ${red} message frontest fixed top auto" style="min-width: 300px;">
                      <i class="close icon"></i>
                      ${(function(){
                        if(title){
                          return `<div class="header">${title}</div>`
                        }
                        else{
                          return ``
                        }
                      })()}
                      ${text}
                  </div>`)
    html.on('click','.close.icon', ()=>{
      html.transition({
        onComplete() {
          destory(html)
        }
      }).transition('fade')
    }).appendTo('body')
    if(autoFade){
      var st = setTimeout(()=>{
        html.transition({
          onComplete() {
            destory(html)
          }
        }).transition('fade')
      },displayTime)
    }
  }
  function destory(html){
    html.remove()
    html = null
  }
  window.xy = xy
}(jQuery, window)
