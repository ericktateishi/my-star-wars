<template>
    <main class="planets">
        <section class="success" v-if="datas.length > 0">
            <h2>Take a look in all planets</h2>
            <button class="btn add" v-on:click="addModel()">
              Add new
            </button>
            <div v-for="index in adding" :key="index" class="content-add">
              <input type="text" v-model="addData[index-1].name" placeholder="Name"/>
              <input type="text" v-model="addData[index-1].rotation_period" placeholder="Rotation Period"/>
              <input type="text" v-model="addData[index-1].orbital_period" placeholder="Orbital Period"/>
              <input type="text" v-model="addData[index-1].diameter" placeholder="Diameter"/>
              <input type="text" v-model="addData[index-1].climate" placeholder="Climate"/>
              <input type="text" v-model="addData[index-1].gravity" placeholder="Gravity"/>
              <input type="text" v-model="addData[index-1].terrain" placeholder="Terrain"/>
              <input type="text" v-model="addData[index-1].surface_water" placeholder="Surface Water"/>
              <input type="text" v-model="addData[index-1].population" placeholder="Population"/>
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
  name: "Planets",
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
    constant.axios.get(constant.server + "planets")
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
        raw.forEach(planet => {
            let object = {
                title: planet.name,
                descriptions: [
                    "Rotation Period: " + planet.rotation_period, 
                    "Orbital Period: " +  planet.orbital_period,
                    "Diameter: " + planet.diameter,
                    "Gravity: " + planet.gravity,
                    "Terrain: " + planet.terrain,
                    "Surface Water: " + planet.surface_water + "%",
                    "Population: " + planet.population
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
          rotation_period: "",
          orbital_period: "",
          diameter: "",
          climate: "",
          gravity: "",
          terrain: "",
          surface_water: "",
          population: ""
        }
      )
    },
    removeVal: function (index) {
      this.datas.splice(index, 1)
    },
    loadMore: function (){
      this.page++
      this.loading = true
      constant.axios.get(constant.server + "planets?page=" + this.page)
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
    // sempre que os Planetas mudar, essa função será executada
    datas: function () {
      console.log("mudou");
    }
  }
}

</script>