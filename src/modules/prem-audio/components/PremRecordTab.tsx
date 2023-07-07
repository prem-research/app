import { PremAudioRecordTabsProps } from "../types";
import { useReactMediaRecorder } from "react-media-recorder";
import { v4 as uuid } from "uuid";
import { useState } from "react";
import MicError from "./MicError";
import RecordControls from "./RecordControls";

const PremRecordTab = ({ setFile }: Pick<PremAudioRecordTabsProps, "setFile">) => {
  const [url, setUrl] = useState("");

  const { status, startRecording, stopRecording, mediaBlobUrl, error, clearBlobUrl } =
    useReactMediaRecorder({
      video: false,
      audio: true,
      askPermissionOnMount: true,
      onStop(blobUrl, blob) {
        setUrl(blobUrl);
        setFile(new File([blob], `${uuid()}.wav`));
        clearBlobUrl();
      },
    });

  return (
    <div className="prem-audio-box bg-darkcharcoal">
      <p className="mb-[18px] text-spanishgray">Record an audio from your microphone</p>
      <div className="border-2 border-lavendergray rounded-lg h-[162px] flex justify-center items-center flex-col">
        {error && <MicError error={error} />}
        {!error && (
          <RecordControls
            status={status}
            startRecording={startRecording}
            stopRecording={stopRecording}
          />
        )}
      </div>
      {!!url && (
        <div className="gradient-border relative mt-5">
          <p>Prem.AI Speech File</p>
          <audio src={url} controls />
        </div>
      )}
    </div>
  );
};

export default PremRecordTab;
