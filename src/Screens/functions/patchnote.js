import { useState } from 'react';

const patchnote = () => {
  const [newPatch, setNewPatch] = useState(null);
  const [newPatchOptions, setNewPatchOptions] = useState(null);

  const patch = (unreadPatchNotes, locale) => {
    const options = ({
      title: locale.patch.title,
      version: locale.patch.version,
      updates: locale.patch.updates,
      fix: locale.patch.fix,
      issue: locale.patch.issue,
      textReadMore: locale.patch.readMore,
      textConfirm: locale.patch.confirm,
    });

    const data = unreadPatchNotes ? unreadPatchNotes.map((patchNote) => ({
      id: patchNote.id,
      date: patchNote.createdAt,
      versionNum: patchNote.version,
      updatesList: patchNote.updates,
      fixList: patchNote.fix,
      issueList: patchNote.issue,
    })): [];
    setNewPatch(data);
    setNewPatchOptions(options);
  };

  return {
    newPatch,
    newPatchOptions,
    patch
  };
};

export default patchnote;
