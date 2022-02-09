<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
:root {
  --red: #ff4646;
  --red-cancelado: #dc2626;
  --violet: #3a0ca3;
  --dark-pink: #f72585;
  --dark-gray: #4a4a4a;
  --transparent-gray: #92929257;
  --light-gray: #b4b4b4;
  --green: #00cf9f;
}

#app {
  font-family: "Poppins", Arial, Helvetica, sans-serif;
}

p {
  font-size: 1rem;
}

.btn:focus,
.btn:active:focus,
.btn.active:focus,
.btn.focus,
.btn:active.focus,
.btn.active.focus {
  outline: none !important;
  box-shadow: none !important;
}
.btn {
  box-shadow: none !important;
  color: white;
  font-weight: 700;
}
.btn-primary {
  background-color: var(--violet) !important;
  border-color: var(--violet) !important;
}
.btn-secondary {
  background-color: var(--dark-pink) !important;
  border-color: var(--dark-pink) !important;
}
</style>
