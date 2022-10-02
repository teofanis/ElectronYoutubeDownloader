import { Transition } from '@headlessui/react';

interface DownloadableItemTransitionProps {
  children: React.ReactNode;
}

const DownloadableItemTransition = ({
  children,
}: DownloadableItemTransitionProps) => {
  return (
    <Transition.Child
      enter="transition transform ease-out duration-500"
      enterFrom="transform translate-x-4 opacity-0"
      enterTo="translate-x-0 opacity-100"
      leave="transition transform ease-in duration-500"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {children}
    </Transition.Child>
  );
};

export default DownloadableItemTransition;
