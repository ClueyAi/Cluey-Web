import React, { useEffect} from 'react';
import { View, Text, Image } from 'react-native';

const NotFound = () => {

  useEffect(() => {
    window.location.href = '/';
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require('../../../../assets/images/cluey-sad-white.png')} />
      <Text style={styles.text}>Página não encontrada</Text>
      <Text style={styles.p}>A página que procura não existe ou foi movida.</Text>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  p: {
    fontSize: 16,
    fontWeight: 'regular',
    marginTop: 10,
  },
  img: {
    width: 160,
    height: 238,
  },
};

export default NotFound;
