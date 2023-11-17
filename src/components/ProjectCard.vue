<script>

export default {
  name: 'ProjectCard',
  props: ['project', 'url'],
  data() {
    return {

    }
  },
}

</script>

<template>
  <div class="col">
    <div class="card">
      <img :src="project.cover_image" alt="" class="card-img-top">
      <div class="card-body">
        
        <h5 class="card-title">
            Title:
          {{ project.title }}
        </h5>
        <p class="card-text">

          <strong>Description:</strong> <br>
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
</template>

<style></style>