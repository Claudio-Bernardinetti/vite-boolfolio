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
      project: {},
    };
  },
  mounted() {
    const url = `${this.state.base_url}/api/types/${this.$route.params.id}`;
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
  <section v-if="project">
    <div class="container">
      <div class="row">
        <div class="container container_single_project my-5">
          <div v-if="!loading">
            <div v-for="project in type.projects" :key="project.id">
              <div
                class="card-body shadow-sm rounded-2 border border-black mb-3"
              >
                <div class="d-flex flex-row">
                  <div class="p-2">
                    <img :src="project.cover_image" alt="" />
                  </div>

                  <div class="p-2">
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
                    <ul
                      v-if="project.technologies && project.technologies.length"
                    >
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
              </div>
            </div>
            <router-link to="/projects" class="btn btn-primary my-2"
              >Go Back</router-link
            >
          </div>
          <div v-else class="text-center display-6">loading...</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.container_single_project {
  min-height: 500px;
}
</style>
