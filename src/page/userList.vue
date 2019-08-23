<template>
    <div>
        <div class="updata">

          
        </div>
      </div>
</template>

<script>
export default {
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        number: '15544542342'
        
      };
      return {
        tableData: Array(20).fill(item),
        flag:false
      }
    },
}
</script>

<style>

</style>