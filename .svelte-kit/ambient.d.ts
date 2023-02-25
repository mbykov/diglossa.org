
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#kit-env-publicprefix).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```bash
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const NVM_DIR: string;
	export const LS_COLORS: string;
	export const npm_config_node_gyp: string;
	export const npm_execpath: string;
	export const _: string;
	export const LANG: string;
	export const LESS: string;
	export const DISPLAY: string;
	export const HOSTNAME: string;
	export const OLDPWD: string;
	export const EDITOR: string;
	export const GPG_TTY: string;
	export const GTK_OVERLAY_SCROLLING: string;
	export const COLORTERM: string;
	export const NVM_CD_FLAGS: string;
	export const npm_config_global_prefix: string;
	export const npm_package_json: string;
	export const JAVA_HOME: string;
	export const npm_config_user_agent: string;
	export const XDG_VTNR: string;
	export const GTK3_MODULES: string;
	export const ZSH: string;
	export const SSH_AUTH_SOCK: string;
	export const npm_config_init_module: string;
	export const XDG_SESSION_ID: string;
	export const XDG_GREETER_DATA_DIR: string;
	export const USER: string;
	export const PAGER: string;
	export const LSCOLORS: string;
	export const DESKTOP_SESSION: string;
	export const npm_config_userconfig: string;
	export const npm_lifecycle_event: string;
	export const PWD: string;
	export const SSH_ASKPASS: string;
	export const HOME: string;
	export const npm_config_cache: string;
	export const TMP: string;
	export const BROWSER: string;
	export const SSH_AGENT_PID: string;
	export const npm_command: string;
	export const XDG_SESSION_TYPE: string;
	export const BASH_ENV: string;
	export const MATE_DESKTOP_SESSION_ID: string;
	export const npm_config_noproxy: string;
	export const XDG_SESSION_DESKTOP: string;
	export const QT_SCALE_FACTOR: string;
	export const TMPDIR: string;
	export const SYSTEMD_PAGER: string;
	export const npm_config_metrics_registry: string;
	export const npm_config_globalconfig: string;
	export const MAIL: string;
	export const HELP_BROWSER: string;
	export const npm_lifecycle_script: string;
	export const LESSKEY: string;
	export const INIT_CWD: string;
	export const SHELL: string;
	export const VTE_VERSION: string;
	export const TERM: string;
	export const XDG_SESSION_CLASS: string;
	export const XDG_SEAT_PATH: string;
	export const NVM_BIN: string;
	export const XDG_CURRENT_DESKTOP: string;
	export const COLOR: string;
	export const QT_FONT_DPI: string;
	export const SHLVL: string;
	export const XDG_SEAT: string;
	export const G_FILENAME_ENCODING: string;
	export const npm_node_execpath: string;
	export const npm_config_prefix: string;
	export const WINDOWID: string;
	export const npm_config_local_prefix: string;
	export const GDMSESSION: string;
	export const npm_package_version: string;
	export const LOGNAME: string;
	export const DBUS_SESSION_BUS_ADDRESS: string;
	export const XDG_RUNTIME_DIR: string;
	export const XAUTHORITY: string;
	export const XDG_SESSION_PATH: string;
	export const PATH: string;
	export const npm_config_engine_strict: string;
	export const G_BROKEN_FILENAMES: string;
	export const NVM_INC: string;
	export const NODE: string;
	export const HISTSIZE: string;
	export const HISTFILESIZE: string;
	export const SESSION_MANAGER: string;
	export const npm_package_name: string;
	export const LESSOPEN: string;
}

/**
 * Similar to [`$env/static/private`](https://kit.svelte.dev/docs/modules#$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#kit-env-publicprefix) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {

}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/master/packages/adapter-node) (or running [`vite preview`](https://kit.svelte.dev/docs/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#kit-env-publicprefix).
 * 
 * This module cannot be imported into client-side code.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		NVM_DIR: string;
		LS_COLORS: string;
		npm_config_node_gyp: string;
		npm_execpath: string;
		_: string;
		LANG: string;
		LESS: string;
		DISPLAY: string;
		HOSTNAME: string;
		OLDPWD: string;
		EDITOR: string;
		GPG_TTY: string;
		GTK_OVERLAY_SCROLLING: string;
		COLORTERM: string;
		NVM_CD_FLAGS: string;
		npm_config_global_prefix: string;
		npm_package_json: string;
		JAVA_HOME: string;
		npm_config_user_agent: string;
		XDG_VTNR: string;
		GTK3_MODULES: string;
		ZSH: string;
		SSH_AUTH_SOCK: string;
		npm_config_init_module: string;
		XDG_SESSION_ID: string;
		XDG_GREETER_DATA_DIR: string;
		USER: string;
		PAGER: string;
		LSCOLORS: string;
		DESKTOP_SESSION: string;
		npm_config_userconfig: string;
		npm_lifecycle_event: string;
		PWD: string;
		SSH_ASKPASS: string;
		HOME: string;
		npm_config_cache: string;
		TMP: string;
		BROWSER: string;
		SSH_AGENT_PID: string;
		npm_command: string;
		XDG_SESSION_TYPE: string;
		BASH_ENV: string;
		MATE_DESKTOP_SESSION_ID: string;
		npm_config_noproxy: string;
		XDG_SESSION_DESKTOP: string;
		QT_SCALE_FACTOR: string;
		TMPDIR: string;
		SYSTEMD_PAGER: string;
		npm_config_metrics_registry: string;
		npm_config_globalconfig: string;
		MAIL: string;
		HELP_BROWSER: string;
		npm_lifecycle_script: string;
		LESSKEY: string;
		INIT_CWD: string;
		SHELL: string;
		VTE_VERSION: string;
		TERM: string;
		XDG_SESSION_CLASS: string;
		XDG_SEAT_PATH: string;
		NVM_BIN: string;
		XDG_CURRENT_DESKTOP: string;
		COLOR: string;
		QT_FONT_DPI: string;
		SHLVL: string;
		XDG_SEAT: string;
		G_FILENAME_ENCODING: string;
		npm_node_execpath: string;
		npm_config_prefix: string;
		WINDOWID: string;
		npm_config_local_prefix: string;
		GDMSESSION: string;
		npm_package_version: string;
		LOGNAME: string;
		DBUS_SESSION_BUS_ADDRESS: string;
		XDG_RUNTIME_DIR: string;
		XAUTHORITY: string;
		XDG_SESSION_PATH: string;
		PATH: string;
		npm_config_engine_strict: string;
		G_BROKEN_FILENAMES: string;
		NVM_INC: string;
		NODE: string;
		HISTSIZE: string;
		HISTFILESIZE: string;
		SESSION_MANAGER: string;
		npm_package_name: string;
		LESSOPEN: string;
		[key: string]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#kit-env-publicprefix) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: string]: string | undefined;
	}
}
