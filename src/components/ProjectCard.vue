<template>
  <div class="container py-4">
    <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 py-4 g-4">
      <div class="col" v-for="project in projects" :key="project.id">
        <router-link style="text-decoration: none;" :to="{ name: 'project', params: { id: project.id }}">
          <div class="card shadow-lg h-100">
            <img :src="project.cover_image" alt="">
            <div class="card_body h-100">
              <div class="card-text h-100 p-2">
                <h5 class="card-title">Title: {{ project.title }}</h5>
                <strong>Links:</strong> <br>
                <a :href="project.github_link" target="_blank">{{ project.github_link }}</a> <br>
                <a :href="project.internet_link" target="_blank">{{ project.internet_link }}</a> <br>
                <strong>Description:</strong> <br>
                <div> {{ project.description }} </div>
                
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
   
    <div class="container p-0">
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

<style>

</style>