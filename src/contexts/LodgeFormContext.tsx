import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  ContactInfo,
  DirectionMode,
  Gender,
  Lodge,
  LodgeType,
  SpaceType,
} from "../types/lodge.types";
import { createLodge, updateLodge } from "../services/lodge.service";
import { Step } from "../components/Stepper";
import { PhotoToUpload } from "../types/photo.type";
import { Location } from "../types/location.types";
import { useLocation, useNavigate } from "react-router-dom";
import showNotification from "../components/GlobalAlert";
import { Loader } from "../components/Loader";

export type LodgeDetails = Omit<Lodge, "photos" | "location"> & {
  institutionId: string | null;
};

interface ILodgeFormContext {
  lodgeToEdit: Lodge | undefined;
  currentStep: number;
  formSteps: Step[];
  nextStep: () => void;
  prevStep: () => void;
  handleSubmit: () => Promise<any>;
  changeStepValidity: (step: number, value?: boolean) => void;
  // Form data
  lodgeDetails: LodgeDetails;
  setDetails: (d: LodgeDetails) => void;
  location: Partial<Location>;
  setLocationObj: (l: Partial<Location>) => void;
  setPhotosToUpload: (p: PhotoToUpload[]) => void;
}

const defaultValues: ILodgeFormContext = {
  lodgeToEdit: undefined,
  currentStep: 0,
  formSteps: [],
  nextStep: () => {},
  prevStep: () => {},
  handleSubmit: async () => {},
  changeStepValidity: () => {},
  // Form data
  lodgeDetails: {
    id: "",
    title: "",
    description: "",
    space: SpaceType.APARTMENT,
    type: LodgeType.ENTIRE,
    gender: Gender.ANY,
    contactInfo: ContactInfo.ALL,
    directionMode: DirectionMode.TRANSIT,
    price: undefined,
    institutionId: null,
  },
  setDetails: () => {},
  location: {},
  setLocationObj: () => {},
  setPhotosToUpload: () => {},
};

export const LodgeFormContext = createContext(defaultValues);

export const LodgeFormProvider = ({ children }: { children: ReactNode }) => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const lodgeToEdit = state?.lodge || defaultValues.lodgeToEdit;

  const [loading, setLoading] = useState(false);

  const [currentStep, setCurrentStep] = useState(defaultValues.currentStep);
  const [formSteps, setFormSteps] = useState([
    { title: "Informações Básicas", valid: false },
    { title: "Localização", valid: false },
    { title: "Fotos", valid: false },
  ]);

  const [lodgeDetails, setDetails] = useState<LodgeDetails>(
    lodgeToEdit
      ? { ...lodgeToEdit, institutionId: lodgeToEdit.institution?.id }
      : defaultValues.lodgeDetails
  );
  const [location, setLocationObj] = useState(
    lodgeToEdit?.location || defaultValues.location
  );
  const [photosToUpload, setPhotosToUpload] = useState<PhotoToUpload[]>([]);

  const changeStepValidity = (step: number, value = false) => {
    const clone = [...formSteps];
    clone[step].valid = value;
    setFormSteps(clone);
  };

  const nextStep = () => {
    const isLastStep = currentStep >= formSteps.length - 1;
    if (!isLastStep) setCurrentStep((s) => s + 1);
  };

  const prevStep = () => {
    if (currentStep <= 0) {
      navigate("/my-lodges");
    } else {
      setCurrentStep((s) => s - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    //const formValid = formSteps.findIndex((s) => !s.valid) === -1;
    try {
      //if (!formValid) throw new Error("Formulário inválido");
      const payload = {
        ...lodgeDetails,
        location: { ...location } as Location,
        photos: photosToUpload,
      };
      if (lodgeToEdit) {
        await updateLodge(lodgeToEdit.id, payload);
      } else {
        await createLodge(payload);
      }
      navigate("/my-lodges");
    } catch (error: any) {
      showNotification("danger", "Erro ao salvar acomodação");
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (formSteps.every((step) => step.valid)) handleSubmit();
  }, [formSteps]);

  return (
    <LodgeFormContext.Provider
      value={{
        lodgeToEdit,
        currentStep,
        formSteps,
        changeStepValidity,
        nextStep,
        prevStep,
        handleSubmit,
        lodgeDetails,
        setDetails,
        location,
        setLocationObj,
        setPhotosToUpload,
      }}
    >
      {children}
      {loading && <Loader overlay />}
    </LodgeFormContext.Provider>
  );
};
