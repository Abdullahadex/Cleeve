// Script to add products directly via Strapi API
const STRAPI_URL = 'http://localhost:1337';

async function addProductsViaAPI() {
  try {
    console.log('Attempting to add products via API...');
    
    // First, let's check if we can access the admin panel
    const adminResponse = await fetch(`${STRAPI_URL}/admin`);
    console.log('Admin panel accessible:', adminResponse.ok);
    
    // Check current products
    const productsResponse = await fetch(`${STRAPI_URL}/api/products?populate=*`);
    const productsData = await productsResponse.json();
    console.log('Current products:', productsData);
    
    // Since we can't add products via API without authentication,
    // let's provide manual instructions
    console.log('\n🔧 MANUAL SOLUTION REQUIRED:');
    console.log('\n1. Open your browser and go to: http://localhost:1337/admin');
    console.log('2. Create an admin account (if this is your first time)');
    console.log('3. Navigate to Content Manager → Product');
    console.log('4. Click "Create new entry"');
    console.log('\n📝 Add this product:');
    console.log('   Name: "Cleeve Essential T-Shirt"');
    console.log('   Price: 44.99');
    console.log('   Description: "Premium cotton essential t-shirt"');
    console.log('   Featured: ✅ Check this box');
    console.log('   Images: Upload cl(1).jpeg from public/cleeve photos/');
    console.log('   Save and Publish');
    
    console.log('\n5. Repeat for more products:');
    console.log('   - "Cleeve Sport Set" ($54.99) - Upload cl1 (2).jpeg');
    console.log('   - "Cleeve Professional Blazer" ($79.99) - Upload cl1 (3).jpeg');
    
    console.log('\n6. After adding products, test the API:');
    console.log('   curl http://localhost:1337/api/products?populate=*');
    
  } catch (error) {
    console.error('Error:', error);
  }
}

addProductsViaAPI();