import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Icon} from '../components/Icon';
import {Button, Divider, Field} from '../components/ui';
import {useNav} from '../nav';
import {useStore} from '../store';
import {colors, space, text} from '../theme';

export function LoginScreen() {
  const nav = useNav();
  const {signIn} = useStore();
  const [email, setEmail] = useState('joel@shopplus.ug');
  const [password, setPassword] = useState('shopplus');
  const [secure, setSecure] = useState(true);

  const submit = () => {
    signIn();
    nav.reset('Home');
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView
          style={styles.fill}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView
            contentContainerStyle={styles.scroll}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            <View style={styles.brandRow}>
              <View style={styles.logo}>
                <Icon name="bag" size={24} color={colors.primary} strokeWidth={2.1} />
              </View>
              <Text style={styles.brandName}>ShopPlus</Text>
            </View>

            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>
              Log in to your account to continue shopping.
            </Text>

            <View style={styles.form}>
              <Field
                label="Email or Phone Number"
                icon="user"
                placeholder="Enter your email or phone"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <View>
                <Field
                  label="Password"
                  icon="lock"
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={secure}
                  right={
                    <Pressable onPress={() => setSecure(v => !v)} hitSlop={10}>
                      <Icon
                        name={secure ? 'eye' : 'eyeOff'}
                        size={19}
                        color={colors.muted}
                      />
                    </Pressable>
                  }
                />
                <Pressable
                  style={styles.forgot}
                  hitSlop={8}
                  onPress={() => {}}>
                  <Text style={styles.forgotText}>Forgot Password?</Text>
                </Pressable>
              </View>

              <Button label="Log In" onPress={submit} style={{marginTop: 6}} />
            </View>

            <View style={styles.orRow}>
              <Divider style={styles.orLine} />
              <Text style={styles.orText}>or</Text>
              <Divider style={styles.orLine} />
            </View>

            <View style={styles.socials}>
              <Button
                label="Continue with Google"
                variant="outline"
                onPress={submit}
                icon={<Icon name="google" size={19} color={colors.ink} />}
              />
              <Button
                label="Continue with Apple"
                variant="outline"
                onPress={submit}
                icon={<Icon name="apple" size={19} color={colors.ink} />}
              />
            </View>

            <View style={styles.footer}>
              <Text style={text.bodySm}>Don’t have an account? </Text>
              <Pressable onPress={() => nav.push('SignUp')} hitSlop={8}>
                <Text style={styles.link}>Sign Up</Text>
              </Pressable>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: colors.white},
  safe: {flex: 1},
  fill: {flex: 1},
  scroll: {
    flexGrow: 1,
    paddingHorizontal: space.xxl,
    paddingTop: space.lg,
    paddingBottom: space.xxl,
  },
  brandRow: {flexDirection: 'row', alignItems: 'center', gap: 10},
  logo: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandName: {
    fontSize: 19,
    fontWeight: '800',
    color: colors.ink,
    letterSpacing: -0.4,
  },
  title: {
    marginTop: 40,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '800',
    color: colors.ink,
    letterSpacing: -0.9,
  },
  subtitle: {
    marginTop: 8,
    ...text.body,
    color: colors.muted,
  },
  form: {marginTop: space.xxl, gap: space.lg},
  forgot: {alignSelf: 'flex-end', marginTop: 10},
  forgotText: {fontSize: 13, fontWeight: '700', color: colors.primary},
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: space.xxl,
  },
  orLine: {flex: 1},
  orText: {fontSize: 12, fontWeight: '600', color: colors.muted},
  socials: {gap: 12},
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: space.xxl,
  },
  link: {fontSize: 13.5, fontWeight: '800', color: colors.primary},
});
