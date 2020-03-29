<template>
  <div class="w-full h-screen font-sans flex-col">
    <!-- HEADER -->
    <div class="border-b">HEADER</div>
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
