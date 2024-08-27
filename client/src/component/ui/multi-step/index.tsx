import { Button, Group, Stepper, rem } from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";
import { ReactNode, useState } from "react";

// Define the shape of each step
type Step = {
  icon: ReactNode;
  label: string;
  description: string;
  content: ReactNode;
};

// Props for the MultiStep component
interface MultiStepProps {
  steps: Step[];
}

const MultiStep = ({ steps }: MultiStepProps) => {
  const [active, setActive] = useState(0);

  const nextStep = () =>
    setActive((current) =>
      current < steps.length - 1 ? current + 1 : current
    );
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <>
      <Stepper
        active={active}
        onStepClick={setActive}
        completedIcon={
          <IconCircleCheck style={{ width: rem(18), height: rem(18) }} />
        }
      >
        {steps.map((step, index) => (
          <Stepper.Step
            key={index}
            icon={step.icon}
            label={step.label}
            description={step.description}
          />
        ))}
      </Stepper>

      <div style={{ marginTop: "1rem" }}>{steps[active].content}</div>

      <Group justify="center" mt="xl">
        <Button variant="default" onClick={prevStep} disabled={active === 0}>
          Back
        </Button>
        <Button onClick={nextStep}>
          {active === steps.length - 1 ? "Submit" : "Next Step"}
        </Button>
      </Group>
    </>
  );
};

export default MultiStep;
