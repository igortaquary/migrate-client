import { useEffect, useState } from "react";
import ReactImageUploading, {
  ImageListType,
  ErrorsType,
} from "react-images-uploading";
import "./index.scss";
import { PhotoToUpload } from "../../types/photo.type";
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
  maxFileSize: "O tamanho da imagem é maior que 1 MB",
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
  //const [images, setImages] = useState<ImageListType>([]);
  const [errors, setErrors] = useState<IErrors>({});

  const onChange = (list: ImageListType) => {
    // setImages(list.map((item, i) => ({ ...item, id: "", order: i })));
    console.log(list);
    setPhotos(
      list.map((item, i) => ({
        ...item,
        //url: item.dataURL,
        id: item.id,
        order: i,
      }))
    );
    setErrors({});
  };

  /* const handleFileCompress = async (imageFile: File) => {
    console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

    const options = {
      maxSizeMB: 1,
      //maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);
      console.log(
        `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
      ); // smaller than maxSizeMB
    } catch (error) {
      console.log(error);
    }
  }; */

  const handleComponentError = (errs?: ErrorsType) => {
    let trueErrs: string[] = [];
    if (errs) {
      trueErrs = Object.entries(errs)
        .filter((entry) => entry[1])
        .map((entry) => entry[0]);
    }
    if (photos.length < 1) {
      trueErrs = [...trueErrs, "minNumber"];
    }
    const messages: IErrors = {};
    trueErrs.forEach((key) => {
      messages[key as keyof IErrors] = errorMessages[key as keyof IErrors];
    });
    setErrors(messages);
  };

  const validate = () => {
    const errs: IErrors = {};
    if (photos.length < 1) {
      errs.minNumber = errorMessages.minNumber;
    }
    setErrors(errs);
    setIsValid(Object.keys(errs).length === 0);
  };

  useEffect(() => {
    if (submitting) validate();
  }, [submitting]);

  return (
    <div>
      <ReactImageUploading
        multiple
        value={photos}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey='url'
        maxFileSize={1000 * 1000} // 1 MB
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
              {photos.length < maxNumber && (
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
          </div>
        )}
      </ReactImageUploading>
      {Object.values(errors).map((error, i) => (
        <Alert variant='danger' key={i}>
          <i className='bi bi-x-circle'></i> {error}
        </Alert>
      ))}
    </div>
  );
};
