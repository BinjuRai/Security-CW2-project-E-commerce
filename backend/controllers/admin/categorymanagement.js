const Category = require('../../models/Category');

// Create a new category
exports.createCategory = async (req, res) => {
    try {
        const filename = req.file?.path

        const category = new Category({ name: req.body.name, filepath: filename });
        await category.save();
        return res.status(201).json({
            success: true,
            message: "Created",
            data: category
        });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};
// backend/controllers/admin/categorymanagement.js

// exports.createCategory = async (req, res) => {
//     try {
//         // ✅ Store only filename
//         const imagepath = req.file?.filename;

//         const category = new Category({ 
//             name: req.body.name, 
//             description: req.body.description,
//             imagepath  // ✅ Use imagepath
//         });
        
//         await category.save();
        
//         return res.status(201).json({
//             success: true,
//             message: "Category created successfully",
//             data: category
//         });
//     } catch (err) {
//         console.error("Create category error:", err);
//         return res.status(500).json({ 
//             success: false, 
//             message: "Server error",
//             error: err.message
//         });
//     }
// };

exports.updateCategory = async (req, res) => {
    try {
        const updateData = { 
            name: req.body.name,
            description: req.body.description
        };
        
        // ✅ Store only filename if new image uploaded
        if (req.file) {
            updateData.imagepath = req.file.filename;
        }

        const category = await Category.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!category) {
            return res.status(404).json({ 
                success: false, 
                message: 'Category not found' 
            });
        }

        return res.json({ 
            success: true, 
            data: category, 
            message: "Category updated successfully" 
        });
    } catch (err) {
        console.error("Update category error:", err);
        return res.status(500).json({ 
            success: false, 
            message: "Server error",
            error: err.message
        });
    }
};

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        return res.json({ success: true, data: categories, message: "All category" });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Get single category by ID
exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ success: false, message: 'Category not found' });
        return res.json({ success: true, data: category, message: "One category" });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Update a category
exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name },
            { new: true }
        );
        if (!category) return res.status(404).json({ success: false, message: 'Category not found' });
        return res.json({ success: true, data: category, message: "Updated" });
    } catch (err) {
        return res.status(500).json({ error: "Server Error" });
    }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
    try {
        const result = await Category.findByIdAndDelete(req.params.id);
        if (!result) return res.status(404).json({ success: false, message: 'Category not found' });
        return res.json({ success: true, message: 'Category deleted' });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};