<!-- signup -->
<script lang="ts">

    import { goto } from "$app/navigation";
    import { fetchApi } from "$lib/api";

    let messages: string[] = [];

    let username: string;
    let email: string;
    let password: string;

    const handleSignup = async () => {
        console.log(username, email, password)
        const response = await fetchApi("auth/signup/", {
            method: "POST",
            body: JSON.stringify({
                "username": username,
                "email": email,
                "password": password
            })
        });

        console.log(response)

        // if (response.ok) {
        //     fetchUserData(null);
        //     goto("/");
        // } else {
        //     const errors = formatApiErrors(await response.json()); // this will be a list of strings
        //     messages=errors;
        //     // TODO: Show API errors
        // }
    }

</script>


<div class="flex min-h-[75%] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8">
      <div>
        <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600" alt="Workflow">
        <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Create an account</h2>
      </div>
      <form class="mt-8 space-y-6" on:submit|preventDefault={handleSignup}>
        <input type="hidden" name="remember" value="true">
        <div class="-space-y-px rounded-md shadow-sm">
          <div>
              <label for="username" class="sr-only">Username</label>
              <input bind:value={username} id="username" name="username" type="username" autocomplete="username" required class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Username">
          </div>
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input bind:value={email} id="email-address" name="email" type="email" autocomplete="email" required class="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Email address">
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input bind:value={password} id="password" name="password" type="password" autocomplete="current-password" required class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password">
          </div>
        </div>
  
        <div>
          <button on:submit|preventDefault={handleSignup} type="submit" class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Sign up
          </button>
        </div>
      </form>
    </div>
  </div>
  