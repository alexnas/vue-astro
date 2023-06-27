<template>
  <header id="header" class="bg-teal-700">
    <nav class="container mx-auto max-w-screen-xl flex justify-between items-center py-5 px-4">
      <router-link to="/" class="flex">
        <img
          alt="Astro logo"
          class="logo h-8 w-8 round rounded-full"
          src="@/assets/logo.png"
          width="25"
          height="25"
        />
        <div class="ml-4 text-3xl text-amber-500 font-bold italic">Astro</div>
      </router-link>

      <nav class="text-white">
        <router-link to="/">Data</router-link>
        <router-link class="ml-2" to="/chart">Chart</router-link>
      </nav>
    </nav>
  </header>
</template>
