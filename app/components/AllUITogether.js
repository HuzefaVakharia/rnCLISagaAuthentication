import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Card, Title} from 'react-native-paper';
//import { TextInput } from 'react-native-paper';
import {AntDesign} from '@expo/vector-icons';
import React, {useEffect, useRef, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
let {height, width} = Dimensions.get('window');

export default function AllUITogether(props) {
  /*Section for putting all const variable or hard coded value for all variable starts here  */

  /* Section for putting all const variable or hard coded value for all variable ends here */

  /* Section for putting all useState starts here: find this section in this file using keyword 'all useState' */

  const today = new Date();
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false); // open close modal

  const [startedDate, setStartedDate] = useState('12/12/2023');
  const [isLoadingForGalleryImages, setIsLoadingForGalleryImages] =
    useState(false);

  const [selectedChip, setSelectedChip] = useState(-1);

  const [previousImage, setPreviousImage] = useState(null);
  const [previousImages, setPreviousImages] = useState([]);

  let imageBaseAPI = 'https://rajeshwersoftsolution.com/jwelcart/public';

  const [
    largeDropDownForFetchingLocalDataclicked,
    setLargeDropDownForFetchingLocalDataclicked,
  ] = useState(false);

  const [threeLineButtonClicked, setthreeLineButtonClicked] = useState(false);

  const [cameraOrGalleryOptionsModal, setcameraOrGalleryOptionsModal] =
    useState(false);
  if (props.show == 'MyCustomeButtonWithIonIcon') {
    return (
      <View>
        <Button>
          <Ionicons name="add" size={24} />
        </Button>
      </View>
    );
  }
}
