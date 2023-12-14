import React, { useEffect } from "react";
import 'sakana-widget/lib/index.css';
import SakanaWidget from 'sakana-widget';

const About = () => {
    useEffect(() => {
        const tuanzi = SakanaWidget.getCharacter('chisato');
        tuanzi.image = `${process.env.PUBLIC_URL}/static/tuanzi.png`;
        SakanaWidget.registerCharacter('tuanzi', tuanzi);
        new SakanaWidget({ character: 'tuanzi' }).mount('#tuanzi-widget');
    }, []);

    return (
        <div style={{ margin: '7%' }}>
            <div>
                <h2>关于 Workers AI</h2>
            </div>
            <div style={{ lineHeight: 1.5, fontWeight: 540, marginTop: "7%" }}>
                <p>
                    本站使用了<a href="https://developers.cloudflare.com/workers-ai/" target="_blank"> Cloudflare Workers AI </a>的 API，是一个基于人工智能的在线工具集合。目前支持如下功能：
                    <ul>
                        <li>文本生成（@cf/meta/llama-2-7b-chat-int8）</li>
                        <li>文本翻译（@cf/meta/m2m100-1.2b）</li>
                        <li>图像分类（@cf/microsoft/resnet-50）</li>
                        <li>文本生图（@cf/stabilityai/stable-diffusion-xl-base-1.0）</li>
                    </ul>
                    项目源码托管在 GitHub 上：<a href="https://github.com/barkure/workers-ai" target="_blank"> workers-ai </a>，你可以自由部署或者参与开发。
                </p>
                <p>
                    页脚立牌使用了<a href="https://github.com/dsrkafuu/sakana-widget" target="_blank"> Sakana! Widget </a>，图片形象是小团子，画师@枫郁。
                </p>
                <p>
                    Made by <a href="https://barku.re" target="_blank">barkure</a> with ❤
                </p>
            </div>
            <div style={{ position: 'fixed', right: 0, bottom: 10 }} id="tuanzi-widget" />
        </div>
    );
}

export default About;