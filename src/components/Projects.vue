<script>
import axios from 'axios'
import ProjectCard from './ProjectCard.vue'

export default {
  name: 'Projects',
  components: {
    ProjectCard
  },
  data() {
    return {
      url: 'http://127.0.0.1:8000', 
      api: '/api/projects', 
      projects: [],
      current_page: 1,
      last_page: 0,
    }
  },
  methods: {
    updatePage(increment) {
      this.current_page += increment;
      this.fetchProjects();
    },
    fetchProjects() {
      axios.get(this.url + this.api, { params: { page: this.current_page } })
        .then(response => {
          this.projects = response.data.result.data;
          this.last_page = response.data.result.last_page;
        });
    }
  },
  mounted() {
    this.fetchProjects();
  }
}
</script>

<template>
  <div class="container py-4">
    <h1>All Projects</h1>
    <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 py-4 g-2">
      <ProjectCard v-for="project in projects" :key="project.id" :project="project" />
    </div>
    <nav aria-label="Page navigation example py-2">
      <!-- <ul class="pagination">
        <li class="page-item">
          <button @click="updatePage(-1)" class="btn btn-primary" :disabled="current_page === 1">Prev</button>
        </li>
        <li class="page-item">
          <button @click="updatePage(1)" class="btn btn-primary" :disabled="current_page === last_page">Next</button>
        </li>
      </ul> -->
    </nav>
  </div>
</template>

<style></style>