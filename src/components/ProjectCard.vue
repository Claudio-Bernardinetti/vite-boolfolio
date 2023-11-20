<template>
  <div class="container py-4">
    <h1>All Projects</h1>
    <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 py-4 g-2">
      <div class="col" v-for="project in projects" :key="project.id">
        <div class="card">
          <img :src="project.cover_image" alt="">
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
            <div class="card-footer">
              <router-link class="btn btn-success my-2" :to="{ name: 'project', params: { id: project.id }}">View Project</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="pagination my-3">
        <nav aria-label="Page navigation">
          <ul class="pagination">
            <li class="page-item" v-if="currentPage > 1">
              <a class="page-link" href="#" @click.prevent="currentPage--; fetchProjects();" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }">
              <a class="page-link" href="#" @click.prevent="currentPage = page; fetchProjects();">{{ page }}</a>
            </li>
            <li class="page-item" v-if="currentPage < totalPages">
              <a class="page-link" href="#" @click.prevent="currentPage++; fetchProjects();" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
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
      currentPage: 1,
      totalPages: 4,
    }
  },
  methods: {
    updatePage(page) {
      this.currentPage = page
      this.fetchProjects()
    },
    fetchProjects() {
      axios.get(this.url + this.api, { params: { page: this.currentPage } })
        .then(response => {
          this.projects = response.data.result.data
          this.totalPages = response.data.result.last_page
        })
    },
  },
  mounted() {
    this.fetchProjects()
  }
}
</script>

<style></style>