<script lang="ts">
  import { authenticated, idToken } from "./stores";
  // import { Router, Route } from "svelte-routing";
  import { Router, Link, Route } from "svelte-navigator";
  import NavLink from "./components/NavLink.svelte";
  import Home from "./routes/Home.svelte";
  import Login from "./routes/Login.svelte";
  import Feed from "./routes/Feed.svelte";
  import Empty from "./routes/Empty.svelte";
  export let url = "";

  const async = async () => {
    //detect login
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      let authResponse = await (
        await fetch(`https://cognito-idp.us-east-2.amazonaws.com/`, {
          method: "POST",
          headers: {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "AWSCognitoIdentityProviderService.InitiateAuth",
          },
          body: JSON.stringify({
            AuthFlow: "REFRESH_TOKEN",
            ClientId: "7l50f21n0bf4ikltp5bg62m3vk",
            AuthParameters: {
              REFRESH_TOKEN: refreshToken,
            },
            ClientMetadata: {},
          }),
        })
      ).json();
      if (authResponse.AuthenticationResult) {
        authenticated.update((obj) => (obj = true));
        idToken.update(
          (obj) => (obj = authResponse.AuthenticationResult.IdToken)
        );
      }
    } else {
      authenticated.update((obj) => (obj = false));
    }
  };
  async();
  console.log(location);
</script>

<Router {url}>
  <div
    class="container"
    style="max-width:1300px;margin-left:auto;margin-right:auto;"
  >
    <nav>
      <div
        style="display:flex;flex-direction:row;justify-content:flex-start;align-items:center;height:50px;padding:10px;"
      >
        <Link
          style="width:130px;font-size:20px !important;display:flex;flex-direction:row;justify-content:center;align-items:center;text-decoration-line:none;color:#000000;"
          to="/"
        >
          <img
            style="height:30px;width:30px;margin-bottom:5px;margin-right:5px;"
            class="logo"
            alt=""
            src="/images/logo.svg"
          />place4pals</Link
        >
        {#if $authenticated === true}
          <div style="margin-left:20px;margin-right:20px;">
            <NavLink
              style="text-decoration-line:none;color:#000000;margin:0px 10px;"
              to="/feed">= feed</NavLink
            >
            <NavLink
              style="text-decoration-line:none;color:#000000;margin:0px 10px;"
              to="/pools">≈ pools</NavLink
            >
            <NavLink
              style="text-decoration-line:none;color:#000000;margin:0px 10px;"
              to="/chat">⇆ chat</NavLink
            >
            <NavLink
              style="text-decoration-line:none;color:#000000;margin:0px 10px;"
              to="/profile">▢ profile</NavLink
            >
          </div>
          <button
            on:click={() => {
              idToken.update((obj) => (obj = ""));
              authenticated.update((obj) => (obj = false));
              localStorage.removeItem("refreshToken");
            }}>log out</button
          >
        {:else if $authenticated === false}
          <div style="margin-left:20px;margin-right:20px;">
            <NavLink
              style="text-decoration-line:none;color:#000000;margin:0px 10px;"
              to="/feed">= home</NavLink
            >
            <NavLink
              style="text-decoration-line:none;color:#000000;margin:0px 10px;"
              to="/pools">≈ faq</NavLink
            >
            <NavLink
              style="text-decoration-line:none;color:#000000;margin:0px 10px;"
              to="/chat">⇆ github</NavLink
            >
          </div>
        {/if}
      </div>
    </nav>
    <div class="pageContainer">
      {#if $authenticated === null}
        <div>loading...</div>
      {:else if $authenticated === false}
        <Route path="/" component={Home} />
        <Route path="/login" component={Login} />
      {:else}
        <Route path="/" component={Feed} />
        <Route path="/feed" component={Feed} />
        <Route path="/pools" component={Empty} />
        <Route path="/chat" component={Empty} />
        <Route path="/profile" component={Empty} />
      {/if}
    </div>
  </div>
</Router>
