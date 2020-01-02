<template>
  <div>
    <div class="container">
      <div class="row justify-content-start">
        <div class="btn-toolbar mb-3 mt-3 ml-3" role="toolbar" aria-label="Toolbar with button groups">
          <div class="input-group">
            <div class="input-group-prepend">
              <div class="input-group-text" id="btnGroupAddon">Mode</div>
            </div>
            <!-- <select class="form-control custom-select" v-model="cmOptions.mode">
              <option value="text/javascript" data-compile="nodejs-head" selected>javascript</option>
              <option value="go">Go</option>
              <option value="text/x-java">Java</option>
              <option value="text/x-c++src">C++</option>
              <option value="text/x-csrc">C</option>
              <option value="python">Python</option>
              <option value="sql">SQL</option>
              <option value="php">PHP</option>
              <option value="r">R</option>
              <option value="htmlmixed">HTML(X)</option>
              <option value="css">css(X)</option>
            </select>
            <div class="input-group-prepend ml-2">
              <div class="input-group-text" id="btnGroupAddon">Theme</div>
            </div>
            <select class="form-control custom-select" v-model="cmOptions.theme">
              <option value="base16-dark">base16-dark</option>
              <option value="base16-light">base16-light</option>
              <option value="cobalt">cobalt</option>
              <option value="colorforth">colorforth</option>
              <option value="darcula">darcula</option>
              <option value="duotone-dark">duotone-dark</option>
              <option value="duotone-light">duotone-light</option>
              <option value="eclipse">eclipse</option>
              <option value="elegant">elegant</option>
              <option value="gruvbox-dark">gruvbox-dark</option>
              <option value="hopscotch">hopscotch</option>
              <option value="icecoder">icecoder</option>
              <option value="idea">idea</option>
              <option value="lucario">lucario</option>
              <option value="material">material</option>
              <option value="material-darker">material-darker</option>
              <option value="material-palenight">material-palenight</option>
              <option value="material-ocean">material-ocean</option>
              <option value="monokai">monokai</option>
            </select>
            <div class="input-group-prepend align-items-center ml-2">
               <div class="input-group-text" id="btnGroupAddon">Font Size</div>
              <input type="range" class="custom-range" min="8" max="30" id="customRange" value="10" v-on:input.prevent="changeFontSize">
            </div> -->
          </div>
          <div class="btn-group ml-2" role="group" aria-label="First group">
            <button type="button" class="btn btn-secondary" @click.prevent.stop="compile">Compile</button>
            <button type="button" class="btn btn-secondary">Stop</button>
            <button type="button" class="btn btn-secondary" @click.prevent.stop="addPost">Submit</button>
          </div>
        </div>
      </div>
    </div>
    <div class="container" id="codeEditor">
      <codemirror ref="myCm" class="code-editor"
                  :value="code"
                  :options="cmOptions"
                  @ready="onCmReady"
                  @focus="onCmFocus"
                  @input="onCmCodeChange">
      </codemirror>
    </div>
    <div class="container">
      <textarea readonly="readonly" id="result" v-model="result" rows="10" style="width:100%; background-color:black; color:white">
      </textarea>
    </div>
  </div>
</template>

<script>
// codemirror css
// import 'codemirror/mode/css/css.js'
// more codemirror resources
// import { codemirror } from 'vue-codemirror

export default {
  data () {
    return {
      code: 'console.log("Hello CSMS!")',
      result: 'Waiting for Compile'
    }
  },
  created() {
    // list 에서 선택하여 해당 화면으로 접근 시에는 전달된 값으로 component 세팅
    if(this.$route.params.text != null) {
      this.code = this.$route.params.text
    }
    if(this.$route.params.mode != null) {
      this.cmOptions.mode = this.$route.params.mode
    }
  },
  mounted() {
    console.log('this is current codemirror object')
    // you can use this.codemirror to do something...
  },
  methods: {
    changeFontSize(){
      let size = document.getElementById('customRange').value;
      document.getElementById('codeEditor').setAttribute('style', 'font-size:'+size+'px');
    },
    addPost(){
      let post = {}
      //TODO post 변수에 유저 정보와 등록 일자 등이 추가 필요
      post.text = this.code
      let uri = 'http://localhost:4000/posts/add'
      this.axios.post(uri, post).then(() => {
        alert('Success')
      })
    }
  }
}
</script>
<style>

</style>