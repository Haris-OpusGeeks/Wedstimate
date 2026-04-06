import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const MAILCHIMP_SCRIPT_ID = "mcjs";
const MAILCHIMP_SCRIPT_SRC =
  "https://chimpstatic.com/mcjs-connected/js/users/8c06c97e963ab0fa2619472f1/c8760b4d07e59c8be778a9bc2.js";

const MailchimpScript = () => {
  const location = useLocation();

  useEffect(() => {
    const existingScript = document.getElementById(MAILCHIMP_SCRIPT_ID);

    if (location.pathname !== "/") {
      if (existingScript) {
        existingScript.remove();
      }

      return;
    }

    if (existingScript) {
      return;
    }

    const script = document.createElement("script");
    script.id = MAILCHIMP_SCRIPT_ID;
    script.src = MAILCHIMP_SCRIPT_SRC;
    script.async = true;

    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [location.pathname]);

  return null;
};

export default MailchimpScript;
