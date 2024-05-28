<template>
	<div
		class="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200"
	>
		<div
			class="grid items-center justify-center h-full max-w-lg grid-cols-4 mx-auto font-medium lg:flex mt-1"
		>
			<NuxtLink
				to="/mobile/Index"
				class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50"
			>
				<LayoutGrid
					class="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600"
				/>
				<span
					class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600"
					>Асосӣ</span
				>
			</NuxtLink>
			<NuxtLink
				to="/mobile/BookCatalog"
				class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50"
			>
				<LibraryBig
					class="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600"
				/>
				<span
					class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600"
					>Китобҳо</span
				>
			</NuxtLink>
			<NuxtLink
				to="/mobile/Info"
				class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50"
			>
				<Info
					class="w-5 h-5 mb-2 text-blue-600 dark:text-gray-400 group-hover:text-blue-600"
				/>
				<span
					class="text-sm text-blue-600 dark:text-gray-400 group-hover:text-blue-600"
					>Маълумот</span
				>
			</NuxtLink>
			<NuxtLink
				to="/"
				class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50"
			>
				<Power
					class="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600"
				/>
				<span
					class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600"
					>Баромад</span
				>
			</NuxtLink>
		</div>
	</div>

	<div class="mt-2">
		<Accordion type="single" collapsible>
			<AccordionItem value="" :class="cn('border-none')">
				<AccordionTrigger
					:class="
						cn(
							'flex gap-x-2 py-2.5 bg-blue-500 px-2.5 text-sm text-white  rounded-lg '
						)
					"
				>
					<div class="flex">
						<BookOpen class="flex-shrink-0 mt-0.5 size-4" />
						<span class="px-3">Маълумот дар бораи муассиса</span>
					</div>
				</AccordionTrigger>
				<AccordionContent
					:class="
						cn(
							'flex items-center gap-x-3.5 ml-2 py-2 px-2.5 text-sm text-black rounded-lg '
						)
					"
				>
					<div class="flex flex-col bg-white border shadow-sm rounded-xl">
						<div
							class="h-96 overflow-y-auto p-4 md:p-5 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300"
						>
							<h3 class="text-lg font-bold text-gray-800 dark:text-white">
								Маълумотнома дар бораи таъсиси муассисаи таълимӣ
							</h3>
							<p class="mt-2 text-gray-500 dark:text-neutral-400">
								Литсейи Технологии шаҳри Душанбе ҳамчун мактаби киномеханикӣ бо
								қарори Шӯрои Вазирони РСС Тоҷикистон 255- Р аз 11.06.1974 ба
								омӯзишгоҳи касбию техникӣ №57, бо қарори Девони Вазирони
								Ҷумҳурии Тоҷикистон №29 аз 24.04.1992 ба литсейи Техникии рақами
								62 ва аз 12.09.2004 №160 бо фармони Вазорати меҳнат ва ҳифзи
								иҷтимоии аҳолии Ҷумҳурии Тоҷикистон ба литсейи Технологии шаҳри
								Душанбе табдили ном кардаааст. Литсей дар асоси қарори Ҳукумати
								Ҷумҳурии Тоҷикистон аз 17.03.2001 №214 ба сохтори Вазорати
								меҳнат ва ҳифзи иҷтимоии аҳолии Ҷумҳурии Тоҷикистон дохил буд ва
								аз 30 ноябри соли 2006 таҳти Фармони Президенти Ҷумҷурии
								Тоҷикистон №9 «Дар бораи такмили сохтори маќомоти марказии
								Ҳокимияти иҷроияи Ҷумҳурии Тоҷикистон», Қарори хукумати Ҷумҳурии
								Тоҷикистон №594 аз 28 декабри 2006 «Дар бораи Вазорати маорифи
								Љумњурии Тоҷикистон», муассисањои таҳсилоти ибтидоии касбии
								Ҷумҳурии Тоҷикистон ба тобеияти Вазорати маорифи Ҷумҳурии
								Тоҷикистон дохил карда шудааст.
							</p>
							<p class="mt-2 text-gray-500 dark:text-neutral-400">
								Литсейи Технологии шаҳри Душанбе иҷозатномаи Вазорати маорифи
								Ҷумҳурии Тоҷикистон- ро оид ба пешбурди фаъолияти таълимӣ бо
								силсилаи АУ №000190 аз 29.12.2005 дошт ва аз рўи ихтисосҳои
								«Ҳисобчӣ», «Оператори компютер», «Бурранда», «Механики барқӣ оид
								ба таљњизоти сардкунандаи савдо», «Сартарош» мутахассисони
								ибтидоии касбиро тайёр менамуд. Мутобиқи қарори Ҳукумати
								Ҷумҳурии Тоҷикистон аз 02.11.2012 таҳти №630 дар заминаи литсейи
								Технологии шаҳри Душанбе Муассисаи давлатии таълимии коллеҷи
								технологии шањри Душанбе табдили ном шуда (ташкил шуда), дар
								асоси Кониститутсияи Ҷумҳурии Тоҷикистон Қонунҳои Ҷумҳурии
								Тоҷикистон «Дар бораи маориф», «Дар бораи тањсилоти миёнаи
								касбӣ», «Низомномаи намунавии муассисаи таҳсилоти миёнаи касбии
								Ҷумҳурии Тоҷикистон», «Оиннома», қарорњои Ҳукумати Ҷумҳурии
								Тоҷикистон, қарорҳои мушовараҳои Вазорати маориф ва илми
								Ҷумҳурии Тоҷикистон, фармоишњои Вазири маориф ва илми Ҷумҳурии
								Тоҷикистон ва дигар санадҳои меъёрию ҳуқуқие, ки фаъолияти
								муассисаҳои таълимиро ба танзим медарорад, фаъолият намуда
								истодааст. Оид ба ҳуқуқи пешбурди фаъолияти таълимӣ бо фармоиши
								Вазири маориф ва илми Ҷумҳурии Тоҷикистон аз 07.12.2015, №4188
								Иҷозатнома таҳти №0001973 ва замима ба иҷозатномаи мазкур ба
								имзо расидааст.
							</p>
						</div>
					</div>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	</div>

	<div class="mt-2">
		<Accordion type="single" collapsible>
			<AccordionItem value="" :class="cn('border-none')">
				<AccordionTrigger
					:class="
						cn(
							'flex gap-x-2 py-2.5 bg-blue-500 px-2.5 text-sm text-white  rounded-lg '
						)
					"
				>
					<div class="flex">
						<BookOpen class="flex-shrink-0 mt-0.5 size-4" />
						<span class="px-3">Маълумот дар бораи барнома</span>
					</div>
				</AccordionTrigger>
				<AccordionContent
					:class="
						cn(
							'flex items-center gap-x-3.5 ml-2 py-2 px-2.5 text-sm text-black rounded-lg '
						)
					"
				>
					<div class="flex flex-col bg-white border shadow-sm rounded-xl">
						<div
							class="h-48 overflow-y-auto p-4 md:p-5 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300"
						>
							<h3 class="text-lg font-bold text-gray-800">
								Маълумотнома дар бораи барнома
							</h3>
							<p class="mt-2 text-gray-500 dark:text-neutral-400">
								Барнома аз тарафи донишҷуӣ Сафаров Исмоил курси 4-уми Донишгоҳи
								байналмалалии сайёҳӣ ва соҳибикории Тоҷикистон факултаи
								Технологияҳои рақами ва менеҷмент сохта шудааст.
							</p>
						</div>
					</div>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	</div>
</template>

<script setup lang="ts">
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/utils'
import { Info, LayoutGrid, LibraryBig, Power } from 'lucide-vue-next'
</script>

<style>
body {
	background: #f4f6f5;
}
</style>
