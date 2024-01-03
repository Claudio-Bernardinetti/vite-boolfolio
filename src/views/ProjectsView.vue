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
      selectedTypes: [],
      selectedTechnologies: [],
    };
  },
  methods: {
    filterByType() {
      const types = this.selectedTypes.join(",");
      this.$router.push({ name: "type", params: { id: types } });
    },
    filterByTechnology() {
      const technologies = this.selectedTechnologies.join(",");
      this.$router.push({ name: "technology", params: { id: technologies } });
    },
    deselectAllTypes() {
      this.selectedTypes = [];
      // Ripristina i progetti originali quando non ci sono filtri
      this.state.projects = this.state.originalProjects;
    },
    deselectAllTechnologies() {
      this.selectedTechnologies = [];
      // Ripristina i progetti originali quando non ci sono filtri
      this.state.projects = this.state.originalProjects;
    },
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

          <div class="card-body bg-white shadow-lg">
            <ul class="list-unstyled">
              <li v-for="type in types" :key="type.id">
                <input
                  type="checkbox"
                  :id="type.id"
                  v-model="selectedTypes"
                  :value="type.id"
                />
                <label class="p-1" :for="type.id">{{ type.name }}</label>
              </li>
            </ul>
            <button @click="filterByType" class="btn btn-primary m-1">
              Filter by Type
            </button>
            <button @click="deselectAllTypes" class="btn btn-danger m-1">
              Unfilter
            </button>
          </div>
        </div>
        <div class="widget card bg-light mb-3" v-if="technologies">
          <div class="card-header">Technologies</div>

          <div class="card-body bg-white shadow-lg">
            <ul class="list-unstyled">
              <li v-for="technology in technologies" :key="technology.id">
                <input
                  type="checkbox"
                  :id="technology.id"
                  v-model="selectedTechnologies"
                  :value="technology.id"
                />
                <label class="p-1" :for="technology.id">{{
                  technology.name
                }}</label>
              </li>
            </ul>
            <button @click="filterByTechnology" class="btn btn-primary m-1">
              Filter by Technology
            </button>
            <button @click="deselectAllTechnologies" class="btn btn-danger m-1">
              Unfilter
            </button>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
