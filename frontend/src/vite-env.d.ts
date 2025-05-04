/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_SERVER_URL_CATALOG: string;
  readonly VITE_SERVER_URL_AUTH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
