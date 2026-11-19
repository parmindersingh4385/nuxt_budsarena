// https://nuxt.com/docs/api/configuration/nuxt-config
/* export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
}) */

export default defineNuxtConfig({
    modules: ['@nuxt/fonts', '@nuxt/icon/module'],
    css: ['~/assets/css/main.css'],
    fonts: {
        families: [
            {
                name: 'Poppins',
                provider: 'google',
                weights: [400, 500, 600, 700]
            }
        ]
    },
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true }
});
