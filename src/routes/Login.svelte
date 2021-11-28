<script lang="ts">
    import { authenticated, idToken } from "../stores";
    let username = "";
    let password = "";
    async function login() {
        try {
            let authResponse = await (
                await fetch(`https://cognito-idp.us-east-2.amazonaws.com/`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/x-amz-json-1.1",
                        "x-amz-target":
                            "AWSCognitoIdentityProviderService.InitiateAuth",
                    },
                    body: JSON.stringify({
                        AuthFlow: "USER_PASSWORD_AUTH",
                        ClientId: "7l50f21n0bf4ikltp5bg62m3vk",
                        AuthParameters: {
                            USERNAME: username,
                            PASSWORD: password,
                        },
                        ClientMetadata: {},
                    }),
                })
            ).json();
            if (authResponse.AuthenticationResult) {
                console.log(authResponse.AuthenticationResult);
                authenticated.update((obj) => (obj = true));
                idToken.update(
                    (obj) => (obj = authResponse.AuthenticationResult.IdToken)
                );
                localStorage.setItem(
                    "refreshToken",
                    authResponse.AuthenticationResult.RefreshToken
                );
            } else {
                alert(authResponse.message);
            }
        } catch (err) {
            alert(err);
        }
    }
</script>

<main>
    <div style="text-align:center;margin-top:20vh;">
        <div style="display:flex;flex-direction: row; justify-content: center;">
            <form
                on:submit|preventDefault={login}
                style="display:flex;flex-direction:column;width:200px;"
            >
                <input
                    style="margin:10px;padding:10px;"
                    bind:value={username}
                    placeholder="email or username"
                />
                <input
                    style="margin:10px;padding:10px;"
                    bind:value={password}
                    placeholder="password"
                    type="password"
                />
                <button style="margin:10px;padding:10px;" type="submit"
                    >login</button
                >
            </form>
        </div>
    </div>
</main>

<style>
</style>
