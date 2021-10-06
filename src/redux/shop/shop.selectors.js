import { createSelector } from 'reselect';

const selectShop = state => state.shop;

export const selectShopItems = createSelector(
    [selectShop],
    shop => shop.collections
);

export const selectCategoryForPreview = createSelector(
    [selectShopItems],
    collections => Object.keys(collections).map(key => collections[key])
)

export const seletCategory = categoryId => createSelector(
    [selectShopItems],
    collections => collections[categoryId]
);