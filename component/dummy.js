<SafeAreaView style={styles.container}>
<View style={styles.maincontainer}>
    <View style={{width:width}}>
  {/* <Animated.FlatList
  ref={songSlider}
    data={songs}
    renderItem={renderSongs}
    keyExtractor={(item = item.id)}
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
      {useNativeDriver: true},
    )}
  /> */}
</View>
  {/* <View>
    <Text style={styles.title}>{songs[songIndex].title}</Text>
    <Text style={styles.songName}>{songs[songIndex].artist}</Text>
  </View> */}
  <View>
    <Slider
      style={styles.progessBar}
      value={10}
      minimumValue={0}
      maximumValue={100}
      thumbTintColor="#FFD369"
      minimumTrackTintColor="#FFD369"
      maximumTrackTintColor="#FFF"
      onSlidingComplete={() => {}}
    />
    <View style={styles.progessBarlabel}>
      <Text style={styles.progessBarlabeltxt}>"0:00"</Text>
      <Text style={styles.progessBarlabeltxt}>"3:40"</Text>
    </View>
    <View style={styles.musicControl}> </View>
    <TouchableOpacity onPress={skiptoPre}>
      <Ionicons
        name="play-skip-back-outline"
        size={30}
        color="#FFD369"
      />
    </TouchableOpacity>
    <TouchableOpacity>
      <Ionicons name="ios-pause-circle" size={30} color="#FFD369" />
    </TouchableOpacity>
    <TouchableOpacity onPress={skiptoNext}>
      <Ionicons
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
    <TouchableOpacity>
      <Ionicons name="repeat" size={30} color="#777777" />
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