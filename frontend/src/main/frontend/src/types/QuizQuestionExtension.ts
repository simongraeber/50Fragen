export interface BaseQuizQuestionExtension {
  id: string;
  extensionType: string;
}

export interface AttachedImageExtension extends BaseQuizQuestionExtension {
  extensionType: "attachedImage";
  imageUrl: string;
}

export type QuizQuestionExtension = AttachedImageExtension; // | NextExtension | … etc.