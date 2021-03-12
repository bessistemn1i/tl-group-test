<template>
  <div class="home">
    <div id="nav">
      <router-link to="/">Главная</router-link> |
      <router-link :to="{name: 'SortedTable', params: tableParams}">Таблица после сортировки</router-link>
    </div>
    <UsersProgress @updateHref="updateHref"/>
  </div>
</template>

<script>
// @ is an alias to /src
import UsersProgress from '@/components/UsersProgress.vue'

export default {
  name: 'Home',
  data() {
    return {
      tableParams: {},
    }
  },
  components: {
    UsersProgress
  },
  methods: {
    updateHref(data) {
      this.tableParams = data;
    }
  }
}
</script>
