import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Cascader, Button, Space, Toast } from 'antd-mobile'

const Product = () => {
    const [visible, setVisible] = useState(false)
    const [attribute, setAttribute] = useState([]);
    const [value, setValue] = useState([])
    const [error, setError] = useState(null);
    const fetchAttributeRef = useRef()

    useEffect(() => {
        fetchAttributeRef.current = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/attribute`);
                // setAttribute(response.data);
                const data = response.data.map(item => {
                    const models = item.Model.map(model => {
                        const capacities = model.Capacity.map(capacity => {
                            const colors = model.Color.map(color => {
                                const versions = model.Version.map(version => ({
                                    label: version.name,
                                    value: version.id,
                                }));
                                return {
                                    label: color.name,
                                    value: color.id,
                                    children: versions
                                };
                            });
                            return {
                                label: capacity.name,
                                value: capacity.id,
                                children: colors
                            };
                        });
                        return {
                            label: model.name,
                            value: model.id,
                            children: capacities
                        };
                    });
                    return {
                        label: item.name,
                        value: item.id,
                        children: models
                    };

                })
                setAttribute(data)
            } catch (error) {
                setError('Failed to fetch attribute');
            }
        };

        fetchAttributeRef.current();
    }, []);
    return (
        <>
            <Button
                onClick={() => {
                    setVisible(true)
                }}
            >
                选择型号
            </Button>
            <Cascader
                options={attribute}
                visible={visible}
                onClose={() => {
                    setVisible(false)
                }}
                onConfirm={setValue}
            >
                {items => {
                    if (items.every(item => item === null)) {
                        return '未选择'
                    } else {
                        console.log(items);
                        // setSelectResult(items)
                        // items[0] ? setBrandId(items[0].value)
                        return items.map(item => item?.label ?? '未选择').join('-')
                    }
                }}
            </Cascader>
        </>
    )
}

export default Product