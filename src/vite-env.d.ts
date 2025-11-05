/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_USER_NAME?: string;
  readonly VITE_USER_EMAIL?: string;
  readonly VITE_USER_GITHUB?: string;
  readonly VITE_USER_GITHUB_AVATAR?: string;
  readonly VITE_USER_GRAVATAR?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

