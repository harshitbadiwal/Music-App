import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
} from 'react-native';
import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
// import songs from '../model/data';
import songs from '../model/data';
import {useEffect, useRef, useState} from 'react';
import react from 'react';

const {width, height} = Dimensions.get('window');

const setupPlayer = async () => {
  await TrackPlayer.setupPlayer();

  await TrackPlayer.add(songs);
};

const togglePlayback = async (playbackState) => {

  // console.log('called');
  const currentTrack = await TrackPlayer.getCurrentTrack();

  // console.log('currentTrack', currentTrack);

  // const musicplay = State.Ready;
  if (playbackState ===  State.Ready) {
   
    // console.log('music', State.Ready);
    console.log(" Music playing")
    await TrackPlayer.play();
  } else if (playbackState === State.Playing){
    console.log('Music Stoped')
    await TrackPlayer.pause()
  }
else if(TrackPlayer === State.Paused){
  console.log("music play again")
  await TrackPlayer.play()
}
  // }
};

const Musicplayer = () => {
  const playbackState = usePlaybackState();
  const progress = useProgress();
  const scrollX = useRef(new Animated.Value(0)).current;
  const [songIndex, setsongIndex] = useState(0);
  const [repeatMode, setrepeatMode] = useState('off');
  const [images, setimages] = useState();
  const [artistname, setartistname] = useState();
  const [title, settitle] = useState();
  // console.log('/////', playbackState);

  const songSlider = useRef(null);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== null) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      const {image, title, artist} = track;
      setimages(image);
      setartistname(artist);
      settitle(title);
    }
  });

  const repeaticon = () => {
    if (repeatMode == 'off') {
      return 'repeat-off';
    }
    if (repeatMode == 'track') {
      return 'repeat-once';
    }
    if (repeatMode == 'repeat') {
      return 'repeat';
    }
  };

  const changeRepeatMode = () => {
    if (repeatMode == 'off') {
      TrackPlayer.setRepeatMode(RepeatMode.Track);
      setrepeatMode('track');
    }
    if (repeatMode == 'track') {
      TrackPlayer.setRepeatMode(RepeatMode.Queue);
      setrepeatMode('repeat');
    }
    if (repeatMode == 'repeat') {
      TrackPlayer.setRepeatMode(RepeatMode.Off);
      setrepeatMode('off');
    }
  };
  const skipto = async trackid => {
    await TrackPlayer.skip(trackid);
  };

  useEffect(() => {
    setupPlayer();
    scrollX.addListener(({value}) => {
      const index = Math.round(value / width);
      skipto(index);
      setsongIndex(index);
    });
    return () => {
      scrollX.removeAllListeners();
    };
  }, []);

  const skipToNext = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex + 1) * width,
    });
  };
  const skipToPre = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex - 1) * width,
    });
  };
  const renderSongs = ({index, item}) => {
    return (
      <Animated.View
        style={{
          width: width,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={styles.artwork}>
          <Image source={images} style={styles.artworkimg} />
        </View>
      </Animated.View>
    );
  };
  // console.warn("duration",progress.duration)
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.maincontainer}>
          <Animated.FlatList
            ref={songSlider}
            data={songs}
            renderItem={renderSongs}
            keyExtractor={item => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {x: scrollX},
                  },
                },
              ],
              {
                useNativeDriver: true,
              },
            )}
          />

          <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.songname}>{artistname}</Text>
          </View>
          <Slider
            style={styles.progessBar}
            value={progress.position}
            minimumValue={0}
            maximumValue={progress.duration}
            thumbTintColor="#FFD369"
            minimumTrackTintColor="#FFD369"
            maximumTrackTintColor="#FFF"
            onSlidingComplete={async value => {
              await TrackPlayer.seekTo(value);
            }}
          />

          <View style={styles.progessBarlabel}>
            <Text style={styles.progessBarlabeltxt}>
              {new Date(progress.position * 1000).toISOString().substr(14, 5)}
            </Text>
            <Text style={styles.progessBarlabeltxt}>
              {new Date((progress.duration - progress.position) * 1000)
                .toISOString()
                .substr(14, 5)}
            </Text>
          </View>
          <View style={styles.musicControl}>
            <TouchableOpacity onPress={skipToPre}>
              <Ionicons
                style={{paddingTop: 15}}
                name="play-skip-back-outline"
                size={30}
                color="#FFD369"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => togglePlayback(playbackState)}>
              <Ionicons
                name={
                  playbackState == State.Playing
                    ? 'ios-pause-circle'
                    : 'ios-play-circle'
                }
                size={55}
                color="#FFD369"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={skipToNext}>
              <Ionicons
                style={{paddingTop: 15}}
                name="play-skip-forward-outline"
                size={30}
                color="#FFD369"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.bottomIcons}>
            <TouchableOpacity>
              <Ionicons name="heart-outline" size={30} color="#777777" />
            </TouchableOpacity>
            <TouchableOpacity onPress={changeRepeatMode}>
              <MaterialCommunityIcons
                name={`${repeaticon()}`}
                size={30}
                color={repeatMode !== 'off' ? '#FFD369' : '#777777'}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="share-outline" size={30} color="#777777" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="ellipsis-horizontal" size={30} color="#777777" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222831',
  },
  maincontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  artwork: {
    width: 280,
    height: 340,
    marginBottom: 10,
    elevation: 20,
  },
  artworkimg: {
    height: '100%',
    width: '100%',
    borderRadius: 15,
  },
  title: {
    marginTop: -25,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#EEEEEE',
  },
  songname: {
    fontSize: 15,
    fontWeight: '200',
    color: '#EEEEEE',
    textAlign: 'center',
  },
  progessBar: {
    width: 350,
    height: 40,
    marginTop: 25,
    flexDirection: 'row',
  },
  progessBarlabel: {
    width: 330,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  musicControl: {
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 20,
  },
  bottomContainer: {
    borderTopColor: '#393E46',
    borderTopWidth: 1,
    width: width,
    alignItems: 'center',
    paddingVertical: 15,
  },
  bottomIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
  },
});

export default Musicplayer;
