import React, { useEffect, useMemo, useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import JourneyWorld from '../components/JourneyWorld';

const JOURNEY_LENGTH = 24 * 60 * 60 * 1000;

export default function JourneyScreen() {
  const [startedAt] = useState(Date.now());
  const [now, setNow] = useState(Date.now());
  const [controlsVisible, setControlsVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const progress = useMemo(() => {
    return Math.min(
      1,
      Math.max(0, (now - startedAt) / JOURNEY_LENGTH)
    );
  }, [now, startedAt]);

  const remaining = Math.max(
    0,
    JOURNEY_LENGTH - (now - startedAt)
  );

  const hours = Math.floor(
    remaining / (1000 * 60 * 60)
  );

  const minutes = Math.floor(
    (remaining / (1000 * 60)) % 60
  );

  const isNight =
    new Date(now).getHours() >= 19 ||
    new Date(now).getHours() < 6;

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        style={styles.worldContainer}
        onPress={() =>
          setControlsVisible(!controlsVisible)
        }
      >
        <JourneyWorld
          progress={progress}
          isNight={isNight}
        />

        <View style={styles.topBar}>
          <Text style={styles.logo}>Selah</Text>

          <View style={styles.timeContainer}>
            <Text style={styles.timeLabel}>
              {isNight ? 'NIGHT' : 'DAY'}
            </Text>

            <Text style={styles.time}>
              {hours}h {minutes}m
            </Text>
          </View>
        </View>

        {!controlsVisible && (
          <View style={styles.hint}>
            <Text style={styles.hintText}>
              Tap to reveal Journey
            </Text>
          </View>
        )}

        {controlsVisible && (
          <View style={styles.bottomPanel}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>
                YOUR JOURNEY
              </Text>

              <Text style={styles.percent}>
                {Math.round(progress * 100)}%
              </Text>
            </View>

            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${Math.max(
                      2,
                      progress * 100
                    )}%`,
                  },
                ]}
              />
            </View>

            <View style={styles.panelRow}>
              <View>
                <Text style={styles.panelLabel}>
                  DESTINATION
                </Text>

                <Text style={styles.panelValue}>
                  The Summit
                </Text>
              </View>

              <View style={styles.divider} />

              <View>
                <Text style={styles.panelLabel}>
                  COMPANION
                </Text>

                <Text style={styles.panelValue}>
                  Jesus
                </Text>
              </View>
            </View>

            <View style={styles.actions}>
              <Pressable style={styles.action}>
                <Text style={styles.actionText}>
                  Devotional
                </Text>
              </Pressable>

              <Pressable style={styles.action}>
                <Text style={styles.actionText}>
                  Scripture
                </Text>
              </Pressable>

              <Pressable style={styles.action}>
                <Text style={styles.actionText}>
                  Videos
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101612',
  },

  worldContainer: {
    flex: 1,
  },

  topBar: {
    position: 'absolute',
    top: 15,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  logo: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -1,
  },

  timeContainer: {
    alignItems: 'flex-end',
  },

  timeLabel: {
    color: '#DCE9DF',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 2,
  },

  time: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    marginTop: 2,
  },

  hint: {
    position: 'absolute',
    bottom: 34,
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },

  hintText: {
    color: '#FFFFFF',
    fontSize: 12,
  },

  bottomPanel: {
    position: 'absolute',
    left: 14,
    right: 14,
    bottom: 14,
    backgroundColor: 'rgba(14,22,17,0.92)',
    borderRadius: 24,
    padding: 18,
  },

  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  progressLabel: {
    color: '#C8D7CC',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
  },

  percent: {
    color: '#8FD0A4',
    fontWeight: '800',
  },

  progressTrack: {
    height: 5,
    borderRadius: 5,
    backgroundColor: '#3A473E',
    marginTop: 9,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#72BC8D',
    borderRadius: 5,
  },

  panelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
  },

  panelLabel: {
    color: '#8C9B91',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
  },

  panelValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 3,
  },

  divider: {
    width: 1,
    height: 32,
    backgroundColor: '#3A473E',
    marginHorizontal: 25,
  },

  actions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 18,
  },

  action: {
    flex: 1,
    backgroundColor: '#243128',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },

  actionText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});
