let available = false;
let installed = false;

export async function getShaka(): Promise<{
  shakaApi: any;
  available: boolean;
}> {
  /** @ts-ignore */
  const shakaApi = (await import("shaka-player/dist/shaka-player.compiled"))
    .default;

  if (!installed) {
    installed = true;
    shakaApi.polyfill.installAll();
    available = shakaApi.Player.isBrowserSupported();
  }

  return { shakaApi, available };
}
