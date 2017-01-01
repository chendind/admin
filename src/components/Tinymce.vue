<template>
	<div>
		<textarea id="tm">
			<slot></slot>
		</textarea>
		<image-choose-modal id="tinymce-imageChooseModal" v-on:finishChoose="finishChoose"></image-choose-modal>
	</div>
		
</template>
<script>
require.context(
  'file?name=[path][name].[ext]&context=node_modules/tinymce!tinymce',
  true,
  /.*/
);
import 'root/node_modules/tinymce/skins/lightgray/skin.min.css'
import tinymce from 'tinymce'
import imageChooseModal from '../components/ImageChooseModal.vue'
export default {
  	name: 'tinymce',
  	props: ['height'],
  	components: {
  		'image-choose-modal': imageChooseModal
  	},
  	methods:{
  		waitFinishChoose(callback){
  			self.deferred = $.Deferred();
  			$.when(self.deferred).done(function(data){
  				callback(data.src)
  			})
  		},
  		finishChoose(src){
  			self.deferred.resolve({"src": src})
  		}
  	},
  	data () {
    	return {
      		deferred: {}
    	}
  	},
  	mounted(){
  		var self = this;
  		tinymce.remove("#tm"); 
  	  	var editor =  new tinymce.Editor('tm', {
		    height: self.height,
			theme: 'modern',
			language: 'zh_CN',
			plugins: [
			    'advlist autolink lists link image charmap print preview hr anchor pagebreak',
			    'searchreplace wordcount visualblocks visualchars code fullscreen',
			    'insertdatetime media nonbreaking save table contextmenu directionality',
			    'emoticons template paste textcolor colorpicker textpattern imagetools'
			],
			toolbar1: 'insertfile undo redo | fontselect | fontsizeselect | styleselect | bold italic underline strikethrough superscript subscript | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent',
			toolbar2: 'link image media | forecolor backcolor emoticons print preview', //| example
			font_formats: '宋体=SimSun,STSong;黑体=SimHei,STHeiti;微软雅黑=Microsoft YaHei;楷体=KaiTi,STKaiti;Arial=arial,helvetica,sans-serif;Courier New=courier new,courier,monospace;AkrutiKndPadmini=Akpdmi-n',
			indentation : '2em',
			fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt 48pt 60pt 72pt',
			init_instance_callback: function (editor) {
				editor.on('keydown', function (e) {
					// tab键缩紧2格
			    	if(e.keyCode == 9){
			    		e.preventDefault();
			    		this.execCommand("mceInsertContent", false, "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
			    	}
			    });
			    editor.on('keyup', function (e) {
			    	if(e.keyCode == 9){
			    		 
			    	}
			    });
			},
			file_browser_callback: function(field_name, url, type, win) {
				
			},
			file_picker_callback: function(callback, value, meta) {
			    // Provide file and text for the link dialog
			    if (meta.filetype == 'file') {
			      	callback('mypage.html', {text: 'My text'});
			    }

			    // Provide image and alt text for the image dialog
			    if (meta.filetype == 'image') {
			    	$("#tinymce-imageChooseModal").modal('show')
			    	self.waitFinishChoose(callback);
			    }

			    // Provide alternative source and posted for the media dialog
			    if (meta.filetype == 'media') {
			      	callback('movie.mp4', {source2: 'alt.ogg', poster: 'image.jpg'});
			    }
		  	},
			file_browser_callback_types: 'file image media',
			relative_url: false,
			templates: [
			    { title: 'Test template 1', content: 'Test 1' },
			    { title: 'Test template 2', content: 'Test 2' }
			],
			content_style: "body{font-family: sans-serif}"
		}, tinymce.EditorManager);

		editor.render();
  	}
}
</script>
