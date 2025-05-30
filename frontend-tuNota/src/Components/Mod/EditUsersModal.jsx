// src/components/Mod/EditUserModal.jsx
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import EditEliminateForm from '../Users/EditEliminateForm';

const EditUserModal = ({ isOpen, onClose, user, onSave, loading }) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900 pb-2 border-b"
                                >
                                    Editar Usuario
                                    <p className="text-sm text-gray-500 mt-1">
                                        ID: {user?.id} | {user?.email}
                                    </p>
                                </Dialog.Title>

                                <div className="mt-4">
                                    <EditEliminateForm
                                        user={user}
                                        onSubmit={onSave}
                                        onCancel={onClose}
                                        loading={loading}
                                    />
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default EditUserModal;