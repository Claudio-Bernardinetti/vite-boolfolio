<template>
  <div>
      
      <div class="p-5 mb-4 bg-dark text-light">
        <div class="container py-5">
          <h1 class="display-5 fw-bold">My Projects</h1>
          <p class="col-md-8 fs-4">Find out all my projects</p>
          <!-- <button class="btn btn-primary btn-lg" type="button">Find out more</button> -->
        </div>
      </div>

    <ProjectCard />


  </div>
</template>

<script>
import ProjectCard from "../components/ProjectCard.vue";
  export default {
    name : 'ProjectsView',
    components:  {
      ProjectCard
    }
    
  }
</script>

<style lang="scss" scoped>

</style>