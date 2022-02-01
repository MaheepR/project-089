import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";

import firebase from "firebase";



export default class PostCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post_id: this.props.post.key,
      post_data: this.props.post.value,
      is_liked: false,
      likes: this.props.post.value.likes
    };
  }


  componentDidMount() {
    this.fetchUser();
  }

  likeAction = () => {
    if(this.state.is_liked){
      firebase
      .database()
      .ref('posts')
      .child(this.state.post_id)
      .child('likes')
      .set(firebase.database.ServerValue.increment(-1))
      this.setState({likes:this.state.likes-=1,is_liked:false})
    }else{
      firebase
      .database()
      .ref('posts')
      .child(this.state.post_id)
      .child('likes')
      .set(firebase.database.ServerValue.increment(1))
      this.setState({likes:this.state.likes+=1,is_liked:true})
    }
  };

  fetchUser = () => {
    let theme;
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", snapshot => {
        theme = snapshot.val().current_theme;
        this.setState({ light_theme: theme === "light" });
      });
  };

  render() {
    let post = this.state.post_data;
    
      let images = {
        image_1: require("../assets/image_1.jpg"),
        image_2: require("../assets/image_2.jpg"),
        image_3: require("../assets/image_3.jpg"),
        image_4: require("../assets/image_4.jpg"),
        image_5: require("../assets/image_5.jpg"),
	      image_6: require("../assets/image_6.jpg"),
	      image_7: require("../assets/image_7.jpg")
      };

      return (
        <TouchableOpacity
          style={styles.container}
          onPress={() =>
            this.props.navigation.navigate("PostScreen", {
              post: post
            })
          }
        >
          <SafeAreaView style={styles.droidSafeArea} />
          <View
            style={
                styles.cardContainer
            }
          >
            <Image
              source={images[post.preview_image]}
              style={styles.postImage}
            ></Image>

            <View style={styles.postContainer}>
              <View style={styles.postTextContainer}>
                <Text
                  style={
                    styles.postAuthorText
                  }
                >
                  {post.author}
                </Text>
                <Text
                  style={
                   styles.captionText
                  }
                >
                  {post.caption}
                </Text>
              </View>
            </View>

            <View style={styles.actionContainer}>
              <TouchableOpacity
                style={
                  this.state.is_liked
                    ? styles.likeButtonLiked
                    : styles.likeButtonDisliked
                }
                onPress={() => this.likeAction()}
              >
                <Ionicons
                  name={"heart"}
                  size={RFValue(30)}
                  color={this.state.light_theme ? "black" : "white"}
                />

                <Text
                  style={
                     styles.likeText
                  }
                >
                  {this.state.likes}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  }


const styles = StyleSheet.create({
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  cardContainer: {
    margin: RFValue(13),
    backgroundColor: "#231F20",
    borderRadius: RFValue(20)
  },
  postImage: {
    resizeMode: "contain",
    width: "95%",
    alignSelf: "center",
    height: RFValue(250)
  },
  postContainer: {
    paddingLeft: RFValue(20),
    justifyContent: "center"
  },
  postTextContainer: {
    flex: 0.8
  },
 
  postAuthorText: {
    fontSize: RFValue(15),
    color: "white",
    marginTop: -620,
    marginLeft: 90,
  },


  captionText: {
    fontSize: RFValue(14),
    color: "white",
    justifyContent :"center",
    marginTop:200,
    padding:10
  },
 
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: RFValue(10)
  },
  likeButtonLiked: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#eb3948",
    borderRadius: RFValue(30),
  },
  likeButtonDisliked: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderColor: "#eb3948",
    borderWidth: 2,
    borderRadius: RFValue(30),
  },
  likeText: {
    color: "white",
    fontSize: 25,
    marginLeft: 25,
    marginTop: 6
  },
});
