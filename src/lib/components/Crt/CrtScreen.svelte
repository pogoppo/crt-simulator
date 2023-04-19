<script lang="ts">
	import CrtStartUp from '$lib/components/Crt/CrtStartUp.svelte';

	export let mainImage: string | undefined = undefined;
	const blankImage = 'data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=';

	function toggle(node: Element, params: any) {
		const existingTransform = getComputedStyle(node).transform.replace('none', '');

		return {
			delay: params.delay || 100,
			duration: params.duration || 200,
			css: (t: number) => `transform: ${existingTransform} scaleY(${t})`
		};
	}
</script>

<div class="CrtScreen" style={`--main-image-path: url('${mainImage ?? blankImage}')`}>
	{#if mainImage}
		<img
			class="CrtScreen__image-main"
			src={mainImage ?? blankImage}
			alt=""
			in:toggle={{ delay: 100, duration: 200 }}
		/>

		<!-- 映像エフェクト -->
		<overlay-effect class="CrtScreen__effect-flicker" in:toggle={{ delay: 150, duration: 200 }} />
		<overlay-effect class="CrtScreen__effect-glitch" in:toggle={{ delay: 200, duration: 200 }} />
		<overlay-effect class="CrtScreen__effect-wave" in:toggle={{ delay: 250, duration: 200 }} />
	{/if}

	<!-- 画像選択フォーム -->
	<div class="CrtScreen__startup-wrapper" data-hide={mainImage ? 'true' : 'false'}>
		<CrtStartUp />
	</div>

	<!-- 映像エフェクト -->
	<overlay-effect class="CrtScreen__effect-vintage" />
	<overlay-effect class="CrtScreen__effect-vintage2" />
	<overlay-effect class="CrtScreen__effect-line" />

	<!-- ライティング -->
	<overlay-effect class="CrtScreen__effect-env" />
	<overlay-effect class="CrtScreen__effect-shade" />
	<overlay-effect class="CrtScreen__effect-highlight" />
</div>

<style lang="scss">
	.CrtScreen {
		position: relative;
		width: 100%;
		height: 100%;
		background-color: rgb(150, 150, 150);
	}

	.CrtScreen {
		&__startup-wrapper {
			width: 100%;
			height: 100%;
			&[data-hide='true'] {
				position: absolute;
				top: 5%;
				height: fit-content;
				.CrtScreen:not(:hover) & {
					display: none;
				}
			}
		}
	}

	overlay-effect {
		display: block;
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		pointer-events: none;
	}

	.CrtScreen {
		&__image-main,
		&__effect-flicker,
		&__effect-glitch,
		&__effect-wave {
			width: 100%;
			height: 110%;
			translate: 0 -5%;
			scale: 1 0.91;
		}

		&__image-main {
			display: block;
			object-fit: cover;
			filter: grayscale(1) blur(1px) contrast(1.5);
			pointer-events: none;
			user-select: none;
		}

		&__effect-flicker,
		&__effect-glitch,
		&__effect-wave {
			background-image: var(--main-image-path);
			background-size: cover;
			background-position: center;
		}

		&__effect-flicker {
			transform: translateX(8px);
			opacity: 0.1;
			filter: grayscale(1) blur(2px) contrast(1.5);
		}

		&__effect-glitch {
			transform: translateX(0);
			mask-image: url('/images/glitch-effect.svg');
			mask-size: 100%;
			-webkit-mask-image: url('/images/glitch-effect.svg');
			-webkit-mask-size: 100%;
			animation: glitch-effect 0.4s ease-out 0s infinite, glitch-effect2 2s linear 0s infinite;
			filter: grayscale(1) blur(2px) contrast(1.5);
		}
		&__effect-wave {
			transform: translateX(12px);
			mask-image: url('/images/wave-effect.svg');
			mask-size: 100%;
			mask-repeat: no-repeat;
			-webkit-mask-image: url('/images/wave-effect.svg');
			-webkit-mask-size: 100%;
			-webkit-mask-repeat: no-repeat;
			animation: wave-effect 5s linear 0s infinite;
			filter: grayscale(1) blur(1px) brightness(0.95) contrast(200%);
		}
		&__effect-vintage {
			background-color: rgb(11, 158, 207);
			opacity: 0.2;
		}

		&__effect-vintage2 {
			background-color: rgb(82, 135, 184);
			mix-blend-mode: soft-light;
			opacity: 0.75;
		}

		&__effect-line {
			background-image: linear-gradient(
				0deg,
				rgba(0, 0, 0, 1) 0%,
				rgba(0, 0, 0, 1) 50%,
				rgba(255, 255, 255, 1) 50%,
				rgba(255, 255, 255, 1) 100%
			);
			background-position: 0 0;
			background-size: 4px 4px;
			mix-blend-mode: soft-light;
		}

		&__effect-env {
			background-image: linear-gradient(200deg, rgba(255, 255, 255, 1) 0%, rgba(0, 0, 0, 1) 100%);
			mix-blend-mode: plus-lighter;
			opacity: 0.5;
		}
		&__effect-shade {
			background-image: radial-gradient(
				farthest-side,
				rgba(255, 255, 255, 1) 0%,
				rgba(255, 255, 255, 1) 50%,
				rgba(0, 0, 0, 0.95) 100%
			);
			scale: 1.25;
			opacity: 0.5;
			mix-blend-mode: multiply;
		}
		&__effect-highlight {
			top: 4%;
			left: 5%;
			width: 90%;
			height: 20%;
			background-image: linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 1) 100%);
			border-radius: 30% 30% 0 0;
			opacity: 0.05;
			filter: blur(2px);
			mix-blend-mode: plus-lighter;
		}
	}

	@keyframes glitch-effect {
		0%,
		25% {
			transform: translateX(0);
		}
		50%,
		100% {
			transform: translateX(8px);
		}
	}
	@keyframes glitch-effect2 {
		0% {
			mask-position: 0% 0%;
			-webkit-mask-position: 0% 0%;
		}
		100% {
			mask-position: 0% 100%;
			-webkit-mask-position: 0% 100%;
		}
	}
	@keyframes wave-effect {
		0%,
		60% {
			mask-position: 0% -100%;
			-webkit-mask-position: 0% -100%;
		}
		100% {
			mask-position: 0% 1000%;
			-webkit-mask-position: 0% 1200%;
		}
	}
</style>
