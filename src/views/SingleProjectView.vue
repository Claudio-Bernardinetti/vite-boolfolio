<template>
  <div>

  <div class="container">
      <div class="cover_image">
        <img class="img-fluid object-fit-cover" :src="'http://127.0.0.1:8000/storage/' + project.cover_image" alt="" style="height: 400px;">
      </div>
      <h1>{{ project.title }}</h1>
      <p>{{project.description}}</p>
    </div>

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