const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
    transpileDependencies: true,
    
    // Vue 빌드 파일을 Spring Boot의 static 폴더로 출력
    outputDir: "../../back/burger-back/burger/src/main/resources/static",
    
    devServer: {
        proxy: {
            '/api': { // '/api'로 시작하는 요청을 Spring Boot 서버로 프록시
                target: 'http://localhost:9000',
                changeOrigin: true // CORS 문제 해결
            },
            '/boards': {
                target: 'http://localhost:9000',
                changeOrigin: true
            },
            '/burgerking': {
                target: 'http://localhost:9000',
                changeOrigin: true
            },
        }
    }
});