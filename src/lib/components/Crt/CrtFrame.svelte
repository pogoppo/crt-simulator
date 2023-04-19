<script lang="ts">
	import CrtScreen from '$lib/components/Crt/CrtScreen.svelte';
	import { mainImage } from '$lib/stores/crt-options';
</script>

<div class="CrtFrame">
	<div class="CrtFrame__frame-inner">
		<CrtScreen mainImage={$mainImage} />
	</div>

	<!-- 発光エフェクト -->
	<overlay-effect class="CrtFrame__effect-luminance" />
	<overlay-effect class="CrtFrame__effect-luminance --animate" />
</div>

<style lang="scss">
	.CrtFrame {
		position: relative;
		overflow: hidden;
		height: calc(100vh - 32px);
		aspect-ratio: 1.538/1;
		margin: 16px auto;
		&::after {
			content: '';
			display: block;
			position: absolute;
			top: 0;
			width: 100%;
			height: 100%;
			background-image: url('/images/crt-frame.png');
			background-size: cover;
			background-position: center;
			filter: brightness(0.75);
			pointer-events: none;
		}
	}

	.CrtFrame {
		&__frame-inner {
			position: relative;
			top: 13%;
			left: 8.5%;
			height: 72%;
			aspect-ratio: 4/3;
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

	.CrtFrame {
		&__effect-luminance {
			z-index: 4;
			width: auto;
			aspect-ratio: 4/3;
			mask-image: url('/images/crt-frame.png');
			mask-size: cover;
			-webkit-mask-image: url('/images/crt-frame.png');
			-webkit-mask-size: cover;
			background-image: radial-gradient(
				closest-corner,
				rgb(133, 166, 182) 0%,
				rgba(0, 0, 0, 0) 70%,
				rgba(0, 0, 0, 0) 100%
			);
			filter: blur(32px);
			mix-blend-mode: plus-lighter;
			&.--animate {
				animation: luminance-effect 0.2s linear 0s infinite;
			}
		}
	}
	@keyframes luminance-effect {
		0% {
			opacity: 0;
		}
		50%,
		100% {
			opacity: 0.1;
		}
	}
</style>
