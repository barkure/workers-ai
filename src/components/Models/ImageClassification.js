import React, { useState, useEffect } from 'react';
import { Upload, Button, message, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import AxiosInstance from '../AxiosInstance';
import * as echarts from 'echarts';

function ImageClassification() {
  const [results, setResults] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const [mostLikely, setMostLikely] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = (file) => {
    setLoading(true);
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      const arrayBuffer = reader.result;
      const model = '@cf/microsoft/resnet-50';
      const blob = new Blob([arrayBuffer]);

      AxiosInstance.post(`/${model}`, blob, {
        headers: {
          'Content-Type': 'application/octet-stream'
        }
      })
        .then(response => {
          const result = response.data.result.map(item => {
            return {
              ...item,
              label: item.label.toLowerCase().replace(/\b\w/g, l => l.toUpperCase())
            };
          });
          setResults(result);
          setImageUrl(URL.createObjectURL(file));
          setLoading(false);  // 设置 loading 状态为 false
        })
        .catch(error => {
          message.error('上传失败');
          setLoading(false);  // 设置 loading 状态为 false
        });
    };
    return false;
  };

  const calculateMostLikely = (results) => {
    if (results.length === 0) {
      return null;
    }
    let maxScoreItem = results[0];
    for (let i = 1; i < results.length; i++) {
      if (results[i].score > maxScoreItem.score) {
        maxScoreItem = results[i];
      }
    }
    return maxScoreItem.label;
  };

  useEffect(() => {
    const likely = calculateMostLikely(results);
    setMostLikely(likely);
  }, [results]);

  useEffect(() => {
    if (!document.getElementById('chart') || results.length === 0) {
      return;
    }
    const chart = echarts.init(document.getElementById('chart'));
    chart.clear();
    chart.setOption({
      legend: {
        orient: 'horizontal',
        x: 'center',
        padding: [0, 0, 0, 0],
        data: results.map(item => item.label)
      },
      series: [
        {
          type: 'pie',
          radius: ['45%', '65%'],
          avoidLabelOverlap: true,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '18',
              fontWeight: 'bold'
            }
          },
          data: results.map(item => ({
            value: item.score,
            name: item.label
          }))
        }
      ]
    });
  }, [results]);

  return (
    <div>
      <div style={{ display: 'flex', height: '35vh', justifyContent: 'center', alignItems: 'center', marginTop: '10%' }}>
        {loading ? (
          <Spin />
        ) : (
          <div id="chart" style={{ width: '90%', height: '300px' }}></div>
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
        {imageUrl && <img src={imageUrl} alt="上传的图片" style={{ height: '100%', width: 'auto' }} />}
      </div>
      {mostLikely && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h3>它最可能是 {mostLikely}</h3>
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '3vh' }}>
        <Upload beforeUpload={handleUpload} showUploadList={false}>
          <Button type='primary' icon={<UploadOutlined />} loading={loading} disabled={loading}>上传图片</Button>
        </Upload>
      </div>
    </div>
  );
}

export default ImageClassification;