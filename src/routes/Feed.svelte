<script lang="ts">
    import VirtualList from "svelte-tiny-virtual-list";
    import InfiniteLoading from "svelte-infinite-loading";

    let page = 0;
    let listHeight = 0;
    let list = [];
    let virtualList;

    import { idToken } from "../stores";
    async function infiniteHandler({ detail: { loaded, complete } }) {
        let apiResponse = await (
            await fetch(`https://api.p4p.io/v1/graphql`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${$idToken}`,
                },
                body: JSON.stringify({
                    query: `{posts(order_by: {date_created: desc}, limit: 10, offset: ${
                        page * 10
                    }){
                        id
                        title
                        media
                        content
                        date_created
                        user {
                            id
                            username
                        }
                        comments(order_by: {date_created: desc}) {
                            id
                            content
                            date_created
                            user {
                                id
                                username
                            }
                        }
                        comments_aggregate {
                        aggregate {
                            count
                        }
                        }
                    }
                }
                    `,
                }),
            })
        ).json();
        if (apiResponse.data.posts.length > 0) {
            page += 1;
            list = [...list, ...apiResponse.data.posts];
            // virtualList.recomputeSizes(0);
            loaded();
        } else {
            complete();
        }
    }
</script>

<main>
    <div style="height:calc(100vh - 70px);" bind:offsetHeight={listHeight}>
        <VirtualList
            bind:this={virtualList}
            height={listHeight}
            width="100%"
            itemSize={(index) => {
                return list[index].media ? 300 : 100;
            }}
            itemCount={list.length}
        >
            <div slot="item" let:index let:style {style}>
                <div
                    style="display:flex;flex-direction:column;align-items:flex-start;padding:10px;"
                >
                    <div>
                        <span>{list[index].title}</span> by
                        <span style="font-weight:bold"
                            >{list[index].user.username}</span
                        >
                    </div>
                    {#if list[index].media}
                        <img
                            alt="img"
                            style="height:200px;object-fit:contain;"
                            src={`https://files.p4p.io/public/${list[index].media}`}
                        />
                    {/if}
                    <div>
                        {list[index].content}
                    </div>
                </div>
            </div>
            <div slot="footer">
                <InfiniteLoading on:infinite={infiniteHandler}>
                    <div slot="noMore" />
                    <div slot="noResults" />
                    <div slot="error" />
                    <div slot="spinner" />
                </InfiniteLoading>
            </div>
        </VirtualList>
    </div>
</main>

<style>
</style>
