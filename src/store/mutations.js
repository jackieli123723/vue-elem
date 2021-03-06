import * as types from './mutations-types';
import {saveUserInfo, clearUserInfo} from 'common/js/cache';

export default {
	[types.SET_SELECTED_SHOPPER] (state, shopper) {
		state.selectedShopper = shopper;
	},
	// 加入购物车
	[types.SET_CART_FOODS] (state, food) {
		let cart = state.cartFoods;
		let shop = cart[food.shopid] = cart[food.shopid] || {};
		let category = shop[food.category_id] = shop[food.category_id] || {};
		let item = category[food.item_id] = category[food.item_id] || {};
		let flag = false;

		if (item[food.food_id]) {
			// 多规格多属性商品需要进行拆分
			if (!item[food.food_id]['attrs'].length) {
				item[food.food_id]['count']++;
			} else {
				Object.keys(item).forEach((key) => {
					if (item[key]['attrs'].toString() === food.attrs.toString()) {
						item[key]['count']++;
						flag = true;
					}
				});
				if (!flag) {
					item[food.food_id + '_' + +new Date()] = {
						count: 1,
						food_id: food.food_id + '_' + +new Date(),
						name: food.name,
						price: food.price,
						packing_fee: food.packing_fee,
						stock: food.stock,
						spec: food.spec,
						attrs: food.attrs,
						specfoods: food.specfoods
					};
				}
			}
		} else {
			item[food.food_id] = {
				count: 1,
				food_id: food.food_id,
				name: food.name,
				price: food.price,
				packing_fee: food.packing_fee,
				stock: food.stock,
				spec: food.spec,
				attrs: food.attrs,
				specfoods: food.specfoods
			};
		}
		state.cartFoods = {...cart};
	},
	// 移出购物车
	[types.DECREASE_COUNT] (state, food) {
		let cart = state.cartFoods;
		let shop = cart[food.shopid] || {};
		let category = shop[food.category_id] || {};
		let item = category[food.item_id] || {};
		if (item && item[food.food_id]) {
			if (item[food.food_id]['count'] > 0) {
				item[food.food_id]['count']--;
				if (item[food.food_id]['count'] === 0) {
					// 商品数量为0，则清空当前商品的信息
					delete item[food.food_id];
				}
			}
			state.cartFoods = {...cart};
		}
	},
	// 清空购物车
	[types.EMPTY_CART_FOODS] (state, shopid) {
		state.cartFoods[shopid] = null;
		state.cartFoods = {...state.cartFoods};
	},
	// 选择进入的食品分类目录
	[types.SET_SELECTED_ENTRIES] (state, entries) {
		state.selectedEntries = entries;
	},
	// 设置纬度
	[types.SET_LATITUDE] (state, latitude) {
		state.latitude = latitude;
	},
	// 设置经度
	[types.SET_LONGITUDE] (state, longitude) {
		state.longitude = longitude;
	},
	// 设置geohash
	[types.SET_GEOHASH] (state, geohash) {
		state.geohash = geohash;
	},
	// 设置搜索历史
	[types.SET_SEARCH_HISTORY] (state, searches) {
		state.searchHistory = searches;
	},
	// 设置gps页面的显示和隐藏
	[types.SET_SHOWFLAGGPS] (state, showFlagGPS) {
		state.showFlagGPS = showFlagGPS;
	},
	// 设置登录的用户信息
	[types.SET_USERINFO] (state, userInfo) {
		state.userInfo = userInfo;
		saveUserInfo(userInfo);
	},
	// 清空用户信息
	[types.EMPTY_USERINFO] (state) {
		state.userInfo = null;
		clearUserInfo();
	},
	// 多规格商品只能在购物车中删除的提示
	[types.SET_ALERTTEXT] (state, alertText) {
		state.alertText = alertText;
	},
	[types.SET_HASTIPS] (state, hasTips) {
		state.hasTips = hasTips;
	}
};
