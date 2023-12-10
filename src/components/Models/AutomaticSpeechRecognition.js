import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { AudioOutlined, StopOutlined } from '@ant-design/icons';
import AxiosInstance from "../AxiosInstance";

const SpeechRecognsition = () => {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioData, setAudioData] = useState([]);
  const [file, setFile] = useState(null);
  const model = '@cf/openai/whisper';

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/mpeg' });
        setMediaRecorder(mediaRecorder);
        setRecording(true); // 开始录音时，将recording设置为true
        mediaRecorder.start();
      });
  };

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadFile = () => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const formData = new FormData();
      formData.append('file', reader.result);
      AxiosInstance.post(`/${model}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (mediaRecorder) {
      mediaRecorder.ondataavailable = e => {
        setAudioData(prevAudioData => [...prevAudioData, e.data]);
      };
      mediaRecorder.onstop = () => {
        const blob = new Blob(audioData, { 'type' : 'audio/mpeg' });
        const reader = new FileReader();
        reader.onloadend = () => {
          const formData = new FormData();
          formData.append('file', reader.result);
          AxiosInstance.post(`/${model}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error(error);
          });
        };
        reader.readAsDataURL(blob);
      };
    }
  }, [mediaRecorder, audioData]);

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false); // 停止录音时，将recording设置为false
    }
  };

  return (
    <div>
      <input type="file" accept="audio/mpeg" onChange={onFileChange} />
      <button onClick={uploadFile}>上传文件</button>
      <Button 
        onClick={recording ? stopRecording : startRecording} 
        icon={recording ? <StopOutlined /> : <AudioOutlined />}
        type="primary" 
        danger={recording} // 当recording为true时，按钮颜色为红色
      >
        {recording ? "停止录音" : "开始录音"}
      </Button>
    </div>
  );
};

export default SpeechRecognsition;