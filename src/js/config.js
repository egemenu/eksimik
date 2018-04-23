const config = {
	url: {
		main: 'https://eksisozluk.com',
		popular: 'https://eksisozluk.com/basliklar/m/populer',
	},
	handler: {
		first_entry: '#entry-item-list > li:first-of-type',
		entry_list: 'ul.topic-list.partial.mobile>li',
		content: '.content',
		author: '.entry-author',
		date: '.entry-date',
	},
}

export default config