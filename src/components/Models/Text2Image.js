import React, { useState } from "react";
import { Input, Button, message } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import AxiosInstance from "../AxiosInstance";

const Text2Image = () => {
    const [value, setValue] = useState('');
    const [imageUrl, setImageUrl] = useState(null); // 新增状态变量
    const [title, setTitle] = useState(''); // 新增状态变量
    const model = '@cf/stabilityai/stable-diffusion-xl-base-1.0';

    const handleButtonClick = () => {
        const prompt = value
        message.warning("图片生成较慢，请勿多次点击按钮");
        // 在请求开始时，将imageUrl设置为null
        setImageUrl(null);
    
        AxiosInstance.post(`/${model}`, { prompt }, { responseType: 'blob' }) // 设置响应类型为blob
            .then((res) => {
                setTitle(value);
                setValue(''); // 清空输入框
                const blob = new Blob([res.data], { type: 'image/jpeg' }); // 创建Blob
                const imageUrl = URL.createObjectURL(blob); // 创建URL
                setImageUrl(imageUrl); // 保存图片的URL
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height:"50vh", marginTop:"5vh"}}>
                {imageUrl && <h2>{title}</h2>} {/* 只有当imageUrl存在时，才渲染这个标签 */}
                {imageUrl && <img src={imageUrl} alt="Generated" style={{ maxWidth: '90%', maxHeight: '90%' }} />}
            </div>
            <div>
                <p style={{ textAlign:"center", marginTop:"30%" }}>图片生成较慢，一般需要等待10~30s</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", position: 'fixed', bottom: 0, width: '100%', backgroundColor: "#fff", zIndex: 1000 }}>
                <Input style={{ marginLeft: "20px" }} size="large" placeholder="输入描述文本..." value={value} onChange={e => setValue(e.target.value)} onPressEnter={handleButtonClick} />
                <Button style={{ margin: "20px" }} type="primary" shape="circle" icon={<ArrowUpOutlined />} onClick={handleButtonClick} />
            </div>
        </div>
    );
};

export default Text2Image;