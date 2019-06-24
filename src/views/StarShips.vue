<template>
    <main class="star-ships">
        <section class="success" v-if="datas.length > 0">
            <h2>Take a look in all Star Ships</h2>
            <button class="btn add" v-on:click="addModel()">
              Add new
            </button>
            <div v-for="index in adding" :key="index" class="content-add">
              <input type="text" v-model="addData[index-1].name" placeholder="Name"/>
              <input type="text" v-model="addData[index-1].model" placeholder="Model"/>
              <input type="text" v-model="addData[index-1].manufacturer" placeholder="Manufacturer"/>
              <input type="text" v-model="addData[index-1].cost_in_credits" placeholder="Cost in Credits"/>
              <input type="text" v-model="addData[index-1].length" placeholder="Length"/>
              <input type="text" v-model="addData[index-1].max_atmosphering_speed" placeholder="Max Atmosphering Speed"/>
              <input type="text" v-model="addData[index-1].crew" placeholder="Crew"/>
              <input type="text" v-model="addData[index-1].passengers" placeholder="Passengers"/>
              <input type="text" v-model="addData[index-1].cargo_capacity" placeholder="Cargo Capacity"/>
              <input type="text" v-model="addData[index-1].consumables" placeholder="Consumables"/>
              <input type="text" v-model="addData[index-1].hyperdrive_rating" placeholder="Hyperdrive Rating"/>
              <input type="text" v-model="addData[index-1].MGLT" placeholder="Megalight per Hour"/> 
              <input type="text" v-model="addData[index-1].starship_class" placeholder="Star Ship Class"/>
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
  name: "starships",
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
    constant.axios.get(constant.server + "starships")
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
        raw.forEach(starShips => {
            let object = {
                title: starShips.name,
                descriptions: [
                    "Model: " + starShips.model, 
                    "Manufacturer: " +  starShips.manufacturer,
                    "Cost in Credits: " + starShips.cost_in_credits,
                    "Length: " + starShips.length,
                    "Max Atmosphering Speed: " + starShips.max_atmosphering_speed,
                    "Crew: " + starShips.crew,
                    "Passengers: " + starShips.passengers,
                    "Cargo Capacity: " + starShips.cargo_capacity,
                    "Consumables: " + starShips.consumables,
                    "Hyperdrive Rating: " + starShips.hyperdrive_rating,
                    "Megalight per Hour: " + starShips.MGLT,
                    "Star Ship Class: " + starShips.starship_class,
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
      constant.axios.get(constant.server + "starships?page=" + this.page)
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