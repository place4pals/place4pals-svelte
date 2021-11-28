<script lang="ts">
    // import { Link } from "svelte-routing";
    import { Link } from "svelte-navigator";

    export let to = "";

    function getProps({
        location,
        href,
        isPartiallyCurrent,
        isCurrent,
        style,
    }) {
        const isActive =
            href === "/" ? isCurrent : isPartiallyCurrent || isCurrent;

        // The object returned here is spread on the anchor element's attributes
        if (isActive) {
            return { class: "active", style: style };
        }
        return { class: "non-active", style: style };
    }
</script>

<Link {to} {getProps} >
    <slot />
</Link>
