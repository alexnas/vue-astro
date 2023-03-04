<template>
  <header id="header" class="bg-teal-700">
    <nav class="container mx-auto flex justify-between items-center py-5 px-4">
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="25" height="25" />

      <div class="wrapper">
        <nav class="text-white">
          <router-link to="/">Home</router-link>
          <router-link class="ml-2" to="/about">About</router-link>
        </nav>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.router-link-exact-active {
  color: orange;
}
</style>
