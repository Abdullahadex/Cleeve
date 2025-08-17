/**
 * product service
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreService('api::product.product', ({ strapi }) => ({
  // Custom service method to get products with inventory
  async findWithInventory() {
    const products = await strapi.entityService.findMany('api::product.product', {
      filters: {
        isActive: true,
        publishedAt: { $notNull: true }
      },
      populate: ['images', 'category'],
      sort: { createdAt: 'desc' }
    });

    return products.map(product => ({
      ...product,
      inStock: product.inventory > 0,
      stockStatus: product.inventory > 0 ? 'In Stock' : 'Out of Stock'
    }));
  },

  // Custom service method to update inventory
  async updateInventory(productId: number, quantity: number) {
    const product = await strapi.entityService.findOne('api::product.product', productId);
    
    if (!product) {
      throw new Error('Product not found');
    }

    const newInventory = Math.max(0, product.inventory - quantity);
    
    return await strapi.entityService.update('api::product.product', productId, {
      data: { inventory: newInventory }
    });
  },

  // Custom service method to get low stock products
  async findLowStock(threshold = 10) {
    return await strapi.entityService.findMany('api::product.product', {
      filters: {
        inventory: { $lte: threshold },
        isActive: true,
        publishedAt: { $notNull: true }
      },
      populate: ['images', 'category'],
      sort: { inventory: 'asc' }
    });
  }
}));