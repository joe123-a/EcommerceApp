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
import {AppBar, Button, Field} from '../components/ui';
import {useNav} from '../nav';
import {useStore} from '../store';
import {colors, space, text} from '../theme';

export function SignUpScreen() {
  const nav = useNav();
  const {signIn} = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [agreed, setAgreed] = useState(true);

  const submit = () => {
    signIn();
    nav.reset('Home');
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safe}>
        <AppBar onBack={nav.pop} />
        <KeyboardAvoidingView
          style={styles.fill}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView
            contentContainerStyle={styles.scroll}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>
              Join ShopPlus and get your first delivery on us.
            </Text>

            <View style={styles.form}>
              <Field
                label="Full Name"
                icon="user"
                placeholder="Mugamba Joel"
                value={name}
                onChangeText={setName}
              />
              <Field
                label="Email Address"
                icon="card"
                placeholder="you@example.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Field
                label="Phone Number"
                icon="phone"
                placeholder="+256 772 123 456"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
              <Field
                label="Password"
                icon="lock"
                placeholder="Create a password"
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
            </View>

            <Pressable style={styles.terms} onPress={() => setAgreed(v => !v)}>
              <View style={[styles.checkbox, agreed ? styles.checkboxOn : null]}>
                {agreed ? <Icon name="check" size={12} color={colors.white} /> : null}
              </View>
              <Text style={styles.termsText}>
                I agree to the <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
                <Text style={styles.termsLink}>Privacy Policy</Text>.
              </Text>
            </Pressable>

            <Button
              label="Create Account"
              onPress={submit}
              disabled={!agreed}
              style={{marginTop: space.xl}}
            />

            <View style={styles.footer}>
              <Text style={text.bodySm}>Already have an account? </Text>
              <Pressable onPress={() => nav.replace('Login')} hitSlop={8}>
                <Text style={styles.link}>Log In</Text>
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
    paddingTop: space.sm,
    paddingBottom: space.xxl,
  },
  title: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '800',
    color: colors.ink,
    letterSpacing: -0.9,
  },
  subtitle: {marginTop: 8, ...text.body, color: colors.muted},
  form: {marginTop: space.xxl, gap: space.lg},
  terms: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: space.xl,
  },
  checkbox: {
    width: 21,
    height: 21,
    borderRadius: 7,
    borderWidth: 1.6,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxOn: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  termsText: {
    flex: 1,
    ...text.bodySm,
    fontSize: 12.5,
    color: colors.muted,
    lineHeight: 18,
  },
  termsLink: {color: colors.ink, fontWeight: '700'},
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: space.xxl,
  },
  link: {fontSize: 13.5, fontWeight: '800', color: colors.primary},
});
