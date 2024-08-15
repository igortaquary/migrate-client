import { useContext, useEffect, useState } from "react";
import ReactImageUploading, {
  ImageListType,
  ErrorsType,
} from "react-images-uploading";
import "./index.scss";
import { PhotoToUpload } from "../../types/photo.type";
import { Alert, Button } from "react-bootstrap";
import { LodgeFormContext } from "../../contexts/LodgeFormContext";

interface IErrors {
  maxFileSize?: string;
  maxNumber?: string;
  acceptType?: string;
  resolution?: string;
  minNumber?: string; // custom
}

const maxNumber = 3;

const errorMessages: IErrors = {
  maxFileSize: "O tamanho da imagem é maior que 200 kB",
  acceptType: "O tipo de arquivo não é permitido",
  maxNumber: "O número maximo de imagens é " + maxNumber,
  minNumber: "Adicione pelo menos uma foto ao anúncio",
  resolution: "Resolução inadequada",
};

export const LodgeImageUpload = () => {
  const { setPhotosToUpload, prevStep, lodgeToEdit, changeStepValidity } =
    useContext(LodgeFormContext);

  const [photos, setPhotos] = useState<PhotoToUpload[]>(
    lodgeToEdit?.photos.map((p) => ({ ...p, action: "edit" })) || []
  );
  const [errors, setErrors] = useState<IErrors>({});

  const onChange = (list: ImageListType) => {
    setPhotos(
      list.map((item, i) => ({
        id: item.id,
        url: item.url,
        order: i,
        action: item.id ? "edit" : "create",
      }))
    );
    setErrors({});
  };

  const getDiff = () => {
    const oldPhotos = lodgeToEdit?.photos || [];
    const photosToDelete: PhotoToUpload[] = oldPhotos
      .filter((oldPhoto) => !photos.some((photo) => photo.id === oldPhoto.id))
      .map((p) => ({ ...p, action: "delete" }));

    const photosToCreate: PhotoToUpload[] = photos.filter(
      (p) => p.action === "create"
    );

    const photosToEdit: PhotoToUpload[] = photos.filter(
      (p) => p.action === "edit"
    );

    // TODO: edit saved photo order
    const photosToUpload = [...photosToDelete, ...photosToCreate];
    console.log(photosToUpload);
    setPhotosToUpload(photosToUpload);
  };

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
    if (Object.keys(errs).length === 0) {
      getDiff();
      changeStepValidity(2, true);
      // nextStep();
    } else {
      changeStepValidity(2, false);
    }
  };

  return (
    <div>
      <h2 className='mb-3'>Fotos</h2>
      <p>Adicione algumas fotos da acomodação</p>
      <ReactImageUploading
        multiple
        value={photos}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey='url'
        maxFileSize={200 * 1000} // 200 kB
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
                    /* onClick={() => onImageUpdate(index)} */
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
      <div className='d-flex align-items-center justify-content-end my-3 gap-4'>
        <Button
          onClick={prevStep}
          type='button'
          variant='secondary'
          className='px-5'
        >
          Voltar
        </Button>
        <Button
          onClick={validate}
          type='button'
          variant='primary'
          className='px-5'
        >
          {lodgeToEdit ? "Salvar" : "Criar"}
        </Button>
      </div>
    </div>
  );
};
