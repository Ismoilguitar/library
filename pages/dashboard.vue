<template>
	<Sidebar
		href="/dashboard"
		bread="Саҳифаи асосӣ"
		toLink="/"
		:isSidebar="isSidebar"
		@update:isSidebar="updateSidebar"
	/>
	<div class="w-full px-4 hidden sm:px-6 md:px-8 lg:ps-72 -ml-4 lg:block">
		<div
			:class="
				cn(
					'max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto',
					isSidebar ? '-ml-40' : ''
				)
			"
		>
			<div class="grid sm:grid-cols-2 lg:grid-cols-4 items-center gap-2 ml-16">
				<div>
					<div
						class="relative flex justify-center items-center size-12 bg-white rounded-xl before:absolute before:-inset-px before:-z-[1] before:bg-gradient-to-br before:from-blue-600 before:via-transparent before:to-violet-600 before:rounded-xl dark:bg-neutral-900"
					>
						<BookOpen
							class="flex-shrink-0 size-6 text-blue-600 dark:text-blue-500"
						/>
					</div>
					<div class="mt-5">
						<Popover>
							<PopoverTrigger as-child>
								<Button variant="outline"> Китобҳо </Button>
							</PopoverTrigger>
							<PopoverContent class="w-80">
								<div class="grid gap-4">
									<div class="space-y-2">
										<h4 class="font-medium leading-none">Маълумот</h4>
										<p class="text-sm text-muted-foreground">
											<b>Каталоги китобҳо</b>-Ҷадвали китобҳо, бақайдгирии
											китобҳо ва несткунии китобҳо
										</p>
										<p class="text-sm text-muted-foreground">
											<b>Додани китобҳо</b>-Ҷадвали додадни китобҳо, бақайдгирии
											китобҳо, таҳрири китобҳо ва несткунии китобҳо
										</p>
										<p class="text-sm text-muted-foreground">
											<b>Бозгашти китобҳо</b>-Ҷадвали додани китобҳо, аз вақт
											санаи бақайдгири ва бозгашт
										</p>
									</div>
								</div>
							</PopoverContent>
						</Popover>
					</div>
				</div>

				<div>
					<div
						class="relative flex justify-center items-center size-12 bg-white rounded-xl before:absolute before:-inset-px before:-z-[1] before:bg-gradient-to-br before:from-blue-600 before:via-transparent before:to-violet-600 before:rounded-xl dark:bg-neutral-900"
					>
						<Info class="flex-shrink-0 size-6 text-blue-600" />
					</div>
					<div class="mt-5">
						<Popover>
							<PopoverTrigger as-child>
								<Button variant="outline"> Маълумот </Button>
							</PopoverTrigger>
							<PopoverContent class="w-80">
								<div class="grid gap-4">
									<div class="space-y-2">
										<h4 class="font-medium leading-none">Дар бораи барнома</h4>
										<p class="text-sm text-muted-foreground">
											Барнома аз тарафи донишҷуӣ Сафаров Исмоил курси 4-уми
											Донишгоҳи байналмалалии сайёҳӣ ва соҳибикории Тоҷикистон
											факултаи Технологияҳои рақами ва менеҷмент сохта шудааст.
										</p>
									</div>
								</div>
							</PopoverContent>
						</Popover>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { cn } from '@/utils'
import { BookOpen, Info } from 'lucide-vue-next'
const isSidebar = ref(false)

function updateSidebar(value: any) {
	isSidebar.value = value
}
</script>
<style>
body {
	background: none;
}
</style>
