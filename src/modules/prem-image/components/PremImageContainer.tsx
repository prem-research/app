import { useState } from "react";
import PremImageLeftSidebar from "./PremImageLeftSidebar";
import Header from "./Header";
import clsx from "clsx";
import PremImageRightSidebar from "./PremImageRightSidebar";
import PrimaryButton from "shared/components/PrimaryButton";
import usePremImage from "shared/hooks/usePremImage";
import DownloadIcon from "shared/components/DownloadIcon";
import DeleteIconNew from "shared/components/DeleteIconNew";
import { useNavigate, useParams } from "react-router-dom";
import PremImagePromptBox from "./PremImagePromptBox";

const PremImageContainer = () => {
  const [rightSidebar, setRightSidebar] = useState(false);
  const [hamburgerMenuOpen, setHamburgerMenu] = useState<boolean>(true);
  const { historyId } = useParams();
  const navigate = useNavigate();

  const { isLoading, onSubmit, prompt, setPrompt, currentHistory, n, deleteHistory } =
    usePremImage(historyId);

  const generateImages = () => {
    if (!prompt) return;
    onSubmit();
  };

  const onDeleteClick = () => {
    deleteHistory(historyId as string);
    navigate("/prem-image");
  };

  return (
    <section>
      <div className="md:flex md:h-screen w-full relative">
        <div
          className={clsx("prem-chat-sidebar md:relative", hamburgerMenuOpen && "max-md:hidden")}
        >
          <PremImageLeftSidebar setHamburgerMenu={setHamburgerMenu} />
        </div>
        <div className="flex flex-1">
          <div className="bg-lines bg-darkjunglegreen relative h-full w-full">
            <div className="main-content h-full z-10 overflow-y-auto custom-scroll relative prem-img-services min-h-screen">
              <Header
                hamburgerMenuOpen={hamburgerMenuOpen}
                setHamburgerMenu={setHamburgerMenu}
                title={"Stable Diffusion 1.5"}
                setRightSidebar={setRightSidebar}
                rightSidebar={rightSidebar}
              />
              <PremImagePromptBox prompt={prompt} setPrompt={setPrompt} />
              <div className="prem-img-services__container">
                <div className="py-[30px] flex flex-wrap max-md:gap-2">
                  <PrimaryButton
                    className={clsx(
                      "!px-12 !py-2 !text-sm",
                      isLoading || (!prompt && "animate-fill-effect")
                    )}
                    onClick={generateImages}
                    disabled={isLoading || !prompt}
                  >
                    {isLoading ? `Generating ${n} Images` : `Generate Image`}
                  </PrimaryButton>
                  <div className="ml-auto flex gap-4">
                    <button className="px-2" onClick={onDeleteClick}>
                      <DeleteIconNew />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-[13px]">
                  {currentHistory?.images.map((image, index) => {
                    return (
                      <div className="relative prem-img__box" key={index}>
                        <img src={image} className="w-full" />
                        <button>
                          <DownloadIcon />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>{rightSidebar && <PremImageRightSidebar setRightSidebar={setRightSidebar} />}</div>
      </div>
    </section>
  );
};

export default PremImageContainer;
