<template>
  <div id="app">
    <header>Hello World, Welcome to dataspread demo test</header>
    <router-link to="/">Home Page</router-link>
    <router-link to="/data-sheet">Data Spread</router-link>
    <router-link to="/contact">Contact Page</router-link>
    <router-link to="/about">About Page</router-link>
    <router-view></router-view>
    <footer>Anything else?</footer>
  </div>
</template>

<script></script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
a {
  margin: 0 1rem;
}
</style>
