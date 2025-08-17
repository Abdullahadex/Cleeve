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
      productCount: category.products?.length || 0
    }));

    return { data: categoriesWithCount };
  },

  // Custom method to get category tree
  async findTree(ctx) {
    const categories = await strapi.entityService.findMany('api::category.category', {
      filters: {
        isActive: true,
        publishedAt: { $notNull: true },
        parent: { $null: true } // Only root categories
      },
      populate: ['image', 'children', 'children.image'],
      sort: { name: 'asc' }
    });

    return { data: categories };
  }
}));