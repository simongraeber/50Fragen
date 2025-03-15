import React from 'react';
import { QuizQuestionExtension } from '@/types/QuizQuestionExtension';
import {
  AttachedImageEdit,
  AttachedImageGameMaster,
  AttachedImagePlay,
  deleteAttachedImage,
} from "./AttachedImageExtensions"

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

type DeleteExtensionFunction = (extension: QuizQuestionExtension) => Promise<void>;

export const extensionDeletionMap: Record<string, DeleteExtensionFunction> = {
  attachedImage: deleteAttachedImage,
  // otherExtensionType: deleteOtherExtension, // Add other deletions as needed
};

export async function deleteExtension(extension: QuizQuestionExtension) {
  const deletionFunc = extensionDeletionMap[extension.extensionType];
  if (deletionFunc) {
    await deletionFunc(extension);
  } else {
    console.warn('No deletion procedure defined for extension:', extension.extensionType);
  }
}

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