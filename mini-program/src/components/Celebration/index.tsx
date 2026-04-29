import { View, Text } from '@tarojs/components';
import { useEffect, useState } from 'react';
import './index.scss';

interface CelebrationProps {
  show: boolean;
}

export default function Celebration({ show }: CelebrationProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!visible) return null;

  return (
    <View className="celebration">
      <Text className="emoji">🎉</Text>
      <Text className="title">恭喜完成首次训练！</Text>
      <Text className="subtitle">坚持记录，你就是最棒的！</Text>
    </View>
  );
}