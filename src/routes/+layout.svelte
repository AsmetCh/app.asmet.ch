<script lang="ts">
	import { page } from '$app/state';
	import { locales, setLocale, getTextDirection } from '#lib/paraglide/runtime.js';
	import { getActiveLocale } from '#lib/i18n.svelte.js';
	import './layout.css';
	import DemoLinks from './demo/DemoLinks.svelte';
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';
	import * as Breadcrumb from '#lib/components/ui/breadcrumb/index.js';
	import * as Sidebar from '#lib/components/ui/sidebar/index.js';
	import { Separator } from '#lib/components/ui/separator/index.js';
	import AppSidebar from '#lib/components/app-sidebar.svelte';

	let { children }: LayoutProps = $props();

	$effect(() => {
		const locale = getActiveLocale();
		document.documentElement.lang = locale;
		document.documentElement.dir = getTextDirection(locale);
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Sidebar.Provider style="--sidebar-width: 350px;">
	<AppSidebar />
	<Sidebar.Inset>
		<header class="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
			<Sidebar.Trigger class="-ms-1" />
			<Separator orientation="vertical" class="me-2 data-vertical:h-4 data-vertical:self-auto" />
			<Breadcrumb.Root>
				<Breadcrumb.List>
					<Breadcrumb.Item>
						<Breadcrumb.Page>{page.url.pathname}</Breadcrumb.Page>
					</Breadcrumb.Item>
				</Breadcrumb.List>
			</Breadcrumb.Root>
			<div class="ms-auto flex items-center gap-1">
				{#each locales as locale (locale)}
					<button
						type="button"
						class={[
							'rounded-md px-2 py-1 text-xs uppercase',
							locale === getActiveLocale()
								? 'bg-accent text-accent-foreground'
								: 'text-muted-foreground hover:bg-accent/50'
						]}
						aria-current={locale === getActiveLocale()}
						onclick={() => setLocale(locale)}
					>
						{locale}
					</button>
				{/each}
			</div>
		</header>
		<div class="flex flex-1 flex-col gap-4 p-4">
			{@render children()}
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
<DemoLinks />
