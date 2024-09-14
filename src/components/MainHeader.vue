<script setup>
import router from '@/router/index.js';

function goToHome() {
    router.replace({ path: '/', query: {} });
}

</script>

<template>
    <div style="border: 2px solid tomato;" id="kt_app_header" class="app-header" data-kt-sticky="true" data-kt-sticky-activate="{default: true, lg: true}"
        data-kt-sticky-name="app-header-minimize" data-kt-sticky-offset="{default: '200px', lg: '0'}"
        data-kt-sticky-animation="false">
        <div class="app-container container-fluid d-flex align-items-stretch justify-content-between"
            id="kt_app_header_container">
            <div class="d-flex align-items-stretch justify-content-between flex-lg-grow-1" id="kt_app_header_wrapper">
                <div class="app-navbar flex-shrink-0">
                    <div class="app-navbar-item ms-1 ms-md-4">
                        <div class="btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px"
                            id="kt_activities_toggle" @click="goToHome()">
                            fivegirls
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>