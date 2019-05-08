<template>
  <b-container>
    <b-row>
      <b-col md="6" offset-md="3">
        <div class="text-center text-secondary mb-2">
          Mapping
          <span class="font-weight-bold font-italic">Sentiment Analysis</span> results onto a 5-star rating in a review
          and generating Tag Cloud from
          <span
            class="font-weight-bold font-italic"
          >Content Classification</span>.
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="6" offset-md="3">
        <b-alert
          variant="danger"
          dismissible
          fade
          :show="error !== ''"
          @dismissed="removeError"
        >{{ error }}</b-alert>
      </b-col>
    </b-row>
    <Comments/>
    <tag-cloud/>
  </b-container>
</template>
<script>
import Comments from "@/components/Comments.vue";
import TagCloud from "@/components/TagCloud.vue";

export default {
  name: "App",
  computed: {
    error() {
      return this.$store.state.error;
    }
  },
  methods: {
    removeError() {
      this.$store.commit("failed", "");
    }
  },
  components: {
    Comments,
    TagCloud
  }
};
</script>

<style>
@import "https://fonts.googleapis.com/css?family=Kavivanar";

body {
  font-size: 0.9rem;
  font-family: "Kavivanar", cursive;
  padding: 5px;
}
</style>

