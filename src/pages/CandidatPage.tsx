// Router component that displays different design variants based on candidate ID
import { useParams } from "react-router-dom";
import CandidatPageV1 from "./CandidatPageV1";
import CandidatPageV2 from "./CandidatPageV2";
import CandidatPageV3 from "./CandidatPageV3";
import CandidatPageV4 from "./CandidatPageV4";

const CandidatPage = () => {
  const { id } = useParams();

  // Route to different design variants based on candidate ID
  switch (id) {
    case "1":
      return <CandidatPageV1 />;
    case "2":
      return <CandidatPageV2 />;
    case "3":
      return <CandidatPageV3 />;
    case "4":
      return <CandidatPageV4 />;
    default:
      return <CandidatPageV1 />;
  }
};

export default CandidatPage;
