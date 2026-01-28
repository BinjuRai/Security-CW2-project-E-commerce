// export const getBackendImageUrl = (imagePath) => {
//     if (!imagePath) return null

//     const baseUrl = import.meta.env.VITE_BACKEND_URL ||
//         "http://localhost:5050"
//     return baseUrl + "/" + imagePath

// }

// utils/backend-image.js
// // export const getBackendImageUrl = (imagePath) => {
// //     if (!imagePath) return null;

// //     const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5050";
    
// //     // ✅ FIX: Remove "uploads/" prefix if it exists
// //     const cleanPath = imagePath.replace(/^uploads[\/\\]/, '');
    
// //     return `${baseUrl}/uploads/${cleanPath}`;
// // };

// frontend/src/utils/backend-image.js
export const getBackendImageUrl = (imagePath) => {
    if (!imagePath) {
        console.warn('⚠️ No image path provided');
        return null;
    }

    const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5050";
    
    // ✅ Clean up any "uploads/" prefix (handles all cases)
    let cleanPath = imagePath;
    
    // Remove leading "uploads/" or "uploads\"
    cleanPath = cleanPath.replace(/^uploads[\/\\]/, '');
    
    // Remove leading "uploads/user/" or "uploads\user\"
    cleanPath = cleanPath.replace(/^uploads[\/\\]user[\/\\]/, 'user/');
    
    const finalUrl = `${baseUrl}/uploads/${cleanPath}`;
    
    console.log('🖼️ Image Debug:', {
        original: imagePath,
        clean: cleanPath,
        final: finalUrl
    });
    
    return finalUrl;
};