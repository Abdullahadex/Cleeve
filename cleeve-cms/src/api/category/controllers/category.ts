/**
 * category controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::category.category', ({ strapi }) => ({
  // Custom method to get categories with product count
  async findWithProductCount(ctx) {
    const categories = await strapi.entityService.findMany('api::category.category', {
      filters: {
        isActive: true,
        publishedAt: { $notNull: true }
      },
      populate: ['image', 'products', 'children'],
      sort: { name: 'asc' }
    });

    const categoriesWithCount = categories.map(category => ({
      ...category,
      productCount: (category as any).products?.length || 0
    }));

    return { data: categoriesWithCount };
  },

  // Custom method to get category tree
  async findTree(ctx) {
    const categories = await strapi.entityService.findMany('api::category.category', {
      filters: {
        isActive: true,
        publishedAt: { $notNull: true }
      },
      populate: ['image', 'children', 'children.image'],
      sort: { name: 'asc' }
    });

    // Filter root categories manually
    const rootCategories = categories.filter(category => !(category as any).parent);

    return { data: rootCategories };
  }
}));