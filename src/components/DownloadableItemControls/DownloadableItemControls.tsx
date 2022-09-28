import { Transition } from '@headlessui/react';

interface DownloadableItemControlsProps {
  show: boolean;
  children: React.ReactNode;
}

const DownloadableItemControls = ({
  show,
  children,
}: DownloadableItemControlsProps) => {
  return (
    <Transition
      as="div"
      className="flex justify-center space-x-2 bg-black rounded-md"
      show={show}
      enter="transition-bg-opacity ease-out duration-1000"
      enterFrom="bg-opacity-0"
      enterTo="bg-opacity-50"
      leave="transition-bg-opacity ease-out duration-1000"
      leaveFrom="bg-opacity-50"
      leaveTo="bg-opacity-0"
    >
      {children}
    </Transition>
  );
};

export default DownloadableItemControls;
