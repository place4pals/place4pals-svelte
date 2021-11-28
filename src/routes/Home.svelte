<script lang="ts">
    import { onMount } from "svelte";
    import { fade, fly } from "svelte/transition";
    import { quintOut, expoOut } from "svelte/easing";
    import { Link } from "svelte-navigator";
</script>

<div>
    <div style="text-align:center;margin-top:20vh;">
        <div style="display:flex;flex-direction: row; justify-content: center;">
            <div
                in:fly={{
                    delay: 0,
                    duration: 300,
                    x: 0,
                    y: -50,
                    easing: expoOut,
                }}
                style="cursor: pointer; border: 1px solid #000000; background-color: #898542; border-radius: 10px; padding: 5px; height: 50px; width: 50px"
            />
            <div
                in:fly={{
                    delay: 300,
                    duration: 300,
                    x: 0,
                    y: -50,
                    easing: expoOut,
                }}
                style="cursor: pointer; border: 1px solid #000000; background-color: #8E84BC; border-radius: 10px; padding: 5px; height: 50px; width: 50px; margin-left: -20px; margin-top: 20px; z-index: 1;"
            />
            <div
                in:fly={{
                    delay: 600,
                    duration: 300,
                    x: 0,
                    y: -50,
                    easing: expoOut,
                }}
                style="cursor: pointer; border: 1px solid #000000; background-color: #9C087E; border-radius: 10px; padding: 5px; height: 50px; width: 50px; margin-left: -20px; margin-top: 5px; z-index: 1;"
            />
        </div>
        <div
            in:fly={{ delay: 900, duration: 1000, x: 0, y: 0, easing: expoOut }}
            style="margin-top:20px;margin-bottom:20px;"
        >
            non-profit and open-source social media
        </div>
    </div>
    <div
        style="text-align:center;"
        in:fly={{ delay: 3000, duration: 1000, x: 0, y: 0, easing: expoOut }}
    >
        <Link to="/login"><button>Log In</button></Link>
        <span>or</span>
        <Link to="/login"><button>Sign Up</button></Link>
    </div>
</div>
