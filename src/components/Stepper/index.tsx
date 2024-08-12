import "./index.scss";

export type Step = {
  title: string;
  valid: boolean;
};

export interface IStepper {
  steps: Step[];
  currentIndex: number;
}

export const Stepper = ({ steps, currentIndex }: IStepper) => {
  const hasLine = (index: number) => index < steps.length - 1;

  return (
    <div className='bs-stepper d-md-block d-none'>
      <div className='bs-stepper-header' role='tablist'>
        {steps.map((step, i) => (
          <>
            <div className={`step ${i === currentIndex ? "active" : ""}`}>
              <div className='step-trigger'>
                <span className='bs-stepper-circle'>
                  {step.valid ? <i className='bi bi-check'></i> : i + 1}
                </span>
                <span className='bs-stepper-label'>{step.title}</span>
              </div>
            </div>
            {hasLine(i) && <div className='line'></div>}
          </>
        ))}
      </div>
    </div>
  );
};
