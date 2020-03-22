<template>
  <div class="container">
    <h2>每日一句编辑</h2>
    <div class="btn-toolbar" data-role="editor-toolbar" data-target="#editor">
      <div class="btn-group">
        <a class="btn dropdown-toggle" data-toggle="dropdown" title="Font">
          <i class="icon-font"></i>
          <b class="caret"></b>
        </a>
        <ul class="dropdown-menu"></ul>
      </div>
      <div class="btn-group">
        <a class="btn dropdown-toggle" data-toggle="dropdown" title="Font Size"><i class="icon-text-height"></i>&nbsp;<b
          class="caret"></b></a>
        <ul class="dropdown-menu">
          <li><a data-edit="fontSize 5"><font size="5">Huge</font></a></li>
          <li><a data-edit="fontSize 3"><font size="3">Normal</font></a></li>
          <li><a data-edit="fontSize 1"><font size="1">Small</font></a></li>
        </ul>
      </div>
      <div class="btn-group">
        <a class="btn" data-edit="bold" title="Bold (Ctrl/Cmd+B)"><i class="icon-bold"></i></a>
        <a class="btn" data-edit="italic" title="Italic (Ctrl/Cmd+I)"><i class="icon-italic"></i></a>
        <a class="btn" data-edit="strikethrough" title="Strikethrough"><i class="icon-strikethrough"></i></a>
        <a class="btn" data-edit="underline" title="Underline (Ctrl/Cmd+U)"><i class="icon-underline"></i></a>
      </div>
      <div class="btn-group">
        <a class="btn" data-edit="insertunorderedlist" title="Bullet list"><i class="icon-list-ul"></i></a>
        <a class="btn" data-edit="insertorderedlist" title="Number list"><i class="icon-list-ol"></i></a>
        <a class="btn" data-edit="outdent" title="Reduce indent (Shift+Tab)"><i class="icon-indent-left"></i></a>
        <a class="btn" data-edit="indent" title="Indent (Tab)"><i class="icon-indent-right"></i></a>
      </div>
      <div class="btn-group">
        <a class="btn" data-edit="justifyleft" title="Align Left (Ctrl/Cmd+L)"><i class="icon-align-left"></i></a>
        <a class="btn" data-edit="justifycenter" title="Center (Ctrl/Cmd+E)"><i class="icon-align-center"></i></a>
        <a class="btn" data-edit="justifyright" title="Align Right (Ctrl/Cmd+R)"><i class="icon-align-right"></i></a>
        <a class="btn" data-edit="justifyfull" title="Justify (Ctrl/Cmd+J)"><i class="icon-align-justify"></i></a>
      </div>
      <div class="btn-group">
        <a class="btn dropdown-toggle" data-toggle="dropdown" title="Hyperlink"><i class="icon-link"></i></a>
        <div class="dropdown-menu input-append">
          <input class="span2" placeholder="URL" type="text" data-edit="createLink" />
          <button class="btn" type="button">Add</button>
        </div>
        <a class="btn" data-edit="unlink" title="Remove Hyperlink"><i class="icon-cut"></i></a>
      </div>
      
      <div class="btn-group">
        <a class="btn" title="Insert picture (or just drag & drop)" id="pictureBtn"><i class="icon-picture"></i></a>
        <input type="file" data-role="magic-overlay" data-target="#pictureBtn" data-edit="insertImage" />
      </div>
      <div class="btn-group">
        <a class="btn" data-edit="undo" title="Undo (Ctrl/Cmd+Z)"><i class="icon-undo"></i></a>
        <a class="btn" data-edit="redo" title="Redo (Ctrl/Cmd+Y)"><i class="icon-repeat"></i></a>
      </div>
      <input type="text" data-edit="inserttext" id="voiceBtn" x-webkit-speech="">
    </div>
    <!--    通过属性this.$refs.editor拿到原生dom元素-->
    <div id="editor" ref="editor"></div>
    <el-button type="info" id="submit" @click="handleSubmit">发表</el-button>
  </div>
</template>

<script>

  import '../assets/bootstrap-wysiwyg-master/js/jquery.min';
  import '../assets/bootstrap-wysiwyg-master/external/jquery.hotkeys';
  import '../assets/bootstrap-wysiwyg-master/js/bootstrap.min';
  import '../assets/bootstrap-wysiwyg-master/external/google-code-prettify/prettify';
  import '../assets/bootstrap-wysiwyg-master/bootstrap-wysiwyg';
  import '../assets/bootstrap-wysiwyg-master/js/init';

  export default {
    name: "EverydayEdit",
    data() {
      return {}
    },
    methods: {
      handleSubmit() {
        let blogContent = this.$refs.editor.innerHTML;
        console.log(`每日一句的编辑内容: ${blogContent}`);
        // 内容为空, 不插入
        if(!blogContent) {
          return;
        }
        console.log('编辑的内容是:', blogContent);
        this.$axios.post('/api/everydayEdit', {
          content: blogContent
        }).then((res) => {
            console.log('每日一句插入成功', res.data[0]);
          })
        this.$refs.editor.innerHTML = '';
      }
    },
  }
</script>
<style lang="css" src="../assets/bootstrap-wysiwyg-master/link/Bootstrapv2.3.1.css"></style>
<style lang="css" src="../assets/bootstrap-wysiwyg-master/link/BootstrapResponsivev2.3.1.css"></style>
<style lang="css" src='../assets/bootstrap-wysiwyg-master/link/font-awesome.css'></style>
<style scoped lang="css" src="../assets/bootstrap-wysiwyg-master/index.css"></style>

