import {
  Layout,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { Pressable, View, ViewStyle } from 'react-native';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const styles = useStyleSheet(themedStyles);
  const router = useRouter();

  return (
    <Layout style={[styles.container as ViewStyle]}>
      <View style={styles.left as ViewStyle}>
        {router.canGoBack() && (
          <Pressable onPress={() => router.back()}>
            <ArrowLeft size={24} />
          </Pressable>
        )}
        <Text category="s1">{title}</Text>
      </View>
    </Layout>
  );
}

const themedStyles = StyleService.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'background-basic-color-4',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});
