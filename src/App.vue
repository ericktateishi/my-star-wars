<template>
  <div id="app">
    <div v-if="!isOnline" class="offline">
      Sorry but you are not online now... 
      <button v-on:click="reload">try again</button>
    </div>

    <router-view/>

    <nav id="nav" >
      <router-link to="/">Home</router-link> |
      <router-link to="/characters">Characters</router-link> |
      <router-link to="/planets">Planets</router-link> |
      <router-link to="/starships">Star Ships</router-link> | 
      <router-link to="/apod">Take a look</router-link>
    </nav>
  </div>
</template>

<script>

export default {
  data () {
    return {
      isOnline: true
    }
  },
  created () {
    setInterval(() => {
      this.isOnline = navigator.onLine;
    }, 3000)
  },
  methods: {
    reload: function() {
      location.reload()
    }
  }
}
</script>


<style>
@import "assets/css/style.css";
</style>
