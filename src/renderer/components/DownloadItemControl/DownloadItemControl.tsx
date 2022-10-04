import { Transition } from '@headlessui/react';

interface DownloadItemControlProps {
  children: React.ReactNode;
}

const DownloadItemControl = ({ children }: DownloadItemControlProps) => {
  return (
    <Transition.Child
      enter="transition-opacity ease-in-out duration-1200"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity ease-in-out duration-900"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {children}
    </Transition.Child>
  );
};

export default DownloadItemControl;
