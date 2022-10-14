<script lang="ts">
    import { goto } from "$app/navigation";
    import { getCookie } from "$lib/api";
    import { onMount } from "svelte";

    onMount(() => {
      const isLoggedIn = getCookie('isLoggedIn') === 'yes';
      if (!isLoggedIn) {
        goto("/auth/login")
      }
    })
</script>

<div class="drawer drawer-mobile h-[93.5vh]">
  <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content flex flex-col items-center justify-center">
    <!-- Page content here -->
    <label for="my-drawer-2" class="btn btn-outline drawer-button lg:hidden fixed rounded-tr-full rounded-br-full bottom-[45vh] left-0">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
      </svg>
    </label>
    <slot />  

  </div> 
  <div class="drawer-side p-0">
    <label for="my-drawer-2" class="drawer-overlay"></label> 
    <ul class="menu p-4 overflow-y-auto w-72 bg-base-100 text-base-content">
      <!-- Sidebar content here -->
      <li><a href="/dashboard/path">Path</a></li>
      <li><a href="/dashboard/goals">Goals</a></li>
      <li><a href="/dashboard/puzzles">Puzzles</a></li>
    </ul>
  
  </div>
  
</div>

