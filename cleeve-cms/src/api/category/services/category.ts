/**
 * category service
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreService('api::category.category', ({ strapi }) => ({
  // Custom service method to get categories with active products
  async findWithActiveProducts() {
    const categories = await strapi.entityService.findMany('api::category.category', {
      filters: {
        isActive: true,
        publishedAt: { $notNull: true }
      },
      populate: {
        image: true,
        products: {
          filters: {
            isActive: true,
            publishedAt: { $notNull: true }
          }
        }
      },
      sort: { name: 'asc' }
    });

    return categories.filter(category => (category as any).products?.length > 0);
  },

  // Custom service method to get category breadcrumbs
  async getBreadcrumbs(categoryId: number) {
    const breadcrumbs = [];
    let currentCategory = await strapi.entityService.findOne('api::category.category', categoryId, {
      populate: ['parent']
    });

    while (currentCategory) {
      breadcrumbs.unshift({
        id: currentCategory.id,
        name: currentCategory.name,
        slug: (currentCategory as any).slug
      });
      
      if ((currentCategory as any).parent) {
        currentCategory = await strapi.entityService.findOne('api::category.category', (currentCategory as any).parent.id, {
          populate: ['parent']
        });
      } else {
        break;
      }
    }

    return breadcrumbs;
  }
}));