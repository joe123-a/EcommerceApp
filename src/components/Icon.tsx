import React from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';

export type IconName =
  | 'bag'
  | 'home'
  | 'search'
  | 'heart'
  | 'cart'
  | 'user'
  | 'chevronRight'
  | 'chevronLeft'
  | 'chevronDown'
  | 'chevronUp'
  | 'arrowRight'
  | 'filter'
  | 'pin'
  | 'bell'
  | 'lock'
  | 'card'
  | 'truck'
  | 'shield'
  | 'check'
  | 'close'
  | 'plus'
  | 'minus'
  | 'trash'
  | 'eye'
  | 'eyeOff'
  | 'share'
  | 'phone'
  | 'wallet'
  | 'google'
  | 'apple'
  | 'grid'
  | 'clock'
  | 'settings'
  | 'star'
  | 'help';

type Props = {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
  style?: StyleProp<ViewStyle>;
};

/**
 * A tiny hand-built line-icon set.
 * Every glyph is drawn from Views on a 24×24 grid, which keeps the bundle
 * free of icon fonts and native SVG dependencies.
 */
export function Icon({
  name,
  size = 24,
  color = '#0E1116',
  strokeWidth = 1.9,
  style,
}: Props) {
  const k = size / 24;
  const bw = Math.max(1, strokeWidth * k);

  const box = (
    l: number,
    t: number,
    w: number,
    h: number,
    extra?: ViewStyle,
  ): ViewStyle => ({
    position: 'absolute',
    left: l * k,
    top: t * k,
    width: w * k,
    height: h * k,
    ...extra,
  });

  const ring = (l: number, t: number, w: number, h: number, r: number) =>
    box(l, t, w, h, {
      borderWidth: bw,
      borderColor: color,
      borderRadius: r * k,
    });

  const bar = (
    l: number,
    t: number,
    w: number,
    h: number,
    rotate?: string,
  ) =>
    box(l, t, w, h, {
      backgroundColor: color,
      borderRadius: Math.min(w, h) * k * 0.5,
      ...(rotate ? {transform: [{rotate}]} : null),
    });

  let content: React.ReactNode = null;

  switch (name) {
    case 'bag':
      content = (
        <>
          <View style={ring(4.4, 8.2, 15.2, 12.2, 3.6)} />
          <View
            style={box(8.1, 3.2, 7.8, 7.6, {
              borderWidth: bw,
              borderColor: color,
              borderTopLeftRadius: 4 * k,
              borderTopRightRadius: 4 * k,
              borderBottomWidth: 0,
            })}
          />
        </>
      );
      break;

    case 'home':
      content = (
        <>
          <View
            style={box(7.1, 5, 10, 10, {
              borderTopWidth: bw,
              borderLeftWidth: bw,
              borderColor: color,
              transform: [{rotate: '45deg'}],
            })}
          />
          <View
            style={box(5, 10, 14, 10.6, {
              borderWidth: bw,
              borderColor: color,
              borderTopWidth: 0,
              borderBottomLeftRadius: 2.6 * k,
              borderBottomRightRadius: 2.6 * k,
            })}
          />
        </>
      );
      break;

    case 'search':
      content = (
        <>
          <View style={ring(3.4, 3.4, 12.8, 12.8, 6.4)} />
          <View style={bar(15.2, 15.6, 5.6, bw, '45deg')} />
        </>
      );
      break;

    case 'heart': {
      const lobe = {
        position: 'absolute' as const,
        top: 1 * k,
        width: 12.5 * k,
        height: 21 * k,
        backgroundColor: color,
        borderTopLeftRadius: 6.25 * k,
        borderTopRightRadius: 6.25 * k,
      };
      content = (
        <>
          <View
            style={[
              lobe,
              {
                left: 11.6 * k,
                transform: [{rotate: '-45deg'}],
                transformOrigin: '0% 100%',
              },
            ]}
          />
          <View
            style={[
              lobe,
              {
                left: 0,
                transform: [{rotate: '45deg'}],
                transformOrigin: '100% 100%',
              },
            ]}
          />
        </>
      );
      break;
    }

    case 'cart':
      content = (
        <>
          <View style={bar(2.4, 4.2, 5.4, bw)} />
          <View
            style={box(6.6, 4.2, 2.2, 2.2, {
              backgroundColor: color,
              borderRadius: 1.1 * k,
            })}
          />
          <View
            style={box(5.6, 7.4, 15.4, 10.2, {
              borderWidth: bw,
              borderColor: color,
              borderRadius: 2.4 * k,
              borderTopLeftRadius: 0.8 * k,
            })}
          />
          <View style={ring(8.4, 19.2, 3, 3, 1.5)} />
          <View style={ring(15.4, 19.2, 3, 3, 1.5)} />
        </>
      );
      break;

    case 'user':
      content = (
        <>
          <View style={ring(8, 3, 8, 8, 4)} />
          <View
            style={box(4.4, 13.4, 15.2, 9.6, {
              borderWidth: bw,
              borderColor: color,
              borderTopLeftRadius: 7.6 * k,
              borderTopRightRadius: 7.6 * k,
              borderBottomWidth: 0,
            })}
          />
        </>
      );
      break;

    case 'chevronRight':
      content = (
        <View
          style={box(8.6, 6.6, 7.8, 7.8, {
            borderTopWidth: bw,
            borderRightWidth: bw,
            borderColor: color,
            transform: [{rotate: '45deg'}],
          })}
        />
      );
      break;

    case 'chevronLeft':
      content = (
        <View
          style={box(8.6, 6.6, 7.8, 7.8, {
            borderTopWidth: bw,
            borderRightWidth: bw,
            borderColor: color,
            transform: [{rotate: '-135deg'}],
          })}
        />
      );
      break;

    case 'chevronDown':
      content = (
        <View
          style={box(8.6, 8.6, 7.8, 7.8, {
            borderTopWidth: bw,
            borderRightWidth: bw,
            borderColor: color,
            transform: [{rotate: '135deg'}],
          })}
        />
      );
      break;

    case 'chevronUp':
      content = (
        <View
          style={box(8.6, 8.6, 7.8, 7.8, {
            borderTopWidth: bw,
            borderRightWidth: bw,
            borderColor: color,
            transform: [{rotate: '-45deg'}],
          })}
        />
      );
      break;

    case 'arrowRight':
      content = (
        <>
          <View style={bar(3.8, 11.1, 15.2, bw)} />
          <View
            style={box(12.6, 7.2, 6.4, 6.4, {
              borderTopWidth: bw,
              borderRightWidth: bw,
              borderColor: color,
              transform: [{rotate: '45deg'}],
            })}
          />
        </>
      );
      break;

    case 'filter':
      content = (
        <>
          <View style={bar(3.4, 7, 17.2, bw)} />
          <View style={bar(3.4, 12, 17.2, bw)} />
          <View style={bar(3.4, 17, 17.2, bw)} />
          <View style={bar(7.2, 5.1, 2.4, 5.8, '0deg')} />
          <View style={bar(13.4, 10.1, 2.4, 5.8, '0deg')} />
          <View style={bar(9.6, 15.1, 2.4, 5.8, '0deg')} />
        </>
      );
      break;

    case 'pin':
      content = (
        <>
          <View style={ring(6.4, 2.4, 11.2, 11.2, 5.6)} />
          <View
            style={box(8.5, 11.8, 7, 6.4, {
              borderLeftWidth: 3.5 * k,
              borderRightWidth: 3.5 * k,
              borderTopWidth: 6 * k,
              borderLeftColor: 'transparent',
              borderRightColor: 'transparent',
              borderTopColor: color,
            })}
          />
          <View
            style={box(10.7, 7.1, 2.6, 2.6, {
              backgroundColor: color,
              borderRadius: 1.3 * k,
            })}
          />
        </>
      );
      break;

    case 'bell':
      content = (
        <>
          <View
            style={box(5, 4.6, 14, 11.4, {
              borderWidth: bw,
              borderColor: color,
              borderTopLeftRadius: 7 * k,
              borderTopRightRadius: 7 * k,
              borderBottomWidth: 0,
            })}
          />
          <View style={bar(3.6, 16, 16.8, bw)} />
          <View style={bar(10.4, 18.4, 3.2, 3.2)} />
        </>
      );
      break;

    case 'lock':
      content = (
        <>
          <View
            style={box(7.4, 3.4, 9.2, 8, {
              borderWidth: bw,
              borderColor: color,
              borderTopLeftRadius: 4.6 * k,
              borderTopRightRadius: 4.6 * k,
              borderBottomWidth: 0,
            })}
          />
          <View style={ring(4.4, 9.4, 15.2, 11.6, 3.2)} />
          <View style={bar(11, 13.8, 2, 3.6)} />
        </>
      );
      break;

    case 'card':
      content = (
        <>
          <View style={ring(2.4, 5, 19.2, 14, 3)} />
          <View style={box(2.4, 9, 19.2, 2.6, {backgroundColor: color})} />
        </>
      );
      break;

    case 'truck':
      content = (
        <>
          <View style={ring(1.6, 7, 12, 9.6, 1.8)} />
          <View
            style={box(13.6, 10.4, 7.2, 6.2, {
              borderWidth: bw,
              borderColor: color,
              borderTopRightRadius: 2 * k,
              borderBottomRightRadius: 2 * k,
              borderLeftWidth: 0,
            })}
          />
          <View style={ring(5.4, 17.2, 3.2, 3.2, 1.6)} />
          <View style={ring(15.2, 17.2, 3.2, 3.2, 1.6)} />
        </>
      );
      break;

    case 'shield':
      content = (
        <>
          <View style={ring(3.2, 3, 17.6, 17.6, 8.8)} />
          <View style={bar(7.4, 12.4, 5.4, bw, '45deg')} />
          <View style={bar(11.6, 13.4, 7.4, bw, '-48deg')} />
        </>
      );
      break;

    case 'check':
      content = (
        <>
          <View style={bar(5.4, 12.6, 6.4, bw, '45deg')} />
          <View style={bar(10.2, 14, 9.4, bw, '-50deg')} />
        </>
      );
      break;

    case 'close':
      content = (
        <>
          <View style={bar(5.6, 11.2, 13, bw, '45deg')} />
          <View style={bar(5.6, 11.2, 13, bw, '-45deg')} />
        </>
      );
      break;

    case 'plus':
      content = (
        <>
          <View style={bar(4.8, 11.1, 14.4, bw)} />
          <View style={bar(11.1, 4.8, bw, 14.4)} />
        </>
      );
      break;

    case 'minus':
      content = <View style={bar(4.8, 11.1, 14.4, bw)} />;
      break;

    case 'trash':
      content = (
        <>
          <View style={bar(3.6, 5.4, 16.8, bw)} />
          <View
            style={box(9, 2.8, 6, 2.6, {
              borderWidth: bw,
              borderColor: color,
              borderBottomWidth: 0,
              borderTopLeftRadius: 1.6 * k,
              borderTopRightRadius: 1.6 * k,
            })}
          />
          <View
            style={box(5.4, 7.6, 13.2, 13, {
              borderWidth: bw,
              borderColor: color,
              borderTopWidth: 0,
              borderBottomLeftRadius: 2.6 * k,
              borderBottomRightRadius: 2.6 * k,
            })}
          />
          <View style={bar(9.8, 10.8, 1.6, 6)} />
          <View style={bar(12.8, 10.8, 1.6, 6)} />
        </>
      );
      break;

    case 'eye':
      content = (
        <>
          <View style={ring(2.6, 6, 18.8, 12, 6)} />
          <View style={bar(9.4, 9.4, 5.2, 5.2)} />
        </>
      );
      break;

    case 'eyeOff':
      content = (
        <>
          <View style={ring(2.6, 6, 18.8, 12, 6)} />
          <View style={bar(9.4, 9.4, 5.2, 5.2)} />
          <View style={bar(3.6, 11.2, 17.6, bw, '-45deg')} />
        </>
      );
      break;

    case 'share':
      content = (
        <>
          <View style={bar(4.34, 7.7, 15.43, bw, '-25.7deg')} />
          <View style={bar(4.34, 14.4, 15.43, bw, '25.7deg')} />
          <View style={bar(16.7, 3, 4.6, 4.6)} />
          <View style={bar(2.8, 9.7, 4.6, 4.6)} />
          <View style={bar(16.7, 16.4, 4.6, 4.6)} />
        </>
      );
      break;

    case 'phone':
      content = (
        <>
          <View style={ring(6.4, 2.6, 11.2, 18.8, 3)} />
          <View style={bar(10.6, 18, 2.8, 1.6)} />
        </>
      );
      break;

    case 'wallet':
      content = (
        <>
          <View style={ring(2.6, 5.4, 18.8, 13.6, 3.2)} />
          <View style={bar(13.4, 10.6, 8, 3.2)} />
          <View style={bar(15.6, 11.4, 1.8, 1.8)} />
        </>
      );
      break;

    case 'google':
      content = (
        <Text
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: -1.5 * k,
            textAlign: 'center',
            fontSize: size * 0.98,
            lineHeight: size * 1.12,
            fontWeight: '800',
            color: '#4285F4',
          }}>
          G
        </Text>
      );
      break;

    case 'apple':
      content = (
        <>
          <View
            style={box(4.2, 7.2, 15.6, 14.2, {
              backgroundColor: color,
              borderRadius: 7.6 * k,
            })}
          />
          <View
            style={box(16.6, 9.4, 5.6, 5.6, {
              backgroundColor: '#FFFFFF',
              borderRadius: 2.8 * k,
            })}
          />
          <View
            style={box(11.6, 3.4, 5.4, 2.6, {
              backgroundColor: color,
              borderRadius: 1.3 * k,
              transform: [{rotate: '-32deg'}],
            })}
          />
          <View style={bar(11.8, 2.4, 1.7, 4)} />
        </>
      );
      break;

    case 'grid':
      content = (
        <>
          <View style={ring(3.4, 3.4, 7.2, 7.2, 2)} />
          <View style={ring(13.4, 3.4, 7.2, 7.2, 2)} />
          <View style={ring(3.4, 13.4, 7.2, 7.2, 2)} />
          <View style={ring(13.4, 13.4, 7.2, 7.2, 2)} />
        </>
      );
      break;

    case 'clock':
      content = (
        <>
          <View style={ring(3, 3, 18, 18, 9)} />
          <View style={bar(11.2, 7.4, bw, 5.6)} />
          <View style={bar(11.2, 12.4, 5, bw)} />
        </>
      );
      break;

    case 'settings': {
      const teeth = [0, 45, 90, 135, 180, 225, 270, 315].map(angle => {
        const rad = (angle * Math.PI) / 180;
        const cx = 12 + 9.1 * Math.sin(rad);
        const cy = 12 - 9.1 * Math.cos(rad);
        return (
          <View
            key={angle}
            style={bar(cx - 1.35, cy - 2.2, 2.7, 4.4, `${angle}deg`)}
          />
        );
      });
      content = (
        <>
          {teeth}
          <View style={ring(4.9, 4.9, 14.2, 14.2, 7.1)} />
          <View style={bar(10.4, 10.4, 3.2, 3.2)} />
        </>
      );
      break;
    }

    case 'star':
      content = (
        <Text
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: -1.5 * k,
            textAlign: 'center',
            fontSize: 20 * k,
            lineHeight: 24 * k,
            color,
          }}>
          ★
        </Text>
      );
      break;

    case 'help':
      content = (
        <>
          <View style={ring(3, 3, 18, 18, 9)} />
          <Text
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 2.2 * k,
              textAlign: 'center',
              fontSize: 12.4 * k,
              lineHeight: 14 * k,
              fontWeight: '800',
              color,
            }}>
            ?
          </Text>
        </>
      );
      break;

    default:
      content = null;
  }

  return <View style={[{width: size, height: size}, styles.wrap, style]}>{content}</View>;
}

const styles = StyleSheet.create({
  wrap: {alignItems: 'center', justifyContent: 'center'},
});

/** A five-point star used for ratings. */
export function Star({size = 12, color = '#FFB020'}: {size?: number; color?: string}) {
  return (
    <Text
      style={{
        fontSize: size,
        lineHeight: size * 1.1,
        color,
      }}>
      ★
    </Text>
  );
}
