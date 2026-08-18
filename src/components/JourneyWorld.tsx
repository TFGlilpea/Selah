import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

type Props = {
  progress: number;
  isNight: boolean;
};

export default function JourneyWorld({
  progress,
  isNight,
}: Props) {
  const stage =
    progress < 0.2
      ? 'VALLEY'
      : progress < 0.4
      ? 'FOREST'
      : progress < 0.6
      ? 'RIVER'
      : progress < 0.8
      ? 'HIGHLANDS'
      : 'FINAL CLIMB';

  return (
    <View
      style={[
        styles.world,
        isNight && styles.night,
      ]}
    >
      <View style={styles.sky} />

      <View style={styles.sun}>
        <View
          style={[
            styles.sunCircle,
            isNight && styles.moonCircle,
          ]}
        />
      </View>

      <Text style={styles.mountainsBack}>
        /\        /\          /\        /\
      </Text>

      <Text style={styles.mountainsFront}>
        /\     /\        /\      /\     /\
      </Text>

      <Text style={styles.summit}>
        THE SUMMIT
      </Text>

      <View style={styles.lake}>
        <Text style={styles.water}>
          ~~~~~~~~~~~~~~~~~~~~~~~~~
        </Text>
        <Text style={styles.water}>
          ~~~~~~~~~~~~~~~~~~~~~~~~~
        </Text>
      </View>

      <Text style={styles.treesLeft}>
        |\/|     |\/|        |\/|
      </Text>

      <Text style={styles.treesRight}>
        |\/|        |\/|     |\/|
      </Text>

      <View style={styles.path} />

      {isNight ? (
        <>
          <View style={styles.fire} />
          <Text style={styles.companions}>
            ●       ●
          </Text>
        </>
      ) : (
        <Text style={styles.companions}>
          ●       ●
        </Text>
      )}

      <View style={styles.location}>
        <Text style={styles.locationText}>
          {stage}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  world: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: '#B9DEC3',
  },

  night: {
    backgroundColor: '#17241D',
  },

  sky: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '55%',
    backgroundColor: 'rgba(221,241,226,0.55)',
  },

  sun: {
    position: 'absolute',
    top: 75,
    right: 45,
  },

  sunCircle: {
    width: 55,
    height: 55,
    borderRadius: 55,
    backgroundColor: '#FFF0B5',
  },

  moonCircle: {
    backgroundColor: '#DCE7E0',
  },

  mountainsBack: {
    position: 'absolute',
    top: '25%',
    left: -40,
    right: -40,
    color: '#759B80',
    fontSize: 68,
    textAlign: 'center',
    letterSpacing: -12,
  },

  mountainsFront: {
    position: 'absolute',
    top: '34%',
    left: -50,
    right: -50,
    color: '#557A61',
    fontSize: 80,
    textAlign: 'center',
    letterSpacing: -15,
  },

  summit: {
    position: 'absolute',
    top: '24%',
    alignSelf: 'center',
    color: '#F7FFF9',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 3,
  },

  lake: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: '27%',
  },

  water: {
    color: '#8FBDA0',
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 19,
  },

  treesLeft: {
    position: 'absolute',
    left: -5,
    bottom: '25%',
    color: '#294C35',
    fontSize: 44,
    lineHeight: 60,
  },

  treesRight: {
    position: 'absolute',
    right: -5,
    bottom: '25%',
    color: '#294C35',
    fontSize: 44,
    lineHeight: 60,
  },

  path: {
    position: 'absolute',
    width: '48%',
    height: '75%',
    bottom: -25,
    alignSelf: 'center',
    backgroundColor: '#C7B99A',
    transform: [{ perspective: 500 }, { rotate: '0deg' }],
    borderRadius: 120,
  },

  companions: {
    position: 'absolute',
    bottom: '24%',
    alignSelf: 'center',
    color: '#18231C',
    fontSize: 42,
    letterSpacing: 8,
  },

  fire: {
    position: 'absolute',
    bottom: '20%',
    alignSelf: 'center',
    width: 35,
    height: 35,
    borderRadius: 35,
    backgroundColor: '#E2A25B',
    opacity: 0.9,
  },

  location: {
    position: 'absolute',
    bottom: 25,
    alignSelf: 'center',
  },

  locationText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 3,
  },
});
