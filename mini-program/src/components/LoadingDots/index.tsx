import { View, Text } from '@tarojs/components';
import './index.scss';

export default function LoadingDots() {
  return (
    <View className="loading-dots">
      <Text className="dot">·</Text>
      <Text className="dot">·</Text>
      <Text className="dot">·</Text>
    </View>
  );
}