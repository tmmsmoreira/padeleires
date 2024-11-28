<script setup lang="ts">
import {
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Menu } from 'lucide-vue-next'

const authStore = useAuthStore()
const { isAdmin } = authStore

</script>

<template>
  <div class="hidden h-full flex-col md:flex">
    <div class="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
      <!-- <Sheet class="hidden">
        <SheetTrigger as-child>
          <Button variant="outline">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
    
          <SheetFooter>
            <SheetClose as-child>
    
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet> -->

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        class="mr-2 h-6 w-6"
      >
        <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
      </svg>
      <a href="/">
        <h2 class="text-lg font-medium">
          Padeleires
        </h2>
      </a>
      <div class="ml-auto flex w-full space-x-2 items-center sm:justify-end">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Jogos</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul class="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[minmax(0,.75fr)_minmax(0,1fr)]">
                  <li class="row-span-3">
                    <NavigationMenuLink as-child>
                      <a
                        class="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <img src="https://www.radix-vue.com/logo.svg" class="h-6 w-6">
                        <div class="mb-2 mt-4 text-lg font-medium">
                          shadcn/ui
                        </div>
                        <p class="text-sm leading-tight text-muted-foreground">
                          Beautifully designed components built with Radix UI and
                          Tailwind CSS.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
    
                  <li>
                    <NavigationMenuLink as-child>
                      <a
                        href="/docs"
                        class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div class="text-sm font-medium leading-none">Introduction</div>
                        <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Re-usable components built using Radix UI and Tailwind CSS.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink as-child>
                      <a
                        href="/docs/installation"
                        class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div class="text-sm font-medium leading-none">Installation</div>
                        <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          How to install dependencies and structure your app.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink as-child>
                      <a
                        href="/docs/primitives/typography"
                        class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div class="text-sm font-medium leading-none">Typography</div>
                        <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Styles for headings, paragraphs, lists...etc
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem v-if="isAdmin">
              <NuxtLink to="/admin">
                <NavigationMenuLink :class="navigationMenuTriggerStyle()">
                  Administração
                </NavigationMenuLink>
              </NuxtLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <UserNav />
      </div>
    </div>
    <Separator />
  </div>
</template>