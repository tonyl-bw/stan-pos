import {
  ButtonProps,
  Button as UIButton,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';

export default function Button(props: ButtonProps) {
  const styles = useStyleSheet(themedStyles) as any;
  return <UIButton {...props} style={styles.button} />;
}

const themedStyles = StyleService.create({
  button: {
    borderRadius: 20,
  },
});
