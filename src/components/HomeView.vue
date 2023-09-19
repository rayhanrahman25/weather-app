<template>
    <main class="container text-white">
        <div class="pt-4 mb-8 relative">
            <input type="text" v-model="searchQuery" @input="getSearchResult"
             placeholder="Search for a city or state"
            class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary
            focus:outline-none focus:shadow-[0px_1px_0_0_#004e71]">
            <ul class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]" v-if="mapboxSearchResults">
                <p v-if="searchError">Sorry! Somethig went wrong please try again</p>
                <p v-if="!searchError && mapboxSearchResults.length === 0 ">
                    No result match to your query, please try different term
                </p>
                <template v-else>
                    <li v-for="searchResult in mapboxSearchResults" :key="searchResult.id"
                    class="py-2 cursor-pointer" @click="cityPreview(searchResult)"> {{ searchResult.place_name }}</li>
                </template>
            </ul>
        </div>
        <div class="flex flex-col gap-4">
            <Suspense>
                <CityLists>
                    <template #fallback>
                        <CityCardSkeleton />
                    </template>
                </CityLists>
            </Suspense>
        </div>
    </main>
</template>

<script setup>
 import {ref} from "vue";
 import axios from "axios";
 import { useRouter } from "vue-router";
 import CityLists from "../components/CityLists.vue";
 import CityCardSkeleton from "../components/CityCardSkeleton.vue";
 const router = useRouter();

 const searchQuery = ref("");
 const queryTimeOut = ref(null);
 const mapboxAPIKey = "pk.eyJ1Ijoiam9obmtvbWFybmlja2kiLCJhIjoiY2t5NjFzODZvMHJkaDJ1bWx6OGVieGxreSJ9.IpojdT3U3NENknF6_WhR2Q";
 const mapboxSearchResults = ref("");
 const searchError = ref(null);
 const cityPreview = (searchResult) => {
 const [city, state] = searchResult.place_name.split(",");
  router.push({
    name: "cityView",
    params: { state: state.replaceAll(" ", ""), city: city },
    query: {
      lat: searchResult.geometry.coordinates[1],
      lon: searchResult.geometry.coordinates[0],
      preview: true,
    },
  })
}
 const getSearchResult = () => {
    clearTimeout(queryTimeOut.value);
    queryTimeOut.value = setTimeout( async () => {
        if(searchQuery.value !== '') {
            try {
                const result = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIKey}&types=place`);
                mapboxSearchResults.value = result.data.features;
            } catch {
                searchError.value = true;
            }
            return;
        }
        mapboxSearchResults.value = null;
    },300)
 }
</script>