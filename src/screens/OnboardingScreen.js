import React from 'react';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LottieView from 'lottie-react-native';

const {width, height} = Dimensions.get('window');
const COLORS = {primary: '#282534', white: '#fff', red: '#da0139', black: '#000000'};
const slides = [
  {
    id: '1',
    image: require('../images/58915-online-shop.json'),
    title: "Welcome to Arl-Tech's Mini Market For Suppliers",
    subtitle: 'Manufacturers & supplier can list their products, receive orders from customer and get notified when the order comes in.',
  },
  {
    id: '2',
    image: require('../images/75777-isometric-production-chain-industry.json'),
    title: 'Digital Solution To Your Materials',
    subtitle: 'Provide your vital supplies to the construction business and track statistics on sales, amount spent on marketing . ',
  },
  {
    id: '3',
    image: require('../images/93168-team.json'),
    title: 'Increase Your Value',
    subtitle: 'The app will allow both the suppliers and buyers to see each other’s orders, payments, and other details',
  },
];

const Slide = ({item}) => {
  return (
    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1,}}>
        <View style={{
            height: "50%",
            justifyContent: 'center',
            alignItems: 'center'
            // backgroundColor: 'pink'
        }}>
     
      <LottieView
      source={item?.image}
      colorFilters={[
        {
          keypath: 'button',
          color: '#F00000',
        },
        {
          keypath: 'Sending Loader',
          color: '#F00000',
        },
      ]}
      style={styles.image1}
      autoPlay
    //   loop ={false}
    />

      </View>
      <View style={{justifyContent: 'center', alignItems: 'center', width}}>
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.subtitle}>{item?.subtitle}</Text>
      </View>
    </View>
  );
};

const OnboardingScreen = ({navigation}) => {
    const Header = () => {
        return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
        source={require('../images/headerLogo.png')}
        style={{ height: 65, width: 200 }}
      />
        </View>
        )
    }
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();
  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({offset});
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({offset});
    setCurrentSlideIndex(lastSlideIndex);
  };

  const Footer = () => {
    return (
      <View
        style={{
          height: height * 0.25,
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}>
        {/* Indicator container */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            // marginTop: 20,
          }}>
          {/* Render indicator */}
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex == index && {
                  backgroundColor: COLORS.red ,
                  width: 25,
                },
              ]}
            />
          ))}
        </View>

        {/* Render buttons */}
        <View style={{marginBottom: 20}}>
          {currentSlideIndex == slides.length - 1 ? (
            <View style={{height: 50}}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.replace('ParentNavigation')}>
                <Text style={{fontWeight: 'bold', fontSize: 15}}>
                  GET STARTED
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.btn,
                  {
                    borderColor: COLORS.red,
                    borderWidth: 1,
                    backgroundColor: 'transparent',
                  },
                ]}
                onPress={skip}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    color: COLORS.red,
                  }}>
                  SKIP
                </Text>
              </TouchableOpacity>
              <View style={{width: 15}} />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={goToNextSlide}
                style={styles.btn}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}>
                  NEXT
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff40'}}>
      <StatusBar backgroundColor={COLORS.primary} />
      <Header />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{height: "95%"}}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({item}) => <Slide item={item} />}
      />
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    color: COLORS.black,
    fontSize: 15,
    marginTop: 10,
    maxWidth: '70%',
    textAlign: 'center',
    lineHeight: 23,
  },
  image1: {
    opacity: 1,
    height: '90%', 
    resizeMode: 'contain',
  },
  title: {
    color: COLORS.black ,
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  indicator: {
    height: 2.5,
    width: 10,
    backgroundColor: 'grey',
    marginHorizontal: 3,
    borderRadius: 2,
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    borderColor: 'fdee87',
    backgroundColor: '#fdee87',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default OnboardingScreen;