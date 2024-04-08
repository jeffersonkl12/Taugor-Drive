import { RefObject } from 'react';
import { ErrorModalRef } from '@components/errorModal/ErrorModal';

let modalRef: ErrorModalRef | null = null;

export const initializeErrorModal = (ref: RefObject<ErrorModalRef>) => {
  if (ref.current) {
    modalRef = ref.current;
  }
};

export const showErrorModal = (errorMessage: string) => {
  if (modalRef) {
    modalRef.showModal(errorMessage);
  }
};
