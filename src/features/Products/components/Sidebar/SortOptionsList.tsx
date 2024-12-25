import { Menu } from '@headlessui/react'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface SortOption {
  name: string;
  href: string;
  current: boolean;
}

function SortOptionsList({ sortOptions }: { sortOptions: SortOption[] }) {
  return (
    <div className='py-1'>
      {sortOptions.map((option) => (
        <Menu.Item key={option.name}>
          {({ active }) => (
            <a
              href={option.href}
              className={classNames(
                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                active ? 'bg-gray-100' : '',
                'block px-4 py-2 text-sm'
              )}
            >
              {option.name}
            </a>
          )}
        </Menu.Item>
      ))}
    </div>
  )
}

export default SortOptionsList
