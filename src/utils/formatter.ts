export const formatText = (text: string) => {
	let html = text;

	// Заголовки
	html = html.replace(
		/^# (.*$)/gim,
		'<h1 class="text-4xl font-bold mb-4 max-[325px]:text-[30px]">$1</h1>'
	);
	html = html.replace(
		/^## (.*$)/gim,
		'<h2 class="text-3xl font-bold mb-3 max-[325px]:text-[27px]">$1</h2>'
	);
	html = html.replace(
		/^### (.*$)/gim,
		'<h3 class="text-2xl font-bold mb-2">$1</h3>'
	);

	// Списки
	html = html.replace(/^- (.*$)/gim, '<li class="ml-4">$1</li>');
	html = html.replace(
		/(<li>.*<\/li>)/gims,
		'<ul class="my-3 space-y-1">$1</ul>'
	);

	// Цитаты
	html = html.replace(
		/^> (.*$)/gim,
		'<blockquote class="border-l-4 border-[var(--line-color)] pl-4 py-2 my-3 italic">$1</blockquote>'
	);

	// Ссылки
	html = html.replace(
		/\[(.*?)\]\((.*?)\)/g,
		'<a href="$2" target="_blank" class="text-green-400 hover:underline">$1</a>'
	);

	// Картинки
	html = html.replace(
		/!\((.*?)\)\((.*?)\)/g,
		'<img src="$2" alt="$1" class="w-full object-cover mx-auto rounded-lg my-4 border border-[var(--line-color)]"/>'
	);

	// Квадратики (badges)
	html = html.replace(
		/\{!(.*?)\}/g,
		'<span class="bg-blue-500 text-white px-2 py-1 rounded text-sm mx-1">$1</span>'
	);

	// Блок кода
	html = html.replace(
		/```(.*?)```/gims,
		'<code class="bg-[var(--bg)] border border-[var(--line-color)] px-2 py-1 rounded font-mono text-sm">$1</code>'
	);

	// Текстовые стили
	html = html.replace(
		/\*\*(.*?)\*\*/g,
		'<strong class="font-bold">$1</strong>'
	);
	html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');

	// Разделитель
	html = html.replace(/---/g, '<hr class="-mt-6 border-[var(--line-color)]"/>');

	// Переносы строк
	html = html.replace(/\n/g, '<br/>');

	return html;
};