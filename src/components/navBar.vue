<template>
      <div>
          
         <el-breadcrumb class="breadcrumb-container" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="(item)  in levelList" :key="item.path" :to="item.redirect||item.path">
              {{item.meta.title}}
            </el-breadcrumb-item>

        </el-breadcrumb>

      </div>
</template>

<script>
export default {
    data (){
         return{
             levelList: null
         }
    },
     watch: {
            $route(to, from) {
                this.getBreadcrumb()
            }
    },
     created(){
            this.getBreadcrumb()
    },
    methods:{
        getBreadcrumb() {
        let matched = this.$route.matched.filter(item => item.meta.title)
        this.levelList = matched;
    },
    }

}
</script>

<style>

</style>