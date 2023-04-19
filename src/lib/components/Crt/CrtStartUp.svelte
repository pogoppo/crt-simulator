<script lang="ts">
	import { mainImage, onMainImageFileSelected } from '$lib/stores/crt-options';

	function setExampleImage() {
		mainImage.set(`/example.gif`);
	}
</script>

<div class="CrtStartUp">
	{#if $mainImage}
		<label class="CrtStartUp__startup-button --change">
			画像ファイルを変更
			<input type="file" on:change={onMainImageFileSelected} accept="image/*" />
		</label>
	{:else}
		<label class="CrtStartUp__startup-button">
			画像ファイルを選択して開始
			<input type="file" on:change={onMainImageFileSelected} accept="image/*" />
		</label>
		<p>または</p>
		<button class="CrtStartUp__start-example" on:click={setExampleImage}>
			お試し用GIF画像を使って開始
		</button>
		<a class="CrtStartUp__example-image-link" href="/example.gif" target="_blank">
			元画像はこちら
		</a>
	{/if}
</div>

<style lang="scss">
	.CrtStartUp {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 12px;
		width: 100%;
		height: 100%;
		color: var(--color-bg);
		font-size: min(max(3vh, 18px), 24px);
		font-weight: bold;
	}
	.CrtStartUp {
		&__startup-button,
		&__start-example {
			display: flex;
			justify-content: center;
			padding: 8px 32px;
			background-color: var(--color-bg);
			border-radius: 64px;
			color: var(--color-font-default);
			font-size: min(max(3.75vh, 20px), 28px);
			font-weight: normal;
			cursor: pointer;
		}
		&__startup-button > input {
			display: none;
		}
		&__example-image-link {
			color: inherit;
			text-decoration: underline;
			text-underline-offset: 6px;
		}
	}
</style>
