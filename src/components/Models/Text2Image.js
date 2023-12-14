import React, { useState } from "react";
import { Input, Button, message, Spin } from "antd"; // 引入Spin组件
import { ArrowUpOutlined } from "@ant-design/icons";
import AxiosInstance from "../AxiosInstance";

const Text2Image = () => {
    const [value, setValue] = useState('');
    const [imageUrl, setImageUrl] = useState(null);
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false); // 新增状态变量
    const model = '@cf/stabilityai/stable-diffusion-xl-base-1.0';

    const handleButtonClick = () => {
        const prompt = value
        message.warning("图片生成较慢，请耐心等待");
        setImageUrl(null);
        setLoading(true); // 在请求开始时，将loading设置为true

        AxiosInstance.post(`/${model}`, { prompt }, { responseType: 'blob' })
            .then((res) => {
                setTitle(value);
                setValue('');
                const blob = new Blob([res.data], { type: 'image/jpeg' });
                const imageUrl = URL.createObjectURL(blob);
                setImageUrl(imageUrl);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false); // 在请求结束时，将loading设置为false
            });
    };

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: "50vh", marginTop: "5vh" }}>
                {loading && <Spin />} {/* 当loading为true时，显示加载指示器 */}
                {imageUrl && <h2>{title}</h2>}
                {imageUrl && <img src={imageUrl} alt="Generated" style={{ maxWidth: '90%', maxHeight: '90%' }} />}
            </div>
            <div>
                <p style={{ textAlign: "center", marginTop: "15%" }}>图片生成较慢，一般需要等待10~30s</p>
                <p style={{ textAlign: "center" }}>PS：英文关键词效果比较好</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", position: 'fixed', bottom: 0, width: '100%', backgroundColor: "#fff", zIndex: 1000 }}>
                <Input style={{ marginLeft: "20px" }} size="large" placeholder="输入描述文本..." value={value} onChange={e => setValue(e.target.value)} onPressEnter={handleButtonClick} />
                <Button
                    style={{ margin: "20px" }}
                    type="primary"
                    shape="circle"
                    icon={<ArrowUpOutlined />}
                    onClick={handleButtonClick}
                    loading={loading} // 当loading为true时，按钮显示加载指示器并被禁用
                />
            </div>
        </div>
    );
};

export default Text2Image;