import { useState } from "react";
import usePremAudio from "shared/hooks/usePremAudio";
import PrimaryButton from "shared/components/PrimaryButton";
import OutlineCircleButton from "shared/components/OutlineCircleButton";
import clsx from "clsx";
import { PremAudioContainerProps } from "../types";
import { useNavigate } from "react-router-dom";
import PremAudioTab from "./PremAudioTab";
import PremRecordTab from "./PremRecordTab";
import { AUDIO_TAB, RECORD_TAB } from "shared/helpers/utils";

const PremAudioBox = ({ serviceId, historyId }: Partial<PremAudioContainerProps>) => {
  const navigate = useNavigate();
  const { isLoading, onSubmit, file, setFile, currentHistory } = usePremAudio(
    serviceId!,
    historyId
  );
  const [activeTab, setActiveTab] = useState(AUDIO_TAB);

  const generateTranscriptions = () => {
    if (!file) return;
    onSubmit();
  };

  const onClear = () => {
    setFile(null);
    navigate(`/prem-audio/${serviceId}`);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setFile(null);
  };

  return (
    <div className="md:m-[50px] gap-10 m-[25px] prem-img-promptbox">
      <div className="max-w-[650px] mx-auto">
        <div className="tabs-header">
          <button
            onClick={() => handleTabChange(AUDIO_TAB)}
            className={clsx(activeTab === AUDIO_TAB && "bg-darkcharcoal", "rounded-tl rounded-tr")}
          >
            Audio
          </button>
          <button
            onClick={() => handleTabChange(RECORD_TAB)}
            className={clsx(activeTab === RECORD_TAB && "bg-darkcharcoal", "rounded-tl rounded-tr")}
          >
            Record
          </button>
        </div>
        {activeTab === AUDIO_TAB && <PremAudioTab file={file} setFile={setFile} />}
        {activeTab === RECORD_TAB && <PremRecordTab setFile={setFile} />}
        <div className="mt-4 flex justify-end gap-3">
          <OutlineCircleButton
            className={clsx(
              "!rounded-md !h-[40px] text-white items-center flex border border-[#EC898A] !px-12 !text-sm",
              {
                "opacity-50": isLoading,
              }
            )}
            onClick={onClear}
            disabled={isLoading}
          >
            Clear
          </OutlineCircleButton>
          <PrimaryButton
            className={clsx("!px-12 flex items-center !py-2 !h-[38px] !text-sm", {
              "opacity-50": !file,
              "animate-fill-effect": isLoading,
            })}
            onClick={generateTranscriptions}
            disabled={isLoading || !file}
          >
            Submit
          </PrimaryButton>
        </div>
      </div>
      {currentHistory?.transcriptions && (
        <div className="max-w-[650px] mx-auto mt-20">
          <span className="bg-darkcharcoal inline-block py-2 px-[14px] min-w-[90px] w-fit rounded-tl rounded-tr">
            Text
          </span>
          <div className="prem-audio-box bg-darkcharcoal">
            <p className="mb-[18px] text-spanishgray">Output</p>
            <div className="border-2 border-lavendergray rounded-lg min-h-[262px] flex justify-center items-center flex-col">
              <div className="m-4 text-white text-sm">{currentHistory?.transcriptions}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PremAudioBox;
