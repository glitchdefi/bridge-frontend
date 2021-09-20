import React, { useState } from "react";
import styled from "styled-components";

// Components
import { PageElementWrap } from "../../app/layouts/PageElementWrap";
import { BridgeCard } from "./components/BridgeCard";
import { StepOne } from "./components/StepOne/StepOne";
import { StepTwo } from "./components/StepTwo/StepTwo";

const BridgePortalPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [amount, setAmount] = useState(0);
  const [inputNetwork, setInputNetwork] = useState();
  const [outputNetwork, setOutputNetwork] = useState();

  return (
    <>
      <PageElementWrap>
        <BridgeWrapper>
          <MainContent>
            <BridgeCard>
              {currentStep === 1 && (
                <StepOne
                  data={{ amount, inputNetwork, outputNetwork }}
                  onNext={({ amount, inputNetwork, outputNetwork }) => {
                    setAmount(amount);
                    setInputNetwork(inputNetwork);
                    setOutputNetwork(outputNetwork);
                    setCurrentStep(2);
                  }}
                />
              )}

              {currentStep === 2 && (
                <StepTwo
                  amount={amount}
                  inputNetwork={inputNetwork}
                  outputNetwork={outputNetwork}
                  onBack={() => setCurrentStep(1)}
                  onSuccess={(inputNetwork, outputNetwork) => {
                    setAmount("");
                    setInputNetwork(inputNetwork);
                    setOutputNetwork(outputNetwork);
                    setCurrentStep(1);
                  }}
                />
              )}
            </BridgeCard>
          </MainContent>
        </BridgeWrapper>
      </PageElementWrap>
    </>
  );
};

const BridgeWrapper = styled.div`
  max-width: 912px;
  margin: 0px auto;
`;

const MainContent = styled.div`
  width: 100%;
  height: 100%;
`;

export default BridgePortalPage;
