<template>
    <div class="result">
        <div class="error" v-if="error">
            <strong>Sorry, but we have some errors :c</strong>
            <span>{{error.message}}</span>
        </div>

        <div class="loading" v-if="loading">
            Carregando
        </div>
    </div>
</template>


<script>

export default {
  name: "request",
  props: {
    loading: true,
    error: false
  }
}

</script>