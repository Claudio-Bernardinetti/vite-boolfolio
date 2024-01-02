<script>
import axios from "axios";
import { state } from "../state.js";
import ProjectCard from "../components/ProjectCard.vue";

export default {
  name: "TechnologyView",
  components: {
    ProjectCard,
  },
  data() {
    return {
      state,
      loading: true,
      technology: null,
    };
  },
  mounted() {
    const url = `${this.state.base_url}/api/technologies/${this.$route.params.slug}`;
    axios
      .get(url)
      .then((resp) => {
        console.log(resp.data.result);
        //console.log(resp.data.success);
        if (resp.data.success) {
          console.log("ok technology found");
          // save the project if it exists

          this.technology = resp.data.result; // Response object

          this.loading = false;
        } else {
          // pusha la rotta 404
          console.log("404 Project not found");
          this.$router.push({ name: "NotFound" });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  },
};
</script>

<template>
  <div>
    <div class="p-5 mb-4 bg-light rounded-3">
      <div class="container py-5">
        <h1 class="display-5 fw-bold">{{ $route.params.slug }} Archive</h1>
      </div>
    </div>

    <section v-if="technology">
      <div class="container">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3">
          <project-card
            :project="project"
            v-for="project in technology.data"
          ></project-card>
        </div>
      </div>
      <li></li>
    </section>
  </div>
</template>

<style lang="scss" scoped></style>
