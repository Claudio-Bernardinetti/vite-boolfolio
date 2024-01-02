<script>
import axios from "axios";
import { state } from "../state.js";
import ProjectCard from "../components/ProjectCard.vue";

export default {
  name: "TypeView",
  components: {
    ProjectCard,
  },
  data() {
    return {
      state,
      loading: true,
      type: null,
    };
  },
  mounted() {
    const url = `${this.state.base_url}/api/types/${this.$route.params.slug}`;
    axios
      .get(url)
      .then((resp) => {
        console.log(resp.data.result);
        //console.log(resp.data.success);
        if (resp.data.success) {
          console.log("ok tag found");
          // save the post if it exists

          this.type = resp.data.result; // Response object

          this.loading = false;
        } else {
          // pusha la rotta 404
          console.log("type not found");
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

    <section v-if="type">
      <div class="container">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3">
          <ProjectCard
            :project="project"
            v-for="project in type.data"
          ></ProjectCard>
        </div>
      </div>
      <li></li>
    </section>
  </div>
</template>

<style lang="scss" scoped></style>
