import React, { useEffect } from 'react';
import { CapsuleTabs } from 'antd-mobile';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Layout, message } from 'antd';

const { Content } = Layout;
message.info("未做PC端适配，建议用手机访问");
const Home = () => {
  useEffect(() => {
    document.title = "Workers AI";
  }, []);

  const location = useLocation();
  const navigate = useNavigate();

  // 根据当前的路由来设置activeKey
  let activeKey;
  switch (location.pathname) {
    case '/text-generation':
      activeKey = '1';
      break;
    // case '/speech-recognition':
    //   activeKey = '2';
    //   break;
    case '/text-translation':
      activeKey = '3';
      break;
    case '/image-classification':
      activeKey = '4';
      break;
    case '/text-to-image':
      activeKey = '5';
      break;
    case '/about':
      activeKey = '6';
      break;
    default:
      activeKey = '1';
      break;
  }

  const handleTabClick = (key) => {
    switch (key) {
      case '1':
        navigate('/text-generation');
        break;
      // case '2':
      //   navigate('/speech-recognition');
      //   break;
      case '3':
        navigate('/text-translation');
        break;
      case '4':
        navigate('/image-classification');
        break;
      case '5':
        navigate('/text-to-image');
        break;
      case '6':
        navigate('/about');
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <div style={{ height: "14vh" }}>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontFamily: 'Mojangles' }}>Workers AI</h1>
        </div>
        <div>
          <CapsuleTabs activeKey={activeKey} onChange={handleTabClick}>
            <CapsuleTabs.Tab title='文本生成' key='1' />
            {/* <CapsuleTabs.Tab title='语音识别' key='2' /> */}
            <CapsuleTabs.Tab title='文本翻译' key='3' />
            <CapsuleTabs.Tab title='图像分类' key='4' />
            <CapsuleTabs.Tab title='文本生图' key='5' />
            <CapsuleTabs.Tab title='关于' key='6' />
          </CapsuleTabs>
        </div>
      </div>
      <Content>
        <Outlet />
      </Content>
    </div>

  );
};

export default Home;