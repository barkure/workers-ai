import React, { useState, useEffect, useRef } from "react";
import AxiosInstance from "../AxiosInstance";
import { Input, Button, Avatar, Spin } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";

const TextGeneration = () => {
    const [value, setValue] = useState('');
    const [generatedText, setGeneratedText] = useState([]);
    const model = '@cf/meta/llama-2-7b-chat-int8';
    const messagesEndRef = useRef(null);
    const [loading, setLoading] = useState(false); // 新增状态变量

    const handleButtonClick = () => {
        const messages = [
            { role: 'system', content: 'You are a friendly assistant' },
            { role: 'user', content: value }
        ];
        setLoading(true); // 在请求开始时，将loading设置为true
        setValue(''); // 清空输入框
        AxiosInstance.post(`/${model}`, { messages })
            .then((res) => {
                setGeneratedText(prevTexts => [...prevTexts, { role: 'You', content: value }, { role: 'AI', content: res.data.result.response }]);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false); // 在请求结束时，将loading设置为false
            });
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [generatedText]);

    return (
        <div>
            <div style={{ height: "75vh", marginLeft: "5%", marginRight: "5%" }}>
                {generatedText.map((text, index) => (
                    <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', margin: '10px 0' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar style={{ flexShrink: 0, width: '40px', height: '40px' }} src={text.role === 'You' ? 'static/You.jpg' : 'static/AI.jpg'} />
                            <b style={{ marginLeft: '10px' }}>{text.role}</b>
                        </div>
                        <p style={{ marginLeft: '50px' }}>{text.content}</p>
                    </div>
                ))}
                <div style={{ height: "10%" }}></div>
                <div ref={messagesEndRef} />
            </div>
            <div style={{ display: "flex", alignItems: "center", position: 'fixed', bottom: 0, width: '100%', backgroundColor: "#fff", zIndex: 1000 }}>
                <Input style={{ marginLeft: "20px" }} size="large" placeholder="发起对话...（对中文支持不好）" value={value} onChange={e => setValue(e.target.value)} onPressEnter={handleButtonClick} />
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

export default TextGeneration;