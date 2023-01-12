// @ts-nocheck
// it seams that shaka doesn't have type declaration

let available = false;
let installed = false;

export async function getShaka(): Promise<{
  shakaApi: any;
  available: boolean;
}> {
  const shakaApi = (
    await import(
      /* webpackChunkName: "shaka" */
      /* webpackPrefetch: true */
      "shaka-player/dist/shaka-player.compiled"
    )
  ).default;

  if (!installed) {
    installed = true;
    shakaApi.polyfill.installAll();
    available = shakaApi.Player.isBrowserSupported();
  }

  return { shakaApi, available };
}
