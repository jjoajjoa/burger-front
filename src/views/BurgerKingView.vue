<script setup>
import MainHeader from '@/components/MainHeader.vue';
import MainFooter from '@/components/MainFooter.vue'
</script>

<template>
    <MainHeader />

    <div class="app-main flex-column flex-row-fluid" id="kt_app_main" style="flex-grow: 1; overflow: auto;">
        <div class="image-container">
            <img src="../assets/images/menu-header.jpg" alt="Menu Header" class="menu-image">
            <h1 class="header-text">Burger King</h1>
        </div>
        <div class="d-flex flex-column flex-column-fluid" style="flex-grow: 1; justify-content: center; align-items: center;">
            <div id="kt_app_content" class="app-content flex-column-fluid" style="flex-grow: 1; display: flex; flex-direction: column;">
                <div id="kt_app_content_container" class="app-container container-xxl tomato" style="flex-grow: 1; padding: 50px 0; display: flex; justify-content: center; align-items: center;">
                    <div class="olive">
                        <h1>BURGUNDY</h1>
                    </div>
                    <div>
                        <h1>김숙자 버거</h1>
                    </div>
                    <div>
                        <h1>존버.거</h1>
                    </div>
                    <div>
                        <h1>먹다남은버거</h1>
                    </div>
                    <div>
                        <h1>치즈없으면난못해</h1>
                    </div>

                </div>
            </div>

        </div>
    </div>

    <MainFooter />

</template>
