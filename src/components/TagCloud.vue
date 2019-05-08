<template>
  <div>
    <wordcloud
      valueKey="count"
      :data="this.tags"
      :showTooltip="false"
      :fontSize="[14,20]"
    />
  </div>
</template>

<script>
import wordcloud from "vue-wordcloud";

export default {
  name: "TagCloud",
  computed: {
    tags() {
      return this.$store.state.tags;
    }
  },
  components: {
    wordcloud
  }
};
</script>