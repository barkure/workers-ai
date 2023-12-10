import React, { useState } from 'react';
import { Button, Input, Select, Typography } from 'antd';
import AxiosInstance from '../AxiosInstance';
import langs from './Language';

const { TextArea } = Input;
const { Option } = Select;

const TranslationPage = () => {
  const [text, setText] = useState('');
  const [translation, setTranslation] = useState('');
  const [sourceLang, setSourceLang] = useState('english');
  const [targetLang, setTargetLang] = useState('chinese');
  const model = '@cf/meta/m2m100-1.2b';
  const handleSwapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
  };

  const handleTranslate = () => {
    const prompt = {
      "text": text,
      "source_lang": sourceLang,
      "target_lang": targetLang,
    };
    AxiosInstance.post(`/${model}`, prompt)
      .then((res) => {
        setTranslation(res.data.result.translated_text);
      })
      .catch((err) => {
        console.log(err);
      });

  };

  return (
    <div style={{ display: "flow", marginTop: "10%" }}>
      <div style={{ marginTop: "10%", width: "90%", margin: "0 auto" }}>
        <TextArea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="输入要翻译的文本"
          autoSize={{ minRows: 10, maxRows: 5 }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop:"10%", marginBottom:"10%" }}>
        <Select value={sourceLang} onChange={setSourceLang}>
          {langs.map(lang => (
            <Option key={lang.value} value={lang.value}>{lang.label}</Option>
          ))}
        </Select>
        <Button onClick={handleSwapLanguages} style={{ margin: '0 15px' }}>⇄</Button>
        <Select value={targetLang} onChange={setTargetLang}>
          {langs.map(lang => (
            <Option key={lang.value} value={lang.value}>{lang.label}</Option>
          ))}
        </Select>
        <Button style={{ marginLeft: "30px" }} type="primary" onClick={handleTranslate}>翻译</Button>
      </div>
      <div style={{ marginTop: "10%", width: "90%", margin: "0 auto" }}>
        <TextArea
          value={translation}
          placeholder="翻译结果"
          autoSize={{ minRows: 10, maxRows: 5 }}
        />
      </div>
    </div>
  );
};

export default TranslationPage;