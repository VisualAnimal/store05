import React from 'react'
import { NavLink, useParams, Outlet } from "react-router-dom";

const User = () => {
    const { slug } = useParams();

    return (
        <div>
            <NavLink to={"products"}>
                商品管理
            </NavLink>
            {' '}
            <NavLink to={"follow"}>
                关注
            </NavLink>
            {' '}
            <NavLink to={"profile"}>
                个人信息
            </NavLink>
            {' '}
            <Outlet />
        </div>
    )
}

export default User