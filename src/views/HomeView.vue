<script setup>
import MainHeader from '@/components/MainHeader.vue';
import MainFooter from '@/components/MainFooter.vue'
import MainContents from '@/components/MainContents.vue';
</script>

<template>
    <MainHeader/>

    <div class="app-main flex-column flex-row-fluid" id="kt_app_main" style="flex-grow: 1; overflow: auto;">
        <div class="d-flex flex-column flex-column-fluid" style="flex-grow: 1; justify-content: center; align-items: center;">
            <div id="kt_app_content" class="app-content flex-column-fluid" style="flex-grow: 1; display: flex; flex-direction: column;">
                <div id="kt_app_content_container" class="app-container container-xxl" style="flex-grow: 1; padding: 50px 0; display: flex; justify-content: center; align-items: center;">
                    <div class="d-flex flex-column flex-xl-row" style="flex-grow: 1; justify-content: center; align-items: center;">
                            <MainContents />
                    </div>
                </div>
            </div>
        </div>
    </div>

    <MainFooter/>

</template>
