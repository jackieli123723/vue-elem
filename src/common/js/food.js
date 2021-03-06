export class Food {
	constructor ({shopid, category_id, item_id, food_id, name, price, count, packing_fee, stock, spec, attrs, specfoods}) {
		this.shopid = shopid;
		this.category_id = category_id;
		this.item_id = item_id;
		this.food_id = food_id;
		this.name = name;
		this.price = price;
		this.count = count;
		this.packing_fee = packing_fee;
		this.stock = stock;
		this.spec = spec;
		this.attrs = attrs;
		this.specfoods = specfoods;
	}
};

export function createFood (foodData) {
	if (foodData.activity && foodData.activity.is_price_changed) {
		foodData.price = foodData.specfoods[0].original_price;
	} else {
		foodData.price = foodData.specfoods[0].price;
	};

	let spec = '';
	// 如果选中的是规格商品
	if (foodData.specifications && foodData.specifications.length && foodData.specIndex >= 0) {
		spec = foodData.specifications[0].values[foodData.specIndex];
		foodData.price = foodData.specfoods[foodData.specIndex].price;
	} else {
		foodData.specIndex = 0;
	};

	let attrs = [];
	if (foodData.specAttrIndex && foodData.attrs.length) {
		foodData.attrs.forEach((item, attrIndex) => {
			attrs.push(item.values[foodData.specAttrIndex[attrIndex].index]);
		});
	}
	return new Food({
		shopid: foodData.shopid,
		category_id: foodData.category_id,
		item_id: foodData.item_id,
		food_id: foodData.food_id ? foodData.food_id : foodData.specfoods[foodData.specIndex].food_id,
		name: foodData.name,
		price: foodData.price,
		count: foodData.count,
		packing_fee: foodData.specfoods[foodData.specIndex].packing_fee,
		stock: foodData.specfoods[foodData.specIndex].stock,
		spec,
		attrs: attrs.length > 0 ? attrs : foodData.attrs,
		specfoods: foodData.specfoods
	});
}
