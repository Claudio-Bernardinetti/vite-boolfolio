<script>
import axios from "axios";
export default {
  name: "SingleProjectView",
  data() {
    return {
      loading: true,
      project: {},
    };
  },
  mounted() {
    const url = `http://127.0.0.1:8000/api/projects/${this.$route.params.id}`;
    axios
      .get(url)
      .then((resp) => {
        console.log(resp.data.result);
        this.project = resp.data.result;
        this.loading = false;
      })
      .catch((err) => {
        console.log(err.message);
      });
  },
};
</script>
<template>
  <div class="container container_single_project my-5">
    <div v-if="!loading">
      <div class="cover_image">
        <!-- <img class="img-fluid object-fit-cover" :src="'http://127.0.0.1:8000/storage/' + project.cover_image" alt="" style="height: 400px;"> -->
      </div>

      <div class="card d-flex flex-xl-row flex-column shadow-lg">
        <div class="col-md-4">
          <img class="p-2" :src="project.cover_image" alt="" />
        </div>

        <div class="col-md-8 card-body">
          <h5 class="card-title">Title: {{ project.title }}</h5>
          <p class="card-text">
            <strong>Links:</strong> <br />
            <a :href="project.github_link" target="_blank">{{
              project.github_link
            }}</a>
            <br />
            <a :href="project.internet_link" target="_blank">{{
              project.internet_link
            }}</a>
            <br />
          </p>
          <p class="card-text">
            <strong>Description:</strong> <br />
            {{ project.description }}
          </p>
          <p class="my-3">
            <strong>Project type: </strong
            >{{ project.type ? project.type.name : "No Type" }}
          </p>
          <p class="my-3"><strong>Technology Used: </strong></p>
          <ul v-if="project.technologies && project.technologies.length">
            <li
              v-for="(technology, index) in project.technologies"
              :key="index"
            >
              {{ technology.name }}
            </li>
          </ul>
          <p v-else>Technology not selected</p>
        </div>
      </div>
      <router-link to="/projects" class="btn btn-primary my-2"
        >Go Back</router-link
      >
    </div>
    <div v-else class="text-center display-6">loading...</div>
  </div>
</template>

<style lang="scss" scoped>
.container_single_project {
  min-height: 500px;
}
</style>
