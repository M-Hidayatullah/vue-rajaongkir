<template>
  <div>
    <div class="p-4 bg-gray-600 shadow-sm text-center text-white">
      VUE - TAILWIND CSS - RAJA ONGKIR - M.Hidayatullah
    </div>

    <div class="grid sm:grid-cols-12 md:grid-cols-4 gap-4 p-4">
      <div class="bg-white p-3 shadow-sm rounded">
        <h4 class="text-xl pb-1">ORIGIN</h4>
        <hr class="border-2">
         <div class="mt-4 pb-2">
           <label class="mb-2">PROVINSI</label>
           <select class="w-full border bg-white rounded px-3 py-2 outline-none" @change="getCitiesOrigin" v-model="state.province_origin">
            <option class="py-1" v-for="province in provinces" :key="province.id" :value="province.province_id">{{ province.province }}</option>
          </select>
         </div>
         <div class="mt-4 pb-2">
           <label class="mb-2">KABUPATEN</label>
           <select class="w-full border bg-white rounded px-3 py-2 outline-none" v-model="state.city_origin">
            <option class="py-1" v-for="city in cities_origin" :key="city.id" :value="city.city_id">{{ city.city_name }}</option>
          </select>
         </div>
      </div>
      <div class="bg-white p-3 shadow-sm rounded">
        <h4 class="text-xl pb-1">DESTINATION</h4>
        <hr class="border-2">
        <div class="mt-4 pb-2">
           <label class="mb-2">PROVINSI</label>
           <select class="w-full border bg-white rounded px-3 py-2 outline-none" @change="getCitiesDestination" v-model="state.province_destination">
            <option class="py-1" v-for="province in provinces" :key="province.id" :value="province.province_id">{{ province.province }}</option>
          </select>
         </div>
         <div class="mt-4 pb-2">
           <label class="mb-2">KABUPATEN</label>
           <select class="w-full border bg-white rounded px-3 py-2 outline-none" v-model="state.city_destination">
            <option class="py-1" v-for="city in cities_destination" :key="city.id" :value="city.city_id">{{ city.city_name }}</option>
          </select>
         </div>
      </div>
      <div class="bg-white p-3 shadow-sm rounded">
        <h4 class="text-xl pb-1">KURIR</h4>
        <hr class="border-2">
        <div class="mt-4 pb-2">
          <label class="mb-2">KURIR</label>
           <select class="w-full border bg-white rounded px-3 py-2 outline-none" v-model="state.courier">
            <option class="py-1" value="jne">JNE</option>
            <option class="py-1" value="tiki">TIKI</option>
            <option class="py-1" value="pos">POS</option>
          </select>
         </div>
         <div class="mt-4 pb-2">
          <label class="mb-2">BERAT <i>(Gram)</i> </label>
          <input type="text" class="p-2 bg-gray-200 rounded w-full shadow hover:bg-white" v-model="state.weight" placeholder="Masukkan Berat (Gram)">
         </div>
      </div>
      <div>
        <button class="bg-blue-500 p-3 shadow-sm rounded text-white hover:bg-blue-700 focus:outline-none" @click="getCostOngkir">CEK ONGKOS KIRIM</button>
      </div>
    </div>

    <div class="grid sm:grid-cols-1 md:grid-cols-1 gap-4 p-4" v-if="resultCost">
      <div class="bg-white p-3 shadow-sm rounded">
        <h4 class="text-xl pb-1">HASIL ONGKOS KIRIM</h4>
        <hr class="border-2">
        <div class="mt-4" v-for="(value, index) in resultCost" :key="index">
            {{ value.service }} - {{ value.cost[0].value }} - {{ value.cost[0].etd }} Hari
            <hr>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

import { onMounted, reactive, ref } from 'vue'
import axios from 'axios'

  export default {

    setup() {

      /**
       * state province
       */
      const provinces = ref({})

      /**
       * state ID for province and city
       */
      const state = reactive({
        
        province_origin: "",
        city_origin: "",

        province_destination: "",
        city_destination: "",

        weight: "",
        courier: ""
      })

      /**
       * state cities origin
       */
      const cities_origin    = ref({}) 

      /**
       * state cities destination
       */
      const cities_destination    = ref({}) 

      /**
       * resulCost
       */
      const resultCost = ref(null)

      onMounted(() => {

        axios.get('http://localhost:8000/api/provinces').then(response => {
          provinces.value = response.data.data
        })
        .catch(error => {
          console.log(error.response.data)
        })

      })
      
      /**
       * function getCitiesOrigin
       */
      function getCitiesOrigin() {
        
        axios.get(`http://localhost:8000/api/cities/${state.province_origin}`).then(response => {
          cities_origin.value = response.data.data
        })
        .catch(error => {
          console.log(error.response.data)
        })

      }

      /**
       * function getCitiesDestination
       */
      function getCitiesDestination() {

        axios.get(`http://localhost:8000/api/cities/${state.province_destination}`).then(response => {
          cities_destination.value = response.data.data
        })
        .catch(error => {
          console.log(error.response.data)
        })

      }

      /**
       * function getCostOngkir
       */
      function getCostOngkir() {

        axios.post('http://localhost:8000/api/checkOngkir/', {

          //send data ke server laravel
          origin: state.city_origin,
          destination: state.city_destination,
          weight: state.weight,
          courier: state.courier

        }).then(response => {
          resultCost.value = response.data.data[0].costs
        })
        .catch(error => {
          console.log(error.response.data)
        })

      }

      return {
        provinces, state, cities_origin, cities_destination, getCitiesOrigin, getCitiesDestination, getCostOngkir, resultCost
      }

    }

  }
</script>

<style>
  body {
    background: lightgrey !important;
  }
</style>