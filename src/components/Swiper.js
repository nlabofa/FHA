/**
 * Swiper
 * Renders a swipable set of screens passed as children,
 * pagination indicators and a button to swipe through screens
 * or to get out of the flow when the last screen is reached
 */

import React, { Component } from "react";
import {
  TouchableOpacity,
  Dimensions, // Detects screen dimensions
  Platform, // Detects platform running the app
  ScrollView, // Handles navigation between screens
  StyleSheet,
  Text, // CSS-like styles
  View // Container component
} from "react-native";
//import { MediumText } from "../../components/AppText";
//import Icon from "react-native-vector-icons/Ionicons";

// Detect screen width and height
const { width, height } = Dimensions.get("window");
import Button from "../components/Button/Button";
import { NavigationActions, StackActions } from "react-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RegularText } from "./AppText";

export default class Swiper extends Component {
  resetTo = route => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: route,
          params: {}
        })
      ]
    });
    this.props.navigation.dispatch(resetAction);
  };
  // Props for ScrollView component
  static defaultProps = {
    // Arrange screens horizontally
    horizontal: true,
    // Scroll exactly to the next screen, instead of continous scrolling
    pagingEnabled: true,
    // Hide all scroll indicators
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
    // Do not bounce when the end is reached
    bounces: false,
    // Do not scroll to top when the status bar is tapped
    scrollsToTop: false,
    // Remove offscreen child views
    removeClippedSubviews: true,
    // Do not adjust content behind nav-, tab- or toolbars automatically
    automaticallyAdjustContentInsets: false,
    // Fisrt is screen is active
    index: 0
  };
  goback = () => {
    //this.setState({ index: this.state.index - 1 });
    // Ignore if already scrolling or if there is less than 2 slides
    if (this.internals.isScrolling || this.state.total < 2) {
      return;
    }

    const state = this.state,
      diff = this.state.index - 1,
      x = diff * state.width,
      y = 0;

    // Call scrollTo on scrollView component to perform the swipe
    this.scrollView && this.scrollView.scrollTo({ x, y, animated: true });

    // Update internal scroll state
    this.internals.isScrolling = true;

    // Trigger onScrollEnd manually on android
    if (Platform.OS === "android") {
      setImmediate(() => {
        this.onScrollEnd({
          nativeEvent: {
            position: diff
          }
        });
      });
    }
  };
  state = this.initState(this.props);

  /**
   * Initialize the state
   */
  initState(props) {
    // Get the total number of slides passed as children
    const total = props.children ? props.children.length || 1 : 0,
      // Current index
      index = total > 1 ? Math.min(props.index, total - 1) : 0,
      // Current offset
      offset = width * index;

    const state = {
      total,
      index,
      offset,
      width,
      height
    };

    // Component internals as a class property,
    // and not state to avoid component re-renders when updated
    this.internals = {
      isScrolling: false,
      offset
    };

    return state;
  }

  /**
   * Scroll begin handler
   * @param {object} e native event
   */
  onScrollBegin = e => {
    // Update internal isScrolling state
    this.internals.isScrolling = true;
  };

  /**
   * Scroll end handler
   * @param {object} e native event
   */
  onScrollEnd = e => {
    // Update internal isScrolling state
    this.internals.isScrolling = false;

    // Update index
    this.updateIndex(
      e.nativeEvent.contentOffset
        ? e.nativeEvent.contentOffset.x
        : // When scrolled with .scrollTo() on Android there is no contentOffset
          e.nativeEvent.position * this.state.width
    );
  };

  /*
   * Drag end handler
   * @param {object} e native event
   */
  onScrollEndDrag = e => {
    const {
        contentOffset: { x: newOffset }
      } = e.nativeEvent,
      { children } = this.props,
      { index } = this.state,
      { offset } = this.internals;

    // Update internal isScrolling state
    // if swiped right on the last slide
    // or left on the first one
    if (
      offset === newOffset &&
      (index === 0 || index === children.length - 1)
    ) {
      this.internals.isScrolling = false;
    }
  };

  /**
   * Update index after scroll
   * @param {object} offset content offset
   */
  updateIndex = offset => {
    const state = this.state,
      diff = offset - this.internals.offset,
      step = state.width;
    let index = state.index;

    // Do nothing if offset didn't change
    if (!diff) {
      return;
    }

    // Make sure index is always an integer
    index = parseInt(index + Math.round(diff / step), 10);

    // Update internal offset
    this.internals.offset = offset;
    // Update index in the state
    this.setState({
      index
    });
  };

  /**
   * Swipe one slide forward
   */
  swipe = () => {
    // Ignore if already scrolling or if there is less than 2 slides
    if (this.internals.isScrolling || this.state.total < 2) {
      return;
    }

    const state = this.state,
      diff = this.state.index + 1,
      x = diff * state.width,
      y = 0;

    // Call scrollTo on scrollView component to perform the swipe
    this.scrollView && this.scrollView.scrollTo({ x, y, animated: true });

    // Update internal scroll state
    this.internals.isScrolling = true;

    // Trigger onScrollEnd manually on android
    if (Platform.OS === "android") {
      setImmediate(() => {
        this.onScrollEnd({
          nativeEvent: {
            position: diff
          }
        });
      });
    }
  };

  /**
   * Render ScrollView component
   * @param {array} slides to swipe through
   */
  renderScrollView = pages => {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          ref={component => {
            this.scrollView = component;
          }}
          {...this.props}
          contentContainerStyle={[styles.wrapper, this.props.style]}
          onScrollBeginDrag={this.onScrollBegin}
          onMomentumScrollEnd={this.onScrollEnd}
          onScrollEndDrag={this.onScrollEndDrag}
        >
          {pages.map((page, i) => (
            // Render each slide inside a View
            <View style={[styles.fullScreen, styles.slide]} key={i}>
              {page}
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

  /**
   * Render pagination indicators
   */
  renderPagination = () => {
    if (this.state.total <= 1) {
      return null;
    }

    const ActiveDot = <View style={[styles.dot, styles.activeDot]} />,
      Dot = <View style={styles.dot} />;

    let dots = [];

    for (let key = 0; key < this.state.total; key++) {
      dots.push(
        key === this.state.index
          ? // Active dot
            React.cloneElement(ActiveDot, { key })
          : // Other dots
            React.cloneElement(Dot, { key })
      );
    }

    return (
      <View pointerEvents="none" style={[styles.pagination, styles.fullScreen]}>
        {dots}
      </View>
    );
  };

  /**
   * Render Continue or Done button
   */
  renderButton = () => {
    const lastScreen = this.state.index === this.state.total - 1;
    const showArrow = this.state.index != 0 ? true : false;
    let arrowback = (
      <TouchableOpacity
        onPress={() => this.goback()}
        style={{ position: "absolute", left: 25, top: -10 }}
      >
        {/*<Icon name="ios-arrow-round-back" size={45} color="black" />*/}
      </TouchableOpacity>
    );
    return (
      <View
        pointerEvents="box-none"
        style={[styles.buttonWrapper, styles.fullScreen]}
      >
        {lastScreen ? (
          // Show this button on the last screen
          // TODO: Add a handler that would send a user to your app after onboarding is complete

          <TouchableOpacity style={[styles.button, styles.absimg]}>
            <RegularText>NEXT</RegularText>
          </TouchableOpacity>
        ) : (
          // Or this one otherwise
          <Ionicons
            onPress={() => this.resetTo("Step1")}
            style={styles.absimg}
            name="md-play"
            color="#fff"
            size={45}
          />

          //<Button text="SKIP" onPress={() => this.swipe()} />
        )}
        {/* {showArrow ? arrowback : null} */}
      </View>
    );
  };

  /**
   * Render the component
   */
  render = ({ children } = this.props) => {
    return (
      <View style={[styles.container, styles.fullScreen]}>
        {/* Render screens */}
        {this.renderScrollView(children)}
        {/* Render pagination */}
        {/* {this.renderPagination()} */}
        {/* Render Continue or Done button */}
        {/* {this.renderButton()} */}
      </View>
    );
  };
}

const styles = StyleSheet.create({
  // Set width and height to the screen size
  text: {
    fontSize: 16,
    color: "black",
    lineHeight: 25
  },
  // wrapper: {
  //   height:'100%
  // },
  fullScreen: {
    width: width,
    height: height
  },
  // Main container
  container: {
    backgroundColor: "transparent",
    flex: 1,
    position: "relative"
  },
  // Slide
  slide: {
    backgroundColor: "transparent"
  },
  // Pagination indicators
  pagination: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end"
    //backgroundColor: "red"
  },
  // Pagination dot
  dot: {
    backgroundColor: "#fff",
    opacity: 0.5,
    width: 9,
    height: 9,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3
  },
  // Active dot
  activeDot: {
    backgroundColor: "#fff",
    opacity: 1
  },
  // Button wrapper
  buttonWrapper: {
    position: "absolute",
    //backgroundColor: "red",
    flex: 1
  },
  absimg: {
    textAlign: "center",
    position: "absolute",
    zIndex: 10000000,
    top: 450,
    left: 0,
    right: 0,
    margin: "auto",
    justifyContent: "center",
    alignSelf: "center",
    alignContent: "center",
    alignItems: "center"
  },
  button: {
    width: "70%",
    borderRadius: 4,
    padding: 18,
    //height: 50,
    justifyContent: "center",
    alignSelf: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  }
});
