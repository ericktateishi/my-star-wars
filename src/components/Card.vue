<template>
    <div>
        <p>{{count}} result(s)</p>
        <ul> 
            <li v-for="(card, index) of cards" :key="card.name" class="card">
                <div>
                    <strong>{{card.title}}</strong>
                    
                    <span v-for="description of card.descriptions" :key="description">
                        {{description}}
                    </span>

                    <button class="btn remove" v-on:click="$emit('remove-val', index)">
                        Remove
                    </button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    cards: Array,
    count: Number
  }
};
</script>
