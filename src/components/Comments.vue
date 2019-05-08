<template>
  <div>
    <div class="mt-2" v-for="({comment, rating}, index) in comments" :key="index">
      <b-row>
        <b-col md="6" offset-md="3">
          <star-rating
            class="float-right"
            read-only
            :star-size="20"
            :rating="rating"
            :increment="0.5"
          ></star-rating>
        </b-col>
      </b-row>
      <b-row>
        <b-col
          md="6"
          offset-md="3"
          class="my-2 rcorners"
          style="word-wrap: break-word;"
        >{{ comment }}</b-col>
      </b-row>
    </div>
    <b-row>
      <b-col md="6" offset-md="3" class="mt-4">
        <b-form-textarea id="textarea" v-model="newComment" placeholder="Enter comment" rows="5"></b-form-textarea>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="6" offset-md="3" class="mt-2">
        <b-button @click="addComment" variant="primary" size="sm" class="float-right">Add Comment</b-button>
      </b-col>
    </b-row>
    <b-modal id="alert" hide-footer size="sm">
      <template slot="modal-title">
        <span class="text-warning">Warning</span>
      </template>
      <div class="text-center">
        <h5>Please eter comment.</h5>
      </div>
      <b-button variant="primary" class="mt-3" block @click="$bvModal.hide('alert')">Close</b-button>
    </b-modal>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";

export default {
  name: "Comments",
  data() {
    return {
      newComment: ""
    };
  },
  computed: {
    comments() {
      return this.$store.state.comments;
    }
  },
  methods: {
    addComment() {
      this.newComment.trim() !== ""
        ? this.$store
            .dispatch("analyse", this.newComment)
            .then(() => (this.newComment = ""))
        : this.$bvModal.show("alert");
    }
  },
  components: {
    StarRating
  }
};
</script>

<style scoped>
.rcorners {
  border-radius: 10px;
  border: 1px solid green;
  padding: 10px;
}
</style>