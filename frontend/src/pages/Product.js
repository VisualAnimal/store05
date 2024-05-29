import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'

const Product = () => {
    const [attribute, setAttribute] = useState([]);
    const [selectedBrandId, setSelectedBrandId] = useState(0);
    const [selectedModelId, setSelectedModelId] = useState(0);
    const [selectedCapacityId, setSelectedCapacityId] = useState(0);
    const [selectedColorId, setSelectedColorId] = useState(0);
    const [selectedVersionId, setSelectedVersionId] = useState(0);
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [products, setProducts] = useState([]);
    const { userId } = useParams()
    const fetchProductsRef = useRef(null)
    const [tagCategories, setTagCategories] = useState([])

    useEffect(() => {
        // Fetch attribute data from API
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/attribute`);
                setAttribute(response.data);
            } catch (error) {
                console.error('Error fetching attributes:', error);
            }
        };

        fetchData();
    }, []);


    useEffect(() => {
        // Fetch product data from API
        fetchProductsRef.current = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/${userId}/products`);
                setProducts(response.data);
                console.log(response);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProductsRef.current();
    }, []);

    useEffect(() => {
        const fetchTagCategory = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/tagCategory`)
            setTagCategories(response.data)
        }

        fetchTagCategory()
    }, [])

    const handleBrandChange = (e) => {
        setSelectedBrandId(parseInt(e.target.value));
        setSelectedModelId(0); // Reset selected model, capacity, color, and version when brand changes
        setSelectedCapacityId(0);
        setSelectedColorId(0);
        setSelectedVersionId(0);
    };

    const handleModelChange = (e) => {
        setSelectedModelId(parseInt(e.target.value));
        setSelectedCapacityId(0); // Reset selected capacity, color, and version when model changes
        setSelectedColorId(0);
        setSelectedVersionId(0);
    };

    const handleCapacityChange = (e) => {
        setSelectedCapacityId(parseInt(e.target.value));
    };

    const handleColorChange = (e) => {
        setSelectedColorId(parseInt(e.target.value));
    };

    const handleVersionChange = (e) => {
        setSelectedVersionId(parseInt(e.target.value));
    };

    const handlePriceChange = (e) => {
        setPrice(parseInt(e.target.value));
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            // 将用户所做的更改发送到服务器
            await axios.post(`${process.env.REACT_APP_API_URL}/product`, {
                brandId: selectedBrandId,
                modelId: selectedModelId,
                capacityId: selectedCapacityId,
                colorId: selectedColorId,
                versionId: selectedVersionId,
                price,
                describe: description,
                userId: parseInt(userId)
            });
            // 提交成功后，重新获取产品数据
            fetchProductsRef.current()
            // 清空表单
            setSelectedBrandId(0);
            setSelectedModelId(0);
            setSelectedCapacityId(0);
            setSelectedColorId(0);
            setSelectedVersionId(0);
            setPrice('');
            setDescription('');
        } catch (error) {
            console.error('Error submitting changes:', error);
        }
    };
    const handleTagClick = (tagName) => {
        // 将标签名称添加到描述中
        setDescription(prevDescription => prevDescription + tagName);
    };

    return (
        <div>
            <h1>Product Editor</h1>
            <div>
                <label>Brand:</label>
                <select value={selectedBrandId} onChange={handleBrandChange}>
                    <option value="">Select Brand</option>
                    {attribute.map((brand, index) => (
                        <option key={index} value={brand.id}>{brand.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Model:</label>
                <select value={selectedModelId} onChange={handleModelChange}>
                    <option value="">Select Model</option>
                    {/* Populate models based on selected brand */}
                    {selectedBrandId &&
                        attribute
                            .find(brand => brand.id === selectedBrandId)
                            ?.Model.map((model, index) => (
                                <option key={index} value={model.id}>{model.name}</option>
                            ))}
                </select>
            </div>
            <div>
                <label>Capacity:</label>
                <select value={selectedCapacityId} onChange={handleCapacityChange}>
                    <option value="">Select Capacity</option>
                    {/* Populate capacities based on selected model */}
                    {selectedModelId &&
                        attribute
                            .find(brand => brand.id === selectedBrandId)
                            ?.Model.find(model => model.id === selectedModelId)
                            ?.Capacity.map((capacity, index) => (
                                <option key={index} value={capacity.id}>{capacity.name}</option>
                            ))}
                </select>
            </div>
            <div>
                <label>Color:</label>
                <select value={selectedColorId} onChange={handleColorChange}>
                    <option value="">Select Color</option>
                    {/* Populate colors based on selected model */}
                    {selectedModelId &&
                        attribute
                            .find(brand => brand.id === selectedBrandId)
                            ?.Model.find(model => model.id === selectedModelId)
                            ?.Color.map((color, index) => (
                                <option key={index} value={color.id}>{color.name}</option>
                            ))}
                </select>
            </div>
            <div>
                <label>Version:</label>
                <select value={selectedVersionId} onChange={handleVersionChange}>
                    <option value="">Select Version</option>
                    {/* Populate versions based on selected model */}
                    {selectedModelId &&
                        attribute
                            .find(brand => brand.id === selectedBrandId)
                            ?.Model.find(model => model.id === selectedModelId)
                            ?.Version.map((version, index) => (
                                <option key={index} value={version.id}>{version.name}</option>
                            ))}
                </select>
            </div>
            <div>
                <label>Price:</label>
                <input type="text" value={price} onChange={handlePriceChange} />
            </div>
            <div>
                {tagCategories.map(category => (
                    <div key={category.id}>{category.name}
                        {category.tags.map(tag => (
                            <button key={tag.id} onClick={() => handleTagClick(tag.name)}>{tag.name}</button>
                        ))}
                    </div>
                ))}
            </div>
            <div>
                <label>Description:</label>
                <input style={{ width: '80%' }}  value={description} onChange={handleDescriptionChange}></input>
            </div>
            {/* 提交按钮 */}
            <button onClick={handleSubmit}>Submit</button>
            {/* 显示产品列表 */}
            <h2>Products</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        <p>
                            <span>{product.Brand.name}</span>{' '}
                            <span>{product.Model.name}</span>{' '}
                            <span>{product.Capacity.name}</span>{' '}
                            <span>{product.Color.name}</span>{' '}
                            <span>{product.Version.name}</span>{' '}
                            <span>{`￥${product.price}`}</span>{' '}
                            <span>{product.description}</span>
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Product;
