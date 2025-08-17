# Image Display Debug Guide

## Current Status
✅ Strapi CMS is running on http://localhost:1337
✅ Next.js frontend is running on http://localhost:3000
✅ API endpoints are publicly accessible
✅ CORS is configured properly
✅ Next.js image domains are configured

## Steps to Test Image Display

### 1. Add a Test Product
1. Go to http://localhost:1337/admin
2. Create an admin account (if first time)
3. Navigate to Content Manager → Product
4. Click "Create new entry"
5. Fill in the details:
   - **Name**: "Test Product"
   - **Price**: 29.99
   - **Description**: "A test product for image debugging"
   - **Featured**: ✅ Check this box
   - **Images**: Upload one of your product images (cl1.jpeg, cl1 (2).jpeg, etc.)
6. Click "Save" then "Publish"

### 2. Test the API Response
Run this command to see the product data:
```bash
curl -s "http://localhost:1337/api/products?populate=*" | head -50
```

You should see something like:
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "name": "Test Product",
        "price": 29.99,
        "images": {
          "data": [
            {
              "id": 1,
              "attributes": {
                "url": "/uploads/image_name.jpg",
                "name": "image_name.jpg"
              }
            }
          ]
        }
      }
    }
  ]
}
```

### 3. Check Frontend Debug Info
1. Go to http://localhost:3000
2. Open browser developer tools (F12)
3. Look at the debug section on the page
4. Check the console for logs

### 4. Test Image URL Construction
The helper function `getProductImageUrl()` should construct URLs like:
- `http://localhost:1337/uploads/image_name.jpg`

### 5. Common Issues and Solutions

#### Issue: Images show as broken
**Solution**: Check if the image URL is correct in browser dev tools

#### Issue: CORS errors in console
**Solution**: The CORS configuration should handle this, but check browser console

#### Issue: Images don't load from Strapi
**Solution**: 
1. Verify the image file exists in Strapi uploads folder
2. Check if the URL path is correct
3. Ensure the image was properly uploaded

### 6. Manual Image URL Test
Try accessing the image directly in your browser:
`http://localhost:1337/uploads/your_image_name.jpg`

If this works, the issue is in the frontend code.
If this doesn't work, the issue is with Strapi image serving.

## Debug Information
The frontend now shows:
- Product count
- First product data
- Image URL construction
- Console logs for debugging

## Next Steps
1. Add a test product through Strapi admin
2. Check the API response
3. Verify image URLs are constructed correctly
4. Test image loading in browser
5. Check console for any errors