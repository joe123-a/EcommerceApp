import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Icon, IconName, Star} from './Icon';
import {colors, radius, shadow, space, text} from '../theme';

/* ------------------------------------------------------------------ layout */

export function Screen({
  children,
  style,
  bg = colors.white,
  edges = ['top'],
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  bg?: string;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
}) {
  return (
    <SafeAreaView edges={edges} style={[styles.screen, {backgroundColor: bg}]}>
      <View style={[styles.fill, style]}>{children}</View>
    </SafeAreaView>
  );
}

export function Divider({style}: {style?: StyleProp<ViewStyle>}) {
  return <View style={[styles.divider, style]} />;
}

/* ------------------------------------------------------------------ buttons */

type ButtonVariant = 'primary' | 'outline' | 'dark' | 'soft' | 'ghost';

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'lg',
  icon,
  iconName,
  disabled,
  loading,
  style,
  full = true,
}: {
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: 'md' | 'lg';
  icon?: React.ReactNode;
  iconName?: IconName;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  full?: boolean;
}) {
  const palette = {
    primary: {bg: colors.primary, fg: colors.white, border: 'transparent'},
    outline: {bg: colors.white, fg: colors.ink, border: colors.line},
    dark: {bg: colors.dark, fg: colors.white, border: 'transparent'},
    soft: {bg: colors.primarySoft, fg: colors.primary, border: 'transparent'},
    ghost: {bg: 'transparent', fg: colors.ink, border: 'transparent'},
  }[variant];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({pressed}) => [
        styles.button,
        size === 'lg' ? styles.buttonLg : styles.buttonMd,
        {
          backgroundColor: palette.bg,
          borderColor: palette.border,
          borderWidth: variant === 'outline' ? 1 : 0,
          opacity: disabled ? 0.45 : pressed ? 0.88 : 1,
          transform: [{scale: pressed ? 0.985 : 1}],
        },
        variant === 'primary' && !disabled ? shadow.button : null,
        full ? styles.full : null,
        style,
      ]}>
      {loading ? (
        <ActivityIndicator color={palette.fg} />
      ) : (
        <View style={styles.buttonInner}>
          <Text style={[text.button, {color: palette.fg}]}>{label}</Text>
          {icon ??
            (iconName ? <Icon name={iconName} size={20} color={palette.fg} /> : null)}
        </View>
      )}
    </Pressable>
  );
}

export function IconButton({
  name,
  onPress,
  size = 42,
  iconSize = 20,
  color = colors.ink,
  bg = colors.white,
  border = colors.line,
  style,
  badge,
}: {
  name: IconName;
  onPress?: () => void;
  size?: number;
  iconSize?: number;
  color?: string;
  bg?: string;
  border?: string;
  style?: StyleProp<ViewStyle>;
  badge?: number;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: bg,
          borderWidth: border === 'transparent' ? 0 : 1,
          borderColor: border,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: pressed ? 0.7 : 1,
        },
        style,
      ]}>
      <Icon name={name} size={iconSize} color={color} />
      {badge ? (
        <View style={styles.dotBadge}>
          <Text style={styles.dotBadgeText}>{badge > 9 ? '9+' : badge}</Text>
        </View>
      ) : null}
    </Pressable>
  );
}

/* ------------------------------------------------------------------ app bar */

export function AppBar({
  title,
  onBack,
  right,
  subtitle,
  transparent,
}: {
  title?: string;
  onBack?: () => void;
  right?: React.ReactNode;
  subtitle?: string;
  transparent?: boolean;
}) {
  return (
    <View
      style={[
        styles.appBar,
        transparent ? {backgroundColor: 'transparent'} : null,
      ]}>
      <View style={styles.appBarSide}>
        {onBack ? <IconButton name="chevronLeft" onPress={onBack} /> : null}
      </View>
      <View style={styles.appBarCenter}>
        {title ? <Text style={text.title}>{title}</Text> : null}
        {subtitle ? <Text style={[text.tiny, {marginTop: 2}]}>{subtitle}</Text> : null}
      </View>
      <View style={[styles.appBarSide, {alignItems: 'flex-end'}]}>{right}</View>
    </View>
  );
}

/* ------------------------------------------------------------------- inputs */

export function Field({
  label,
  icon,
  right,
  style,
  ...props
}: TextInputProps & {
  label?: string;
  icon?: IconName;
  right?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={style}>
      {label ? <Text style={styles.fieldLabel}>{label}</Text> : null}
      <View
        style={[
          styles.field,
          {
            borderColor: focused ? colors.primary : colors.line,
            backgroundColor: focused ? colors.white : colors.surface,
          },
        ]}>
        {icon ? (
          <Icon
            name={icon}
            size={19}
            color={focused ? colors.primary : colors.muted}
          />
        ) : null}
        <TextInput
          placeholderTextColor={colors.faint}
          style={styles.fieldInput}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
        {right}
      </View>
    </View>
  );
}

/* -------------------------------------------------------------------- small */

export function Chip({
  label,
  active,
  onPress,
  style,
}: {
  label: string;
  active?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.chip,
        {
          backgroundColor: active ? colors.primary : colors.white,
          borderColor: active ? colors.primary : colors.line,
          opacity: pressed ? 0.8 : 1,
        },
        style,
      ]}>
      <Text
        style={[
          text.label,
          {color: active ? colors.white : colors.inkSoft, fontWeight: '600'},
        ]}>
        {label}
      </Text>
    </Pressable>
  );
}

