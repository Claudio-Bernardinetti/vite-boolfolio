<script>
import axios from "axios";
import { state } from "../state.js";
import ProjectCard from "../components/ProjectCard.vue";
export default {
  name: "ProjectView",
  components: {
    ProjectCard,
  },
  data() {
    return {
      state,
      types: null,
      technologies: null,
    };
  },
  mounted() {
    const url = this.state.base_url + "/api/types";
    console.log(url);
    axios
      .get(url)
      .then((resp) => {
        console.log(resp);
        this.types = resp.data.result;
      })
      .catch((err) => {
        console.log(err);
      });

    const technology_url = this.state.base_url + "/api/technologies";

    console.log(technology_url);

    axios
      .get(technology_url)
      .then((resp) => {
        console.log(resp);
        this.technologies = resp.data.result;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<template>
  <div class="p-5 mb-4 bg-dark text-light">
    <div class="container py-5">
      <h1 class="display-5 text-center fw-bold">My Projects</h1>
      <p class="text-center fs-4">Find out all my projects</p>
    </div>
  </div>

  <div class="container">
    <div class="row">
      <div class="col-9">
        <ProjectCard />
      </div>
      <aside class="col-3 pt-5">
        <div class="widget card bg-light mb-3" v-if="types">
          <div class="card-header">Types</div>

          <div class="card-body">
            <ul class="list-unstyled">
              <li v-for="type in types" :key="type.slug">
                <router-link
                  :to="{
                    name: 'type',
                    params: { slug: type.slug },
                  }"
                >
                  {{ type.name }}
                </router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="widget card bg-light mb-3" v-if="technologies">
          <div class="card-header">Technologies</div>

          <div class="card-body">
            <ul class="list-unstyled">
              <li v-for="technology in technologies" :key="technology.slug">
                <router-link
                  :to="{
                    name: 'technology',
                    params: { slug: technology.slug }, // corretto qui
                  }"
                >
                  {{ technology.name }}
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
