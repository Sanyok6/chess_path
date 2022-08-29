<script lang="ts">
    import { DarkMode,Navbar,NavBrand,NavHamburger,NavLi,NavUl } from "flowbite-svelte";
    import "../app.css";

    let btnClass: string = "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"

</script>

<body class="bg-white dark:bg-gray-800 h-[100vh] dark:text-white">

    <Navbar let:hidden let:toggle class="mb-5">
        <NavBrand href={"/"}>
            <span class="self-center whitespace-nowrap text-xl font-light dark:text-white">
                Chess Path
            </span>
        </NavBrand>
        <div>
            
            <NavHamburger on:click={toggle} />
        </div>

        <NavUl {hidden}>
            <DarkMode {btnClass} />
            <NavLi class="mt-2" href="#">Login</NavLi>
            <NavLi class="mt-2" href="#">Signup</NavLi>
        </NavUl>
    </Navbar>

    <slot />

</body>