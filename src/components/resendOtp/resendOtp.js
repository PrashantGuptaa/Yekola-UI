import { useState, useEffect, useRef } from "react";
import { SEND_OTP_ENDPOINT } from "../../configs/apiEndpoints";
import HttpServices from "../../configs/https.service";
import { Button } from "antd";

const ResendOtp = () => {
  const twoMins = 2000;

  const [disable, setDisable] = useState(true);
  const [timer, setTimer] = useState(twoMins);
  const timeRef = useRef({ timer: twoMins });

  useEffect(() => {
    runTimer();
  }, []);

  const enableLink = () => setDisable(false);

  const runTimer = () => {
    setTimeout(enableLink, twoMins);
    startTimer();
  };

  const startTimer = () => {
    timeRef.current.intervalId = setInterval(() => {
      console.log("Interval", timer);
      if (timeRef.current.timer <= 0) {
        console.log("Clearing internval");
        clearInterval(timeRef.current.intervalId);
        return;
      }
      timeRef.current.timer -= 1000;
      setTimer(timeRef.current.timer);
    }, 1000);
  };

  const resendEmail = async () => {
    try {
      setDisable(true);
      setTimer(twoMins);
      timeRef.current.timer = twoMins;
      runTimer();
      await HttpServices.postRequest(SEND_OTP_ENDPOINT, {});
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <p>
      Haven't recieved yet. <br />
      <br />
      <Button type="primary" disabled={disable} onClick={resendEmail}>
        {`Resend Email (${timer / 1000})`}
      </Button>
    </p>
  );
};

export default ResendOtp;
