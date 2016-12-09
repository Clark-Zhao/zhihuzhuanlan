<template lang="html">
  <div class="z-loading-wraper">
    <i class="icon iconfont icon-loading"></i>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  computed: {},
  ready() {},
  attached() {},
  methods: {},
  components: {}
};
</script>

<style lang="less">
.z-loading-wraper {
  text-align: center;
  height: 36px;
  line-height: 36px;
  width: 100%;
  margin: 20px 0;

  &>.icon-loading {
    color: #50C87E;
    font-size: 24px;
    display: inline-block;
    -webkit-animation: spriteSpin .8s steps(12) infinite;
    animation: spriteSpin .8s steps(12) infinite;
  }
}

@keyframes spriteSpin
{
0%   {transform:rotate(0deg);}
25%  {transform:rotate(90deg);}
50%  {transform:rotate(180deg);}
75%  {transform:rotate(270deg);}
100% {transform:rotate(360deg);}
}

@-moz-keyframes spriteSpin /* Firefox */
{
  0%   {transform:rotate(0deg);}
  25%  {transform:rotate(90deg);}
  50%  {transform:rotate(180deg);}
  75%  {transform:rotate(270deg);}
  100% {transform:rotate(360deg);}
}

@-webkit-keyframes spriteSpin /* Safari 和 Chrome */
{
  0%   {transform:rotate(0deg);}
  25%  {transform:rotate(90deg);}
  50%  {transform:rotate(180deg);}
  75%  {transform:rotate(270deg);}
  100% {transform:rotate(360deg);}
}

@-o-keyframes spriteSpin /* Opera */
{
  0%   {transform:rotate(0deg);}
  25%  {transform:rotate(90deg);}
  50%  {transform:rotate(180deg);}
  75%  {transform:rotate(270deg);}
  100% {transform:rotate(360deg);}
}
</style>
