import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home'; // 导入Home组件
import TextGeneration from './components/Models/TextGeneration'; // 导入TextGeneration组件
import AutomaticSpeechRecognition from './components/Models/AutomaticSpeechRecognition'; // 导入SpeechRecognition组件
import Translation from './components/Models/Translation'; // 导入TextTranslation组件
import ImageClassification from './components/Models/ImageClassification'; // 导入ImageClassification组件
import TextToImage from './components/Models/Text2Image'; // 导入TextToImage组件
import About from './components/Models/About'; // 导入About组件

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Navigate to="text-generation" />} /> // 默认跳转到文本生成
          <Route path="text-generation" element={<TextGeneration />} />
          <Route path="speech-recognition" element={<AutomaticSpeechRecognition />} />
          <Route path="text-translation" element={<Translation />} />
          <Route path="image-classification" element={<ImageClassification />} />
          <Route path="text-to-image" element={<TextToImage />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);