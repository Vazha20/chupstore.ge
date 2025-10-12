import React from 'react';
import { Steps } from 'antd';

const App: React.FC = () => (
  <Steps
    size="small"
    current={1}
    items={[
      {
        title: 'შეარჩიე',
      },
      {
        title: 'შეუკვეთე',
      },
      {
        title: 'მიიღე',
      },
    ]}
  />
);

export default App;