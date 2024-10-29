import { Disclosure } from '@headlessui/react'
import { FaMinus, FaPlus } from 'react-icons/fa'
import InputFilter from '@shared/components/InputFilter/InputFilter'
interface Option {
  value: string;
  label: string;
  checked: boolean;
}

interface SizeFilterProps {
  options: Option[];
}

export default function SizeFilter({ options }: SizeFilterProps) {
  return (
    <Disclosure as='div' className='border-t border-gray-200 px-4 py-6'>
      {({ open }) => (
        <>
          <h3 className='-mx-2 -my-3 flow-root'>
            <Disclosure.Button className='flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500'>
              <span className='font-medium text-gray-900'>Size</span>
              <span className='ml-6 flex items-center'>
                {open ? (
                  <FaMinus className='h-5 w-5' aria-hidden='true' />
                ) : (
                  <FaPlus className='h-5 w-5' aria-hidden='true' />
                )}
              </span>
            </Disclosure.Button>
          </h3>
          <Disclosure.Panel className='pt-6'>
            <div className='space-y-2'>
              {options.map((option, optionIdx) => (
                <div key={option.value} className='flex items-center'>
                  <InputFilter
                    id={optionIdx}
                    value={option.value}
                    label={option.label}
                    checked={option.checked}
                  />
                </div>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
