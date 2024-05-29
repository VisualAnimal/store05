const { createBrand, deleteBrand } = require('./func/brand')
const { createCapacity, deleteCapacity } = require('./func/capacity')
const { createColor, deleteColor } = require('./func/color')
const { follow, deleteFollow, updateFollowedUser } = require('./func/follow')
const { createModel, deleteModel } = require('./func/model')
const { createProduct, deleteProduct, getProducts, getFollowedUsersProducts, getFollowedUsersProductsWithProfit, updateProduct } = require('./func/product')
const { getUsers, createUser, deleteUsers, getUser, getFollowedUsers, } = require('./func/user')
const { createVersion, deleteVersion } = require('./func/version')

async function test() {
    // 清除数据是有顺序的，因为模型之间的关联关系，如果某些模型关联了其他有数据模型，就不能直接被清除，需要先清除被依赖的模型
    // 清除关注表
    await deleteFollow()

    // 清除商品
    await deleteProduct()

    // 测试前清除用户表
    await deleteUsers()

    // 清除容量
    await deleteCapacity()

    // 清除颜色
    await deleteColor()

    // 清除版本
    await deleteVersion()

    // 清除model
    await deleteModel()

    // 清除brand
    await deleteBrand()


    // 创建3个用户
    const user1 = await createUser({name:'老三',phone:"123",password:"123"})
    const user2 = await createUser({name:'老外',phone:"123",password:"123"})
    const user3 = await createUser({name:'老大哥',phone:"123",password:"123"})

    // console.log(user1.id);
    // console.log(user2.id);
    // console.log(user3.id);

    // 测试老三关注老大哥
    const follow1 = await follow(user1.id, user3.id)
    console.log(follow1);
    // 测试老外关注老三和老大哥
    const follow2 = await follow(user2.id, user1.id)
    const follow3 = await follow(user2.id, user3.id)
    // 为老三添加100利润
    const profit = await updateFollowedUser(follow2.id, 100)
    // 为老大哥添加300利润
    const profit2 = await updateFollowedUser(follow3.id, 300)

    // 创建品牌
    const brand = await createBrand('iPhone')
    console.log(brand);

    // 创建型号
    const model1 = await createModel('12', brand.id)
    const model2 = await createModel('15 Pro Max', brand.id)
    console.log(model1, model2);

    // 创建容量
    const capacity1 = await createCapacity('64G', model1.id)
    console.log(capacity1);

    // 创建颜色
    const color1 = await createColor('黑色', model2.id)
    console.log(color1)

    // 创建版本
    const version1 = await createVersion('国行', model2.id)
    const version2 = await createVersion('美版', model2.id)
    console.log(version1)
    console.log(version2)

    // 创建商品
    let data1 = {
        brandId: brand.id,
        modelId: model1.id,
        capacityId: capacity1.id,
        colorId: color1.id,
        versionId: version1.id,
        price: 3000,
        userId: user1.id,
        describe: '老三的商品1',
    }

    let data2 = {
        brandId: brand.id,
        modelId: model1.id,
        capacityId: capacity1.id,
        colorId: color1.id,
        versionId: version1.id,
        price: 3000,
        userId: user1.id,
        describe: '老三的商品2',
    }

    let data3 = {
        brandId: brand.id,
        modelId: model1.id,
        capacityId: capacity1.id,
        colorId: color1.id,
        versionId: version1.id,
        price: 3000,
        userId: user1.id,
        describe: '老三的商品3',
    }

    let data4 = {
        brandId: brand.id,
        modelId: model1.id,
        capacityId: capacity1.id,
        colorId: color1.id,
        versionId: version1.id,
        price: 3000,
        userId: user1.id,
        describe: '老三的商品4',
    }


    let data5 = {
        brandId: brand.id,
        modelId: model1.id,
        capacityId: capacity1.id,
        colorId: color1.id,
        versionId: version1.id,
        price: 3000,
        userId: user3.id,
        describe: '老大哥的商品1',
    }

    let data6 = {
        brandId: brand.id,
        modelId: model1.id,
        capacityId: capacity1.id,
        colorId: color1.id,
        versionId: version1.id,
        price: 3000,
        userId: user3.id,
        describe: '老大哥的商品2',
    }

    let data7 = {
        brandId: brand.id,
        modelId: model1.id,
        capacityId: capacity1.id,
        colorId: color1.id,
        versionId: version1.id,
        price: 3000,
        userId: user3.id,
        describe: '老大哥的商品3',
    }

    let data8 = {
        brandId: brand.id,
        modelId: model1.id,
        capacityId: capacity1.id,
        colorId: color1.id,
        versionId: version1.id,
        price: 3000,
        userId: user3.id,
        describe: '老大哥的商品4',
    }


    const product3 = await createProduct(data3)
    const product4 = await createProduct(data4)
    const product1 = await createProduct(data1)


    const product8 = await createProduct(data8)
    const product2 = await createProduct(data2)
    const product7 = await createProduct(data7)
    const product5 = await createProduct(data5)
    const product6 = await createProduct(data6)


    // console.log(product)

    // 获取商品
    const products = await getProducts()
    // console.log(`商品列表:`,products.describe)
    // products.map(product => {
    //     console.log(product.describe)
    // })

    // 获取用户
    // const users = await getUsers()
    // console.log(users)
    const user = await getUser(user1.id)
    // console.log(user)
    // console.dir(user, {depth: null})
    // const followedUsers = await getFollowedUsers(user2.id)
    // console.log(followedUsers)
    // const followedUserIds = followedUsers.following.map(follow => follow.followedUserId);
    // console.log(followedUserIds)
    const now = new Date()
    // 擦亮老三的商品1
    const update = await updateProduct(product1.id, { updateAt: new Date(), })
    console.log(update)
    // 擦亮老三的商品2
    const update2 = await updateProduct(product2.id, { updateAt: new Date(), })
    console.log(update)

    const products2 = await getFollowedUsersProductsWithProfit(user2.id)
    // console.log(products2)
    products2.map(product => {
        console.log(product.describe)
    })
    

}

test()