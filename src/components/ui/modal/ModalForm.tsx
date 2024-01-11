import { FC, ReactNode } from 'react'
import { cva, type VariantProps } from "class-variance-authority";
import useLocatioanName from '../../../utils/location';

const modalForm = cva("relative w-full max-h-screen py-12 ", {
	variants: {
		size: {
			small: [
				"max-w-2xl",
			],
			medium: [
				"max-w-4xl"
			],
			large: [
				"max-w-6xl"
			],
            full: [
				"max-w-full"
			],
		},
	},
	compoundVariants: [{size: "medium"}],
	defaultVariants: {
		size: "medium",
	},
});

export interface ModalProps
	extends VariantProps<typeof modalForm> {
        title: string;
        className?: string;
        visible: boolean;
        children: ReactNode;
        onClose ?: ()=> void;
    }

const ModalForm: FC<ModalProps> = ({
    title, 
    className, 
    size, 
    visible,
    children,
    onClose,
    ...props
}) => {
    return (
        <div
        id="defaultModal"
        tabIndex={-1}
        aria-hidden="true"
        className={`${visible ? 'flex' : 'hidden'} 
            fixed top-0 left-0 right-0 z-50 items-center justify-center
            w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
        >
            <div className='absolute h-screen w-full bg-black opacity-30' />
            <div className={modalForm({ size, className })} {...props}>
                {/* Modal content */}
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                {/* Modal header */}
                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {title} {useLocatioanName().pathName}
                    </h3>
                    <button
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 
                            hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex 
                            justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-hide="defaultModal"
                        onClick={onClose}
                    >
                    <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                    >
                        <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                    </svg>
                    <span className="sr-only">Close modal</span>
                    </button>
                </div>
                {/* Modal body */}
                <div className="p-6 space-y-6 overflow-auto max-h-120">
                    {children}
                </div>
                </div>
            </div>
        
        </div>



    )
}

export default ModalForm