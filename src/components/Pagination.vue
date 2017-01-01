<template>
    <div :id="id" class="ui right floated pagination menu"></div>  
</template>

<script>
import jQuery from 'jquery'
export default {
  name: 'pagination',
  props: ['id','current','total','show'],
  methods: {
    
  },
  data () {
    return {
    }
  },
  created: function(){
    
  },
  mounted: function(){
    var self = this;
    $("#"+this.id).pagination({
      totalData: self.total-0,
      showData: self.show-0,
      current: self.current-0,
      count:2,
      jump:true,
      coping:true,
      callback:function(pagination){
        self.$emit('pageChange', pagination.getCurrent())
      }
    })
  }
}
;(function($,window,document,undefined){
    //配置参数
    var defaults = {
      totalData:0,      //数据总条数
      showData:0,       //每页显示的条数
      pageCount:9,      //总页数,默认为9
      current:1,        //当前第几页
      prevCls:'icon item',      //上一页class
      nextCls:'icon item',      //下一页class
      prevContent:'<i class="left chevron icon"></i>',    //上一页内容
      nextContent:'<i class="right chevron icon"></i>',   //下一页内容
      activeCls:'active',   //当前页选中状态
      coping:false,     //首页和尾页
      homePage:'',      //首页节点内容
      endPage:'',       //尾页节点内容
      count:3,        //当前页前后分页个数
      jump:false,       //跳转到指定页数
      jumpIpt: '页码',
      jumpIptCls:'jump-ipt',  //文本框内容
      jumpBtnCls:'jump-btn',  //跳转按钮
      jumpBtn:'跳转',     //跳转按钮文本
      callback:function(){} //回调
    };
    var Pagination = function(element,options){
      //全局变量
      var opts = options,//配置
        current,//当前页
        $document = $(document),
        $obj = $(element);//容器
      /**
       * 设置总页数
       * @param int page 页码
       * @return opts.pageCount 总页数配置
       */
      this.setTotalPage = function(page){
        return opts.pageCount = page;
      };
      /**
       * 获取总页数
       * @return int p 总页数
       */
      this.getTotalPage = function(){
        var p = opts.totalData || opts.showData ? Math.ceil(parseInt(opts.totalData) / opts.showData) : opts.pageCount;
        return p;
      };
      //获取当前页
      this.getCurrent = function(){
        return current;
      };
      /**
       * 填充数据
       * @param int index 页码
       */
      this.filling = function(index){
        var html = '';
        current = index || opts.current;//当前页码
        var pageCount = this.getTotalPage();
        if(current > 1){//上一页
          html += '<a href="javascript:;" class="'+opts.prevCls+'">'+opts.prevContent+'</a>';
        }else{
          $obj.find('.'+opts.prevCls) && $obj.find('.'+opts.prevCls).remove();
        }
        // debugger;
        if(current >= opts.count * 2 && current != 1 && pageCount != opts.count){
          var home = opts.coping && opts.homePage ? opts.homePage : '1';
          html += opts.coping ? '<a class="item" href="javascript:;" data-page="1">'+home+'</a><span class="item">...</span>' : '';
        }
        var start = current - opts.count,
          end = current + opts.count;
        ((start > 1 && current < opts.count) || current == 1) && end++;
        (current > pageCount - opts.count && current >= pageCount) && start++;
        for (;start <= end; start++) {
          if(start <= pageCount && start >= 1){
            if(start != current){
              html += '<a class="item" href="javascript:;" data-page="'+start+'">'+ start +'</a>';
            }else{
              html += '<span class="item '+opts.activeCls+'">'+ start +'</span>';
            }
          }
        }
        if(current + opts.count < pageCount && current >= 1 && pageCount > opts.count){
          var end = opts.coping && opts.endPage ? opts.endPage : pageCount;
          html += opts.coping ? '<span class="item">...</span><a class="item" href="javascript:;" data-page="'+pageCount+'">'+end+'</a>' : '';
        }
        if(current < pageCount){//下一页
          html += '<a href="javascript:;" class="'+opts.nextCls+'">'+opts.nextContent+'</a>'
        }else{
          $obj.find('.'+opts.nextCls) && $obj.find('.'+opts.nextCls).remove();
        }
        html += opts.jump ? 
        '<div class="ui action input"><input type="text" class="'+opts.jumpIptCls+'" placeholder="'+opts.jumpIpt+'" style="border:none;width: 80px;"><a class="ui button '+opts.jumpBtnCls+'">'+opts.jumpBtn+'</a></div>': ''
        $obj.empty().html(html);
      };
      //绑定事件
      this.eventBind = function(){
        var self = this;
        var pageCount = this.getTotalPage();//总页数
        $obj.off().on('click','a',function(){
          if($(this).hasClass(opts.nextCls)){
            var index = parseInt($obj.find('.'+opts.activeCls).text()) + 1;
          }else if($(this).hasClass(opts.prevCls)){
            var index = parseInt($obj.find('.'+opts.activeCls).text()) - 1;
          }else if($(this).hasClass(opts.jumpBtnCls)){
            if($obj.find('.'+opts.jumpIptCls).val() !== ''){
              var index = parseInt($obj.find('.'+opts.jumpIptCls).val());
            }else{
              return;
            }
          }else{
            var index = parseInt($(this).data('page'));
          }
          self.filling(index);
          typeof opts.callback === 'function' && opts.callback(self);
        });
        //输入跳转的页码
        $obj.on('input propertychange','.'+opts.jumpIptCls,function(){
          var $this = $(this);
          var val = $this.val();
          var reg = /[^\d]/g;
                if (reg.test(val)) {
                    $this.val(val.replace(reg, ''));
                }
                (parseInt(val) > pageCount) && $this.val(pageCount);
                if(parseInt(val) === 0){//最小值为1
                  $this.val(1);
                }
        });
        //回车跳转指定页码
        $document.keydown(function(e){
          var self = this;
              if(e.keyCode == 13 && $obj.find('.'+opts.jumpIptCls).val()){
                var index = parseInt($obj.find('.'+opts.jumpIptCls).val());
                  self.filling(index);
            typeof opts.callback === 'function' && opts.callback(self);
              }
          });
      };
      //初始化
      this.init = function(){
        this.filling(opts.current);
        this.eventBind();
      };
      this.init();
    };
    $.fn.pagination = function(parameter,callback){
      if(typeof parameter == 'function'){//重载
        callback = parameter;
        parameter = {};
      }else{
        parameter = parameter || {};
        callback = callback || function(){};
      }
      var options = $.extend({},defaults,parameter);
      return this.each(function(){
        var pagination = new Pagination(this, options);
        callback(pagination);
      });
    };
  })(jQuery,window,document);
</script>

<style scoped>

</style>
