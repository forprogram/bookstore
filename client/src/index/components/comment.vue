<style>
.comments-loading p {
  margin-bottom: 0;
  margin-top: 2rem;
  padding: .1rem 0;
  color: #ccc;
  font-size: 1.4rem;
}

.comments-loading span {
  display: inline-block;
  width: 0;
  height: 0;
  border: .4rem solid #F50827;
  border-radius: 100%;
  margin: 0 .5rem;
  animation: commentsLoading 1s infinite;
}
span#cl-first {
  animation-delay: 0s;
}
span#cl-first ~ span {
  animation-delay: .1s;
}
span#cl-first ~ span ~ span {
  animation-delay: .2s;
}

@keyframes commentsLoading {
  0% {
    transform: scale(0.5);
    background: #F50827;
  }
  50% {
    transform: scale(1);
    background: #fff;
  }
  100% {
    transform: scale(0.5);
    background: #F50827;
  }
}
</style>

<template>
  
</template>

<script>
import CommentItem from './comment-item.vue';
import {Toast, MessageBox} from 'mint-ui';
export default {
  data() {
    return {
      
    }
  },
  props: ['userData', 'book'],
  components: {
    CommentItem,
  },
}
</script>
