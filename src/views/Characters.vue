<template>
    <main class="characters">
        <section class="success" v-if="datas.length > 0">
            <h2>Take a look in all characters</h2>
            <button class="btn add" v-on:click="addModel()">
              Add new
            </button>
            <div v-for="index in adding" :key="index" class="content-add">
              <input type="text" v-model="addData[index-1].name" placeholder="Name"/>
              <input type="text" v-model="addData[index-1].height" placeholder="Height"/>
              <input type="text" v-model="addData[index-1].mass" placeholder="Mass"/>
              <input type="text" v-model="addData[index-1].hair_color" placeholder="Hair Color"/>
              <input type="text" v-model="addData[index-1].skin_color" placeholder="Skin Color"/>
              <input type="text" v-model="addData[index-1].eye_color" placeholder="Eye Color"/>
              <input type="text" v-model="addData[index-1].birth_year" placeholder="Birth"/>
            </div>
            <button class="btn send" v-if="adding > 0" v-on:click="parseData(addData, true); adding = 0;
      addData = []">
              Enviar
            </button>
            <Card v-bind:cards="datas" v-bind:count="count" v-on:remove-val="removeVal"></Card>
            <button class="btn more" v-on:click="loadMore()" v-if="hasNext">Load More</button>
        </section>

        <Request :loading="loading" :error="error"></Request>
    </main>
  
</template>

<script>
import constant from "../assets/Constant.js";
import Card from "../components/Card.vue";
import Request from "../components/RequestResponse.vue";

export default {
  name: "characters",
  data() {
    return {
      loading: true,
      error: false,
      datas: [],
      adding: 0,
      addData: [],
      page: 1,
      hasNext: true,
      count: 0
    }
  },
  components: {
    Card,
    Request
  },
  created() {
    constant.axios.get(constant.server + "people")
    .then(response => {
      this.parseData(response.data.results)
      this.hasNext = response.data.next != null ? true : false
      this.count = response.data.count
    })
    .catch(e => {
      this.error = e
    })
    .finally(() => 
      this.loading = false
    )
  },
   methods: {
    parseData: function (raw, onEnd = false) {
        raw.forEach(character => {
            let object = {
                title: character.name,
                descriptions: [
                    character.height + " cm", 
                    character.mass + " kg",
                    "Hair: " + character.hair_color,
                    "Skin: " + character.skin_color,
                    "Eye: " + character.eye_color,
                    "Birth: " + character.birth_year
                    ]
            };
            if (onEnd)
              this.datas.unshift(object)
            else 
              this.datas.push(object)
        });
    },
    addModel: function (){
      this.adding ++
      this.addData.push(
        {
          name: "",
          height: "",
          mass: "",
          hair_color: "",
          skin_color: "",
          eye_color: "",
          birth_year: ""
        }
      )
    },
    removeVal: function (index) {
      this.datas.splice(index, 1)
    },
    loadMore: function (){
      this.page++
      this.loading = true
      constant.axios.get(constant.server + "people?page=" + this.page)
      .then(response => {
        this.parseData(response.data.results)
        this.hasNext = response.data.next != null ? true : false
      })
      .catch(e => {
        this.error = e
      })
      .finally(() => 
        this.loading = false
      )
    }
  },
  watch: {
    // sempre que os Characters mudar, essa função será executada
    datas: function () {
      console.log("mudou");
    }
  }
}

</script>
