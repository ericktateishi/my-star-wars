<template>
  <main class="home">
    <h2>Hi, what do you want see about star wars?</h2>
    <section class="search">
      <div>
        <input type="text" v-model="search" placeholder="Search for someone, somewhere or some ship"/>
        <div class="result-search">
          <ul v-if="data.length > 0">
            <li v-for="result in data" :key="result.url" v-on:click="moreAbout(result.url, result.name)">
              {{result.name}}
            </li>
          </ul>
        </div>
      </div>
    </section>
    <MoreAbout v-if="url.length > 0" :url="url" :name="name" v-on:remove-more="url = ''"></MoreAbout>
    <Request :loading="loading" :error="error"></Request>
  </main>
</template>

<script>
import constant from "../assets/Constant.js";
import Request from "../components/RequestResponse.vue";
import MoreAbout from "../components/MoreAbout.vue";

export default {
  name: "home",
  components: {
    Request,
    MoreAbout
  },
  data() {
    return {
      loading: false,
      error: false,
      data: [],
      search: "",
      timerSearch: null,
      url: "",
      name: ""
    }
  },
  watch: {
    search: function () {
      clearTimeout(this.timerSearch)
      let search = this.search
      let getData = this.getData
      
      this.timerSearch = setTimeout(function() {
        if (search.length > 3){
          getData(search)
        }
      }, 500);
      
    }
  },
  methods: {
    getData: function(text){
      console.log("start get");
      this.data = []
      this.loading = true
      constant.axios.all([
          constant.axios.get(constant.server + "people?search=" + text),
          constant.axios.get(constant.server + "planets?search=" + text),
          constant.axios.get(constant.server + "starships?search=" + text)
        ])
      .then(constant.axios.spread((first, second, third) => {
        let rawData = first.data.results.concat(second.data.results, third.data.results)
        rawData.forEach(element => {
          this.data.push({
            name: element.name,
            url: element.url
          })
        })
      }))
      .catch(e => {
        this.error = e
      })
      .finally(() => 
        this.loading = false
      )
    },
    moreAbout: function (url, name){
      this.url = url
      this.name = name
    }
  }
};
</script>
