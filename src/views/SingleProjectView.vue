<template>


  <div class="container mt-4">
      <div class="cover_image">
        <!-- <img class="img-fluid object-fit-cover" :src="'http://127.0.0.1:8000/storage/' + project.cover_image" alt="" style="height: 400px;"> -->
      </div>
      
        <div class="card d-flex">
          
          <img width="300" :src="project.cover_image" alt="">
          
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
              {{project.type_slug}}
            </p>
            <ul >
            </ul>
          </div>
      </div>
          <router-link to="/projects" class="btn btn-primary my-2">Go Back</router-link>
  </div>
      


</template>

<script>
import axios from 'axios';
export default {
  name: 'SingleProjectView',
  data() {
    return {
      project: {}
    }
  },
  mounted() {
    const url = `http://127.0.0.1:8000/api/projects/${this.$route.params.id}`;
    axios.get(url)
      .then(resp => {
        console.log(resp.data.result);
        this.project = resp.data.result
      })
      .catch(err => {
        console.log(err.message);
      })

  }



}
</script>

<style lang="scss" scoped></style>