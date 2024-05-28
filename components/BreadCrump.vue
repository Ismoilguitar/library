<template>
	<Breadcrumb class="p-3">
		<BreadcrumbList>
			<BreadcrumbItem>
				<BreadcrumbLink href="/"> {{bread}} </BreadcrumbLink>
			</BreadcrumbItem>
			<div v-if="Icon">
				<BreadcrumbSeparator />
			</div>

			<BreadcrumbItem>
				<BreadcrumbLink :href="href"> {{ breadlist }} </BreadcrumbLink>
			</BreadcrumbItem>
		</BreadcrumbList>
	</Breadcrumb>
</template>
<script setup lang="ts">
defineProps({
	bread: String,
	breadlist: String,
	Icon: String,
	href: String,
})
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
</script>
