const express = require('express')
const cors = require('cors')
const { getAttribute } = require('./services/attribute')
const { createBrand, updateBrand } = require('./services/brand')
const { createModel, updateModel } = require('./services/model');
const { createCapacity, updateCapacity } = require('./services/capacity');
const { createColor, updateColor } = require('./services/color');
const { createVersion, updateVersion } = require('./services/version');
const { createProduct, updateProduct, getAllProducts, getFollowedUserProducts, } = require('./services/product');
const { getUsers } = require('./services/user');
const { deleteFollow, createFollow, updateFollow, getFollows } = require('./services/follow');
const { createTagCategory, getTagCategory } = require('./services/tagCategory');
const { createTag, getTag } = require('./services/tag');

const app = express()
const port = 3001

app.use(express.json())
app.use(cors())

// 商品属性
app.get('/attribute', async (req, res) => {
    try {
        const attribute = await getAttribute()
        res.status(201).json(attribute)
    } catch (error) {
        console.error('Error fetching attribute:', error);
        res.status(500).json({ error: 'Failed to fetch attribute' });
    }
})

// 创建品牌
app.post('/brand', async (req, res) => {
    const brand = await createBrand(req.body)
    res.status(201).json(brand)
})

// 更新品牌
app.put('/brand/:id', async (req, res) => {
    const brand = await updateBrand(parseInt(req.params.id), req.body)
    res.status(201).json(brand)
})


// 创建型号
app.post('/model', async (req, res) => {
    try {
        const model = await createModel(req.body);
        res.status(201).json(model);
    } catch (error) {
        console.error('Error creating model:', error);
        res.status(500).json({ error: 'Failed to create model' });
    }
});

// 更新型号
app.put('/model/:id', async (req, res) => {
    try {
        const model = await updateModel(parseInt(req.params.id), req.body);
        res.status(200).json(model);
    } catch (error) {
        console.error('Error updating model:', error);
        res.status(500).json({ error: 'Failed to update model' });
    }
});

// 创建容量
app.post('/capacity', async (req, res) => {
    try {
        const capacity = await createCapacity(req.body);
        res.status(201).json(capacity);
    } catch (error) {
        console.error('Error creating capacity:', error);
        res.status(500).json({ error: 'Failed to create capacity' });
    }
});

// 更新容量
app.put('/capacity/:id', async (req, res) => {
    try {
        const capacity = await updateCapacity(parseInt(req.params.id), req.body);
        res.status(200).json(capacity);
    } catch (error) {
        console.error('Error updating capacity:', error);
        res.status(500).json({ error: 'Failed to update capacity' });
    }
});

// 创建颜色
app.post('/color', async (req, res) => {
    try {
        const color = await createColor(req.body);
        res.status(201).json(color);
    } catch (error) {
        console.error('Error creating color:', error);
        res.status(500).json({ error: 'Failed to create color' });
    }
});

// 更新颜色
app.put('/color/:id', async (req, res) => {
    try {
        const color = await updateColor(parseInt(req.params.id), req.body);
        res.status(200).json(color);
    } catch (error) {
        console.error('Error updating color:', error);
        res.status(500).json({ error: 'Failed to update color' });
    }
});

// 创建版本
app.post('/version', async (req, res) => {
    try {
        const version = await createVersion(req.body);
        res.status(201).json(version);
    } catch (error) {
        console.error('Error creating version:', error);
        res.status(500).json({ error: 'Failed to create version' });
    }
});

// 更新版本
app.put('/version/:id', async (req, res) => {
    try {
        const version = await updateVersion(parseInt(req.params.id), req.body);
        res.status(200).json(version);
    } catch (error) {
        console.error('Error updating version:', error);
        res.status(500).json({ error: 'Failed to update version' });
    }
});

// 创建产品
app.post('/product', async (req, res) => {
    try {
        const product = await createProduct(req.body);
        res.status(201).json(product);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Failed to create product' });
    }
});

// 更新产品
app.put('/product/:id', async (req, res) => {
    try {
        const product = await updateProduct(parseInt(req.params.id), req.body);
        res.status(200).json(product);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Failed to update product' });
    }
});

// 获取产品
app.get('/product', async (req, res) => {
    try {
        // 调用获取所有产品的方法
        const products = await getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// 根据用户id获取产品
app.get('/user/:userId/products', async (req, res) => {
    // const userId = parseInt(req.params.userId) / process.env.USER_ID_SECRET;
    const result = await getFollowedUserProducts(req.params.userId)
    res.status(201).json(result)
    // try {
    //     // 调用根据用户 ID 获取产品的方法
    //     const products = await getProductsByUserId(userId);
    //     res.status(200).json(products);
    // } catch (error) {
    //     console.error(`Error fetching products for user with ID ${userId}:`, error);
    //     res.status(500).json({ error: `Failed to fetch products for user with ID ${userId}` });
    // }
});

// 获取所有用户
app.get('/users', async (req, res) => {
    const users = await getUsers()
    res.status(201).json(users)
})

// 获取关注列表
app.get('/user/:userId/follows', async (req, res) => {
    const response = await getFollows(parseInt(req.params.userId) / process.env.USER_ID_SECRET)
    res.status(201).json(response)
})

// 取消关注
app.delete('/follow/:followId', async (req, res) => {
    const follow = await deleteFollow(parseInt(req.params.followId))
    res.status(201).json(follow)
})
// 关注
app.post('/follow', async (req, res) => {
    req.body.followerId = req.body.followerId / process.env.USER_ID_SECRET
    const follow = await createFollow(req.body)

    res.status(201).json(follow)
})

// 更新关注
app.put('/follow/:followId', async (req, res) => {
    const follow = await updateFollow(parseInt(req.params.followId), req.body)
    res.status(201).json(follow)
})

// 创建tag分类
app.post('/tagCategory', async (req, res) => {
    const response = await createTagCategory(req.body)
    // res.send('123')
    res.status(201).json(response)
})

// 获取tag分类
app.get('/tagCategory', async (req, res) => {
    const response = await getTagCategory()
    res.status(201).json(response)
})

// 创建tag
app.post('/tag', async (req, res) => {
    const response = await createTag(req.body)
    // res.send('123')
    res.status(201).json(response)
})

// 获取tag
app.get('/tag', async (req, res) => {
    const response = await getTag()
    res.status(201).json(response)
})

// 启动 Express 应用
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});