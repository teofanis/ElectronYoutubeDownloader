import { Transition } from '@headlessui/react';

interface DownloadableItemTransitionContainerProps {
  show: boolean;
  children: React.ReactNode;
}

const DownloadableItemTransitionContainer = ({
  show,
  children,
}: DownloadableItemTransitionContainerProps) => {
  return (
    <Transition
      as="div"
      show={show}
      enter="transition ease-out duration-500"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-450"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      {children}
    </Transition>
  );
};

export default DownloadableItemTransitionContainer;
