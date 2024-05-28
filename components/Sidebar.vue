<template>
	<div
		:class="
			cn(
				'[--auto-close:lg]  -translate-x-full transition-all duration-300 transform hidden fixed inset-y-0 start-0 z-[60] bg-blue-600 border-e border-blue-400 lg:block lg:translate-x-0 lg:end-auto lg:bottom-0',
				isSidebar ? 'w-[100px]' : 'w-[260px]'
			)
		"
	>
		<div class="px-8 pt-4">
			<div class="-ml-3">
				<Button
					:class="cn('text-white hover:bg-blue-500 hover:text-white')"
					variant="ghost"
					@click="toggleSidebar"
				>
					<ArrowRightToLine class="size-4" />
				</Button>
			</div>
		</div>

		<nav class="p-6 w-full flex flex-col flex-wrap">
			<ul class="space-y-1.5">
				<div v-for="item in MenuItems" :key="item.to">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger as-child>
								<NuxtLink
									:to="item.to"
									:class="
										cn(
											'flex items-center text-white w-fit gap-x-3.5 py-2 px-2.5 cursor-pointer text-sm  rounded-lg hover:bg-blue-500',
											!isSidebar ? 'w-full' : 'w-10',
											href === item.to ? 'bg-blue-500' : ''
										)
									"
								>
									<LayoutDashboard
										class="flex-shrink-0 size-4"
										v-if="item.name == 'Саҳифаи асосӣ'"
									/>
									<BookOpen
										class="flex-shrink-0 size-4"
										v-if="item.name == 'Китобҳо'"
									/>
									<LogOut
										class="flex-shrink-0 size-4"
										v-if="item.name == 'Баромад'"
									/>
									<div v-if="!isSidebar">{{ item.name }}</div>
								</NuxtLink>
							</TooltipTrigger>
							<TooltipContent
								side="left"
								class="ml-10 bg-blue-500"
								v-if="isSidebar"
							>
								<p>{{ item.name }}</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
				<Accordion type="single" collapsible>
					<AccordionItem value="" :class="cn('border-none')">
						<AccordionTrigger
							@click="Active"
							:class="
								cn(
									'flex gap-x-2 py-2.5 px-2.5 text-sm text-white  rounded-lg hover:bg-blue-500',
									!isActive ? 'text-white' : ''
								)
							"
						>
							<div class="flex">
								<BookOpen class="flex-shrink-0 mt-0.5 size-4" />
								<span class="px-3" v-if="!isSidebar">Китобҳо</span>
							</div>
						</AccordionTrigger>
						<NuxtLink
							v-for="items in accordItem"
							:key="items.to"
							:to="items.to"
						>
							<AccordionContent
								:class="
									cn(
										'flex items-center gap-x-3.5 ml-2 py-2 px-2.5 text-sm text-white rounded-lg hover:bg-blue-500',
										toLink === items.to ? 'bg-blue-400' : ''
									)
								"
							>
								<Book
									class="mt-0.5 size-4"
									v-if="items.name == 'Каталоги китобҳо'"
								/>
								<BookText
									class="mt-0.5 size-4"
									v-if="items.name == 'Додани китоб'"
								/>
								<BookCopy
									class="mt-0.5 size-4"
									v-if="items.name == 'Бозгашти китоб'"
								/>
								<span class="text-[12px]" v-if="!isSidebar">{{
									items.name
								}}</span>
							</AccordionContent>
						</NuxtLink>
					</AccordionItem>
				</Accordion>
			</ul>
		</nav>
	</div>
	<div class="w-full px-4 hidden sm:px-6 md:px-8 lg:ps-72 -ml-4 lg:block">
		<Breadcrumb class="p-3" :class="cn(isSidebar ? '-ml-40 transition' : '')">
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink :href="href"> {{ bread }} </BreadcrumbLink>
				</BreadcrumbItem>
				<div v-if="Icon">
					<BreadcrumbSeparator />
				</div>

				<BreadcrumbItem>
					<BreadcrumbLink :href="hrefList"> {{ breadList }} </BreadcrumbLink>
				</BreadcrumbItem>
				<div v-if="IconItem">
					<BreadcrumbSeparator />
				</div>
				<BreadcrumbItem>
					<BreadcrumbLink :href="hrefLink">
						{{ breadListItem }}
					</BreadcrumbLink>
				</BreadcrumbItem>
				<div v-if="linkItem">
					<BreadcrumbSeparator />
				</div>
				<BreadcrumbItem>
					<BreadcrumbLink :href="ListItemHref">
						{{ ListItemLink }}
					</BreadcrumbLink>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	</div>
</template>
<script setup lang="ts">
const props = defineProps({
	href: String,
	bread: String,
	breadList: String,
	breadListItem: String,
	Icon: Boolean,
	Link: String,
	hrefLink: String,
	hrefList: String,
	IconItem: Boolean,
	toLink: String,
	ListItemLink: String,
	linkItem: Boolean,
	ListItemHref: String,
	isSidebar: Boolean,
})
const emit = defineEmits(['update:isSidebar'])
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/utils'
import {
	ArrowRightToLine,
	Book,
	BookCopy,
	BookOpen,
	BookText,
	LayoutDashboard,
	LogOut,
} from 'lucide-vue-next'
const isActive = ref(false)
function toggleSidebar() {
	emit('update:isSidebar', !props.isSidebar)
}
const Active = () => {
	isActive.value = !isActive.value
}
const accordItem = [
	{
		Icon: Book,
		name: 'Каталоги китобҳо',
		to: '/catalog',
	},
	{
		Icon: BookText,
		name: 'Додани китоб',
		to: '/givebook',
	},
	{
		Icon: BookCopy,
		name: 'Бозгашти китоб',
		to: '/returnbook',
	},
]
const MenuItems = [
	{
		to: '/dashboard',
		name: 'Саҳифаи асосӣ',
	},
	{
		to: '/',
		name: 'Баромад',
	},
]
</script>
