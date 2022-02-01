import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import firebase from 'firebase';


export default class PostScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      light_theme:true,
      likes:this.props.route.params.post.likes,
      is_liked:false,
    };
  }

  

  componentDidMount(){
    this.fetchUser();
  }

  
  likeAction = () => {
    if(this.state.is_liked){
      firebase
      .database()
      .ref('posts')
      .child(this.props.route.params.story_id)
      .child('likes')
      .set(firebase.database.ServerValue.increment(-1))
      this.setState({likes:this.state.likes-=1,is_liked:false})
    }else{
      firebase
      .database()
      .ref('posts')
      .child(this.props.route.params.story_id)
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
    if (!this.props.route.params) {
      this.props.navigation.navigate("Home");
    } 
    else {
      return (
        <View style={this.state.light_theme ? styles.containerLight : styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require("../assets/log0.png")}
                style={styles.iconImage}
              ></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text style={this.state.light_theme ? styles.appTitleTextLight : styles.appTitleText}>Spectagram</Text>
            </View>
          </View>
          <View style={styles.storyContainer}>
            <ScrollView style={styles.storyCard}>
              <Text style={styles.postAuthorText}>
                  {this.props.route.params.post.author}
                    <Image
                      source={require("../assets/profile_img.png")}
                      style={styles.profile_image}
                    ></Image>
                </Text>
              <Image
                source={require("../assets/image_1.jpg")}
                style={styles.image}
              ></Image>

              <View style={styles.dataContainer}>
                <View style={styles.titleTextContainer}>
                  <Text style={styles.postCaptionText}>
                    {this.props.route.params.post.caption}
                  </Text>
                  <Text style={styles.postCreatedOnTextText}>
                    {this.props.route.params.post.created_on}
                  </Text>
                </View>
              </View>
              <View style={styles.actionContainer}>
                <TouchableOpacity 
                  style={
                    this.state.is_liked ? styles.likeButtonLiked : styles.likeButtonDisliked
                  }
                  onPress={()=> this.likeAction()}
                  >
                <View style={styles.likeButton}>
                  <Ionicons name={"heart"} size={RFValue(30)} color={this.state.light_theme ? "black" : "white"} />
                  <Text style={styles.likeText}>
                    {this.state.likes}
                  </Text> 
                </View>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row"
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center"
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center"
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
  },
  storyContainer: {
    flex: 1
  },
  storyCard: {
    margin: RFValue(20),
    backgroundColor: "#231F20",
    borderRadius: RFValue(20)
  },
  image: {
    width: "100%",
    alignSelf: "center",
    height: RFValue(200),
    borderTopLeftRadius: RFValue(20),
    borderTopRightRadius: RFValue(20),
    resizeMode: "contain"
  },
  dataContainer: {
    flexDirection: "row",
    padding: RFValue(20)
  },
  titleTextContainer: {
    flex: 0.8
  },
  postCaptionText: {
    fontSize: RFValue(25),
    color: "white"
  },
  postAuthorText: {
    fontSize: RFValue(25),
    color: "white",
    marginLeft:80
  },
 
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: RFValue(10)
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    flexDirection: "row",
    backgroundColor: "#eb3948",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(30)
  },
  likeText: {
    color: "white",
    fontSize: RFValue(25),
    marginLeft: RFValue(5)
  },
  postCreatedOnTextText:{
    fontSize:RFValue(18),
    color:"white"
  },
   profile_image: {
    width: "10%",
    marginRight:-90,
    marginLeft:-160,
    height: RFValue(10),
    marginBottom:-1,
    borderRadius:120,
    resizeMode:"cover"
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
});