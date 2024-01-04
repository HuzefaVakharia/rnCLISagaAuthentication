import {StyleSheet} from 'react-native';

export const plus_style = StyleSheet.create({
  content: {
    margin: 5,
    position: 'absolute',
    zIndex: 3,
  },
  texts_create_cards: {
    color: 'white',
    height: 120,
    textShadowColor: 'rgba(0, 0, 0, 0.50)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 15,
    overflow: 'hidden',
  },
  action_style: {
    alignSelf: 'flex-end',
  },
  report_card_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  report_card: {
    width: '47%',
    marginTop: 5,
    marginBottom: 5,
  },
  report_content: {
    padding: 5,
    backgroundColor: '#00000044',
    borderRadius: 10,
  },
});
