import React, { useId, useState } from "react"
import { QuizQuestionExtension, AttachedImageExtension } from '@/types/QuizQuestionExtension';
import { deleteFile, uploadFile } from "@/api/fileUploaded.ts"
import { Input } from "@/components/ui/input.tsx"
import { LuUpload } from "react-icons/lu";
import { Button } from "@/components/ui/button.tsx"
import { showQuestionExtension } from "@/api/quizGame.ts"
import { Card } from "@/components/ui/card.tsx"
import { useTranslation } from "react-i18next"
import { Skeleton } from "@/components/ui/skeleton.tsx"

export const deleteAttachedImage = async (extension: QuizQuestionExtension) => {
  const attachedExt = extension as AttachedImageExtension;
  if (attachedExt.imageUrl) {
    if (attachedExt.imageUrl !== "") {
     try{
      await deleteFile(attachedExt.imageUrl);
     }
     catch (e) {
       console.error("Error deleting file", e);
     }
    }
  }
};

export type EditProps = {
  extension: QuizQuestionExtension;
  onExtensionChange?: (newExtension: QuizQuestionExtension) => void;
};

export const AttachedImageEdit: React.FC<EditProps> = ({
                                                         extension,
                                                         onExtensionChange,
                                                       }) => {
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputId = useId();

  // Handle file selection from click
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const oldImageUrl = (extension as AttachedImageExtension).imageUrl;
      const newImageUrl = await uploadFile(file, "public");
      if (onExtensionChange) {
        onExtensionChange({ ...extension, imageUrl: newImageUrl.fileURL });
      }
      await deleteFile(oldImageUrl)
    }
    setLoading(false);
  };

  // Handle dragging events
  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragActive(false);
  };

  // Handle file dropped on the container
  const handleDrop = async (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragActive(false);
    setLoading(true);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      const newImageUrl = await uploadFile(file, "public");
      if (onExtensionChange) {
        onExtensionChange({ ...extension, imageUrl: newImageUrl.fileURL });
      }
      e.dataTransfer.clearData();
    }
    setLoading(false);
  };

  const imageUrl = (extension as AttachedImageExtension).imageUrl;
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center space-y-4">
      <label
        htmlFor={fileInputId}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        className={`cursor-pointer block w-full p-4 transition-colors ${
          dragActive ? "bg-accent" : "hover:bg-accent"
        }`}
      >
        {loading ? (
          <Skeleton className="w-full h-40" />
        ) : imageUrl ? (
          <div className="flex flex-col items-center">
            <img
              src={imageUrl}
              alt="Uploaded preview"
              className="max-w-full h-auto rounded-md shadow-sm"
            />
            <p className="mt-2 text-sm text-secondary-foreground">{t("ex_click_file_change")}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-40">
            <LuUpload className="text-4xl text-secondary-foreground"/>
            <p className="mt-2 text-sm text-secondary-foreground">
              {t("ex_click_drag_drop")}
            </p>
          </div>
        )}
      </label>
      <Input
        id={fileInputId}
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};

type GameMasterProps = {
  extension: QuizQuestionExtension;
  quizId: string;
};

export const AttachedImageGameMaster: React.FC<GameMasterProps> = ({ extension, quizId }) => {
  const handleShowImage = () => {
    showQuestionExtension(quizId, extension)
  };

  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between p-2">
      <Card className="overflow-hidden">
        <img
          src={(extension as AttachedImageExtension).imageUrl}
          alt="attached"
          width="100"
        />
      </Card>
      <Button onClick={handleShowImage}>{t("ex_showImage")}</Button>
    </div>
  );
};

type PlayProps = {
  extension: QuizQuestionExtension;
};

export const AttachedImagePlay: React.FC<PlayProps> = ({ extension }) => {
  return (
    <Card className="overflow-hidden">
      <img
        src={(extension as AttachedImageExtension).imageUrl}
        alt="attached"
        className="w-full h-auto object-cover"
      />
    </Card>
  );
};