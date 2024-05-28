<template>
	<Sidebar
		bread="Саҳифаи асосӣ"
		:Icon="Icon"
		breadList="Китобҳо"
		:IconItem="Icon"
		breadListItem="Додани китоб"
		hrefLink="/givebook"
		toLink="/givebook"
		:isSidebar="isSidebar"
		@update:isSidebar="updateSidebar"
	/>
	<div class="w-full px-4 hidden sm:px-6 md:px-8 lg:ps-72 -ml-4 lg:block">
		<div :class="isSidebar ? '-ml-40' : ''">
			<GiveBookTable />
		</div>
	</div>
</template>
<script setup lang="ts">
const Icon = ref(true)
const isSidebar = ref(false)

function updateSidebar(value: any) {
	isSidebar.value = value
}
</script>
<style>
body {
	overflow-x: hidden;
	background: none;
}
</style>
