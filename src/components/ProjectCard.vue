<template>
  <div class="container py-4">
    <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 py-4 g-4">
      <div class="col" v-for="project in projects" :key="project.id">
        <router-link style="text-decoration: none;" :to="{ name: 'project', params: { id: project.id }}">
          <div class="card shadow-lg h-100">
            <img class="p-2" :src="project.cover_image" alt="">
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
   
    <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
      <div class="btn-group me-2" role="group" aria-label="First group">
        <div class="btn-group" role="group" aria-label="Second group">
          <button class="btn btn-dark border-black" @click="prevPage" :disabled="currentPage === 1">
            <font color=white>&#9665;</font>
          </button>
          <button 
            v-for="page in totalPages" 
            :key="page" 
            @click="updatePage(page)"
            :class="{ 'btn-primary': currentPage === page, 'btn-dark border-black': currentPage !== page }" 
            class="btn m-0">
            {{ page }}
          </button>
          <button class="btn btn-dark border-black" @click="nextPage" :disabled="currentPage === totalPages">
            <font color=white>&#9655;</font>
          </button>
        </div>
        
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
    prevPage() {
      if (this.currentPage > 1) {
        this.updatePage(this.currentPage - 1)
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.updatePage(this.currentPage + 1)
      }
    },
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