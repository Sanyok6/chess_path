<script lang="ts">
    import "../app.css";

    let theme = "light"

    import { userStore, type User } from "$lib/store";
    import { afterUpdate, onMount } from "svelte";
    import { fetchUserData, getCookie } from "$lib/api";

    let userData: User | null = null;
    let isLoggedIn = false;  // Assume that the user is not logged in at first

    userStore.subscribe(d => userData = d)

    onMount(() => {
        isLoggedIn = getCookie('isLoggedIn') === 'yes';
        fetchUserData(userData);
    })

    afterUpdate(() => {
        isLoggedIn = getCookie('isLoggedIn') === 'yes';
    })

    import { themeChange } from 'theme-change'

    onMount(() => {
        themeChange(false)
        theme = localStorage.getItem("theme") || "dark"
    })


</script>

<body class="{theme}">

    <div class="bg-[#f7f7f5] dark:bg-gray-800 h-[100vh] dark:text-white font-sans">
        <div class="navbar bg-base-100 border-b-2 dark:border-b-0">
            <div class="flex-1">
                <a class="btn btn-ghost normal-case text-xl text-black dark:text-blue-300" href="/">Chess Path</a>
            </div>
            <div class="flex-none">
                <ul class="menu menu-horizontal p-0">
                    <li>
                        <button data-set-theme="{theme == "dark" ? "light" : "dark"}" data-act-class="ACTIVECLASS" on:click="{() => {setTimeout(() => {theme = theme == "dark" ? "light" : "dark"}, 50)}}">
                            {#if theme == "dark"}
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-brightness-high" viewBox="0 0 16 16">
                                    <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
                                </svg>
                            {:else}
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon" viewBox="0 0 16 16">
                                    <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z"/>
                                </svg>
                            {/if}
                        </button>
                    </li>
                    {#if isLoggedIn}
                        <div class="dropdown dropdown-end">
                            <!-- <div tabindex="0" class="btn btn-ghost btn-circle avatar ml-3">
                            <div class="w-10 rounded-full">
                                <img alt="" src="/profilePic.png" />
                            </div>
                            </div> -->
                            <li><div class="font-bold" tabindex="0" >
                                {userData?.username}
                                <svg class="fill-current -ml-3" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
                            </div></li>
                            <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                                <p class="my-1 mx-4 font-bold">{userData?.username}</p>
                                <li><a href="/dashboard/" class="w-full">Dashboard</a></li>
                                <li><a href="/auth/logout" class="text-red-600 dark:text-red-400 w-full">Logout</a></li>
                            </ul>
                        </div>
                    {:else}
                        <li><a href="/auth/login">Login</a></li>
                        <li><a href="/auth/signup">Signup</a></li>
                    {/if}
                </ul>
            </div>
        </div>
        <main>
        <slot />
        </main> 
    </div>


</body>