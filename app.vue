<template>
  <NuxtLayout>
    <v-app>
      <!-- Header -->
      <v-app-bar :elevation="2">
        <template v-slot:prepend>
          <v-dialog>
            <template v-slot:activator="{ props: activatorProps }">
              <v-app-bar-nav-icon
                  v-bind="activatorProps"
                  color="surface-variant"
                  text="Ouh! What's this?!"
                  variant="plain"
                ></v-app-bar-nav-icon>
            </template>

            <!-- Dialog content -->
            <template v-slot:default="{ isActive }">
              <v-container>
                <v-row justify="center" align="center">
                  <v-col cols="6">
                    <v-card>
                      <v-card-title>Woah chill out mate</v-card-title>
                      <v-card-text>
                        It's just a little stack trial, nothing to get too excited about!
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn @click="isActive.value = false" variant="outlined">
                          ¯\_(ツ)_/¯
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </template>
          </v-dialog>
        </template>
        <v-app-bar-title>QTM Stack-Trial:</v-app-bar-title>
      </v-app-bar>

      <!-- Main content -->
      <main>
        <NuxtPage />
      </main>

      <!-- Footer -->
      <v-footer class="bg-grey-lighten-1">
        <v-row justify="center" no-gutters>
          <v-col class="text-center mt-4" cols="12">
            {{ new Date().getFullYear() }} — <strong>Denis Steinhorst</strong> | <a href="https://www.steinhorst.dev" target="_blank" rel="noopener nofollow">steinhorst.dev</a>
          </v-col>
        </v-row>
        <v-row justify="center" no-gutters>
          <v-col class="text-center mt-4" cols="12">
            <a href="https://github.com/denissteinhorst/qtm-stack-trial" target="_blank" rel="noopener nofollow">View the source code on Github</a>
          </v-col>
        </v-row>
      </v-footer>
    </v-app>
  </NuxtLayout>
</template>

<style scoped>
  main {
    padding-top: 64px;
    padding-bottom: 64px;
  }
</style>

<script setup lang="ts">
</script>
