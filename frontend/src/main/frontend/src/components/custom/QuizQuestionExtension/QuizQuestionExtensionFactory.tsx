import React from 'react';
import { QuizQuestionExtension } from '@/types/QuizQuestionExtension';
import { AttachedImageEdit, AttachedImageGameMaster, AttachedImagePlay } from './AttachedImageExtensions';

export type DisplayMode = 'edit' | 'gameMaster' | 'play';

type ExtensionComponentMap = {
  [extensionType: string]: Record<DisplayMode, React.FC<any>>;
};

const extensionComponentMap: ExtensionComponentMap = {
  attachedImage: {
    edit: AttachedImageEdit,
    gameMaster: AttachedImageGameMaster,
    play: AttachedImagePlay,
  },
  // nextExtension: {
  //   edit: NextExtensionEdit,
  //   gameMaster: NextExtensionGameMaster,
  //   play: NextExtensionPlay,
  // },
};

type QuizQuestionExtensionFactoryProps = {
  extension: QuizQuestionExtension;
  displayType: DisplayMode;
  onExtensionChange?: (extension: QuizQuestionExtension) => void;
  quizId?: string;
};

export const QuizQuestionExtensionFactory: React.FC<QuizQuestionExtensionFactoryProps> = ({
                                                                                            extension,
                                                                                            displayType,
                                                                                            onExtensionChange,
                                                                                            quizId,
                                                                                          }) => {
  const ExtensionComponent = extensionComponentMap[extension.extensionType]?.[displayType];

  if (!ExtensionComponent) {
    console.log("Extension not supported:", extension);
    return <div>Extension not supported: {extension.extensionType}</div>;
  }

  return <ExtensionComponent
    extension={extension}
    onExtensionChange={onExtensionChange}
    quizId={quizId}
  />;
};