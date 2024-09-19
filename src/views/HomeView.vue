<script setup>
import MainHeader from '@/components/MainHeader.vue';
import MainFooter from '@/components/MainFooter.vue'
import MainContents from '@/components/MainContents.vue';
</script>

<template>
    <MainHeader/>

    <div class="app-main d-flex flex-column flex-row-fluid overflow-auto">
        <div class="d-flex flex-column flex-column-fluid justify-content-center align-items-center">
            <div id="kt_app_content" class="app-content flex-grow-1 d-flex flex-column">
                <MainContents />
            </div>
        </div>
    </div>

    <MainFooter/>
</template>
