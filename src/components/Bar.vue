<template>
<nav class="bar bar-tab">
  <slot></slot>
</nav>
</template>

<style scoped>
.bar-tab {
    z-index: 99999;
}
.tab-item.active {
  color:  #ed8e07 !important;
}
.tab-item.inactive {
}
</style>
