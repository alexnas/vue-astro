<template>
  <footer id="footer" class="bg-teal-700">
    <nav class="container mx-auto max-w-screen-xl flex justify-between items-center py-5 px-4">
      <div class="flex">
        <router-link to="/">
          <img
            alt="Astro logo"
            class="logo h-8 w-8 round rounded-full"
            src="@/assets/logo.png"
            width="25"
            height="25"
          />
        </router-link>
        <nav class="ml-4 flex items-center text-white">
          <router-link to="/">Data</router-link>
          <router-link class="ml-2" to="/chart">Chart</router-link>
        </nav>
      </div>

      <router-link
        to="/"
        class="flex flex-shrink-0 items-center text-gray-400 hover:text-orange-400 hover:bg-gray-700 rounded-md px-3 py-2 text-sm"
      >
        {{ '\u{00A9}' }} 2022-2023 VidaNueva
      </router-link>
    </nav>
  </footer>
</template>
