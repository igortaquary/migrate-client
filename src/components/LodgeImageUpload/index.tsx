import { useEffect, useState } from "react";
import ReactImageUploading, {
  ImageListType,
  ErrorsType,
} from "react-images-uploading";
import "./index.scss";
import { Photo, PhotoToUpload } from "../../types/photo.type";
import { Alert } from "react-bootstrap";

interface ILodgeImageUpload {
  submitting: boolean;
  photos: PhotoToUpload[];
  setPhotos: (value: PhotoToUpload[]) => void;
  setIsValid: (value: boolean) => void;
}

interface IErrors {
  maxFileSize?: string;
  maxNumber?: string;
  acceptType?: string;
  resolution?: string;
  minNumber?: string; // custom
}

const maxNumber = 3;

const errorMessages: IErrors = {
  maxFileSize: "O tamanho da imagem é maior que 50 kB",
  acceptType: "O tipo de arquivo não é permitido",
  maxNumber: "O número maximo de imagens é " + maxNumber,
  minNumber: "Adicione pelo menos uma foto ao anúncio",
  resolution: "Resolução inadequada",
};

export const LodgeImageUpload = ({
  submitting,
  setIsValid,
  photos,
  setPhotos,
}: ILodgeImageUpload) => {
  const [images, setImages] = useState<ImageListType>([]);
  const [errors, setErrors] = useState<IErrors>({});

  const onChange = (list: ImageListType) => {
    setImages(list.map((item, i) => ({ ...item, id: "", order: i })));
  };

  const handleComponentError = (errs?: ErrorsType) => {
    let trueErrs: string[] = [];
    if (errs) {
      trueErrs = Object.entries(errs)
        .filter((entry) => entry[1])
        .map((entry) => entry[0]);
    }
    if (images.length < 1) {
      trueErrs = [...trueErrs, "minNumber"];
    }
    const messages: IErrors = {};
    trueErrs.forEach((key) => {
      messages[key as keyof IErrors] = errorMessages[key as keyof IErrors];
    });
    setErrors(messages);
  };

  const validate = () => {
    if (images.length < 1) {
      setErrors({
        ...errors,
        minNumber: errorMessages.minNumber,
      });
      return;
    }
    setIsValid(Object.keys(errors).length === 0);
  };

  useEffect(() => {
    if (submitting) validate();
  }, [submitting]);

  const renderError = (message: string) => {
    return <Alert>{message}</Alert>;
  };

  return (
    <ReactImageUploading
      multiple
      value={images}
      onChange={onChange}
      maxNumber={maxNumber}
      dataURLKey='url'
      maxFileSize={50 * 1000} // 50 kB
      acceptType={["jpg", "png"]}
      allowNonImageType={false}
      onError={handleComponentError}
    >
      {({
        imageList,
        onImageUpload,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
      }) => (
        <div>
          <div className='images-upload-wrapper'>
            {imageList.map((image, index) => (
              <div key={index} className='image-item'>
                <img
                  onClick={() => onImageUpdate(index)}
                  src={image["url"]}
                  alt=''
                  width='100%'
                />
                <button
                  type='button'
                  className='remove-button'
                  onClick={() => onImageRemove(index)}
                >
                  <i className='bi bi-x-circle'></i>
                </button>
              </div>
            ))}
            {images.length < maxNumber && (
              <button
                type='button'
                className='image-item add-image-button'
                style={isDragging ? { color: "red" } : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
                <i className='bi bi-plus-circle'></i>
                Clique ou arraste a imagem aqui
              </button>
            )}
          </div>
          {errors?.acceptType && renderError("")}
          {errors?.maxFileSize && renderError("")}
        </div>
      )}
    </ReactImageUploading>
  );
};
