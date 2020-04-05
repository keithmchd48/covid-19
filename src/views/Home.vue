<template>
  <div class="w-full h-screen font-sans flex-col">
    <!-- HEADER -->
    <div class="border-t-2 border-b-2 border-blue-500 bg-blue-100 p-4">
      <div class="text-2xl text-blue-400">COVID-19 Cases Around The World</div>
    </div>
    <!-- BODY   -->
    <TableCountries/>
  </div>
</template>

<script>
import TableCountries from "@/components/TableCountries";
export default {
  name: 'Home',
  components: {
    TableCountries
  }
}
</script>
