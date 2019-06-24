<template>
  <div>
    <div class="more-about" v-if="image != ''">
      <button class="close" v-on:click="$emit('remove-more')">X</button>
      <div class="more-about-header" :style="background">
        <h2>{{title}}</h2>
      </div>
      <div class="more-about-body">
        <p v-for="text in descriptions" :key="text">
          {{text}}
        </p>
      </div>
    </div>
    <Request :loading="loading" :error="error"></Request>
  </div>
</template>

<script>
import constant from "../assets/Constant.js";
import Request from "../components/RequestResponse.vue";

export default {
  name: "moreabout",
  components: {
    Request
  },
  props: {
    url: "",
    name: ""
  },
  data() {
    return {
      loading: true,
      error: false,
      title: "",
      descriptions: [],
      image: ""
    }
  },
  computed: {
    background () {
      return 'background-image: url(' + this.image + ')';
    }
  },
  created () {
    constant.axios.all([
      constant.axios.get("http://localhost:3000/search?q=" + this.name),
      constant.axios.get(this.url)
    ])
    .then(constant.axios.spread((first, second) => {
      this.checkData(second.data)
      this.image = first.data.imageURL
    }))
    .catch(e => {
      this.error = e
    })
    .finally(() => 
      this.loading = false
    )
  },
  methods: {
    checkData: function (data) {
        if (this.url.indexOf("people") > 0)
            this.parseCharacter(data)
        else if (this.url.indexOf("starships") > 0)
            this.parseStarship(data)
        else if (this.url.indexOf("planets") > 0)
            this.parsePlanet(data)
    },
    parseCharacter: function (character) {
        this.title = character.name
        this.descriptions = [
            character.height + " cm", 
            character.mass + " kg",
            "Hair: " + character.hair_color,
            "Skin: " + character.skin_color,
            "Eye: " + character.eye_color,
            "Birth: " + character.birth_year
        ]
    },
    parsePlanet: function (planet) {
        this.title = planet.name
        this.descriptions = [
            "Rotation Period: " + planet.rotation_period, 
            "Orbital Period: " +  planet.orbital_period,
            "Diameter: " + planet.diameter,
            "Gravity: " + planet.gravity,
            "Terrain: " + planet.terrain,
            "Surface Water: " + planet.surface_water + "%",
            "Population: " + planet.population
        ]
    },
    parseStarship: function (starShips) {
        this.title = starShips.name
        this.descriptions = [
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
    }
  }
};
</script>