export function Rating({
  value,
  count,
  size = 12,
  style,
}: {
  value: number;
  count?: number;
  size?: number;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[styles.rating, style]}>
      <Star size={size} />
      <Text style={[styles.ratingText, {fontSize: size}]}>{value.toFixed(1)}</Text>
      {count != null ? (
        <Text style={[styles.ratingCount, {fontSize: size}]}>({count})</Text>
      ) : null}
    </View>
  );
}

export function Badge({
  label,
  tone = 'primary',
  style,
}: {
  label: string;
  tone?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral' | 'dark' | 'info';
  style?: StyleProp<ViewStyle>;
}) {
  const palette = {
    primary: {bg: colors.primarySoft, fg: colors.primary},
    success: {bg: colors.successSoft, fg: colors.success},
    warning: {bg: colors.warningSoft, fg: '#B7791F'},
    danger: {bg: colors.dangerSoft, fg: colors.danger},
    neutral: {bg: colors.surface, fg: colors.muted},
    dark: {bg: colors.dark, fg: colors.white},
    info: {bg: colors.infoSoft, fg: colors.info},
  }[tone];

  return (
    <View style={[styles.badge, {backgroundColor: palette.bg}, style]}>
      <Text style={[styles.badgeText, {color: palette.fg}]}>{label}</Text>
    </View>
  );
}

export function SectionHeader({
  title,
  action,
  onPress,
  style,
}: {
  title: string;
  action?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[styles.sectionHeader, style]}>
      <Text style={text.h3}>{title}</Text>
      {action ? (
        <Pressable onPress={onPress} style={styles.sectionAction} hitSlop={8}>
          <Text style={styles.sectionActionText}>{action}</Text>
          <Icon name="chevronRight" size={14} color={colors.primary} />
        </Pressable>
      ) : null}
    </View>
  );
}

export function Stepper({
  value,
  onChange,
  min = 1,
}: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
}) {
  return (
    <View style={styles.stepper}>
      <Pressable
        hitSlop={6}
        onPress={() => onChange(Math.max(min, value - 1))}
        style={styles.stepperBtn}>
        <Icon name="minus" size={14} color={colors.inkSoft} />
      </Pressable>
      <Text style={styles.stepperValue}>{value}</Text>
      <Pressable
        hitSlop={6}
        onPress={() => onChange(value + 1)}
        style={styles.stepperBtn}>
        <Icon name="plus" size={14} color={colors.inkSoft} />
      </Pressable>
    </View>
  );
}

export function Avatar({size = 56, uri}: {size?: number; uri?: any}) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        overflow: 'hidden',
        backgroundColor: colors.surface,
      }}>
      {uri ? (
        <Image source={uri} style={{width: '100%', height: '100%'}} />
      ) : null}
    </View>
  );
}

export function EmptyState({
  icon,
  title,
  body,
  action,
  onAction,
}: {
  icon: IconName;
  title: string;
  body: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <View style={styles.empty}>
      <View style={styles.emptyIcon}>
        <Icon name={icon} size={30} color={colors.primary} />
      </View>
      <Text style={[text.h3, {marginTop: space.lg}]}>{title}</Text>
      <Text style={[text.bodySm, styles.emptyBody]}>{body}</Text>
      {action ? (
        <Button
          label={action}
          onPress={onAction}
          size="md"
          full={false}
          style={{marginTop: space.xl, paddingHorizontal: 28}}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {flex: 1},
  fill: {flex: 1},
  divider: {height: 1, backgroundColor: colors.line},

  button: {
    borderRadius: radius.md + 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLg: {height: 56, paddingHorizontal: 22},
  buttonMd: {height: 46, paddingHorizontal: 18},
  buttonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  full: {alignSelf: 'stretch'},

  appBar: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: space.lg,
  },
  appBarSide: {width: 60, justifyContent: 'center'},
  appBarCenter: {flex: 1, alignItems: 'center'},

  fieldLabel: {
    ...text.label,
    marginBottom: 8,
    marginLeft: 2,
    color: colors.inkSoft,
  },
  field: {
    height: 56,
    borderRadius: radius.md,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 10,
  },
  fieldInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: colors.ink,
    padding: 0,
  },

  chip: {
    height: 36,
    paddingHorizontal: 16,
    borderRadius: radius.pill,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  rating: {flexDirection: 'row', alignItems: 'center', gap: 4},
  ratingText: {fontWeight: '700', color: colors.ink},
  ratingCount: {color: colors.muted, fontWeight: '500'},

  badge: {
    paddingHorizontal: 9,
    height: 24,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {fontSize: 11, fontWeight: '700', letterSpacing: 0.1},

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionAction: {flexDirection: 'row', alignItems: 'center', gap: 2},
  sectionActionText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },

  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.pill,
    height: 34,
    paddingHorizontal: 4,
  },
  stepperBtn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperValue: {
    minWidth: 22,
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '700',
    color: colors.ink,
  },

  dotBadge: {
    position: 'absolute',
    top: -3,
    right: -3,
    minWidth: 17,
    height: 17,
    borderRadius: 9,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  dotBadgeText: {color: colors.white, fontSize: 9, fontWeight: '800'},

  empty: {alignItems: 'center', paddingHorizontal: 40, paddingVertical: 48},
  emptyIcon: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyBody: {textAlign: 'center', marginTop: 6, color: colors.muted},
});
