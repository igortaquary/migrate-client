import { useContext } from "react";

import { LodgeImageUpload } from "../../components/LodgeImageUpload";
import { LodgeLocationForm } from "../../components/LodgeLocationForm";
import { LodgeFormContext } from "../../contexts/LodgeFormContext";
import { LodgeDetailsForm } from "../../components/LodgeDetailsForm";
import { Stepper } from "../../components/Stepper";
import { Card } from "react-bootstrap";

export const LodgeForm = () => {
  const { formSteps, currentStep } = useContext(LodgeFormContext);

  return (
    <main className='py-3'>
      <Card className='my-3'>
        <Card.Header>
          <h1>Anunciar acomodação</h1>
        </Card.Header>
        <Card.Body className='py-4 px-md-4 px-3'>
          <Stepper steps={formSteps} currentIndex={currentStep} />
          {[
            <LodgeDetailsForm />,
            <LodgeLocationForm />,
            <LodgeImageUpload />,
          ].at(currentStep)}
        </Card.Body>
      </Card>
    </main>
  );
};
