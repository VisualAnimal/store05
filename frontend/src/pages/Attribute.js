import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Attribute = () => {
  const [attribute, setAttribute] = useState([]);
  const [error, setError] = useState(null);
  const fetchAttributeRef = useRef()

  useEffect(() => {
    fetchAttributeRef.current = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/attribute`);
        setAttribute(response.data);
      } catch (error) {
        setError('Failed to fetch attribute');
      }
    };

    fetchAttributeRef.current();
  }, []);

  // 通用的创建操作函数
  const handleCreate = async (entity, parentId, parentIdField) => {
    const name = prompt(`请输入新的${entity}名称：`);
    if (name) {
      try {
        const data = { name: name };
        if (parentIdField) {
          data[parentIdField] = parentId; // 使用传入的字段名设置相应的父级实体 ID
        }
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/${entity}`, data);
        if (response.status === 201) {
          fetchAttributeRef.current();
        }
      } catch (error) {
        setError(`Failed to add ${entity}`);
      }
    }
  };

  const handleAddBrand = async () => {
    handleCreate('brand')
  }

  const handleAddModel = async (brandId) => {
    handleCreate('model', brandId, 'brandId');
  };

  const handleAddCapacity = async (modelId) => {
    handleCreate('capacity', modelId, 'modelId');
  };

  const handleAddColor = async (modelId) => {
    handleCreate('color', modelId, 'modelId');
  };

  const handleAddVersion = async (modelId) => {
    handleCreate('version', modelId, 'modelId');
  };

  return (
    <div>
      {error && <div>Error: {error}</div>}
      <ul>
        <button onClick={handleAddBrand}>+</button>
        {attribute.map(brand => (
          <li key={brand.id}>
            {brand.name}
            <button onClick={() => handleAddModel(brand.id)}>+</button>
            <ul>
              {brand.Model.map(model => (
                <li key={model.id}>{model.name}
                  <ul>
                    <li>容量：
                      {model.Capacity.map(capacity => (
                        <span>{capacity.name}、</span>
                      ))}
                      <button onClick={() => handleAddCapacity(model.id)}>+</button>
                    </li>
                    <li>颜色：
                      {model.Color.map(color => (
                        <span>{color.name}、</span>
                      ))}
                      <button onClick={() => handleAddColor(model.id)}>+</button>
                    </li>
                    <li>版本：
                      {model.Version.map(version => (
                        <span>{version.name}、</span>
                      ))}
                      <button onClick={() => handleAddVersion(model.id)}>+</button>
                    </li>
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Attribute;
