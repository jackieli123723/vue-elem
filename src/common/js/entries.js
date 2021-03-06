export class Entries {
	constructor ({flag, description, id, image, link, name}) {
		this.flag = flag;
		this.description = description;
		this.id = id;
		this.image = image;
		this.link = link;
		this.name = name;
	}
};

export function createEntries (entriesData) {
	const img = insertStringImgUrl(entriesData.image_hash);
	const link = substrLink(decodeURIComponent(entriesData.link));
	return new Entries({
		flag: entriesData.business_flag,
		description: entriesData.description,
		id: entriesData.id,
		image: `//fuss10.elemecdn.com/${img}.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/`,
		link: link,
		name: entriesData.name
	});
};

function insertStringImgUrl (imgurl) {
	imgurl = imgurl.split('');
	imgurl.splice(1, 0, '/');
	imgurl.splice(4, 0, '/');
	return imgurl.join('');
}

function substrLink (link) {
	let index = link.indexOf('?');
	return link.substring(index + 1);
}
