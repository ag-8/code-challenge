<template>
  <div id="app">
  <!-- loading spinner -->
    <div id="loading-spinner">
     <img src="@/assets/loading.gif" id="loader">
    </div>

  <!-- navbar -->
   <nav class="navbar" id="nav" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a>
          <img alt="Logo" style="height:50px;width:150px;" src="./assets/thisdot-logo.png" class="image">
        </a>
      </div>

      <div class="navbar-end">
        <div class="buttons">
          <a>
            <img alt="Github Logo" src="./assets/github-icon.png" class="image is-32x32">
          </a>
        </div>
      </div>

    </nav>
    <br><br>

    <!-- search filters -->

    <div class="columns is-mobile">
      <div class="column is-10 is-offset-1">

        <div class="field is-grouped is-grouped-multiline">
          <p class="control">
            <label class="label"> Github User Search: </label>
            <input class="input" v-model="search">
          </p>
          <p class="control">
            <button style="margin-top:35%" class="button is-outlined" @click="getData()"> Search </button>
          </p>
        </div>

      </div>
    </div>

  <!-- table -->
    <div class="columns is-mobile">
      <div class="column is-10 is-offset-1">
        <v-client-table :data="data" :columns="columns" :options="options">

          <div slot="avatarUrl" slot-scope="props">
            <span v-if='props.row.avatarUrl == null'>---</span>
            <span v-else>
              <img alt="User Avatar" :src=props.row.avatarUrl class="image is-32x32">
            </span>
          </div>

          <div slot="name" slot-scope="props">
            <span v-if='props.row.name == null'>---</span>
            <span v-else>
              {{props.row.name}}
            </span>
          </div>

          <div slot="bio" slot-scope="props">
            <span v-if='props.row.bio == null'>---</span>
            <span v-else>
              {{props.row.bio}}
            </span>
          </div>

    

        </v-client-table>
      </div>
    </div>
    
  </div>
</template>

<script>
import search from './graphql/search.gql';
import { onLogin } from './vue-apollo';

export default {
  name: 'App',
  data() {
    return {
      data: [],
      columns: ['avatarUrl', 'name', 'bio', 'followers.totalCount', 'starredRepositories.totalCount'],
      options: {
        headings: {
         avatarUrl: 'Avatar',
         'followers.totalCount': 'Followers',
         'starredRepositories.totalCount': 'Stars',
        },
        skin: 'table is-narrow-mobile is-fullwidth',
      },
      search: 's',
      searchTerm: 'example',
    }
  },
  mounted() {
    onLogin(this.$apollo.provider.defaultClient, process.env.VUE_APP_TOKEN);
    this.getData();
  },
  watch: {
    search() {
      this.getData();
      console.log(this.data)
    },
  },
  apollo: {
    search: {
      query: search,
      variables() {
        return {
          query: this.search,
        };
      },
    },
  },
  methods: {
    getData() {
      this.$apollo.queries.search.refetch();
      this.data = this.search.edges.map(obj => obj.node);
    },
  }
}
</script>

<style>
#app {
  font-family: Montserrat,sans-serif;
  color: white;
}

#nav {
  background-color: #0a1930;
  padding: 15px;
}

.navbar-item, .navbar-link{
  color: white !important;
}

.button {
  background-color: inherit !important;
  color: white !important;
}

#search {
  border: 0;
  outline: 0;
  background: transparent;
  color: white;
  width: 500px;
  border-bottom: 2px solid #0e75d2;
}

.pagination-previous, .pagination-next, .pagination-link, .label{
  color: white !important;
}

#loading-spinner{
  width: 100%;
  height: 100%;
  background-color:rgba(255, 255, 255, 0.2);
  position: fixed;
  z-index: 99;
  display: none;
}  
#loader{
  position: absolute;
  top: 30%;
  left: 50%;
  width: 10%;
  height: 20%;
  transform: translate(-50%,-50%);
}

</style>
