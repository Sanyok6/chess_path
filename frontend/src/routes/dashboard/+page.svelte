<script>
    import { goto } from "$app/navigation";
</script>

<div class="text-center w-full">
    <p class="text-6xl">Welcome to Chess Path!</p>
    <div class="flex justify-center items-center mt-10">
        <div class="text-left">
            <p class="font-bold">How it works:</p>
            <p>- Set tasks that you want to work on every day.</p>
            <p>- After completing all of your tasks on a given day, you move up on the path.</p>
            <p>- If you do not complete all of your tasks, you will need to start over.</p>
            <p>- See how far you can get on your path!</p>
            <div class="mt-8"></div>
            <p class="font-bold">About Chess Path:</p>
            <p>- Chess Path is <a class="underline" href="https://github.com/Sanyok6/chess_path/">open source</a>. This means all of the code is free and open to everyone.</p>
            <p>- If you have any questions or comments, please open an issue <a class="underline" href="https://github.com/Sanyok6/chess_path/issues/new">here</a>.</p>
            <p>- If you find a bug or encounter an error, please tell us <a class="underline" href="https://github.com/Sanyok6/chess_path/issues/new">here</a>.</p>
            <p>- If you want to help develop Chess Path, or fix a bug, create a  <a class="underline" href="https://github.com/Sanyok6/chess_path/pulls">pull request</a>.</p>
        </div>
    </div>
    <div class="mt-14 flex items-center justify-center">
        <div>
            <div class="flex flex-wrap">
                <a href="dashboard/path" class="btn btn-info m-1 h-36 w-[250px] text-3xl">Path</a>
                <a href="dashboard/goals" class="btn btn-info m-1 h-36 w-[250px] text-3xl">Goals</a>
                <a href="dashboard/puzzles" class="btn btn-info m-1 h-36 w-[250px] text-3xl">Puzzles</a>
            </div>
            <div class="flex flex-wrap">
                <a href="https://github.com/Sanyok6/chess_path/issues/new" class="btn btn-info m-1 h-20 w-[375px] text-2xl">Report a bug</a>
                <a href="https://github.com/Sanyok6/chess_path" class="btn btn-info m-1 h-20 w-[380px] text-2xl">View code</a>
            </div>
        </div>
    </div>
</div>