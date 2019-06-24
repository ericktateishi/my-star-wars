<template>
    <main class="apod">
        <h2>Choose a date to take a look</h2>
        <input type="date" v-model="date" :max="now"/>

        <div v-if="data != null">
            <h2>{{data.title}}</h2>
            <p>{{data.explanation}}</p>
            <img v-if="data.media_type == 'image'" :src="data.url" />
            <iframe v-if="data.media_type == 'video'" width="420" height="315"
            :src="data.url">
            </iframe>
        </div>
        <Request :loading="loading" :error="error"></Request>
    </main>
</template>

<script>
import constant from "../assets/Constant.js";
import Request from "../components/RequestResponse.vue";

export default {
    name: "apod",
    components: {
        Request
    },
    data() {
        return {
            date: "",
            loading: false,
            error: false,
            data: null
        }
    },
    computed: {
        now: function () {
            var today = new Date();
            let dd = today.getDate();
            let mm = today.getMonth()+1; 
            let yyyy = today.getFullYear();

            return yyyy + "-" + mm + "-" + dd
        }
    },
    watch: {
        date: function (){
            this.getApod()
        }
    },
    methods: {
        getApod: function (){
            this.loading = true
            constant.axios.get("https://api.nasa.gov/planetary/apod?api_key=2naMNH3pRnxBqEGf3kgkAlRD5VgKgQbdV9rOXFpB&date=" + this.date)
            .then(response => {
                this.data = response.data
            })
            .catch(e => {
                this.error = e
            })
            .finally(() => 
                this.loading = false
            )
        }
    }
}
</script>
