import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, FlatList, ActivityIndicator } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import { ThemeContext, shadow } from '../../../components/theme';

import {
  PatchContainer,
  PatchContent,
  PatchLoading,
  PatchHeader,
  PatchHeaderSection,
  PatchTitle,
  PatchDiv,
  PatchBody,
  PatchNoteVersionSection,
  PatchNoteVersion,
  PatchSection,
  PatchNoteTitles,
  PatchList,
  PatchListItem,
  PatchFooter,
  PatchReadMoreButton,
  PatchConfirmButton,
  PatchButtonText
} from '..';

const PatchNote = ({ data, options, setHasUpdate, setReadedPatch }) => {
  const {theme} = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);

  const onReadMore = async (patchId) => {
    console.log(`https://cluey.pt/blog/patchnotes/${patchId}`);
  }
  
  const onReadMoreAll = async () => {
    console.log('https://cluey.pt/blog/patchnotes/');
  }
  
  const onGotThis = async () => {
    setLoading(true);
    try {
      const patchId = data?.map((item) => {return item.id});
      await setReadedPatch(patchId);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setHasUpdate(false);
  }

  const RenderPatchNote = ({ item }) => {
    return (
      <PatchBody>
        <PatchNoteVersionSection onPress={() => onReadMore(item.id)}>
          <PatchNoteVersion theme={theme}>{options.version}</PatchNoteVersion>
          <PatchDiv theme={theme}>-</PatchDiv>
          <PatchNoteVersion theme={theme}>{item.versionNum}</PatchNoteVersion>
          <PatchDiv theme={theme}>-</PatchDiv>
          <PatchNoteVersion theme={theme}>{item.date}</PatchNoteVersion>
          <Feather name="external-link" style={{marginLeft: 10}} size={18} color={theme.textDark} />
        </PatchNoteVersionSection>
        <PatchSection>
          {item.updatesList.length > 0 ?
            <PatchNoteTitles>{options.updates}</PatchNoteTitles>
            :null}
          {item.updatesList && item.updatesList.map((item, index) => (
            <PatchList key={index}>
              <MaterialIcons name="update" size={19} color={theme.textDark} />
              <PatchListItem>{item}</PatchListItem>
            </PatchList>
          ))}
          {item.fixList.length > 0 ?
            <PatchNoteTitles>{options.fix}</PatchNoteTitles>
            :null}
          {item.fixList && item.fixList.map((item, index) => (
            <PatchList key={index}>
              <MaterialIcons name="check" size={19} color={theme.textDark} />
              <PatchListItem>{item}</PatchListItem>
            </PatchList>
          ))}
          {item.issueList.length > 0 ?
            <PatchNoteTitles>{options.issue}</PatchNoteTitles>
            :null}
          {item.issueList && item.issueList.map((item, index) => (
            <PatchList key={index}>
              <MaterialIcons name="bug-report" size={19} color={theme.textDark} />
              <PatchListItem>{item}</PatchListItem>
            </PatchList>
          ))}
        </PatchSection>
      </PatchBody>
    );
  };

  RenderPatchNote.propTypes = {
    item: PropTypes.object.isRequired
  };

  return (
    <Modal transparent={true}>
      {loading ? 
        <PatchContainer theme={theme}>
          <PatchContent theme={theme} style={shadow}>
            <PatchLoading>
              <ActivityIndicator size="large" color={theme.text} />
            </PatchLoading>
          </PatchContent>
        </PatchContainer>
        :
        <PatchContainer theme={theme}>
          <PatchContent theme={theme} style={shadow}>
            <PatchHeader theme={theme}>
              <PatchHeaderSection>
                <PatchTitle>{options.title}</PatchTitle> 
              </PatchHeaderSection>
            </PatchHeader>
            {data ?
              <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <RenderPatchNote item={item} />}
              />
              : null}
            <PatchFooter>
              <PatchReadMoreButton theme={theme} onPress={onReadMoreAll}>
                <PatchButtonText theme={theme}>{options.textReadMore}</PatchButtonText>
                <Feather name="external-link" style={{marginLeft: 5}} size={16} color={theme.text} />
              </PatchReadMoreButton>
              <PatchConfirmButton theme={theme} onPress={onGotThis}>
                <PatchButtonText theme={theme}>{options.textConfirm}</PatchButtonText>
              </PatchConfirmButton>
            </PatchFooter>
          </PatchContent>
        </PatchContainer>
      }
    </Modal>
  );
};

PatchNote.propTypes = {
  data: PropTypes.array.isRequired,
  options: PropTypes.object.isRequired,
  setHasUpdate: PropTypes.func.isRequired,
  setReadedPatch: PropTypes.func.isRequired
};

export default PatchNote;