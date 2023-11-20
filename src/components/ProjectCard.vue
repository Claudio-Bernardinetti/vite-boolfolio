<template>
  <div class="container py-4">
    <h1>All Projects</h1>
    <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 py-4 g-2">
      <div class="col" v-for="project in projects" :key="project.id">
        <div class="card">
          <img :src="url + '/storage_img/' + project.cover_image" alt="">
          <div class="card-body">
            <h5 class="card-title">Title: {{ project.title }}</h5>
            <p class="card-text">
              <strong>Links:</strong> <br>
              {{ project.github_link }}<br>
              {{ project.internet_link }}
            </p>
            <p class="card-text">
              <strong>Description:</strong> <br>
              {{ project.description }}
            </p>
          </div>
        </div>
      </div>
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

<script>
import axios from 'axios'

export default {
  name: 'Projects',
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

<style></style>