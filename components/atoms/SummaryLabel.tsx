import { StyleService, Text } from '@ui-kitten/components';

import { useStyleSheet } from '@ui-kitten/components';

export default function SummaryLabel({ label }: { label: string }) {
  const styles = useStyleSheet(themedStyles) as any;
  return <Text category="p1" style={styles.summaryLabel}>{label}</Text>;
}

const themedStyles = StyleService.create({

});
